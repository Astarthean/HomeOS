<?php

declare(strict_types=1);

namespace App\Application\AddTransaction;

use App\Application\Command\CommandHandlerInterface;
use App\Domain\Entity\Transaction;
use App\Domain\Repository\TransactionRepositoryInterface;
use App\Domain\Repository\AccountRepositoryInterface;
use App\Domain\ValueObject\AccountId;
use App\Domain\ValueObject\TransactionId;
use App\Domain\ValueObject\Money;
use App\Domain\ValueObject\TransactionType;

final readonly class AddTransactionCommandHandler implements CommandHandlerInterface
{
    public function __construct(
        private TransactionRepositoryInterface $transactionRepository,
        private AccountRepositoryInterface $accountRepository
    ) {}

    public function __invoke(AddTransactionCommand $command): void
    {
        $id = new TransactionId($command->transactionId);
        $accountId = new AccountId($command->accountId);
        $amount = new Money($command->amount, $command->currency);
        $type = TransactionType::fromString($command->type);
        $description = $command->description;

        $account = $this->accountRepository->findById($accountId);
        if ($account === null) {
            throw new \DomainException("La cuenta con ID {$command->accountId} no existe.");
        }

        $transaction = Transaction::create(
            $id,
            $accountId,
            $amount,
            $type,
            $description
        );

        $account->applyTransaction($transaction);
        $this->transactionRepository->save($transaction);
        $this->accountRepository->save($account);
    }
}
