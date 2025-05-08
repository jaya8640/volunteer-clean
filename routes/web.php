<?php
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| 
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
| 
*/
/**View Composer */
View::composer('*', function ($view) {
    $settings = \App\Models\Setting::first();
    $view->with('settings', $settings);
});
Route::get('home', function () {return redirect()->route('dashboard');})->name('home');
Route::get('/', function () {return redirect()->route('dashboard');});
Route::prefix(config('app.admin_prefix'))->group(function () {
    Route::get('/welcome', function () {return redirect()->route('dashboard');})->name('welcome');
    Route::middleware(['auth:web', 'shareview'])->group(function () {
        Route::get('/', function () {
            return redirect()->route('dashboard');
        });
        Route::view('site-settings' , 'pages.site-settings');
        Route::controller(\App\Http\Controllers\RoleController::class)->group(function () {
            Route::get('/roles', 'index')->name('index-role');
            Route::get('/manage-role/{role_placeholder?}', 'showForm')->name('show-role');
            Route::post('/manage-role', 'manage')->name('create-role');
            Route::get('/toggle-role-status/{role_placeholder}', 'toggleStatus')->name('toggle-role-status');
            Route::put('/manage-role/{role_placeholder}', 'manage')->name('update-role');
            Route::delete('/role/{role_placeholder}', 'delete')->name('delete-role');
        });
        Route::controller(\App\Http\Controllers\CustomerController::class)->group(function () {
            Route::get('/customers', 'index')->name('index-customer');
            Route::get('/manage-customer/{id?}', 'showForm')->name('show-customer');
            Route::post('/manage-customer', 'manage')->name('create-customer');
            Route::get('/toggle-customer-status/{id}', 'toggleStatus')->name('toggle-customer-status');
            Route::put('/manage-customer/{id}', 'manage')->name('update-customer');
            Route::delete('/customer/{id}', 'delete')->name('delete-customer');
            Route::post('/verify-customer-phone', 'verify_customer_phone')->name('verify_customer_phone');
            Route::post('/send-otp-customer-phone/{id}', 'send_otp_customer_phone')->name('send_otp_customer_phone');
        });
        Route::controller(\App\Http\Controllers\DashboardController::class)->group(function () {
            Route::get('/dashboard', 'index')->name('dashboard');
        });
        Route::controller(\App\Http\Controllers\ContactController::class)->group(function () {
            Route::get('/other-inquiry', 'index')->name('other-inquiry');
            Route::post('/other-inquiry', 'index')->name('other-inquiry');
        });
        Route::controller(\App\Http\Controllers\UserController::class)->group(function () {
            Route::get('/users', 'index')->name('index-user');
            Route::get('/manage-user/{user_placeholder?}', 'showForm')->name('show-user');
            Route::post('/manage-user', 'manage')->name('create-user');
            Route::put('/manage-user/{user_placeholder}', 'manage')->name('update-user');
            Route::delete('/user/{user_placeholder}', 'delete')->name('delete-user');
            Route::post('/update-user-password', 'updatePassword')->name('manage-user-password');
            Route::post('/update-profile', 'updateProfile')->name('update-profile');
            Route::get('/update-profile', 'viewUpdatePassword')->name('view-update-profile');
            Route::post('/change-user-status/{id}', 'changeUserStatus')->name('manage-user-status');
            Route::get('/toggle-user-status/{user_placeholder}', 'toggleStatus')->name('toggle-user-status');
            Route::get('/settings', 'settings')->name('settings');
            Route::put('/update-settings', 'update_settings')->name('update_settings');
        });
        Route::controller(\App\Http\Controllers\Volunteer::class)->group(function () {
            Route::get('/volunteers', 'index')->name('index-volunteers');
            Route::get('/manage-volunteer/{placeholder?}', 'showForm')->name('show-volunteer');
            Route::post('/manage-volunteer', 'manage')->name('create-volunteer');
            Route::get('/toggle-volunteer-status/{placeholder}', 'toggleStatus')->name('toggle-volunteer-status');
            Route::put('/manage-volunteer/{placeholder}', 'manage')->name('update-volunteer');
            Route::delete('/volunteer/{placeholder}', 'delete')->name('delete-volunteer');
        });
        Route::controller(\App\Http\Controllers\MenuController::class)->group(function () {
            Route::get('/permissions', 'permissionPage')->name('show-permission');
            Route::post('/permissions', 'setPermissions')->name('set-permission');
        });
        Route::get('logout', [\App\Http\Controllers\AuthController::class, 'logout'])->name('logout');
        Route::view('guest', 'pages.guest-page');
    });
    Route::middleware('guest')->group(function () {
        Route::controller(\App\Http\Controllers\AuthController::class)->group(function () {
            Route::get('/login', 'loginView')->name('loginView');
            Route::post('/login', 'login')->name('login');
            Route::get('/forgot-password', 'forgotPasswordView')->name('forgotPassword');
            Route::post('/forgot-password', 'forgotPasswordEmail');
            Route::get('/reset-password/{id}', 'resetPasswordView');
            Route::post('/reset-password/{id}', 'resetPassword');
        });
    });
});