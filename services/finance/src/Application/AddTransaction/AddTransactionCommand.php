<?php

declare(strict_types=1);

namespace App\Application\AddTransaction;

final readonly class AddTransactionCommand
{
    public function __construct(
        public string $transactionId,
        public string $accountId,
        public int $amount,
        public string $currency,
        public string $type,
        public string $description
    ) {}
}
