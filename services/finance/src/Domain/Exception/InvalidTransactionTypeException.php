<?php

declare(strict_types=1);

namespace App\Domain\Exception;

final class InvalidTransactionTypeException extends \DomainException
{
    public function __construct(string $type, int $code = 0, ?\Throwable $previous = null)
    {
        parent::__construct(sprintf("El tipo de transacción '%s' no es válido. Los tipos permitidos son: DEPOSIT, WITHDRAWAL.", $type), $code, $previous);
    }
}
