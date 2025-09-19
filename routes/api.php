<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    //quand un post request is made on /logout,
    // il appelle la fonction logout de la classe AuthController
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
});

//quand un post request is made on /signup,
// il appelle la fonction signup de la classe AuthController
Route::post('/signup', [AuthController::class, 'signup']);
//quand un post request is made on /login,
// il appelle la fonction /login de la classe AuthController
Route::post('/login', [AuthController::class, 'login']);