@extends('layouts.baselayout' , ['title' => 'Forgot Password'])
@section('content')

  <form class="js-validation-signin"  method="POST">
      @csrf
      <div class="py-3">
        <div class="mb-4">
          <input type="text" class="form-control form-control-alt form-control-lg" id="login-username" name="recover_email" placeholder="Enter Email*">
        </div>
        
        <!-- <div class="mb-4">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="login-remember" name="login-remember">
            <label class="form-check-label" for="login-remember">Remember Me</label>
          </div>
        </div> -->
      </div>
      <div class="row mb-4">
        <div class="col-md-6 col-xl-5">
          <button type="submit" class="btn w-100 btn-alt-primary">
            <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i> Submit
          </button>
        </div>

      </div>
  </form>
    
@endsection