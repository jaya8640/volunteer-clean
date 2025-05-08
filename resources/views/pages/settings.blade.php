@php
    $action_url                 = route("update_settings");
    $online_payment_percentage  = old('online_payment_percentage', $formData->online_payment_percentage ?? '');
    $logo                       = $formData->logo ?? '';
    $pageName                   = "Manage Settings";
@endphp
@extends('layouts.backend_new', ['pageName' => $pageName , 'parentPageName' => "Settings", 'parentRoute' => "settings"])
@section('css')
<x-reusables.advanceformcss />
@endsection
@section('js')
<x-reusables.advanceformjs /> 
@endsection
@section('content')
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <x-reusables.badge-alerts/>
                <form action="{{ $action_url }}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="row justify-content-center">
                        <div class="col-sm-4">
                            <label for="online_payment_percentage" class="form-label">Online Payment Percentage <span class="text-danger">*</span></label>
                            <input class="form-control" type="text" value="{{$online_payment_percentage}}" name="online_payment_percentage" id="online_payment_percentage" required>
                        </div>
                    </div>
                    <div class="row justify-content-center mt-3">
                        <div class="col-sm-4">
                            <label for="online_payment_percentage" class="form-label">Site Logo <span class="text-danger">*</span></label>
                            <input class="form-control" type="file" name="logo" id="logo" >
                            @if($logo)
                                <div class="mt-2">
                                    <img src="{{ asset($logo) }}" alt="Logo" class="img-fluid" width="40" height="40"> 
                                </div>
                            @endif
                        </div>
                    </div>
                    <div class="row mt-2">
                        <x-reusables.form-footer route="settings" action="update" module="settings" />
                    </div>
                </form>
            </div>
        </div>
    </div> <!-- end col -->
</div> <!-- end row -->
@endsection
