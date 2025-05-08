@extends('layouts.baselayout' , ['title' => 'Register'])
@section('content')
    
    <form class="js-validation-signin" action="{{url(config('app.admin_prefix') . 'class-register/'.$class_id)}}" method="POST">
      @csrf
        <input type="hidden" name="class_id" value="{{$class_id}}">
        <div class="py-3">
          <div class="mb-4">
            <input type="text" class="form-control form-control-alt form-control-lg" id="re-name" name="name" placeholder="Enter Name*">
          </div>
          <div class="mb-4">
            <input type="email" class="form-control form-control-alt form-control-lg" id="re-email" name="email" placeholder="Enter Email*">
          </div>
          <div class="mb-4">
            <input type="text" class="form-control form-control-alt form-control-lg" id="re-phone" name="phone" placeholder="Enter Phone*">
          </div>
          <div class="mb-4">
            <input type="password" class="form-control form-control-alt form-control-lg" id="re-password" name="password" placeholder="Enter Password*">
          </div>
          <div class="mb-4">
            <input type="password" class="form-control form-control-alt form-control-lg" id="re-repassword" name="password_confirmation" placeholder="Re-Enter Password*">
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-sm-7">
            <button type="submit" class="btn w-100 btn-alt-primary">
              <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i> Register Now
            </button>
          </div>
        </div>
    </form>

@endsection