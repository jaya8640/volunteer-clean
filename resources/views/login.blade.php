@extends('layouts.baselayout_old' , ['title' => 'SIGN IN'])
@section('content')
    <form class="js-validation-signin"  method="POST">
      @csrf
      <div class="py-3">
        <div class="mb-4">
          <input type="text" class="form-control form-control-alt form-control-lg" id="login-username" name="email" placeholder="Enter Employee Id / Email Id*">
          @error('email')
              <span class="text-danger mx-2">Please enter valid email.</span>
          @enderror

        </div>
        <div class="mb-4">
          <input type="password" class="form-control form-control-alt form-control-lg" id="login-password" name="password" placeholder="Enter Password*">
        </div>
        <span class="text-danger mx-1">{{session('error')}}</span>
      </div>
      <div class="row mb-4">
        <div class="col-md-6 col-xl-5">
          <button type="submit" class="btn w-100 btn-alt-primary">
            <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i> Sign In
          </button>
        </div>
      </div>
    </form>
@endsection