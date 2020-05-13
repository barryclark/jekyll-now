<?php if(!defined('WMBLOG'))exit; ?>
<?php include "head.php";?>
  <div id="content">
    <div id="main"<?php if($widget=="0") echo ' class="w100"';?>>         
<div id="article">
<?php if ($v['title']<>"") echo '<h1>'.$title.'</h1>';?>
<div class="text"><?php  if($v['pass']==""){echo $v['content']; }else { echo '<p style="color:red;">这是一篇密码日志！</p><p><input placeholder="请输入密码..." name="pass" type="password" value="" id="password" class="search-text" /> <button class="search-submit" onclick="ckpass(\''.$v['id'].'\');" />确认</button></p>';}?></div>
<p class="time clb"><?php  echo $class[$v['tid']].' '.$v['atime']?> 通过 <?php echo $v['fm'];?> <i class="iconfont icon-view"></i> 浏览(<?php echo $v['pv']; ?>) </p>
<p class="navPost">  
	<?php  view_admin($v['id'],$v['ist']);?>
</p></div>  
<div id="articlenav"><?php echo getprenext($v['id'],'pre');echo getprenext($v['id'],'next');?></div>
   <div id="comments">
   <h3><?php if($v['lock']==1 || $v['hide']==1) {echo '评论已关闭！';} else {echo '共有'.$v['num'].'条评论！'; }?></h3>
        <ol class="comment_list">
        <?php  $l=1;foreach($list as $vv){?>
		<li class="comlist" id="Com-<?php  echo $vv['id'];?>">
		<div id="Ctext-<?php  echo $vv['id'];?>" class="comment">
		<div class="comment_meta">
		<cite><a rel="external nofollow"<?php echo target($vv['purl'],$file);?>><?php echo $vv['pname'];?></a></cite> <span class="time"><?php echo $vv['ptime']; ?></span>
		<span class="reply"><?php echo '<em>'.$l.'#</em> ';pl_admin($vv['id'], $vv['cid'], $vv['isn'], $vv['pmail']);?></span>
		</div>
		<p><?php if($vv['isn']==1 && $admin===0){echo '评论审核中...'; } else { echo nl2br($vv['pcontent']);}?></p>
		<?php if($vv['rcontent']<>""){?><p class="re">&nbsp;&nbsp;<strong style="color:#C00"><?php echo $set['webuser']; ?>回复</strong>：<span><?php echo $vv['rcontent']; ?></span></p><?php }?>
		</div>
		</li>
       <?php $l++;} ?>
       </ol>
<div id="respond" class="comment-respond"<?php if($v['lock']==1 || $v['hide']==1) echo ' style="display:none"'?>>
		<h3 id="reply-title" class="comment-reply-title">发表评论</h3>
 <form id="formpl">
<div class="s_e mt10"><textarea tabindex="1" placeholder="发言要文明，评论有水平..." name="pcontent" rows="3" id="pcontent" class="input_textarea"></textarea></div>
<div id="pl_other" class="hide"><div class="s_e"><input name="pname" tabindex="2" placeholder="昵称(选填)" id="pname" type="text" class="input_narrow" value="<?php echo @$_COOKIE['pname'];?>" maxlength="10" /></div>
<div class="s_e"><input name="pmail" tabindex="2" placeholder="邮箱(选填)" id="pmail" type="email" class="input_narrow" value="<?php echo @$_COOKIE['pmail'];?>" maxlength="30" /></div>
<div class="s_e"><input name="purl" tabindex="3" placeholder="网址(选填)" id="purl" type="url" class="input_narrow" value="<?php echo @$_COOKIE['purl'];?>" maxlength="50" /></div>
</div>
	 <?php  if($safecode==1){?>
	 <div class="s_e"><input type="text" tabindex="4" id="pcode" placeholder="右侧计算答案" name="pcode" autocomplete="off"  class="input_narrow" value="" /> <img src="app/class/codes.php" id="codeimg" style="cursor:pointer" alt="更换一道题！" onclick="reloadcode()"/></div>
	 <?php }?>
	 <div class="s_e"><button type="button" onClick="addpl('<?php echo $id;?>','<?php echo $safecode;?>')" id="add" class="btn"> 提 交 </button> <button type="button" onClick="history.back();" id="bck" class="btn"> 返 回 </button><span id="errmsg"></span></div>
     </form></div>	
    </div>	
    </div>
    <?php include ("right.php");?>
  </div>
  </div>
<?php include "foot.php";?>
<?php echo $set['foot'];?>
</body>
</html>