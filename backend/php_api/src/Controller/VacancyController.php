<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

final class VacancyController extends AbstractController
{
    #[Route('/vacancies', name: 'app_vacancies', methods: ['GET'])]
    public function index(): JsonResponse
    {
        // Dummy data (later vervang je dit met database data)
        $vacancies = [
            ['id' => 1, 'title' => 'Frontend Developer', 'company' => 'TechCorp'],
            ['id' => 2, 'title' => 'Backend Developer', 'company' => 'CodeWorks'],
        ];

        return $this->json($vacancies);
    }
}
