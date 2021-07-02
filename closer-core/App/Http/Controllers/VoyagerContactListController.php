<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use ReflectionClass;
use TCG\Voyager\Database\Schema\SchemaManager;
use TCG\Voyager\Database\Schema\Table;
use TCG\Voyager\Database\Types\Type;
use TCG\Voyager\Events\BreadAdded;
use TCG\Voyager\Events\BreadDeleted;
use TCG\Voyager\Events\BreadUpdated;
use TCG\Voyager\Facades\Voyager;
use App\Models\ContactList;
use App\Models\Contact;
use Illuminate\Support\Facades\Auth;


class VoyagerContactListController extends \TCG\Voyager\Http\Controllers\VoyagerBaseController
{
    /**
     * Store BREAD.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        //$this->authorize('browse_bread');

        /*try {
            $dataType = Voyager::model('DataType');
            $res = $dataType->updateDataType($request->all(), true);
            $data = $res
                ? $this->alertSuccess(__('voyager::bread.success_created_bread'))
                : $this->alertError(__('voyager::bread.error_creating_bread'));
            if ($res) {
                event(new BreadAdded($dataType, $data));
            }

            return redirect()->route('voyager.bread.index')->with($data);
        } catch (Exception $e) {
            return redirect()->route('voyager.bread.index')->with($this->alertException($e, 'Saving Failed'));
        }*/

        try {
	        $contactList = new ContactList();
	        $contactList->name = $request->name;
			$contactList->user_id = Auth::user()->id ;
			$contactList->event_id = $request->event_id;
	        $contactList->save();
	        if(isset($request->name_contact) && is_array($request->name_contact)){
	        	for ($i =0; $i < count($request->name_contact) ; $i ++) { 
	        		$contact = new Contact();
	        		$contact->contact_list_id = $contactList->id;
	        		$contact->name = $request->name_contact[$i];
	        		$contact->email = $request->email_contact[$i];
	        		$contact->phone = $request->phone_contact[$i];
	        		$contact->save();
	        	}
	        }

	        return redirect()->route('voyager.contact-list.index');
     	} catch (Exception $e) {
            return back()->with($this->alertException($e, __('voyager::generic.update_failed')));
        }    
    }


    /**
     * Update BREAD.
     *
     * @param \Illuminate\Http\Request $request
     * @param number                   $id
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function update(Request $request, $id)
    {
       // $this->authorize('browse_bread');

        /* @var \TCG\Voyager\Models\DataType $dataType */
       /* try {
            $dataType = Voyager::model('DataType')->find($id);

            // Prepare Translations and Transform data
            $translations = is_bread_translatable($dataType)
                ? $dataType->prepareTranslations($request)
                : [];


            $res = $dataType->updateDataType($request->all(), true);
            $data = $res
                ? $this->alertSuccess(__('voyager::bread.success_update_bread', ['datatype' => $dataType->name]))
                : $this->alertError(__('voyager::bread.error_updating_bread'));
            if ($res) {
                event(new BreadUpdated($dataType, $data));
            }

            // Save translations if applied
            $dataType->saveTranslations($translations);

            return redirect()->route('voyager.bread.index')->with($data);
        } catch (Exception $e) {
            return back()->with($this->alertException($e, __('voyager::generic.update_failed')));
        }
        */
		try {
	        $contactList = ContactList::find($id);
	        $contactList->name = $request->name;

	        $contactList->update();
	        if(isset($request->name_contact) && is_array($request->name_contact)){
	        	for ($i =0; $i < count($request->name_contact) ; $i ++) { 
	        		$contact = new Contact();
	        		$contact->contact_list_id = $id;
	        		$contact->name = $request->name_contact[$i];
	        		$contact->email = $request->email_contact[$i];
	        		$contact->phone = $request->phone_contact[$i];
	        		$contact->save();
	        	}
	        }

	        return redirect()->route('voyager.contact-list.index');
     	} catch (Exception $e) {
            return back()->with($this->alertException($e, __('voyager::generic.update_failed')));
        }    
    }
}
