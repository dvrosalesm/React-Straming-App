<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;


class StreamingConfiguration extends Model
{

	 protected $table = 'streaming_configuration'; 


	public function event() {
		return $this->belongsTo('App\Models\Evento', 'event_id');
	}

}