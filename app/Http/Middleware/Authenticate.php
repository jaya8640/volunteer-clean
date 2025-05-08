<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        $route = $request->route();
        $action = $route->getAction();
        //echo $action;die();
        //echo $action['middleware'][1];die();
        if($action['middleware'][1]=='guest:customers' || $action['middleware'][1]=='auth:customers'){
            if(!Auth::guard('customers')->check()){
                return route('front_login');
            } else {
                return route('front_dashboard');
            }
        }  else if($action['middleware'][1]=='guest:referrers' || $action['middleware'][1]=='auth:referrers'){
        if(!Auth::guard('referrers')->check()){
                return route('ref_login');
            } else {
                return route('ref_dashboard');
            }
        }  else if($action['middleware'][1]=='guest' || $action['middleware'][1]=='auth:web'){
            if(!Auth::guard('web')->check()){
                return route('login');
            } else {
                return route('dashboard');
            }
        } else {
            return route('login');
        }

        /* if($action['middleware'][1]=='guest:customers' && !Auth::guard('customers')->check()){
            return route('front_login');
        } else if($action['middleware'][1]=='guest:referrers' && !Auth::guard('referrers')->check()){
            return route('ref_login');
        } else if($action['middleware'][1]=='guest' && !Auth::guard(name: 'web')->check()) {
            return route('login');
        }else if (! $request->expectsJson()) {
            if($action['middleware'][1]=='guest:customers'){
                return route('front_login');
            } else if($action['middleware'][1]=='guest:referrers'){
                return route('ref_login');
            } else if($action['middleware'][1]=='guest') {
            return route('login');
            } else {
                return route('front_login');
            }
        } */
        
        //return $request->expectsJson() ? null : route('login');

        // if(!Auth::guard('referrers')->check()){

        //     return route('ref_login');

        // /* }else if(!Auth::guard('customers')->check()){

        //     return route('front_login'); */

        // }else if (! $request->expectsJson()) {

        //     return route('login');
        // }
    }
}
