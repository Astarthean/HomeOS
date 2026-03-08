<?php

namespace App\Domain\Repository;

use App\Domain\Entity\Transaction;
use App\Domain\ValueObject\AccountId;

interface TransactionRepositoryInterface
{
    /**
     * Guarda una transacción nueva
     */
    public function save(Transaction $transaction): void;

    /**
     * Busca las transacciones de una cuenta
     */
    public function findByAccountId(AccountId $accountId): array;
}