<?php

declare(strict_types=1);

namespace App\Domain\ValueObject;

use App\Domain\Exception\InvalidCurrencyException;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Embeddable]
final readonly class Money
{
    public function __construct(
        #[ORM\Column(type: 'integer')]
        private int $amount,
        #[ORM\Column(type: 'string', length: 3)]
        private string $currency
    ) {
        $allowedCurrencies = ['EUR'];

        if (!in_array($this->currency, $allowedCurrencies, true)) {
            throw new InvalidCurrencyException();

        }
    }

    public function getAmount(): int
    {
        return $this->amount;
    }

    public function getCurrency(): string
    {
        return $this->currency;
    }

    public function add(Money $money): Money
    {
        if ($this->currency !== $money->getCurrency()) {
            throw new InvalidCurrencyException();
        }

        return new Money($this->amount + $money->getAmount(), $this->currency);
    }

    public function subtract(Money $money): Money
    {
        if ($this->currency !== $money->getCurrency()) {
            throw new InvalidCurrencyException();

        }

        return new Money($this->amount - $money->getAmount(), $this->currency);
    }
}
