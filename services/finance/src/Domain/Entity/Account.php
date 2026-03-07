<?php

declare(strict_types=1);

namespace App\Domain\Entity;

use App\Domain\Exception\InsufficientFundsException;
use App\Domain\ValueObject\AccountId;
use App\Domain\ValueObject\Money;

class Account
{
    private function __construct(
        private AccountId $accountId,
        private Money $balance
    ) {
    }

    public static function create(AccountId $accountId, Money $balance): Account
    {
        return new self($accountId, $balance);
    }

    public function deposit(Money $amount): void
    {
        $this->balance = $this->balance->add($amount);
    }

    public function withdraw(Money $amount): void
    {
        if ($this->balance->getAmount() < $amount->getAmount()) {
            throw new InsufficientFundsException();
        }

        $this->balance = $this->balance->subtract($amount);
    }
}