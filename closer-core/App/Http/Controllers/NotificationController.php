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

use App\Models\Evento;
use App\Models\Notification;
use App\Models\InvitationMessage as IM;
use TCG\Voyager\Http\Controllers\VoyagerBaseController as BaseVoyagerBaseController;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvitationMessage;
use Twilio\Rest\Client;

class NotificationController extends VoyagerBaseController
{

    public function store(Request $request) {


        if($request->type === "option1") {

            $event = Evento::find($request->event_id);
            $contact_list = $event->ContactList;
            if($contact_list) {
                $contacts = $contact_list->contacts;
    
                foreach($contacts as $contact) {
    
                    $invitation_message = new IM();
                    $invitation_message->event_name = $event->name;
                    $invitation_message->event_date = $event->fecha;
                    $invitation_message->event_time = $event->hora;
                    $invitation_message->event_duration = $event->duracion;
                    $invitation_message->guest_name = $contact->name;
                    $invitation_message->url = url('/webinar') . '/' . $event->uuid;
                    $to = $contact->email;
                    Mail::to($to)->send(new InvitationMessage($invitation_message));
                }
            }
        } else if($request->type === "option2") {
            $event = Evento::find($request->event_id);
            $contact_list = $event->ContactList;
            if($contact_list) {
                $contacts = $contact_list->contacts;
                
                foreach($contacts as $contact) {
                    $evurl = url('/webinar') . '/' . $event->uuid;
                    $message = "Hola $contact->name, te invitamos al evento: $event->name, puedes unirte con el siguiente enlace: $evurl" ;
                    $this->sendMessage($message, $contact->phone);
                }
            }
        }

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

    private function sendMessage($message, $recipients)
    {
        $account_sid = "ACc1a7c47ba853cfc59b171723435e3c8c";
        $auth_token = "438a1e433bd5ee143d75d5bc0c2c24ab";
        $twilio_number = "+12513513947";

        $client = new Client($account_sid, $auth_token);
        $client->messages->create($recipients, array('from' => $twilio_number, 'body' => $message));
    }
    

}
