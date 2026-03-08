<?php

declare(strict_types=1);

namespace App\Domain\Exception;

final class InvalidAccountTypeException extends \DomainException
{
    public function __construct(string $type, int $code = 0, ?\Throwable $previous = null)
    {
        parent::__construct(sprintf("El tipo de cuenta '%s' no es válido. Los tipos permitidos son: bank, cash, savings.", $type), $code, $previous);
    }
}
