<?php
declare(strict_types=1);

namespace App\Domain\Exception;

final class InvalidCurrencyException extends \DomainException
{
    public function __construct(string $currency, int $code = 0, ?\Throwable $previous = null)
    {
        parent::__construct(sprintf('Moneda no soportada: %s', $currency), $code, $previous);
    }
}
