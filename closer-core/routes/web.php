<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\VoyagerEventController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/login');
});

//Auth::routes();

Route::group(['prefix' => 'admin'], function () {

	/*
	 * NOTIFICATIONS
	 *
	 */
	//Route::get('/notifications/send', 					'NotificationController@send')->name('notifications.send');
	Route::get('/notifications/send', [NotificationController::class, 'send'])->name('notifications.send');
	/*
	 * EVENTS
	 *
	 */

	Route::get('/eventos/details/', [VoyagerEventController::class, 'details'])->name('eventos.details');

	Voyager::routes();
	
	Route::get('/login', function() {
		return redirect('/login');
	})->name('voyager.login');


	Route::get('/streaming-configuration', function() {
		return redirect('/admin/eventos');
	})->name('voyager.streaming-configuration.index');

	Route::get('/eventos/start/{id}', [VoyagerEventController::class, 'start'])->name('eventos.start');
	Route::get('/eventos/stop/{id}', [VoyagerEventController::class, 'stop'])->name('eventos.stop');
	Route::get('/eventos/restart/{id}', [VoyagerEventController::class, 'restart'])->name('eventos.restart');
	Route::get('/eventos/{id}/reporte', [VoyagerEventController::class, 'reportes'])->name('eventos.report');

});


/*Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');*/

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
