<?php

declare(strict_types=1);

namespace App\Clients;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

abstract class BaseClient
{
    protected const RETRY_TIME_IN_MILLISECONDS = 200;

    public function __construct(protected string $baseUrl, protected array $options = [])
    {
    }

    protected function getHttpInstance(): PendingRequest
    {
        return Http::baseUrl($this->baseUrl)
            ->withOptions($this->options)
            ->acceptJson()
            ->throw()
            ->retry(3, self::RETRY_TIME_IN_MILLISECONDS, fn ($exception) => $exception instanceof ConnectionException);
    }
}
