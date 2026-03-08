<?php

declare(strict_types=1);

namespace App\Infrastructure\Controller;

use App\Application\AddTransaction\AddTransactionCommand;
use Ramsey\Uuid\Uuid;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Attribute\Route;

final class AddTransactionController extends AbstractController
{
    public function __construct(
        private MessageBusInterface $messageBus
    ) {
    }

    #[Route('/api/account/{id}/transaction', methods: ['POST'])]
    public function __invoke(string $id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            throw new \InvalidArgumentException('El payload JSON es inválido o está vacío.');
        }

        $transactionId = Uuid::uuid4()->toString();

        $this->messageBus->dispatch(
            new AddTransactionCommand(
                transactionId: $transactionId,
                accountId: $id,
                amount: $data['amount'] ?? 0,
                currency: $data['currency'] ?? '',
                type: $data['type'] ?? '',
                description: $data['description'] ?? ''
            )
        );

        return new JsonResponse(['id' => $transactionId], Response::HTTP_CREATED);
    }
}
