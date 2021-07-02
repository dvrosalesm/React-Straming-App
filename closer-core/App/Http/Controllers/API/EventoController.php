<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Evento;
use App\Models\Assistants;
use App\Models\Registered;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessage;
use App\Mail\NotesMailMessage;
use App\Models\ContactMessage as CMessage;

class EventoController extends Controller
{
    
    public function single(Request $request) {
        $event = Evento::where('uuid',$request->id)->with(['StreamingConfiguration','Documents'])->get();
        return response()->json($event);
    } 

    public function register(Request $request) {
        $event_uuid = $request->event_id;
        $event = Evento::where('uuid',$event_uuid)->first();

        if($event) {
            $repeated = Registered::where('email', $request->email)->first();
            if($repeated) {
                return response()->json([
                    "status" => "error",
                    "message" => "El email ya fue registrado para el evento."
                ]);
            }
        }

        $registered = new Registered();
        $registered->name = $request->name;
        $registered->lastname = $request->lastname;
        $registered->phone = $request->phone;
        $registered->profession = $request->profession;
        $registered->email = $request->email;
        $registered->company = $request->company;
        $registered->country = $request->country;
        $registered->event_id = $event->id;
        $registered->save();

        return response()->json([
            "status" => "ok"
        ]);
    }

    public function assistance(Request $request) {
        $event = Evento::where('uuid', $request->event_id)->first();
        if($event) {
            if($event->StreamingConfiguration->enable_registration === 1) {
                
                $registration = $event->registered()->where('email', $request->email)->first();
                if($registration) {
                    $assistant = new Assistants();
                    $assistant->name = $request->name;
                    $assistant->email = $request->email;
                    $assistant->event_id = $event->id;
                    $assistant->save();

                    $registration->assisted = 1;
                    $registration->save();

                    return response()->json([
                        "status" => "ok"
                    ]);
                }  else {
                    return response()->json([
                        "status" => "error",
                        "messsage" => "El evento requiere registro."
                    ]);
                }

            } else {
                $assistant = new Assistants();
                $assistant->name = $request->name;
                $assistant->email = $request->email;
                $assistant->event_id = $event->id;
                $assistant->save();

                return response()->json([
                    "status" => "ok"
                ]);
            }
        } else {
            return response()->json([
                "status" => "error",
                "messsage" => "Evento no encontrado"
            ]);
        }
    }

    public function contactMessage(Request $request) {

        $message = new CMessage();
        $message->name = $request->name;
        $message->email = $request->email;
        $message->telephone = $request->telephone;
        $message->message = $request->message;

        Mail::to("info@imcloser.live")->send(new ContactMessage($message));

        return response()->json([
            "status" => "ok"
        ]);

    }

    public function notesMail(Request $request) {
        $contact = new CMessage();
        $contact->notas = $request->notas;
        Mail::to($request->email)->send(new NotesMailMessage($contact));

    }

}
