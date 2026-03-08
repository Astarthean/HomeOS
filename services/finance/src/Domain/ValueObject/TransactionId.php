<?php

declare(strict_types=1);

namespace App\Domain\ValueObject;

final readonly class TransactionId
{
    public function __construct(
        private string $id
    ) {
        if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $id)) {
            throw new \InvalidArgumentException('Invalid Transaction ID format. Must be a valid UUID.');
        }
    }

    public function __toString(): string
    {
        return $this->id;
    }
}
