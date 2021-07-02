<?php

namespace App\Actions;
use TCG\Voyager\Actions\AbstractAction as AbstractAction;

class NotificationFromEventAction extends AbstractAction{

	public function getTitle()
    {
        // Action title which display in button based on current status
        return 'Crear notificacion';
    }

    public function getIcon()
    {
        // Action icon which display in left of button based on current status
        return 'voyager-sound';
    }

    public function getAttributes()
    {
        // Action button class
        return [
            'class' => 'btn btn-sm btn-info pull-left',
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
        return route('voyager.notifications.create', array("id"=>$this->data->{$this->data->getKeyName()}));
    }
}