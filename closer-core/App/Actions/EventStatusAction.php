<?php

namespace App\Actions;
use TCG\Voyager\Actions\AbstractAction as AbstractAction;

class EventStatusAction extends AbstractAction{

    public function __construct($dataType, $data) {
        parent::__construct($dataType, $data);
    }

	public function getTitle()
    {
        // Action title which display in button based on current status
        if($this->data->status == 0)
            return "Iniciar evento";
        else if($this->data->status == 2)
            return 'Re-iniciar evento';
        else 
            return 'Finalizar evento';
    }

    public function getIcon()
    {
        // Action icon which display in left of button based on current status
        if($this->data->status == 0)
            return 'voyager-play';
        else if($this->data->status == 2)
            return 'voyager-warning';
        else 
            return 'voyager-play';
    }

    public function getAttributes()
    {   

        if($this->data->status == 0)
            return [
                'class' => 'btn btn-sm btn-success pull-left custom-action',
            ];
        else if($this->data->status == 2)
            return [
                'class' => 'btn btn-sm btn-warning pull-left custom-action',
            ];
        else 
            return [
                'class' => 'btn btn-sm btn-danger pull-left custom-action',
            ];
        
    }

    public function shouldActionDisplayOnDataType()
    {
        // show or hide the action button, in this case will show for posts model
        return $this->dataType->slug == 'eventos';
    }

    public function getDefaultRoute()
    {
        if($this->data->status == 0)
            return route('eventos.start', array("id"=>$this->data->id));
        else if($this->data->status == 2)
            return route('eventos.restart', array("id"=>$this->data->id));
        else 
            return route('eventos.stop', array("id"=>$this->data->id));
    }
}