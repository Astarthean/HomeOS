<?php

declare(strict_types=1);

namespace App\Infrastructure\Controller;

use App\Application\CreateAccount\CreateAccountCommand;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Attribute\Route;

final class CreateAccountController extends AbstractController
{
    public function __construct(
        private MessageBusInterface $messageBus
    ) {

    }

    #[Route('/api/account', methods: ['POST'])]
    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            throw new \InvalidArgumentException('El payload JSON es inválido o está vacío.');
        }

        $this->messageBus->dispatch(
            new CreateAccountCommand(
                accountId: $data['id'],
                name: $data['name'],
                type: $data['type'],
                ownerId: $data['owner_id'],
                currency: $data['currency'],
                initialBalance: $data['initial_balance']
            )
        );


        return new JsonResponse(null, Response::HTTP_CREATED);
    }
}