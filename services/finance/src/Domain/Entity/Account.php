<?php

declare(strict_types=1);

namespace App\Domain\Entity;

use App\Domain\Exception\InsufficientFundsException;
use App\Domain\ValueObject\AccountId;
use App\Domain\ValueObject\AccountType;
use App\Domain\ValueObject\Money;
use App\Domain\ValueObject\TransactionType;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'accounts')]
class Account
{
    #[ORM\Id]
    #[ORM\Column(type: 'string', length: 36)]
    private string $id;

    #[ORM\Column(type: 'string', length: 100)]
    private string $name;

    #[ORM\Column(type: 'string', enumType: AccountType::class)]
    private AccountType $type;

    #[ORM\Column(type: 'string', length: 36)]
    private string $ownerId;

    #[ORM\Embedded(class: Money::class, columnPrefix: false)]
    private Money $balance;

    private function __construct(
        AccountId $accountId,
        string $name,
        AccountType $type,
        string $ownerId,
        Money $balance
    ) {
        $this->id = $accountId->getAccountId();
        $this->name = $name;
        $this->type = $type;
        $this->ownerId = $ownerId;
        $this->balance = $balance;
    }


    public static function create(
        AccountId $accountId,
        string $name,
        AccountType $type,
        string $ownerId,
        Money $initialBalance
    ): Account {
        return new self($accountId, $name, $type, $ownerId, $initialBalance);
    }

    public function getAccountId(): AccountId
    {
        return new AccountId($this->id);
    }

    public function getName(): string
    {
        return $this->name;
    }
    public function getType(): AccountType
    {
        return $this->type;
    }
    public function getOwnerId(): string
    {
        return $this->ownerId;
    }

    public function getBalance(): Money
    {
        return $this->balance;
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

    public function applyTransaction(Transaction $transaction): void
    {
        if ($transaction->getType() === TransactionType::DEPOSIT) {
            $this->balance = $this->balance->add($transaction->getAmount());
        } elseif ($transaction->getType() === TransactionType::WITHDRAWAL) {
            $this->balance = $this->balance->subtract($transaction->getAmount());
        }
    }

}
