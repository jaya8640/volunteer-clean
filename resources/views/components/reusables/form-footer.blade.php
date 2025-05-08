<div class="d-flex justify-content-center space-x-2 mt-4">
    <a href="{{  route($route ?? 'dashboard') }}" class="btn btn-light waves-effect me-3">Cancel</a>

    @can($action , $module)
        <button type="submit" class="btn btn-primary waves-effect waves-light">Save</button>
    @endCan
</div>