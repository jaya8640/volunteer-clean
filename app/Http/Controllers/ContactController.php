<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    public function index()
    {
        Gate::authorize('view', 'other-inquiry');
        if(isset($_POST['f_date']) && !empty($_POST['f_date'])){
            $date = explode(' to ',$_POST['f_date']);
        }
        else{
            $date = [date('Y-m-01'),date('Y-m-d')];
        }
        $listing = Contact::with('product.brand');
        if(isset($_POST['f_status']) && !empty($_POST['f_status'])){
            $listing = $listing->where('type',$_POST['f_status']);
        }
        if(isset($date) && !empty($date)){
            if(!isset($date[1]) && isset($date[0]) && !empty($date[0])){
                $listing = $listing->whereDate('created_at','=',$date[0]);
            }
            else{
                if(isset($date[0]) && !empty($date[0])){
                    $listing = $listing->whereDate('created_at','>=',$date[0]);
                }
                if(isset($date[1]) && !empty($date[1])){
                    $listing = $listing->whereDate('created_at','<=',$date[1]);
                }
            }
        }
        $listing = $listing->order()->get()->map(function($pb){
            $pb->id = encrypt($pb->id);
            return $pb;    
        });
        return view('pages.contact-request.view-contact-request', [
            'f_date' => implode(' to ',$date),
            'listingData' => $listing,
        ]);
    }

}
