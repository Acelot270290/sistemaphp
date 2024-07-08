<?php

namespace App\Logging;

use Google\Cloud\Logging\LoggingClient;
use Monolog\Handler\PsrHandler;
use Monolog\Logger;

class CreateCustomLogger
{
    /**
     * Create a custom Monolog instance.
     *
     * @param array $config
     * @return Logger
     */
    public function __invoke(array $config): Logger
    {
        $logName = isset($config['logName']) ? $config['logName'] : 'app';
        $level = $config['level'] ?? Logger::getLevelName(Logger::DEBUG);
        $psrLogger = LoggingClient::psrBatchLogger($logName);
        $handler = new PsrHandler($psrLogger, $level);
        return new Logger($logName, [$handler]);
    }
}
