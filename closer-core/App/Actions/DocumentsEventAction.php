<?php

namespace App\Actions;
use TCG\Voyager\Actions\AbstractAction as AbstractAction;

class DocumentsEventAction extends AbstractAction{

	public function getTitle()
    {
        // Action title which display in button based on current status
        return 'Agregar documentos';
    }

    public function getIcon()
    {
        // Action icon which display in left of button based on current status
        return 'voyager-documentation';
    }

    public function getAttributes()
    {
        // Action button class
        return [
            'class' => 'btn btn-sm btn-primary pull-left custom-action',
        ];
    }

    public function shouldActionDisplayOnDataType()
    {
        // show or hide the action button, in this case will show for posts model
        return $this->dataType->slug == 'eventos';
    }

    public function getDefaultRoute()
    {
        // URL for action button when click
        return route('voyager.documents.create', array("id"=>$this->data->{$this->data->getKeyName()}));
    }
}