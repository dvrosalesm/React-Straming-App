@extends('voyager::bread.edit-add')
@section('submit-buttons')
	
	<input type="hidden" value ="{{ Auth::user()->id }}" name = "user_id">
    <button type="submit" class="btn btn-primary save">Save</button>

    <br />
  
    <h3>Contactos</h3>
    <div class="row">
    	<div class="col-md-12">
    		<a  class="btn btn-success " onclick="addContact()" >+</a>
    		<table class="table">
    			<thead>
    				<tr>
    					<th>Nombre</th>
    					<th>Email</th>
    					<th>Telefono</th>
    					<th></th>
    				</tr>
    			</thead>
    			<tbody id = "contacts-body">
    				
    			</tbody>
    		</table>
    	</div>	
    </div>

 	
@endsection

@section('javascript')
	@parent

	<script type="text/javascript">
		function addContact(){
			$('#contacts-body').append('<tr><td><input type= "text" name="name_contact[]" placeholder="Nombre" /> </td><td><input type= "text" name="email_contact[]" placeholder="Email" /> </td><td><input type= "text" name="phone_contact[]" placeholder="Telefono" /> </td><td><a class ="btn btn-danger">-</a></td></tr>')
		}
	</script>

@endsection