@php
    $tableHead = ['Name' , 'Email' , 'Role' , 'Created Date' , 'Status' , 'Action'];
@endphp
@extends('layouts.backend_new', ['pageName' => "System Users" , 'parentPageName' => "System Users"])
@section('css')
<x-reusables.datatablecss />
@endsection
@section('js')
<x-reusables.datatablejs />
@endsection
@section('content')
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm">
                        <div class="mb-4">
                            <a href="{{route("create-user")}}" class="btn btn-light waves-effect waves-light"><i class="bx bx-plus me-1"></i> Add User</a>
                        </div>
                    </div>
                </div>
                <!-- end row -->
                <div class="table-responsive">
                    <table id="custom_datatable" sort="3" class="table table-bordered nowrap w-100" dt-responsive >
                        <x-reusables.table-header :tableHead="$tableHead"/>
                        <tbody>
                            @if(isset($listingData) && isset($listingData[0]))
                            @foreach ($listingData as $data)
                            <tr>
                                <td>{{$data->name}}</td>
                                <td>{{$data->email}}</td>
                                <td>{{$data->role->role_name }}</td>
                                <td><span class="d-none">{{$data->createdDateTimeStr}}</span> {{$data->createdDateTime}}</td>
                                <td class="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <input class="statusswitch" url="{{route('toggle-user-status' , ['user_placeholder' => $data->id])}}" type="checkbox" id="switch{{$data->id}}" switch="success" {{$data->is_active ? 'checked' : ''}} />
                                    <label for="switch{{$data->id}}" data-on-label="Active" data-off-label="Inactive"></label>
                                </td>
                                <td>
                                    <x-reusables.action-buttons :id="$data->id" module="user" :name="$data->name" />
                                </td>
                            </tr>
                            @endforeach
                            @endif
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div> <!-- end col -->
</div> <!-- end row -->
{{-- Password reset modal --}}
<div id="forgot-password-modal" class="modal fade" tabindex="-1" aria-labelledby="forgot-password-modalLabel" aria-hidden="true" data-bs-scroll="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="forgot-password-modalLabel">Reset Password</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="{{ url(config('app.admin_prefix') . 'update-user-password') }}" method="POST">
                    @csrf
                    <input type="hidden" id="pass_user_id" name="user_id" value="">
                    <div class="row">
                        <div class="col-sm-6">
                            <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
                            <input class="form-control" type="password" value="" name="password" id="password" required>
                        </div>
                        <div class="col-sm-6">
                            <label for="password_confirmation" class="form-label">Confirm Password <span class="text-danger">*</span></label>
                            <input class="form-control" type="password" value="" name="password_confirmation" id="password_confirmation" required>
                        </div>
                        <div class="col-sm-12 mt-4 text-center">
                            <button type="button" class="btn btn-light waves-effect me-3" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary waves-effect waves-light">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
{{-- Reset password modal end --}}
@endsection
