<?php

namespace App\Events;

use App\Models\User;
use App\Models\Widget;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class WidgetEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public array $data;
    private User $user;
    private Widget $widget;

    /**
     * Create a new event instance.
     *
     * @param string $widgetId
     */
    public function __construct(Widget $widget, User $user, array $data)
    {
        $this->data = $data;
        $this->user = $user;
        $this->widget = $widget;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('channel-widget-' . $this->user->slug . '-' . $this->widget->template);
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'event-widget-' . $this->user->slug . '-' . $this->widget->template;
    }
}