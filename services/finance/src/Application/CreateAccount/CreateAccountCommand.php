<?php

declare(strict_types=1);

namespace App\Application\CreateAccount;

final class CreateAccountCommand
{
    public function __construct(
        public readonly string $accountId,
        public readonly string $name,
        public readonly string $type,
        public readonly string $ownerId,
        public readonly string $currency,
        public readonly int $initialBalance
    ) {
    }
}