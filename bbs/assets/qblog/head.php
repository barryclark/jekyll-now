<?php if(!defined('WMBLOG'))exit;?><!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<title><?php echo $tit.'_'.$webtitle;?></title>
<meta name="keywords" content="<?php echo $key;?>" />
<meta name="description" content="<?php echo $des;?>" />
<link href="assets/<?php echo TEMPLATE;?>/style.css?v=4.0" rel="stylesheet" type="text/css" />
<?php if($tpl=='post.php'){?>
<link href="assets/js/wangeditor/css/wangEditor.min.css" rel="stylesheet" type="text/css" />
<?php }?>
<?php if($tpl=='view.php'){?>
<link href="assets/js/highlightjs/dark.css" rel="stylesheet" type="text/css" />
<?php }?>
</head>
<body>
<div id="header"> 
<a id="menu_toggle" href="#"><i id="menu" class="iconfont menu"></i></a>  
<div class="navbar-wrap">
  <div class="box-m">
    <div class="logo">
      <h2 id="title"><a href="./"><?php echo $webtitle;?></a></h2>   
    </div>	   
      <ul id="nav" class="collapse"> 
		<?php webmenu();?>
      </ul>   
      </div>
</div>
<div class="other-wrap collapse">
	  <div class="other box-m">
	   <div class="desc"><?php echo $motto;?></div>
	   <form method="get" class="search-form" action="<?php echo $file;?>"> <input class="search-text" name="s" autocomplete="off" placeholder="输入关键词搜索..." required="required" type="text" value="<?php echo $s;?>"> <button class="search-submit" alt="搜索" type="submit">搜索</button></form>
	   </div>   
</div>
</div>
<div id="wrap"> 