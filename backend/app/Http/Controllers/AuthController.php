<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    protected $service;

    public function __construct(AuthService $service)
    {
        $this->service = $service;
    }
    
    public function register(RegisterRequest $request)
    {
        $result = $this->service->register($request->validated());
        return response()->json($result, 201);
    }

    public function login(Request $request)
    {
        $result = $this->service->login($request->only('email', 'password'));
        if (!$result) {
            return response()->json(['error' => 'Não autorizado'], 401);
        }
        return response()->json($result);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Logout bem-sucedido']);
    }
}