
<div class="dropdown">
    <button class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bx bx-dots-horizontal-rounded"></i>
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
        @can('update', $module)
        @if($module == 'booking')
        <!-- <li><a class="dropdown-item" href="{{ url(config('app.admin_prefix')."manage-pickup-drop-for-booking/$id") }}">Manage Delivery & Deposit</a></li> -->
        @endif
        <li><a class="dropdown-item" href="{{ url(config('app.admin_prefix')."manage-$module/$id") }}">Edit</a></li>
        @if($module == 'user')
        <li><a class="dropdown-item update-user-credentials" href="javascript:void(0);" data-id="{{$id}}" data-name="{{$name}}" data-bs-toggle="modal" data-bs-target="#forgot-password-modal">Update Password</a></li>
        @endif
        @endcan
        @if($module != 'booking')
        @can('delete', $module)
        <li><a data-id="{{ $id }}" data-module="{{ $module }}" data-name="{{ $name }}" class="dropdown-item delete-record js-swal-confirm" href="javascript:void(0);" >Delete</a></li>
        @endcan
        @endif
    </ul>
</div>
<span class="d-none">
    <div class="d-flex justify-content-start">
        {{-- @click="$notification({text:'This is a simple notification',variant:'success'})" --}}

        @can('update', $module)
            <a href="{{ url(config('app.admin_prefix')."manage-$module/$id") }}" class="btn btn-outline-secondary btn-sm edit p-2 me-1" title="Edit" data-bs-toggle="tooltip">
                <i class="fas fa-pencil-alt"></i>
            </a>

            @if($module == 'user')
                <button data-id="{{$id}}" data-name="{{$name}}" class="btn btn-outline-success btn-sm edit p-2 me-1 update-user-credentials" title="Update Password" data-bs-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#forgot-password-modal">
                    <i class="fas fa-key"></i>
                </button>
            @endif

        @endcan

        @can('delete', $module)
            <button data-id="{{ $id }}" data-module="{{ $module }}" data-name="{{ $name }}" class="btn btn-outline-danger btn-sm edit p-2 me-1 delete-record js-swal-confirm" title="Delete Record" data-bs-toggle="tooltip">
                <i class="fas fa-trash"></i>
            </button>
        @endcan

    </div>
</span>
