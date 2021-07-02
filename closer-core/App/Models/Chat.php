<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;


class Chat extends Model
{

	 protected $table = 'chats'; 
	
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