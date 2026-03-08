<?php

declare(strict_types=1);

namespace App\Infrastructure\Listener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Messenger\Exception\HandlerFailedException;

final class ApiExceptionListener implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => 'onKernelException',
        ];
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();

        if ($exception instanceof HandlerFailedException) {
            $exception = $exception->getPrevious() ?? $exception;
        }

        [$statusCode, $message] = match (true) {
            $exception instanceof \DomainException => [Response::HTTP_BAD_REQUEST, $exception->getMessage()],
            $exception instanceof \InvalidArgumentException => [Response::HTTP_UNPROCESSABLE_ENTITY, $exception->getMessage()],
            default => [Response::HTTP_INTERNAL_SERVER_ERROR, get_class($exception) . ': ' . $exception->getMessage()],
        };
        
        $event->setResponse(new JsonResponse(
            ['error' => $message],
            $statusCode
        ));
    }
}
