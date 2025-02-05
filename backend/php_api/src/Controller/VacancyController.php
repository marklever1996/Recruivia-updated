<?php

namespace App\Controller;

use App\Entity\Vacancy;
use App\Repository\VacancyRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

// API route voor de vacatures. Dit is de route die gebruikt wordt om de vacatures op te halen.
// Alle vacatures worden opgehaald en geretourneerd als JSON.
#[Route('/api', name: 'api_')]
class VacancyController extends AbstractController
{
    #[Route('/vacancies', name: 'vacancy_list', methods: ['GET'])]
    public function index(VacancyRepository $vacancyRepository): JsonResponse
    {
        $vacancies = $vacancyRepository->findAll();
        $data = [];

        foreach ($vacancies as $vacancy) {
            $data[] = [
                'id' => $vacancy->getId(),
                'title' => $vacancy->getTitle(),
                'company' => $vacancy->getCompany(),
                'description' => $vacancy->getDescription(),
                'location' => $vacancy->getLocation(),
                'salary' => $vacancy->getSalary(),
                'created_at' => $vacancy->getCreatedAt()->format('Y-m-d H:i:s')
            ];
        }

        $response = $this->json($data);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        return $response;
    }

    // API route voor het aanmaken van een vacature. 
    // Deze route wordt gebruikt om een nieuwe vacature toe te voegen aan de database.
    // Dus als user een vacature aanmaakt, 
    // wordt deze route gebruikt om de vacature toe te voegen aan de database.
    #[Route('/vacancies', name: 'vacancy_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $vacancy = new Vacancy();
        $vacancy->setTitle($data['title']);
        $vacancy->setCompany($data['company']);
        $vacancy->setSalary($data['salary']);
        $vacancy->setDescription($data['description']);
        $vacancy->setLocation($data['location']);

        $entityManager->persist($vacancy);
        $entityManager->flush();

        return $this->json([
            'message' => 'Vacancy created successfully',
            'vacancy' => [
                'id' => $vacancy->getId(),
                'title' => $vacancy->getTitle(),
                'company' => $vacancy->getCompany(),
                'salary' => $vacancy->getSalary(),
                'description' => $vacancy->getDescription(),
                'location' => $vacancy->getLocation(),
                'created_at' => $vacancy->getCreatedAt()->format('Y-m-d H:i:s')
            ]
        ], Response::HTTP_CREATED);
    }

    // API route voor het tonen van een specifieke vacature.
    // Deze route wordt gebruikt om een specifieke vacature op te halen uit de database.
    // Deze route wordt gebruikt om de vacature te bekijken in de preview pagina.
    #[Route('/vacancies/{id}', name: 'vacancy_show', methods: ['GET'])]
    public function show(Vacancy $vacancy): JsonResponse
    {
        return $this->json([
            'id' => $vacancy->getId(),
            'title' => $vacancy->getTitle(),
            'description' => $vacancy->getDescription(),
            'location' => $vacancy->getLocation(),
            'salary' => $vacancy->getSalary(),
            'created_at' => $vacancy->getCreatedAt()->format('Y-m-d H:i:s')
        ]);
    }
}
