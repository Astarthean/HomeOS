<?php

declare(strict_types=1);

namespace App\Domain\ValueObject;

use App\Domain\Exception\InvalidAccountTypeException;

enum AccountType: string
{
    case BANK = 'BANK';
    case CASH = 'CASH';
    case SAVINGS = 'SAVINGS';

    public static function fromString(string $type): self
    {
        try {
            return self::from(strtoupper($type));
        } catch (\ValueError) {
            throw new InvalidAccountTypeException($type);
        }
    }
}