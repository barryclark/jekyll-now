<?php
$tit = '首页';
$key = $webkey;
$des = $webdesc;
function topic($n){
	global $db;
	$str = '';
    $rs =  $db->getdata("select id,title,sum,num from `Log` where hide=0 order by num desc limit 0,$n");
	foreach($rs as $v){	
		if(empty($v['title'])){
		  $title = mb_substr(strip_tags($v['sum']),0,14,'utf-8');
		  if(empty($title)) {$title = '#分享';}
		}else{
		   $title = $v['title'];
		}
	  $str .= '<li><a href="'. vurl($v['id']) .'">'.$title.'</a> <i class="iconfont icon-comm"></i> '.$v['num'].'</li>';
	}
   return $str;
}

function comment($n){
  	global $db,$template,$admin;
	$str = '';
	$where = $admin==1?'':'where hide=0';
    $rs =  $db->getdata("select id,cid,pname,pcontent,rcontent,isn from `Pl` $where order by id desc limit 0,$n");
	foreach($rs as $v){	
		if($v['isn'] == 1){
		  $pcontent = '评论审核中';
		}else{
		  $pcontent = mb_substr($v['pcontent'],0,12,'utf-8');
		}
	  $str .= '<li><a href="'. vurl($v['cid']) .'#Com-'.$v['id'].'"><strong>'.$v['pname'].'</strong> : '.$pcontent.'</a>';

	  if(!empty($v['rcontent'])) {$str .= ' <i class="iconfont icon-reply"></i>';}
       $str .='</li>';
	}
   return $str;
}

function getprenext($id,$pn){
   global $db,$admin;
   $where =  $admin?'':'and hide=0';
   if($pn=='pre'){
      $rs =  $db->getdata("SELECT id,title FROM `log` WHERE id <$id $where ORDER BY id DESC LIMIT 1"); 
	  $t = '上一篇';
   }else{
      $rs =  $db->getdata("SELECT id,title FROM `log` WHERE id >$id $where ORDER BY id ASC LIMIT 1"); 
	  $t = '下一篇';
   }
   //print_r($rs);
   if(empty($rs)){
     return '';
   }else{
     return '<a class="'.$pn.'" href="'. vurl($rs[0]['id']) .'">'.($rs[0]['title']==''?$t:$rs[0]['title']).'</a>';
   }
} 

function pl_str($id,$arr){
  global $file;
  $pl_tpl = '<li class="comlist" id="Com-%s"><div id="Ctext-%s" class="comment"><div class="comment_meta"><cite><a%s>%s</a></cite><span class="time">%s</span></div> <p>%s</p></div></li>';
  return sprintf($pl_tpl,$id,$id,target($arr['purl'],$file),$arr['pname'],$arr['ptime'],$arr['pcontent']);
}

 function timeago($ptime) {
        $ptime = strtotime($ptime);
        $etime = time() - $ptime;
        if($etime < 1) return '刚刚';
        $interval = array (
            12 * 30 * 24 * 60 * 60  =>  '年前 ('.date('Y-m-d', $ptime).')',
            30 * 24 * 60 * 60       =>  '个月前 ('.date('m-d', $ptime).')',
            7 * 24 * 60 * 60        =>  '周前 ('.date('m-d', $ptime).')',
            24 * 60 * 60            =>  '天前',
            60 * 60                 =>  '小时前',
            60                      =>  '分钟前',
            1                       =>  '秒前'
        );
        foreach ($interval as $secs => $str) {
            $d = $etime / $secs;
            if ($d >= 1) {
                $r = round($d);
                return $r . $str;
            }
        }
}

?>