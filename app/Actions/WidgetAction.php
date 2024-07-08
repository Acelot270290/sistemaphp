<?php

namespace App\Actions;

use App\Jobs\DispatchWidgetEvent;
use App\Models\Widget;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class WidgetAction
{
    public function __construct(protected readonly Widget $widgetModel)
    {
    }

    public function getAllWidgets()
    {
        return $this->widgetModel::with('user')
            ->where('user_id', Auth::id())->get()->map(function ($widget) {
                $widget->variations = json_decode($widget->variations)[0] ?? null;

                return $widget;
            });
    }

    public function getWidgetById($template)
    {
        $widget = $this->widgetModel::findOrFail($template);

        $widget->variations = json_decode($widget->variations)[0] ?? null;

        return $widget;
    }

    public function storeWidget(array $widgetData)
    {
        $widgetData['variations'] = $this->getVariations($widgetData);

        $template = Str::uuid()->toString();

        $this->widgetModel::create([
            'user_id' => Auth::id(),
            'type' => $widgetData['type'],
            'name' => $widgetData['name'],
            'status' => 'Enabled',
            'variations' => json_encode($widgetData['variations']),
            'hidden' => false,
            'template' => $template,
            'url_embed' => config('smartlives.url_embed') . 'embed/' . $template
        ]);

        return $this->getAllWidgets();
    }

    public function getWidgetByTemplate($template)
    {
        $widget = $this->widgetModel::with('user')->where('template', $template)->firstOrFail();

        $widget->variations = json_decode($widget->variations)[0] ?? null;

        return $widget;
    }

    public function updateWidget($id, array $widgetData)
    {
        $widget = $this->widgetModel::findOrFail($id);

        $widgetData['variations'] = $this->getVariations($widgetData);

        $widget->update([
            'name' => $widgetData['name'],
            'status' => 'Enabled',
            'variations' => json_encode($widgetData['variations']),
            'hidden' => false,
        ]);

        return $this->getAllWidgets();
    }

    public function deleteWidget($id)
    {
        $widget = $this->widgetModel::findOrFail($id);
        $widget->delete();

        return true;
    }

    public function triggerWidgetAlert($widgetId)
    {
        $widget = $this->widgetModel::with('user')->findOrFail($widgetId);

        $eventData = $widget->toArray();

        $eventData['transaction_id'] = Str::uuid()->toString();

        DispatchWidgetEvent::dispatch($widget, $eventData)->delay(now()->addSeconds(30));

        return ['message' => 'Alerta disparado com sucesso!'];
    }

    private function getVariations(array $data)
    {
        return [
            [
                'versionConstraint' => "Stable",
                'parameters' => [
                    'color' => $data['color'] ?? '#000000',
                    'barColor' => $data['barColor'] ?? '#0000FF',
                    'textColor' => $data['textColor'] ?? '#FFFFFF',
                    'legendColor' => $data['legendColor'] ?? '#FFFFFF',
                ],
                'config' => [
                    'rankingPeriod' => $data['rankingPeriod'] ?? null,
                    'rankingDirection' => $data['rankingDirection'] ?? null,
                    'numberOfUsers' => $data['numberOfUsers'] ?? null,
                    'duration' => $data['duration'] ?? null,
                    'interval' => $data['interval'] ?? null,
                    'enableDisplaySettings' => $data['enableDisplaySettings'] ?? false,
                    'enableSong' => $data['enableSong'] ?? false,
                    'volume' => $data['volume'] ?? null,
                    'durationSong' => $data['durationSong'] ?? null,
                    'targetAmount' => $data['targetAmount'] ?? 0,
                    'currentAmount' => $data['currentAmount'] ?? 0,
                    'endDate' => $data['endDate'] ?? null,
                ],
                'conditions' => [],
            ],
        ];
    }
}
