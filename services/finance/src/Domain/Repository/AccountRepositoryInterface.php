<?php

declare(strict_types=1);

namespace App\Domain\Repository;

use App\Domain\Entity\Account;
use App\Domain\ValueObject\AccountId;

interface AccountRepositoryInterface
{
    /**
     * Guarda una cuenta nueva o actualiza una existente
     */
    public function save(Account $account): void;

    /**
     * Busca una cuenta por su ID. Devuelve null si no existe.
     */
    public function findById(AccountId $id): ?Account;
}
