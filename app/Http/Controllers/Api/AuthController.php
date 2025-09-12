<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        //récupere les données validée
        //les regles pour la validation des champs textes
        // sont dans la classe LoginRequest
        $credentials = $request->validated();
        //Auth est une façade (facade) de Laravel qui gère l’authentification.
        //
        //Chaque façade que tu utilises (par exemple Auth::, Cache::, Log::)
        // est en fait une classe dans le namespace Illuminate\Support\Facades.
        // Ces classes étendent la classe de base Facade.
        //
        //La méthode attempt() essaie d’authentifier un utilisateur en se basant sur les credentials fournis.
        if (!Auth::attempt($credentials)) {
            // échec de l’authentification
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }
        // sinon, succès de l’authentification

        /** @var \App\Models\User $user */

        //La méthode user() de cette façade renvoie l’utilisateur actuellement authentifié,
        // c’est-à-dire celui qui s’est connecté et pour lequel une session active existe.
        // Si aucun utilisateur n’est connecté, Auth::user() retourne null.
        $user = Auth::user();
        //
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }
    public function logout(Request $request)
    {
        //Si aucun utilisateur n’est authentifié
        // (par exemple token invalide, pas de token fourni, etc.), 
        //$request->user() renvoie null.
        //
        //donc j'essai de recup l'utilisateur via une requete http
        /** @var \App\Models\User $user */
        $user = $request->user();
        //Elle permet de récupérer l’instance du token personnel / token d’accès
        // qui a été utilisé dans la requête courante.
        // Ensuite, delete() supprime ce token dans la base de données.
        // Autrement dit, le token actuellement utilisé pour authentifier
        // cette requête est révoqué (invalide à partir de ce moment).
        $user->currentAccessToken()->delete();
        //code de statut 204 No Content
        //C’est une BONNE PRATIQUE pour indiquer “déconnexion” / “révocation du token” :
        // on ne renvoie pas de données supplémentaires, juste un statut qui dit que c’est OK.
        return response('', 204);
    }
    public function signup(SignupRequest $request)
    {
        //récupere les données validée
        //les regles pour la validation des champs textes
        // sont dans la classe SignupRequest
        $data = $request->validated();
        //la fonction create permet de créer un objet User
        //'name' propriete dans le model, $data['name'] le nom de l'input
        //fonction bcrypt permet d'encrypt le champs password
        //
        //la fonction create retourne ce user
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        //
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
        /*return response([
            'user' => $user,
            'token' => $token,
        ]);*/
    }
}
