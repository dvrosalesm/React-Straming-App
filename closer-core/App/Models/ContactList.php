<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class ContactList extends Model
{
	protected $table = 'contact_list';  

	public function contacts() {
		return $this->hasMany('App\Models\Contact', 'contact_list_id');
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

}
