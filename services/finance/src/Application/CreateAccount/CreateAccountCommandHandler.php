<?php

declare(strict_types=1);

namespace App\Application\CreateAccount;

use App\Application\Command\CommandHandlerInterface;
use App\Domain\Entity\Account;
use App\Domain\Repository\AccountRepositoryInterface;
use App\Domain\ValueObject\AccountId;
use App\Domain\ValueObject\AccountType;
use App\Domain\ValueObject\Money;

final readonly class CreateAccountCommandHandler implements CommandHandlerInterface
{
    public function __construct(
        private AccountRepositoryInterface $accountRepository
    ) {
    }

    public function __invoke(CreateAccountCommand $command): void
    {
        $id = new AccountId($command->accountId);
        $name = $command->name;
        $type = AccountType::fromString($command->type);
        $ownerId = $command->ownerId;
        $initialMoney = new Money($command->initialBalance, $command->currency);

        if ($this->accountRepository->findById($id) !== null) {
            throw new \DomainException("La cuenta con ID {$command->accountId} ya existe.");
        }

        $account = Account::create(
            $id,
            $name,
            $type,
            $ownerId,
            $initialMoney
        );

        $this->accountRepository->save($account);
    }
}
