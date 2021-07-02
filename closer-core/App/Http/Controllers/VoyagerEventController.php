<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use ReflectionClass;
use TCG\Voyager\Database\Schema\SchemaManager;
use TCG\Voyager\Database\Schema\Table;
use TCG\Voyager\Database\Types\Type;
use TCG\Voyager\Events\BreadAdded;
use TCG\Voyager\Events\BreadDeleted;
use TCG\Voyager\Events\BreadUpdated;
use TCG\Voyager\Facades\Voyager;
use App\Models\Evento;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class VoyagerEventController extends \TCG\Voyager\Http\Controllers\VoyagerBaseController
{
    /**
     * Store BREAD.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        //$this->authorize('browse_bread');

     	try {
	        $evento = new Evento();
	        $evento->name = $request->name;
			$evento->user_id = Auth::user()->id ;
	        $evento->save();

	        return redirect()->route('voyager.eventos.index');
     	} catch (Exception $e) {
            return back()->with($this->alertException($e, __('voyager::generic.update_failed')));
        }    
    }


    /**
     * Store BREAD.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function details(Request $request)
    {

        return view('eventos.details');

    }


    public function start(Request $request) {
        $event_id = $request->id;

        $event = Evento::find($event_id);
        $event->status = 1;
        $event->save();

        return redirect('/admin/eventos');
    }

    public function stop(Request $request) {
        $event_id = $request->id;

        $event = Evento::find($event_id);
        $event->status = 2;
        $event->save();
        return redirect('/admin/eventos');
    }

    public function restart(Request $request) {
        $event_id = $request->id;

        $event = Evento::find($event_id);
        $event->status = 1;
        $event->save();
        return redirect('/admin/eventos');
    }

    public function reportes(Request $request) {

        $event = Evento::find($request->id);
        $chat = Http::get('https://admin.imcloser.live:4040/messages/' . $event->uuid);
        $messages = $chat->json();

        return view('vendor.voyager.reportes.index')->with([
            "event" => $event,
            "chats"  => $messages
        ]);
    }
}
