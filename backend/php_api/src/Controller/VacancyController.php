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
                'description' => $vacancy->getDescription(),
                'location' => $vacancy->getLocation(),
                'salary' => $vacancy->getSalary(),
                'created_at' => $vacancy->getCreatedAt()->format('Y-m-d H:i:s')
            ];
        }

        return $this->json($data);
    }

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
