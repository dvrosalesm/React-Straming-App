<?php

namespace App\Actions;
use TCG\Voyager\Actions\AbstractAction as AbstractAction;

class ReportAction extends AbstractAction{

    public function __construct($dataType, $data) {
        parent::__construct($dataType, $data);
    }

	public function getTitle()
    {
        // Action title which display in button based on current status
       
        return "Ver reporte";
    }

    public function getIcon()
    {
        // Action icon which display in left of button based on current status
        return 'voyager-window-list';
    }

    public function getAttributes()
    {   
        if($this->data->status != 0) {
            return [
                'class' => 'btn btn-sm btn-info pull-left custom-action',
            ];
        } else {
            return [
                'class' => 'hide-btn-closer'
            ];
        }
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
            return route('eventos.report', array("id"=>$this->data->id));
    }
}