<?php

namespace App\Actions;

use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\URL;
use App\Notifications\VerifyEmailNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ActionUser
{
    use ActionTrait;

    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages(['login' => 'Credenciais inválidas.']);
        }

        /** @var User $user */
        $user = $this->getUser();

        if (!$user->hasVerifiedEmail()) {
            throw ValidationException::withMessages(['login' => 'Você precisa verificar sua conta. Por favor, verifique seu e-mail para ativar sua conta.']);
        }

        $user->token = JWTAuth::fromUser($user);

        return $user;
    }

    public function logout()
    {
        try {
            JWTAuth::parseToken()->invalidate();

            Auth::logout();

            return true;
        } catch (\Exception $e) {
            throw ValidationException::withMessages(['login' => 'Erro ao realizar o logout']);
        }
    }
    
    public function createUser(array $userData)
    {
        $user = User::create([
            'name' => $userData['name'],
            'email' => $userData['email'],
            'user' => $userData['user'],
            'slug' => Str::slug($userData['user']),
            'password' => bcrypt($userData['password']),
        ]);

        $this->sendEmailVerificationNotification($user);

        $token = JWTAuth::fromUser($user);

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function sendEmailVerificationNotification(User $user)
    {
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify', now()->addMinutes(60), ['id' => $user->getKey(), 'hash' => sha1($user->getEmailForVerification())]
        );

        $verificationUrl = str_replace('api/', '', $verificationUrl);

        $user->notify(new VerifyEmailNotification($verificationUrl));
    }

    public function getUserBySlug(string $slug)
    {
        return User::select('id', 'name','slug')->where('slug', $slug)->firstOrFail();
    }
}