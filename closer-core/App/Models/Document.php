<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;


class Document extends Model
{

	 protected $table = 'documents'; 
	
	public function Event() {
		return $this->belongsTo('App\Models\Evento', 'event_id');
	}

	function scopeMyDocuments($query) {
		$user = Auth::user();
		if($user->role->id == 1){
			return $query;
		}
	    return $query->where('user_id', $user->id);
	}

 	/**
	 * The "booted" method of the model.
	 *
	 * @return void
	 */
	protected static function booted()
	{
	    static::creating(function ($chat) {
	        $chat->user_id = Auth::id();
	    });
	}
}