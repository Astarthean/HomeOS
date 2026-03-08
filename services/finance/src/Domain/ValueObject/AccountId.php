<?php

declare(strict_types=1);

namespace App\Domain\ValueObject;

final readonly class AccountId
{
    public function __construct(
        private string $id
    ) {

    }

    public function getAccountId(): string
    {
        return $this->id;
    }

    public function __toString(): string
    {
        return $this->id;
    }
}
