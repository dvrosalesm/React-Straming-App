<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;


class Notification extends Model
{

	public function scopeMyNotifications($query)
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
	    static::creating(function ($notification) {
	        $notification->user_id = Auth::id();
	    });
	}
}
