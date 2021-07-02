<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Http\Request;
use App\Models\ContactMessage as CMessage;

class ContactMessage extends Mailable
{
    use Queueable, SerializesModels;
    
    protected $message;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(CMessage $message)
    {   
        $this->message = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.contact')->with([
            "name" => $this->message->name,
            "email" => $this->message->email,
            "telephone" => $this->message->telephone,
            "msg" => $this->message->message,
        ])->subject("Contacto web");
    }
}
