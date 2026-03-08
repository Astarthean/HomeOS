<?php

declare(strict_types=1);

namespace App\Domain\Entity;

use App\Domain\Exception\InsufficientFundsException;
use App\Domain\ValueObject\AccountId;
use App\Domain\ValueObject\Money;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'accounts')]
class Account
{
    #[ORM\Id]
    #[ORM\Column(type: 'string', length: 36)]
    private string $id;

    #[ORM\Embedded(class: Money::class, columnPrefix: false)]
    private Money $balance;

    private function __construct(
        AccountId $accountId,
        Money $balance
    ) {
        $this->id = $accountId->getAccountId();
        $this->balance = $balance;
    }

    public static function create(AccountId $accountId, Money $balance): Account
    {
        return new self($accountId, $balance);
    }

    public function getAccountId(): AccountId
    {
        return new AccountId($this->id);
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
