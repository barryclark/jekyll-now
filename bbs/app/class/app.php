<?php
require_once 'config.php';
$admin = isset($_SESSION[KEY.'admin'])?$_SESSION[KEY.'admin']:0;
define('ADMIN',$admin);
$set = getset();
define('VER',$set['ver']);
$webpass= $set['webpass'];
$webtitle= $set['webtitle'];
$webkey= $set['webkey'];
$webdesc= $set['webdesc'];
$rewrite = $set['rewrite'];
$plsh = $set['plsh'];
$safecode = $set['safecode']; 
$widget = $set['widget'];
$class = gcls($set['webclass']); 
$webmenu = vmenu($set['webmenu']);
$motto = $set['motto'];
require_once ROOT_PATH.'assets/'.TEMPLATE.'/theme.php';
function login($file,$ps){
	   global $webpass;
       if (md5(md5(KEY.$ps)) === $webpass) {
            $_SESSION[KEY.'admin'] = 1;
			$_SESSION[KEY.'group'] = 1;
            header('Location:' . $file);
        } else {
            header('Location:' . $file . '?act=login');
        }
}
function mkDirs($path)
{
	$array_path = explode("/",$path);

	$_path = "";
		
	for($i=0;$i<count($array_path);$i++)
	{
		$_path .= $array_path[$i]."/";

		if( !empty($array_path[$i]) && !is_dir($_path))
		{
			mkdir($_path,0777);
		}
	}
	
	return true;
}
function delpic($pics){
	if(!empty($pics))
	{
		$pic_arr = explode(",",$pics);
		foreach($pic_arr as $pic){
		  if(preg_match('/^assets\/file\/\d{4}\/\d{2}\/\w+?\.(jpg|png|gif)$/',$pic)){		   
		   $_pic = str_replace('..','',ROOT_PATH.$pic);
		   if(is_file($_pic))
		   {
			 @unlink($_pic);
		   }
		  }
		} 
	}
} 

function gcls($str){
   if(empty($str)){
	   return '';
   }else{
       return explode(',',$str);
   }
}

function webmenu(){
  $menu = array('add'=>'发布','set'=>'设置','wid'=>'边栏','logout'=>'退出');
  global $webmenu,$admin,$file,$widget; 
  echo $webmenu;
  if($admin === 0 ){
      echo '<li><a href="'.$file.'?act=login">登录</a></li>';
  }else{
    foreach($menu as $k=>$v){
	  if ($widget=="0" && $k=='wid') continue;
	  echo '<li><a href="'.$file.'?act='.$k.'">'.$v.'</a></li>';
	}
  }
}

function _class(){
    global $class;	 
	if(empty($class[0])) return '';
	$i = 0;
	$str = '';
    foreach($class as $v){	
     $str .= '<li><a href="'.vcls($i).'">'.$v.'</a></li>';
     $i++;
	}
	return $str;
}

function view_admin($id,$ist,$v=1){
global $admin,$file;
$txt = $ist==1?'取消':'置顶';
$str = "<a id=\"zd-{$id}\" href=\"javascript:void(0)\" onclick=\"zdlog('{$id}')\">{$txt}</a>&nbsp;<a href=\"{$file}?act=edit&id={$id}\" title=\"编辑微博\">编辑</a>&nbsp;<a href=\"javascript:void(0)\" onclick=\"dellog('{$id}','1')\">删除</a>"; 
$def = $v == 1?"<a href=\"JavaScript:history.back();\">返回</a>&nbsp; <a href=\"JavaScript:DotRoll('pl')\">我要评论</a>":"";
echo $admin==1?$str:$def;
}

function pl_admin($id,$cid,$isn,$pmail){
global $admin;
$str = "<a href=\"javascript:void(0)\" onclick=\"repl('{$id}','{$cid}','{$pmail}')\" title=\"回复评论\">回复</a>&nbsp;<a href=\"javascript:void(0)\" onclick=\"delpl('{$id}','{$cid}')\" class=\"item\">删除</a>";
if($isn==1){
$str .= "&nbsp;<a id=\"sh-{$id}\" href=\"javascript:void(0)\" onclick=\"shpl('{$id}')\" class=\"item\">审核</a>";
}
echo $admin==1?$str:'';
}

function getset(){
  $db = new DbHelpClass();   
  if(empty($_SESSION[KEY.'set'])){
     $rs = $db->getdata("select * from `Set` where id=1");
     $set = $rs[0];	 
	 $_SESSION[KEY.'set'] = $set;	 
  }else{
     $set = $_SESSION[KEY.'set'];
  }
  return $set;
}

function logmsg($b,$msg='操作成功！'){
    if($b>0){
	   $arr['result'] = 200;
	   $arr['message'] = $msg;
	}else{
	    $arr['result'] = 500;
		if(empty($msg)){
		  $arr['message'] = '操作失败！';
		}else{
	      $arr['message'] = $msg;
		}
	}	
	$arr['id'] = $b;
	echo json_encode($arr);exit();
}

function chkadm(){
  if($_SESSION[KEY.'admin']!=1){
	  logmsg(0,'未登录！');
      exit();
  }
}

function jsmsg($n,$m){
   $arr['errno'] = $n;
   $arr['data'] = $m;
   echo json_encode($arr);
}


function vurl($id){
   global $rewrite;
   $url =  $rewrite?'post-'.$id.'.html':self().'?act=pl&id='.$id;
   return $url;
}

function vcls($tid){
   global $rewrite;
   $url =  $rewrite?'list-'.$tid.'.html':self().'?tid='.$tid;
   return $url;
}

function vmenu($menu){
	global $rewrite;
	$menu = str_replace('@class',_class(),$menu);
	return $rewrite?str_replace(array('@index','@comment'),array('index.html','comment.html'),$menu):str_replace(array('@index','@comment'),array(self(),self().'?act=plist'),$menu);
}

function target($v,$file){  
  	$pattern="#(http|https)://(.*\.)?.*\..*#i";
	if(preg_match($pattern,$v)){ 
		return ' target="_blank" href="'.$file.'?act=target&s='.rawurlencode($v).'"'; 
	}else{ 
		return ''; 
	}  
}

function pv($id){
    if(isset($_SESSION['pv_'.$id])){	   
	}else{
	   $_SESSION['pv_'.$id] = 1;
	   $db = new DbHelpClass(); 
	   $db->runsql("update `Log` set pv=pv+1 where id=:id",array("id"=>$id));
	}
}

function self(){
    $self = $_SERVER['PHP_SELF']; 
    $php_self=substr($self,strrpos($self,'/')+1);
    return $php_self;
}

function agent(){
   if (isset($_SERVER['HTTP_USER_AGENT'])) {     
    if (preg_match("/(ios|iPad|iPhone|iPod|Android)/i", $_SERVER['HTTP_USER_AGENT'])) {
      return '手机';
    }elseif(preg_match("/(MicroMessenger)/i", $_SERVER['HTTP_USER_AGENT'])){
	  return '微信';
	}else{
	  return '网页';  
	} 
  }else{
	  return '网页';  
  } 
}

function get_hooks(){
  $db = new DbHelpClass();   
  if(empty($_SESSION[KEY.'hooks'])){
     $rs = $db->getdata("select * from `Plug`");
     foreach($rs as $v){
     $arr_plug = unserialize($v['init']);
     $arr_plug['args'] = unserialize($v['args']);
     $arr_plug['lock'] = $v['lock'];
     $app_hooks[$v['id']] =  $arr_plug;	 
     }	
     $_SESSION[KEY.'hooks'] = $app_hooks;
	 return $app_hooks;
  }else{
     return $_SESSION[KEY.'hooks'];
  } 
}

function run_hook($act,$arr) {
	$app_hooks = get_hooks();	
	foreach($app_hooks as $hook) {
	if($hook['lock']==1) continue;
	$arr_hook = explode(',',$hook['act']);   
	if(in_array($act,$arr_hook)) {
	$file = 'plug/'.$hook['file'];
	if(file_exists($file)) {
		require_once $file;	 
		$arr['act'] = $act;
        $arr['args'] = $hook['args'];
		call_user_func($hook['func'].'_run',$arr);
	}else {		
		return false;
	}	 
		}
	}
}

function createImg($oldImg,$newImg,$imgInfo,$maxWidth=200,$maxHeight=200,$cut=false)
{
	$_n_w = $maxWidth;
	$_n_h = $maxHeight;
	if( $maxWidth > $imgInfo[0] || $maxHeight > $imgInfo[1] )
	{
		$maxWidth = $imgInfo[0];

		$maxHeight = $imgInfo[1];
	}
	else
	{
		if ( $imgInfo[0] < $imgInfo[1] )
			$maxWidth = ($maxHeight / $imgInfo[1]) * $imgInfo[0];
		else
			$maxHeight = ($maxWidth / $imgInfo[0]) * $imgInfo[1];
	}

	$cw = 0;
	$ch = 0;
	if($cut){


  if ($maxWidth < $_n_w) { //如果新高度小于新容器高度
   $r = $_n_w / $maxWidth; //按长度求出等比例因子
   $maxWidth *= $r; //扩展填充后的长度
   $maxHeight *= $r; //扩展填充后的高度
   $ch = ($maxHeight - $_n_h) / 2; //求出裁剪点的高度
  }
  
  if ($maxHeight < $_n_h) { //如果新高度小于容器高度
   $r = $_n_h / $maxHeight; //按高度求出等比例因子
   $maxWidth *= $r; //扩展填充后的长度
   $maxHeight *= $r; //扩展填充后的高度
   $cw = ($maxWidth - $_n_w) / 2; //求出裁剪点的长度
  }	
  $image_p = imagecreatetruecolor($_n_w, $_n_h);	 
	} else{
	  $image_p = imagecreatetruecolor($maxWidth, $maxHeight);	 
	}

    
	switch($imgInfo[2])
	{
		case 1:
			$image = imagecreatefromgif($oldImg);
			break;
		case 2:
			$image = imagecreatefromjpeg($oldImg);
			break;
		case 3:
			$image = imagecreatefrompng($oldImg);
		break;
	}

	imagecopyresampled($image_p, $image, 0, 0, $cw , $ch , $maxWidth, $maxHeight, $imgInfo[0], $imgInfo[1]);

	imagejpeg($image_p, $newImg,100);

	imagedestroy($image_p);

	imagedestroy($image);

	return true;
}

class DbHelpClass
    {
        private $conn;
        private $qxId;
        private $ret;
        
        function __construct()
        {              
			try{
			   $this->conn = new PDO('sqlite:'.DB); 
			 }			
			catch(Exception $errinfo){
				die ("PDO Connection faild.(可能空间不支持pdo_sqlite，详细错误信息：)".$errinfo);
			}

        }
        
        /*读取*/
        function getdata($sql,$params=array())
        {
            $bind=$this->conn->prepare($sql);
            $arrKeys=array_keys($params);
            foreach($arrKeys as $row)
            {
				if(strpos($sql,"like")>-1){
				  $bind->bindValue(":".$row,'%'.$params[$row].'%');
				}else{
                  $bind->bindValue(":".$row,$params[$row]);
				}
            }
            $bind->execute();// or die('sql error:'.$sql);
            $result=$bind->fetchAll(PDO::FETCH_ASSOC);            
            return $result;
        }

        function total($tab_name,$tj='')//求总记录数目
           {
             $bind = $this->conn->prepare('SELECT count(id) as c FROM '.$tab_name.' '.$tj);
             $bind->execute();
             $result = $bind->fetchAll();
             return $result[0]['c'];
           }        
        /*添加,修改需调用此方法*/
        function runsql($sql,$params=array())
        {  
            $bind=$this->conn->prepare($sql);
            $arrKeys=array_keys($params); 
            foreach($arrKeys as $row)
            {
				 
                $bind->bindValue(":".$row,$params[$row]);
                
            }	
            $a = $bind->execute();//or die('sql error');
			if(strpos($sql,"insert")>-1){
			   return $this->conn->lastInsertId();
			}else{
              return $a;
			}
        }
    }
function arr_sql($tab,$run,$arr){
   //unset($arr['id']); 
   $k =array_keys($arr);
   if($run == 'insert'){	  
    $sql = "insert into `{$tab}`(".join(',',$k).")values(:".join(',:',$k).")";
   }else{ 
	//$k =array_keys($arr);
    foreach($k as $v){
	   $s[] =  $v.'=:'.$v;
	}
    $sql = "update `{$tab}` set ".join(',',$s)." where id=:id";
   }     
  return $sql;
}