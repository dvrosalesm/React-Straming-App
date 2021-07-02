<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\EventoController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/event/{id}', [EventoController::class, 'single']);
Route::post('/event/register', [EventoController::class, 'register']);
Route::post('/event/assistance', [EventoController::class, 'assistance']);
Route::post('/contact', [EventoController::class, 'contactMessage']);
Route::post('/notes-mail', [EventoController::class, 'notesMail']);