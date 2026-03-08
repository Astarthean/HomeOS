<?php

declare(strict_types=1);

namespace App\Domain\ValueObject;

use App\Domain\Exception\InvalidTransactionTypeException;

enum TransactionType: string
{
    case DEPOSIT = 'DEPOSIT';
    case WITHDRAWAL = 'WITHDRAWAL';

    /**
     * @throws InvalidTransactionTypeException
     */
    public static function fromString(string $type): self
    {
        try {
            return self::from(strtoupper($type));
        } catch (\ValueError) {
            throw new InvalidTransactionTypeException($type);
        }
    }
}
