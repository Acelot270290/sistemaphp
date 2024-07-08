<?php

namespace App\Jobs;

use App\Events\WidgetEvent;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Widget;
use Illuminate\Queue\Middleware\RateLimited;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Illuminate\Support\Facades\Log;

class DispatchWidgetEvent implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $widget;
    protected $data;
    // run job, without being cancelled, and job will not return an error if it has been tried several times
    public $tries = 0;

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

    // public function middleware()
    // {
    //     return [
    //         new RateLimited('send-widget-event'),
    //         (new WithoutOverlapping($this->widget->user->id . ":" . $this->widget->id))->releaseAfter(30),
    //     ];
    // }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            $this->sendEvent();
        } catch (\Exception $e) {
            Log::error('ProcessWidgetEvent handle failed', [
                'widget_id' => $this->widget->id,
                'data' => $this->data,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Handle a job failure.
     *
     * @return void
     */
    public function failed(\Throwable $exception)
    {
        Log::error('ProcessWidgetEvent failed', [
            'widget_id' => $this->widget->id,
            'data' => $this->data,
            'error' => $exception->getMessage(),
        ]);
    }

    private function sendEvent()
    {
        Log::info('ProcessWidgetEvent handle started');

        event(new WidgetEvent($this->widget, $this->widget->user, $this->data));

        Log::info('ProcessWidgetEvent handle ended');
    }
}