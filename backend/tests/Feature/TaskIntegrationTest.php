<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskIntegrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_authenticate()
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123')
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password123'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['token']);
    }

   public function test_authenticated_user_can_create_task()
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123')
        ]);

        $login = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password123'
        ]);
        $token = $login->json('token');

        $response = $this->postJson('/api/task', [
            'title' => 'Nova tarefa',
            'description' => 'Descrição',
            'due_date' => now()->addDay()->toDateString(),
        ], [
            'Authorization' => "Bearer $token"
        ]);

        $response->assertStatus(201)
                ->assertJsonFragment(['title' => 'Nova tarefa']);
    }

    public function test_authenticated_user_can_update_task()
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123')
        ]);
        $task = Task::factory()->create(['user_id' => $user->id]);

        $login = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password123'
        ]);
        $token = $login->json('token');

        $response = $this->putJson("/api/task/{$task->id}", [
            'title' => 'Tarefa editada',
            'description' => $task->description,
            'due_date' => Carbon::parse($task->due_date)->format('d-m-Y'),
        ], [
            'Authorization' => "Bearer $token"
        ]);

        $response->assertStatus(200)
                ->assertJsonFragment(['title' => 'Tarefa editada']);
    }

    public function test_user_cannot_access_others_tasks()
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123')
        ]);
        $otherUser = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $otherUser->id]);

        $login = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password123'
        ]);
        $token = $login->json('token');

        $response = $this->getJson("/api/tasks/{$task->id}", [
            'Authorization' => "Bearer $token"
        ]);
        $response->assertStatus(404);
    }
}