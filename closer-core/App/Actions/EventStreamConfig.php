<?php

namespace App\Actions;
use TCG\Voyager\Actions\AbstractAction as AbstractAction;

class EventStreamConfig extends AbstractAction{

    public function __construct($dataType, $data) {
        parent::__construct($dataType, $data);
    }

	public function getTitle()
    {
        // Action title which display in button based on current status
        if($this->data->StreamingConfiguration != null && $this->data->StreamingConfiguration->exists())
            return "Editar configuracion";
        else 
            return 'Configurar stream';
    }

    public function getIcon()
    {
        // Action icon which display in left of button based on current status
        return 'voyager-play';
    }

    public function getAttributes()
    {
        // Action button class
        return [
            'class' => 'btn btn-sm btn-info pull-left custom-action',
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
        if($this->data->StreamingConfiguration != null && $this->data->StreamingConfiguration->exists())
            return route('voyager.streaming-configuration.edit', array("id"=>$this->data->StreamingConfiguration->id));
        else
            return route('voyager.streaming-configuration.create', array("id"=>$this->data->{$this->data->getKeyName()}));
    }
}