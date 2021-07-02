<?php

namespace App\Actions;
use TCG\Voyager\Actions\AbstractAction as AbstractAction;

class SendEmailAction extends AbstractAction{

	public function getTitle()
    {
        // Action title which display in button based on current status
        return 'Enviar notificacions';
    }

    public function getIcon()
    {
        // Action icon which display in left of button based on current status
        return 'voyager-mail';
    }

    public function getAttributes()
    {
        // Action button class
        return [
            'class' => 'btn btn-sm btn-primary pull-left',
        ];
    }

    public function shouldActionDisplayOnDataType()
    {
        // show or hide the action button, in this case will show for posts model
        return $this->dataType->slug == 'notifications';
    }

    public function getDefaultRoute()
    {
        // URL for action button when click
        return route('notifications.send', array("id"=>$this->data->{$this->data->getKeyName()}));
    }
}