<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request, 
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): Response {
        try {
            $data = json_decode($request->getContent(), true);

            // Check if user exists by email OR Firebase UID
            $existingUser = $entityManager->getRepository(User::class)->findOneBy([
                'email' => $data['email']
            ]) ?? $entityManager->getRepository(User::class)->findOneBy([
                'firebaseUid' => $data['uid']
            ]);

            if ($existingUser) {
                // Als de gebruiker al bestaat met een andere provider, update dan de gegevens
                if ($existingUser->getProvider() !== $data['provider']) {
                    $existingUser->setFirebaseUid($data['uid']);
                    $existingUser->setProvider($data['provider']);
                    
                    if (isset($data['displayName'])) {
                        $existingUser->setDisplayName($data['displayName']);
                    }
                    if (isset($data['photoURL'])) {
                        $existingUser->setPhotoURL($data['photoURL']);
                    }
                    
                    $entityManager->flush();

                    return $this->json([
                        'message' => 'User updated successfully',
                        'user' => [
                            'id' => $existingUser->getId(),
                            'email' => $existingUser->getEmail(),
                            'displayName' => $existingUser->getDisplayName(),
                            'photoURL' => $existingUser->getPhotoURL()
                        ]
                    ], Response::HTTP_OK);
                }

                return $this->json([
                    'message' => 'User already exists',
                    'user' => [
                        'id' => $existingUser->getId(),
                        'email' => $existingUser->getEmail(),
                        'displayName' => $existingUser->getDisplayName(),
                        'photoURL' => $existingUser->getPhotoURL()
                    ]
                ], Response::HTTP_OK); // Veranderd van 409 naar 200 omdat de gebruiker succesvol is ingelogd
            }

            // Maak nieuwe gebruiker als deze nog niet bestaat
            $user = new User();
            $user->setEmail($data['email']);
            $user->setFirebaseUid($data['uid']);

            if (isset($data['provider']) && $data['provider'] === 'google') {
                $user->setProvider('google');
                $user->setDisplayName($data['displayName'] ?? null);
                $user->setPhotoURL($data['photoURL'] ?? null);
            } else {
                $user->setProvider('email');
                $user->setPassword(
                    $passwordHasher->hashPassword($user, $data['password'])
                );
            }

            $entityManager->persist($user);
            $entityManager->flush();

            return $this->json([
                'message' => 'User registered successfully',
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'displayName' => $user->getDisplayName(),
                    'photoURL' => $user->getPhotoURL()
                ]
            ], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            return $this->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
} 