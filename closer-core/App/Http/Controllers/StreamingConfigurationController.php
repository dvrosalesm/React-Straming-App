<?php

namespace App\Http\Controllers;


use Exception;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use TCG\Voyager\Database\Schema\SchemaManager;
use TCG\Voyager\Events\BreadDataAdded;
use TCG\Voyager\Events\BreadDataDeleted;
use TCG\Voyager\Events\BreadDataRestored;
use TCG\Voyager\Events\BreadDataUpdated;
use TCG\Voyager\Events\BreadImagesDeleted;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Http\Controllers\Traits\BreadRelationshipParser;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

use App\Models\Evento;
use TCG\Voyager\Http\Controllers\VoyagerBaseController as BaseVoyagerBaseController;

class StreamingConfigurationController extends VoyagerBaseController
{

    public function store(Request $request) {

        $event = Evento::find($request->event_id);
        $createLive = Http::post('http://159.203.118.62:5080/LiveApp/rest/v2/broadcasts/create', [
            "name" => $event->name
        ]);
        $streamId = $createLive->json()['streamId'];

        $request->merge([
            'rmtp_url' => "rtmp://159.203.118.62/LiveApp/" . $streamId,
            'player_url' => "http://159.203.118.62:5080/LiveApp/play.html?id=" . $streamId,
            'video_url' => "https://imcloser.live/webinar/" . $event->uuid,
        ]);


        $slug = $this->getSlug($request);
        $dataType = Voyager::model('DataType')->where('slug', '=', $slug)->first();

        // Check permission
        $this->authorize('add', app($dataType->model_name));

        // Validate fields with ajax
        $val = $this->validateBread($request->all(), $dataType->addRows)->validate();
        $data = $this->insertUpdateData($request, $slug, $dataType->addRows, new $dataType->model_name());


        

        event(new BreadDataAdded($dataType, $data));

        if (!$request->has('_tagging')) {
            if (auth()->user()->can('browse', $data)) {
                $redirect = redirect()->route("voyager.{$dataType->slug}.index");
            } else {
                $redirect = redirect()->back();
            }

            return $redirect->with([
                'message'    => __('voyager::generic.successfully_added_new')." {$dataType->getTranslatedAttribute('display_name_singular')}",
                'alert-type' => 'success',
            ]);
        } else {
            return response()->json(['success' => true, 'data' => $data]);
        }
    }
    

    public function details(Request $request){
    	return view('eventos.details');
    }
}
