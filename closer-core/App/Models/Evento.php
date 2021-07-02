<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;


class Evento extends Model
{
    protected $table = 'eventos'; 

	public function StreamingConfiguration() {
		return $this->hasOne('App\Models\StreamingConfiguration', 'event_id');
	}

	public function Documents() {
		return $this->hasMany('App\Models\Document', 'event_id');
	}
	
	public function ContactList() {
		return $this->belongsTo('App\Models\ContactList', 'contact_list_id');
	}

	public function Registered() {
		return $this->hasMany('App\Models\Registered', 'event_id');
	}

	public function Assistants() {
		return $this->hasMany('App\Models\Assistants', 'event_id');
	}
   
	public function scopeMyLists($query)
	{	
		$user = Auth::user();
		if($user->role->id == 1){
			return $query;
		}
	    return $query->where('user_id', $user->id);
	} 

    public function scopeMyEvents($query)
	{	
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
	    static::creating(function ($evento) {
	        $evento->user_id = Auth::id();
	    });
	}

}
