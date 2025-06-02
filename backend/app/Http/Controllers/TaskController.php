<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    protected $service;

    public function __construct(TaskService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $tasks = $this->service->list($request->input('search'));
        return response()->json($tasks);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = $this->service->create($request->validated());
        return response()->json($task, 201);
    }

    public function show($id)
    {
        $task = $this->service->get($id);
        return response()->json($task);
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        $task = $this->service->update($id, $request->validated());
        return response()->json($task);
    }

    public function destroy($id)
    {
        $this->service->delete($id);
        return response()->json(null, 204);
    }
}