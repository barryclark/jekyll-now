<?php
if(!defined('WMBLOG'))exit;
function wxmsg_init(){
$config['title'] = '评论微信通知';
$config['file'] = 'wxmsg.php';
$config['act'] = 'addpl';
$config['func'] = 'wxmsg';
$config['cfg'] = array('password'=>'token');
return $config;
}

function wxmsg_run($arr){
  $token = $arr['args'][0];
  if(!empty($token)){
  $pst['t'] = $token;
  $pst['n'] = $arr['pname'];
  $pst['p'] = $arr['pcontent'];
  $pst['r'] = $arr['r'];
  $rawData = http_build_query($pst);

         $ch = curl_init();
         curl_setopt($ch, CURLOPT_URL, 'https://g.fpx.ink/send/');
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
		 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检查
         curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0); // 从证书中检查SSL加密算法是否存在
		 curl_setopt($ch,CURLOPT_HEADER,0);
		 if($rawData){
           curl_setopt($ch, CURLOPT_POST, 1);
           curl_setopt($ch, CURLOPT_POSTFIELDS, $rawData);
		 }
        $output = curl_exec($ch);
        curl_close($ch);
        echo $output;
  }
}