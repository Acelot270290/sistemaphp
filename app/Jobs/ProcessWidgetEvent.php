<?php

namespace App\Jobs;

use App\Events\WidgetEvent;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Widget;
use Illuminate\Support\Facades\Log;

class ProcessWidgetEvent implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $widget;
    protected $data;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Widget $widget, array $data)
    {
        $this->widget = $widget;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Log::info('ProcessWidgetEvent handle started', ['widget_id' => $this->widget->id, 'data' => $this->data]);

        event(new WidgetEvent($this->widget, $this->widget->user, $this->data));
        sleep(20);

        Log::info('ProcessWidgetEvent handle completed', ['widget_id' => $this->widget->id, 'data' => $this->data]);
    }
}
