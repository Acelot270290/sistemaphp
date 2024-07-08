<?php

namespace App\Http\Controllers;

use App\Actions\ActionUser;
use App\Http\Requests\UserValidation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    protected ActionUser $actionUser;

    public function __construct(ActionUser $actionUser)
    {
        $this->actionUser = $actionUser;
    }

    public function register(UserValidation $request)
    {
        try {
            $data = $request->validated();
            
            $result = $this->actionUser->createUser($data);

            return response()->json([
                'user' => $result['user'],
                'token' => $result['token'],
                'message' => 'User created successfully. Please verify your email.'
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        $user = $this->actionUser->login($request);

        return response()->json([
            'data' => $user
        ]);
    }
    
    public function logout()
    {
        $this->actionUser->logout();
        
        return response()->json(['message' => 'Logout realizado com sucesso']);
    }

    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($request->only('email'));

        return $status == Password::RESET_LINK_SENT
            ? response()->json(['status' => 'Link de redefinição enviado com sucesso'])
            : response()->json(['error' => 'Falha ao enviar link de redefinição'], 422);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();

                event(new \Illuminate\Auth\Events\PasswordReset($user));
            }
        );

        return $status == Password::PASSWORD_RESET
            ? response()->json(['status' => 'Senha redefinida com sucesso'])
            : response()->json(['error' => 'Falha ao redefinir senha'], 422);
    }

    public function verify($id, $hash)
    {
        $user = User::find($id);

        if (!$user || !hash_equals(sha1($user->getEmailForVerification()), $hash)) {
            return response()->json(['message' => 'Invalid verification link or credentials.'], 401);
        }

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            return response()->json(['message' => 'Email Verificado com sucesso.']);
        }

        return response()->json(['message' => 'Email já verificado.']);
    }
}