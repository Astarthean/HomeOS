<?php

declare(strict_types=1);

namespace App\Domain\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Domain\ValueObject\TransactionId;
use App\Domain\ValueObject\AccountId;
use App\Domain\ValueObject\TransactionType;
use App\Domain\ValueObject\Money;

#[ORM\Entity]
#[ORM\Table(name: 'transactions')]
class Transaction
{
    #[ORM\Id]
    #[ORM\Column(type: 'string', length: 36, unique: true)]
    private string $id;

    #[ORM\Column(type: 'string', length: 36)]
    private string $accountId;

    #[ORM\Embedded(class: Money::class, columnPrefix: false)]
    private Money $amount;

    #[ORM\Column(type: 'string', enumType: TransactionType::class)]
    private TransactionType $type;

    #[ORM\Column(type: 'string', length: 255)]
    private string $description;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $date;

    private function __construct(
        TransactionId $id,
        AccountId $accountId,
        Money $amount,
        TransactionType $type,
        string $description,
        \DateTimeImmutable $date
    ) {
        $this->id = (string) $id;
        $this->accountId = (string) $accountId;
        $this->amount = $amount;
        $this->type = $type;
        $this->description = $description;
        $this->date = $date;
    }

    public static function create(
        TransactionId $id,
        AccountId $accountId,
        Money $amount,
        TransactionType $type,
        string $description
    ): self {
        return new self(
            $id,
            $accountId,
            $amount,
            $type,
            $description,
            new \DateTimeImmutable()
        );
    }

    public function getId(): TransactionId
    {
        return new TransactionId($this->id);
    }

    public function getAccountId(): AccountId
    {
        return new AccountId($this->accountId);
    }

    public function getAmount(): Money
    {
        return $this->amount;
    }

    public function getType(): TransactionType
    {
        return $this->type;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getDate(): \DateTimeImmutable
    {
        return $this->date;
    }
}
