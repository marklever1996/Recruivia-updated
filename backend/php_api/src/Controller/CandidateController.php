<?php

namespace App\Controller;

use App\Entity\Candidate;
use App\Repository\CandidateRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class CandidateController extends AbstractController
{
    #[Route('/candidates', name: 'candidate_list', methods: ['GET'])]
    public function index(CandidateRepository $candidateRepository): JsonResponse
    {
        $candidates = $candidateRepository->findAll();
        $data = [];

        foreach ($candidates as $candidate) {
            $data[] = [
                'id' => $candidate->getId(),
                'name' => $candidate->getName(),
                'email' => $candidate->getEmail(),
                'phone' => $candidate->getPhone(),
                'location' => $candidate->getLocation(),
                'skills' => $candidate->getSkills(),
                'experience' => $candidate->getExperience(),
                'education' => $candidate->getEducation(),
                'languages' => $candidate->getLanguages(),
                'certifications' => $candidate->getCertifications(),
                'created_at' => $candidate->getCreatedAt()->format('Y-m-d H:i:s')
            ];
        }

        return $this->json($data);
    }

    #[Route('/candidates', name: 'candidate_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            error_log("Start kandidaat aanmaken...");
            
            $data = json_decode($request->getContent(), true);
            error_log("Ontvangen data: " . print_r($data, true));
            
            if (!isset($data['personal_info'])) {
                error_log("ERROR: personal_info ontbreekt in data");
                return $this->json([
                    'success' => false,
                    'error' => 'Ongeldige data structuur: personal_info ontbreekt'
                ], Response::HTTP_BAD_REQUEST);
            }

            $candidate = new Candidate();
            
            // Personal info
            error_log("Verwerken personal info...");
            $candidate->setName($data['personal_info']['name'] ?? 'Onbekend');

            // Als email een array is, gebruik de eerste email
            $email = is_array($data['personal_info']['email']) 
                ? $data['personal_info']['email'][0]  // Neem de eerste email
                : ($data['personal_info']['email'] ?? null);
            $candidate->setEmail($email);

            $candidate->setPhone($data['personal_info']['phone'] ?? null);
            $candidate->setLocation($data['personal_info']['location'] ?? null);
            
            // Arrays
            error_log("Verwerken arrays...");
            foreach (['skills', 'experience', 'education', 'languages', 'certifications'] as $field) {
                error_log("Verwerken {$field}: " . print_r($data[$field] ?? [], true));
                $method = 'set' . ucfirst($field);
                $candidate->$method(is_array($data[$field]) ? $data[$field] : []);
            }
            
            // CV bestand
            error_log("Verwerken CV bestand: " . ($data['cv_filename'] ?? 'geen_bestand.pdf'));
            $candidate->setCvFilename($data['cv_filename'] ?? null);

            error_log("Opslaan in database...");
            $entityManager->persist($candidate);
            $entityManager->flush();

            error_log("Kandidaat succesvol aangemaakt met ID: " . $candidate->getId());
            return $this->json([
                'success' => true,
                'id' => $candidate->getId(),
                'message' => 'Kandidaat succesvol aangemaakt'
            ], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            error_log("ERROR bij aanmaken kandidaat: " . $e->getMessage());
            error_log("Error type: " . get_class($e));
            error_log("Stack trace: " . $e->getTraceAsString());

            return $this->json([
                'success' => false,
                'error' => 'Kon kandidaat niet aanmaken: ' . $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/candidates/{id}', name: 'candidate_show', methods: ['GET'])]
    public function show(Candidate $candidate): JsonResponse
    {
        return $this->json([
            'id' => $candidate->getId(),
            'name' => $candidate->getName(),
            'email' => $candidate->getEmail(),
            'phone' => $candidate->getPhone(),
            'location' => $candidate->getLocation(),
            'skills' => $candidate->getSkills(),
            'experience' => $candidate->getExperience(),
            'education' => $candidate->getEducation(),
            'languages' => $candidate->getLanguages(),
            'certifications' => $candidate->getCertifications(),
            'created_at' => $candidate->getCreatedAt()->format('Y-m-d H:i:s')
        ]);
    }

    #[Route('/candidates/{id}/cv', name: 'candidate_cv', methods: ['GET'])]
    public function getCv(Candidate $candidate): Response
    {
        try {
            $cvFilename = $candidate->getCvFilename();
            if (!$cvFilename) {
                throw new \Exception('Geen CV bestand gekoppeld aan deze kandidaat');
            }

            $cvPath = $this->getParameter('cv_directory') . '\\' . $cvFilename;
            error_log("Zoeken naar CV bestand: " . $cvPath);
            
            if (!file_exists($cvPath)) {
                error_log("CV bestand niet gevonden op pad: " . $cvPath);
                throw new \Exception('CV bestand niet gevonden');
            }

            $response = new BinaryFileResponse($cvPath, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'inline; filename="' . $cvFilename . '"',
                'Access-Control-Allow-Origin' => 'http://localhost:5173'
            ]);

            return $response;

        } catch (\Exception $e) {
            error_log("Error in getCv: " . $e->getMessage());
            return new JsonResponse([
                'error' => 'Kon CV niet ophalen: ' . $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    #[Route('/candidates/upload-cv', name: 'upload_cv', methods: ['POST', 'OPTIONS'])]
    public function uploadCv(Request $request): Response
    {
        // Handle preflight OPTIONS request
        if ($request->getMethod() === 'OPTIONS') {
            return new Response('', 204, [
                'Access-Control-Allow-Origin' => 'http://localhost:5173',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type',
                'Access-Control-Max-Age' => '3600'
            ]);
        }

        try {
            $file = $request->files->get('cv');
            
            if (!$file) {
                throw new \Exception('Geen bestand ontvangen');
            }

            // Genereer unieke bestandsnaam
            $filename = uniqid() . '.pdf';
            
            // Zorg dat de upload directory bestaat met Windows-style paths
            $uploadDir = $this->getParameter('cv_directory');
            $uploadDir = str_replace('/', '\\', $uploadDir);
            
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
                // Geef expliciete Windows permissies
                chmod($uploadDir, 0777);
            }

            // Verplaats het bestand
            $file->move(
                $uploadDir,
                $filename
            );

            $response = new JsonResponse([
                'success' => true,
                'filename' => $filename
            ]);

            // Voeg CORS headers toe aan response
            $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
            return $response;

        } catch (\Exception $e) {
            $response = new JsonResponse([
                'success' => false,
                'error' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);

            // Voeg CORS headers toe aan error response
            $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
            return $response;
        }
    }
} 