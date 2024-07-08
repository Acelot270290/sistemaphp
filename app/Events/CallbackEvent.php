<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CallbackEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $data;
    public $transactionId;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($data, $transactionId)
    {
        $this->data = $data;
        $this->transactionId = $transactionId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        // Transmitir no canal nomeado com o transaction_id
        return new Channel('channel-callback-' . $this->transactionId);
    }

    public function broadcastAs()
    {
        return 'event-callback';
    }
}
