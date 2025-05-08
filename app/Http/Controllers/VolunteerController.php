<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Volunteer;
class VolunteerController extends Controller
{
    private $gateHandler = 'role';
    private $viewDirectory = 'volunteers';
    private $modelClass = Volunteer::class;
    public function index()
    {
        Gate::authorize('view',$this->gateHandler);
        return view("pages.{$this->viewDirectory}.view", [
            'listingData' => $modelClass::order()->get()->except(1)->map(function($row){
                                $row->id = encrypt($row->id);
                                return $row;    
                            }),
        ]);
    }
    public function showForm($placeholder = null)
    {
        if($placeholder){
            $data       =  $modelClass::findOrFail(decrypt($placeholder));
            $data->id   =  encrypt($data->id);
            Gate::authorize('view' , $this->gateHandler);
        }else{
            Gate::authorize('create' ,  $this->gateHandler);
        }
        return view('pages.role.manage-role', ['formData' => $data ?? null]);
    }
    public function manage($placeholder = null){
        if (!$placeholder) {
            $role = new Role();
            request()->validate([
                'role_name' => 'required|string|unique:roles,role_name',
            ]);
            Gate::authorize('create' ,  $this->gateHandler);
            $role->is_active = 1;
            $role->created_by = Auth::guard('web')->user()->id; 
        }else{
            $role = Role::findOrFail(decrypt($role_placeholder));
            request()->validate([
                'role_name' => "required|string|unique:roles,role_name,$role->id",
            ]);
            Gate::authorize('update' ,  $this->gateHandler);
            $role->updated_by = Auth::guard('web')->user()->id; 
        }
        $role->role_name = request()->role_name;
        $res = $role->save();
        $this->setFlashSession($res);
        if($res)
            return redirect()->route('index-role');
        return redirect()->route('manage-role' , ['role' => $role_placeholder]);
    }
    public function toggleStatus($role_placeholder){
        if(Gate::allows('update' , 'role')){
            $role = Role::findOrFail(decrypt($role_placeholder));
            $role->is_active = !$role->is_active ; 
            $role->updated_by = Auth::guard('web')->user()->id; 
            $this->setFlashSession($role->save());
        }
        return redirect()->route('index-role');
    }
    public function delete($role_placeholder){
        Gate::authorize('delete','role');
        $role = Role::withCount('users')->findOrFail(decrypt($role_placeholder));
        if($role->users_count)
            return $this->generateJsonResponse(false , 'Opps! Some users are connected with this role, we can\'t delete this.');    
        $res = $role->delete();
        return $this->generateJsonResponse($res);
    }
}
