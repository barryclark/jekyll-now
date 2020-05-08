<?php
require_once 'app.php';
$c = isset($_GET['act'])?$_GET['act']:'';
$d = isset($_GET['d'])?$_GET['d']:'';
$p = isset($_GET['p'])?intval($_GET['p']):1;
$id = isset($_REQUEST['id'])?intval($_REQUEST['id']):0;
$db = new DbHelpClass();
switch ($c) {
case 'dellog':
	 chkadm();
     $v = $db->getdata("select `pic`,`pics` from `Log` where id=:id", array(
            'id' => $id
     ));
	 $b =  $db->runsql("delete from `Log` where id=:id",array("id"=>$id));     
     $b =  $db->runsql("delete from `Pl` where cid=:id",array("id"=>$id));
	 delpic($v[0]['pics']);
	 delpic($v[0]['pic']);
	 logmsg($b);
break;

case 'addpl': 	 
	 if($set['safecode'] ==1){
	   $code = $_POST['pcode'];
	   if($code!=$_SESSION['code']){
	      logmsg(0,'验证码错误！');
	   }
	 }
     $v = $db->getdata("select id from `Log` where id=:id",array('id'=>$id));
	 if(empty($v[0]) || $v[0]['lock']==1 || $v[0]['hide']==1){
	   logmsg(0,'评论失败！');
	 } 
	 $arr['cid'] = $id;
	 $arr['purl'] = mb_substr(strip_tags(trim($_POST['purl'])),0,50,'utf-8');
	 $arr['pname'] = mb_substr(strip_tags(trim($_POST['pname'])),0,20,'utf-8');
	 $arr['pmail'] = mb_substr(strip_tags(trim($_POST['pmail'])),0,30,'utf-8');
	 if(empty($arr['pname'])){$arr['pname'] ='匿名网友';}
     $arr['pcontent'] = mb_substr(strip_tags(trim($_POST['pcontent'])),0,250,'utf-8');
	 if(empty($arr['pname']) or empty($arr['pcontent'])) logmsg(0,'昵称/内容为空！');
	 $arr['isn'] = $set['plsh'];
	 if($admin !=1){
	    if($arr['pname'] == $set['webuser']){ $arr['pname']='网友';}
	 }
	 $b =  $db->runsql("insert into `Pl` (cid,pname,pmail,pcontent,isn,purl)values(:cid,:pname,:pmail,:pcontent,:isn,:purl)",$arr);
	 if($b){$db->runsql("update `Log` set num=num+1 where id=:id",array("id"=>$arr['cid']));}
	 $arr['ptime'] = date('Y-m-d H:i:s');
	 $str = pl_str($b,$arr); 
     setcookie('pname',$arr['pname'],time()+3600*24*30,'/');
	 setcookie('pmail',$arr['pmail'],time()+3600*24*30,'/');
	 setcookie('purl',$arr['purl'],time()+3600*24*30,'/');
	 logmsg($b,$str);
break;
case 'pltz':
	 //$arr['purl'] = mb_substr(strip_tags(trim($_POST['purl'])),0,50,'utf-8');
	 $arr['pname'] = mb_substr(strip_tags(trim($_POST['pname'])),0,20,'utf-8');
	 $arr['pmail'] = mb_substr(strip_tags(trim($_POST['pmail'])),0,30,'utf-8');
	 $arr['pcontent'] = mb_substr(strip_tags(trim($_POST['pcontent'])),0,250,'utf-8');
	 $arr['rcontent'] = $_POST['rcontent'];
	 $arr['r'] = $_POST['r'];
	 run_hook($d,$arr);
	 break;
case 'shpl':
	chkadm();
    $b = $db->runsql("update `Pl` set isn=0 where id=:id",array("id"=>$id));
	logmsg($b);
break;
case 'plsave':
	chkadm();    
	$arr['id'] = $id;
	$arr['rcontent'] = $_POST['rcontent'];
	$b =  $db->runsql("update `Pl` set rcontent=:rcontent,isn=0 where id=:id",$arr);
	logmsg($b);
break;

case 'ckpass':
	$ps = isset($_POST['ps'])?$_POST['ps']:'';     
	$rs =  $db->getdata("select content,pass from `Log` where id=:id",array('id'=>$id));
	$_ps = $rs[0]['pass'];
	if($_ps==$ps){
	  logmsg(1,$rs[0]['content']);
	}else{
	  logmsg(0,'密码错误！');
	}	
break;

case 'delpl':
	 chkadm(); 
	 $cid = isset($_GET['cid'])?intval($_GET['cid']):0;
	 $b =  $db->runsql("delete from `Pl` where id=:id",array("id"=>$id));
	 if($b){$db->runsql("update `Log` set num=num-1 where id=:id",array("id"=>$cid));} 
	 logmsg($b);
break;

case 'saveset':
   chkadm(); 
   $arr = $_POST; 
   $_SESSION[KEY.'set'] = '';   
   if(empty($arr['webpass'])){
	   unset($arr['webpass']);
   }else{
      $arr['webpass'] = md5(md5(KEY.$arr['webpass']));
   }
   $sql = arr_sql('Set','update',$arr);
   $arr['id'] = 1;
   $b =  $db->runsql($sql,$arr);   
   logmsg($b);
break;

case 'savewid':
   chkadm(); 
   $arr = $_POST;   
   if($id >0){
	  $arr['id'] = $id;
      $b =  $db->runsql("update `Wid` set title=:title,html=:html,ord=:ord where id=:id",$arr);	
   }else{	 
	  $b =  $db->runsql("insert into `Wid`(title,html,ord)values(:title,:html,:ord)",$arr); 	 
   }
   logmsg($b);
break;

case 'delwid':
	chkadm(); 
	if($id>4){
      $b =  $db->runsql("delete from `Wid` where id=:id",array('id'=>$id));
      logmsg(1);
	}else{
	  logmsg(0,'系统侧栏不能删除！');
	}
break;

case 'delpic':
	chkadm();
	$pic = $_POST['pic'];
    delpic($pic);
break;

case 'thum':
	chkadm();
	if(!empty($d)){	   
	   if(strpos($d,'/b_')>1){
	   $Image = ROOT_PATH.$d;
	   $imgInfo = @getimagesize($Image);
       $saveImage = str_replace('/b_','/s_',$Image);
	   createImg($Image,$saveImage,$imgInfo,ImgW,ImgH,1);
       $thum = str_replace(ROOT_PATH,'',$saveImage);
	    logmsg(1,$thum);
	   }else{
	     logmsg(0,'图片地址错误！');
	   }	    
	}else{
	     logmsg(0,'图片地址错误！');
	   }
break;

case 'savelog':
	 chkadm();  
     $arr = $_POST;  
	 $c = $arr['c'];
	 $id = intval($arr['id']);
	 unset($arr['c']);
	 unset($arr['id']);
	 if(empty($arr['pass'])){
			if(empty($arr['sum'])){
		      $arr['sum'] = mb_substr(strip_tags($arr['content']),0,100,'utf-8');
			  if(empty($arr['sum'])){
			     if(strpos($arr['content'],'<img') === false){
					 $arr['sum'] = '#分享';
				 }else{
				     $arr['sum'] = '#图片分享';
				 }
			  }
			   }
		   }else{
		      $arr['sum'] = '这是一篇密码日志！';
	}	  
	if($c=='add'){
		$arr['fm'] = agent();
		$sql = arr_sql('Log','insert',$arr);
		$b =  $db->runsql($sql,$arr);
	}else{
		$sql = arr_sql('Log','update',$arr);
        $arr['id'] = $id;
	    $b =  $db->runsql($sql,$arr);
		if($b==1) {
			$db->runsql("update `Pl` set `hide`=:hide where `cid`=:cid",array("hide"=>$arr['hide'],"cid"=>$id));
			$b=$arr['id'];
		}
	}
	logmsg($b);
break;

case 'zdlog':
	  chkadm();
	  $arr['id'] = $id;
      $arr['ist'] = intval($d);
      $b = $db->runsql("update `Log` set ist=:ist where id=:id",$arr);
      $msg = $d==0?'置顶':'取消';
	  logmsg($b,$msg);
break;
case 'upcache':
	chkadm();
	$_SESSION[KEY.'set'] = '';
    $db->runsql("VACUUM");
    logmsg(1,'更新完成，请刷新页面！');
	break;
case 'aplug':
	chkadm();
    $f = 'plug/'.str_replace('..','',$d);	 
	if(is_file($f)) {		 
      require_once $f;
	  $func = str_replace('.php','',$d).'_init';
      if(function_exists($func)){
		 $init =  $func();
         $arr['init']  = serialize($init);
		 if(empty($init['error'])){
		 $arr['title'] = $init['title'];
         $arr['hook'] = $init['func'];
		 $sql = arr_sql('Plug','insert',$arr);
		 $b = $db->runsql($sql,$arr);
		 $_SESSION[KEY.'hooks'] = '';
		 logmsg($b);
		 }else{
		   logmsg(0,$init['error']);
		 }
      }
	}
	else{
	  logmsg(0,'安装失败！');
	}
	break;
case 'eplug':
	chkadm();
    $app_hooks = get_hooks();
    $cfg = $app_hooks[$id]['cfg'];
	$str = '<form id="eplug'.$id.'">';
	$i = 0;
	foreach($cfg as $k=>$v){
      $str .= '<div class="s_e"><strong>'.$v.':</strong><input name="args[]" value="'.($k==='password'?'':$app_hooks[$id]['args'][$i]).'" class="input_narrow w100" type="text" placeholder="'.$v.'" /></div>';
	  $i++;
	}
	$str .= '<div class="s_s"><button class="btn" onclick="splug('.$id.')" type="button">保存</button> <button class="btn" onclick="layer.closeAll()" type="button">取消</button></div></form>'; 
	logmsg(1,$str);
	break;
case 'splug':
	  chkadm();
	  $arr['id'] = $id;
	  $args = $_POST['args'];
	  foreach($args as $v){
	     if(empty($v)){
		    logmsg(0,'请输入完整后提交');
		 }
	  }
      $arr['args'] = serialize($args);
      $b = $db->runsql("update `Plug` set args=:args where id=:id",$arr); 
	  $_SESSION[KEY.'hooks'][$id]['args'] = $args;
	  logmsg($b);	
	break;
case 'kgplug':
	  chkadm();
	  $arr['id'] = $id;
      $arr['lock'] = intval($d);
      $b = $db->runsql("update `Plug` set lock=:lock where id=:id",$arr);
      $msg = $d==0?'开启':'关闭';
	  $_SESSION[KEY.'hooks'][$id]['lock'] = $arr['lock'];
	  logmsg($b,$msg);	
	break;
case 'dplug':
	chkadm();
    $b =  $db->runsql("delete from `Plug` where id=:id",array('id'=>$id));	
	unset($_SESSION[KEY.'hooks'][$id]);
    logmsg($b);
	break;
default:
   logmsg(0);
}
//end switch

