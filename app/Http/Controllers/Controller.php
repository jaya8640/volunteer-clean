<?php
namespace App\Http\Controllers;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function generateResponse($res , $message = '' , $data = []){
        $return_array = [
            'status' => $res ? true : false,
            'message' => $message ? : ($res ? config('app.success') : config('app.failed') )
        ];
        if(!empty($data)){
            $return_array['data'] = $data;
        }
        return $return_array;
    }
    public function setFlashSession($res , $message='' , $data = []){
        $response = $this->generateResponse($res , $message , $data);
        request()->session()->flash('flash_data', $response);
        return true;
    }
    public function generateJsonResponse($res , $message = '', $data = []){
        return response()->json($this->generateResponse($res , $message , $data));
    }
    protected function uploadFiles($file_name , $path = '' ,  $index = -1){
        $uploads = request()->file($file_name);
        if($uploads && $index >= 0){
            $uploads = $uploads[$index] ?? null;
        }
        $files_array = [];
        if(is_array($uploads) && !empty($uploads)){
            foreach ($uploads as $key => $upload) {
                array_push( $files_array , $this->moveFiles($upload , $path));
            }
        }else if($uploads){
            $files_array = $this->moveFiles($uploads , $path);
        }
        return $files_array;
    }
    protected function moveFiles($upload , $destinationPath){
        $fileName = str_replace(' ', '', date('dmyhis') . $upload->getClientOriginalName());
        $upload->move(public_path($destinationPath), $fileName);
        return [
                'fullpath'      => asset("$destinationPath/" . $fileName),
                'path'          => "$destinationPath/" . $fileName,
                'original_name' => $upload->getClientOriginalName(),
                'extension'     => $upload->getClientOriginalExtension(),
            ];
    }
    public function generate_captcha_code(){
        $str_result1 = '0123456789';
        $str_result2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $code1 = substr(str_shuffle($str_result1),0, 3);
        $code2 = substr(str_shuffle($str_result2),0, 3);
        return $code2.$code1;
    }
    public function callCurl($type='GET',$url,$data){
        $curl = curl_init();
        if($type=='POST'){
            $arr = array(
                CURLOPT_URL => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => $type,
                CURLOPT_POSTFIELDS => $data,
                CURLOPT_HTTPHEADER => array(
                    'Content-Type: application/json',
                    'Authorization: Basic YWRtaW46YWRtaW5fYnlvZA=='
                ),
            );
        }
        else if($type=='PUT'){
            $arr = array(
                CURLOPT_URL => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => $type,
                CURLOPT_POSTFIELDS => $data,
                CURLOPT_HTTPHEADER => array(
                    'Content-Type: application/json'
                ),
            );
        }
        else{
            $arr = array(
                CURLOPT_URL => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => $type,
            );
        }
        curl_setopt_array($curl, $arr);
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }
	public static function format_price($price,$add_comma=false){
		$comma = ($add_comma)?',':'';
		return number_format($price,2, '.', $comma);
	}
}