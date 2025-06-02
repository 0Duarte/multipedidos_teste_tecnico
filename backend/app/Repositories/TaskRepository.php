<?php
namespace App\Repositories;

use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskRepository
{
    public function getAll($search = null)
    {
        $user = Auth::user();
        $query = $user->tasks();

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                  ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        return $query->paginate(10);
    }

    public function find($id)
    {
        $user = Auth::user();
        return $user->tasks()->findOrFail($id);
    }

    public function create(array $data)
    {
        $user = Auth::user();
        return $user->tasks()->create($data);
    }

    public function update($id, array $data)
    {
        $task = $this->find($id);
        $task->update($data);
        return $task;
    }

    public function delete($id)
    {
        $task = $this->find($id);
        return $task->delete();
    }
}