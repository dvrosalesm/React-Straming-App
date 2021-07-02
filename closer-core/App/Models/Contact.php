<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{

	
    public function scopeMyContacts($query)
	{	
		$user = Auth::user();
		if($user->role->id == 1){
			return $query;
		}
	    return $query->where('user_id', $user->id);
	} 

	
 	public function scopeMyLists($query)
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
	    static::creating(function ($contact) {
	        $contact->user_id = Auth::id();
	    });
	}
	

}
