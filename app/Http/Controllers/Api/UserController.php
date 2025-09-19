<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //User::query(): Démarre une requête Eloquent sur le modèle User.
        // Équivaut à DB::table('users') mais en version orientée objet, reliée à ton modèle.

        //->orderBy('id', 'desc'): Trie les utilisateurs par leur id en ordre décroissant.
        // Donc les derniers créés (plus grand id) apparaissent en premier.

        //->paginate(10): Coupe la liste en pages de 10 utilisateurs chacune.
        // Ex. si tu appelles /users?page=2, tu obtiendras les utilisateurs 11 à 20.

        //UserResource::collection(...): UserResource est une Resource Laravel (app/Http/Resources/UserResource.php),
        // qui définit comment transformer un utilisateur en JSON (quels champs exposer, leur format)
        // En utilisant .collection(...),
        // tu appliques ce transformateur à chaque utilisateur de la collection renvoyée par la pagination.

        // Laravel va automatiquement convertir cet objet en réponse JSON.
        // Tu obtiens donc une API propre : liste paginée d’utilisateurs, formatée via ta Resource.
        return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        //encrypt password
        $data['password'] = bcrypt($data['password']);
        //insert
        $user = User::create($data);

        return response(new UserResource($user) , 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response("", 204);
    }
}
