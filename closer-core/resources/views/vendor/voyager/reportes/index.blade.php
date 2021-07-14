@extends('voyager::master')

@section('css')
    <meta name="csrf-token" content="{{ csrf_token() }}">
@stop

@section('page_title', 'Reportes')

@section('page_header')
    <h1 class="page-title">
        <i class="voyager-documentation"></i>
        Reportes
    </h1>
@stop

@section('content')
    <div class="page-content edit-add container-fluid">
        <div class="row">
            <div class="col-md-8">
                <div class="panel panel-bordered"> 
                    <div class="panel-body">
                        <h4>Registros</h4>
                        <table class="table table-bordered">
                            <thead>
                                <th> Nombre </th>
                                <th> Email </th>
                                <th> Telefono </th>
                                <th> País </th>
                                <th> Empresa / Universidad </th>
                                <th> Ocupación </th>
                                <th> Asistió? </th>
                            </thead>
                            <tbody>
                                @foreach($event->Registered as $registered)
                                    <tr>
                                        <td> {{ $registered->name }} </td>
                                        <td> {{ $registered->email }} </td>
                                        <td> {{ $registered->phone }} </td>
                                        <td> {{ $registered->country }} </td>
                                        <td> {{ $registered->company }} </td>
                                        <td> {{ $registered->profession }} </td>
                                        <td> 
                                            @if($registered->assisted == "1") 
                                                <span class='icon voyager-check'></span> 
                                            @endif
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="panel panel-bordered"> 
                    <div class="panel-body">
                        <h3>Asistentes</h3>
                        <table class="table table-bordered">
                            <thead>
                                <th> Nombre </th>
                                <th> Email </th>
                            </thead>
                            <tbody>
                                @foreach($event->Assistants as $assistant)
                                    <tr>
                                        <td> {{ $assistant->name }} </td>
                                        <td> {{ $assistant->email }} </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="panel panel-bordered"> 
                    <div class="panel-body">
                        <h3>Chat</h3>
                        <table class="table table-bordered">
                            <thead>
                                <th width="100px"> Nombre </th>
                                <th width="200px"> Email </th>
                                <th> Mensaje </th>
                            </thead>
                            <tbody>
                                @foreach($chats as $chat)
                                    <tr>
                                        <td> {{ $chat['name'] }} </td>
                                        <td> 
                                            @if(array_key_exists('email',$chat))
                                                {{ $chat['email'] }}
                                            @endif
                                        </td>
                                        <td> {{ $chat['message'] }} </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

@stop

@section('javascript')
    <script>
        
    </script>
@stop
