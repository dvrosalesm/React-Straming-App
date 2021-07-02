<style type="text/css">
    .navbar li.active > a  {
        color: #ff7c00 !important;
        border-radius: 20px !important;
        background-color: #fff3e8 !important; 
    }

    .navbar  li > a:hover{
        color: #ff7c00 !important;
        background-color: #fff3e8 !important; 
        border-radius: 20px;
    }
    .navbar-header, .panel.widget{
        color: rgb(23, 109, 250) !important;
        background-color: transparent !important; 
    }
    .navbar-header > .title{
        color: rgb(23, 109, 250) !important;
    
    } 

    .panel-content{
        background-color: rgb(238, 245, 255) !important; min-height: 56px !important; margin-top: -20px; margin-bottom: -20px;
    }  

</style>
<div class="side-menu" style="background-color: white !important; ">
    <nav class="navbar navbar-default"  role="navigation">
       
        <div id="adminmenu">
            <admin-menu :items="{{ menu('admin', '_json') }}" style="background-color: #fff !important;"></admin-menu>
        </div>
    </nav>
</div>
