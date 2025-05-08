<?php
namespace App\Http\Controllers;
use App\Models\RoleMenuPermission;
use Illuminate\Support\Facades\Gate;
use App\Models\Menu;
use App\Models\User;
use App\Models\Booking;
use App\Models\Customer;
use App\Models\Referrer;
use App\Models\ReferrerWithdrawal;
use Illuminate\Support\Facades\DB;
class DashboardController extends Controller
{
    public function index(){
        Gate::authorize('view', 'dashboard');
        return view('pages.dashboard_new');
    }
}