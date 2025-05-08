@php
    $pageName = 'Dashboard';
@endphp
@extends('layouts.backend_new')
@section('content')
    {{-- <x-reusables.app-header pageName="{{ $pageName }}"  /> --}}
    @if (Auth::guard('web')->user()->role_id == ADMIN)
        <div class="row">
            <div class="col-xl-3 col-md-6">
                <!-- card -->
                <div class="card card-h-100">
                    <!-- card body -->
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <span class="text-muted mb-3 lh-1 d-block text-truncate">Pending Inquiries</span>
                                <h4 class="mb-3">
                                    <span class="counter-value" data-target="{{ 10 }}">0</span>
                                </h4>
                            </div>
                            <div class="col-6">
                                <div id="mini-chart4" data-colors='["#5156be"]' class="apex-charts mb-2"></div>
                            </div>
                        </div>
                    </div><!-- end card body -->
                </div><!-- end card -->
            </div><!-- end col -->
            <div class="col-xl-3 col-md-6">
                <!-- card -->
                <div class="card card-h-100">
                    <!-- card body -->
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-12">
                                <span class="text-muted mb-3 lh-1 d-block text-truncate">Confirmed Bookings</span>
                                <h4 class="mb-3">
                                    <span class="counter-value" data-target="{{ 200 }}">0</span>
                                </h4>
                            </div>
                        </div>
                    </div><!-- end card body -->
                </div><!-- end card -->
            </div><!-- end col -->
            <div class="col-xl-3 col-md-6">
                <!-- card -->
                <div class="card card-h-100">
                    <!-- card body -->
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-12">
                                <span class="text-muted mb-3 lh-1 d-block text-truncate">Customers</span>
                                <h4 class="mb-3">
                                    <span class="counter-value" data-target="{{ 40 }}">0</span>
                                </h4>
                            </div>
                        </div>
                    </div><!-- end card body -->
                </div><!-- end card -->
            </div><!-- end col-->
            <div class="col-xl-3 col-md-6">
                <!-- card -->
                <div class="card card-h-100">
                    <!-- card body -->
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-12">
                                <span class="text-muted mb-3 lh-1 d-block text-truncate">Referrers</span>
                                <h4 class="mb-3">
                                    <span class="counter-value" data-target="{{ 10 }}">0</span>
                                </h4>
                            </div>
                        </div>
                    </div><!-- end card body -->
                </div><!-- end card -->
            </div><!-- end col -->
        </div><!-- end row-->
        <div class="row">
            <div class="col-xl-4">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">Recent Pending Inquiries</h4>
                    </div><!-- end card header -->
                    <div class="card-body px-0">
                        <div class="px-3" data-simplebar style="max-height: 352px;">
                            <div class="col-sm-12 text-center">
                                <p>No request found</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end card -->
            </div>
            <div class="col-xl-4">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">Recent Customers</h4>
                        {{-- <div class="ms-auto">
                            <a href="{{route('index-customer')}}" class="btn btn-soft-secondary btn-sm">
                                View All <i class="mdi mdi-arrow-right ms-1"></i>
                            </a>
                        </div> --}}
                    </div><!-- end card header -->
                    <div class="card-body px-0">
                        <div class="px-3" data-simplebar style="max-height: 352px;">
                            <div class="col-sm-12 text-center">
                                <p>No request found</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end card -->
            </div>
            <div class="col-xl-4">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">Recent Withdrawal Requests</h4>
                    </div><!-- end card header -->
                    <div class="card-body px-0">
                        <div class="px-3" data-simplebar style="max-height: 352px;">
                            <div class="col-sm-12 text-center">
                                <p>No request found</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end card -->
            </div>
            <!-- end col -->
        </div><!-- end row -->
    @endif
@endsection
