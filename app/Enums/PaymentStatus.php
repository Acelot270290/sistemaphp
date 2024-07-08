<?php

declare(strict_types=1);

namespace App\Enums;

enum PaymentStatus: string
{
    case Pending = 'pending';
    case Paid = 'paid';
    case Denied = 'denied';
    case Expired = 'expired';
    case Blocked = 'blocked';
    case Chargeback = 'chargeback';
    case Refunded = 'refunded';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'Pendente',
            self::Paid => 'Paga',
            self::Denied => 'Negada',
            self::Expired => 'Expirada',
            self::Blocked => 'Bloqueada',
            self::Chargeback => 'Chargeback',
            self::Refunded => 'Reembolsada',
        };
    }

    public function isPending(): bool
    {
        return $this === self::Pending;
    }

    public function isPaid(): bool
    {
        return $this === self::Paid;
    }

    public function isDenied(): bool
    {
        return $this === self::Denied;
    }

    public function isExpired(): bool
    {
        return $this === self::Expired;
    }

    public function isBlocked(): bool
    {
        return $this === self::Blocked;
    }

    public function isChargeback(): bool
    {
        return $this === self::Chargeback;
    }

    public function isRefunded(): bool
    {
        return $this === self::Refunded;
    }
}