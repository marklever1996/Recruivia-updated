<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Google_Client;
use Google_Service_Calendar;

class CalendarController extends AbstractController
{
    #[Route('/api/calendar/connect', name: 'connect_calendar', methods: ['POST'])]
    public function connect(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $accessToken = $data['access_token'];

        // Hier zou je het access token moeten opslaan bij de gebruiker
        // en de Google Calendar API configureren

        return $this->json([
            'message' => 'Calendar connected successfully'
        ]);
    }

    #[Route('/api/calendar/events', name: 'get_events', methods: ['GET'])]
    public function getEvents(): Response
    {
        // Hier zou je de Google Calendar API moeten gebruiken om events op te halen
        
        return $this->json([
            'events' => []
        ]);
    }

    #[Route('/api/calendar/status', name: 'calendar_status', methods: ['GET'])]
    public function getStatus(): Response
    {
        // Hier zou je moeten controleren of de huidige gebruiker een verbonden agenda heeft
        
        return $this->json([
            'connected' => false
        ]);
    }
} 