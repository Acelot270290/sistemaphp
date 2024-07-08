<?php

namespace App\Http\Controllers;

use App\Actions\WidgetAction;
use App\Http\Requests\WidgetRequest;

class WidgetController extends Controller
{
    protected $widgetAction;

    public function __construct(WidgetAction $widgetAction)
    {
        $this->widgetAction = $widgetAction;
    }

    public function index()
    {
        $widgets = $this->widgetAction->getAllWidgets();
        
        return response()->json($widgets);
    }

    public function show($template)
    {
        $widget = $this->widgetAction->getWidgetByTemplate($template);

        return response()->json($widget);
    }

    public function store(WidgetRequest $request)
    {
        try {
            $widgetData = $request->validated();

            $widgets = $this->widgetAction->storeWidget($widgetData);

            return response()->json($widgets, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(WidgetRequest $request, $id)
    {
        try {
            $widgetData = $request->validated();

            $widgets = $this->widgetAction->updateWidget($id, $widgetData);

            return response()->json($widgets);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Widget not found or update failed', 'error' => $e->getMessage()], 404);
        }
    }

    public function destroy($id)
    {
        try {
            $this->widgetAction->deleteWidget($id);

            return response()->json(['message' => 'Widget successfully deleted.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Widget not.'], 404);
        }
    }

    public function triggerAlert($template)
    {
        try {
            $widget = $this->widgetAction->getWidgetByTemplate($template);
            
            $response = $this->widgetAction->triggerWidgetAlert($widget->id);

            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}