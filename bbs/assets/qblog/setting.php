<?php if(!defined('WMBLOG'))exit; ?>
<?php include "head.php";?>
  <div id="content">
    <div id="main"<?php if($widget=="0") echo ' class="w100"';?> style="background:#fff;padding:15px;box-sizing:border-box;">	 
	<ul class="tabtitle">
	 <li>博客设置</li>
	 <li>插件管理</li>
	 <li onclick="upCache()">更新缓存</li>
   </ul>   
    <form id="formset" class="tabcontent" style="display:none;clear:both;margin:10px 0 0 10px;">
	<div class="s_e">
		<strong>您的昵称:</strong>
		<input type="text" class="input_narrow" name="webuser" value="<?php echo $set['webuser'];?>" maxlength="15" />
	</div>
		<div class="s_e">
		<strong>您的Email:</strong>
		<input type="text" class="input_narrow" name="webmail" placeholder="接收新评论通知" value="<?php echo $set['webmail'];?>" maxlength="30" />
	</div>
	<div class="s_e">
		<strong>登陆密码:</strong>
		<input type="text" class="input_narrow" name="webpass" placeholder="不修改请留空" maxlength="15" />
	</div>
	<div class="s_e">
		<strong>微博标题:</strong>
		<input type="text" class="input_narrow" name="webtitle" value="<?php echo $set['webtitle'];?>" maxlength="30" />
	</div> 
		<div class="s_e">
		<strong>微博关键词:</strong>
		<input type="text" class="input_narrow" name="webkey" value="<?php echo $set['webkey'];?>" maxlength="30" />
	</div> 
		<div class="s_e">
		<strong>微博描述:</strong> 
		<textarea name="webdesc" class="input_textarea" onkeydown="if(event.keyCode==13){return false;}"><?php echo $set['webdesc'];?></textarea>
	</div> 
	<div class="s_e">
		<strong>微博座右铭:</strong> 
		<textarea name="motto" class="input_textarea" onkeydown="if(event.keyCode==13){return false;}"><?php echo $set['motto'];?></textarea>		 	 
	</div> 
	<div class="s_e">
		<strong>导航菜单:</strong> 
		<textarea name="webmenu" class="input_textarea"><?php echo $set['webmenu'];?></textarea>
	</div> 
	<div class="s_e">
		<strong>博客分类(英文逗号分隔):</strong> 
		<input type="text" name="webclass" class="input_narrow" value="<?php echo $set['webclass'];?>" /> 
	</div> 
	 <div class="s_e">
		<strong>分页条数:</strong>
		<input type="number" name="page" class="input_narrow" value="<?php echo $set['page'];?>" />	 
	</div> 
    <div class="s_e">
		<strong>图片质量(宽度):</strong>
		<input type="number" name="width" class="input_narrow" value="<?php echo $set['width'];?>" />	 
	</div> 
	 <div class="s_e">
		<strong>ICP备案:</strong>
		<input type="text" name="icp" class="input_narrow" value="<?php echo $set['icp'];?>" />			
	</div> 
	<div class="s_e">
		<strong>统计代码:</strong>
		<textarea name="foot" class="input_textarea"><?php echo $set['foot'];?></textarea>		 
	</div> 
	<div class="s_e">
        <strong>其它设置:</strong>
		<span>评论审核:</span> <input type="checkbox" value="1" name="plsh" <?php if($set['plsh']==1) echo 'checked'; ?>/>
		<span>验证码:</span> <input type="checkbox" value="1" name="safecode" <?php if($set['safecode']==1) echo 'checked'; ?>/>
		<span>伪静态:</span> <input type="checkbox" value="1" name="rewrite" <?php if($set['rewrite']==1) echo 'checked'; ?>/>
		<span>边栏:</span> <input type="checkbox" value="1" name="widget" <?php if($set['widget']==1) echo 'checked'; ?>/> 
	</div>	 
	<div class="s_s">
		<button name="save" type="button"  class="btn" onclick="saveset();" /> 保存 </button>  <span id="errmsg"></span>
	</div>
	<div id="result" class="s_r"></div>
     </form>
	 <div class="tabcontent"  style="margin-left:0;display:none"> 
	 <table id="table" cellpadding="0" cellspacing="0">
	 <thead>
	 <tr>
	   <th>功能 [<a href="javascript:fplug()">添加插件</a>]</th><th>状态</th><th>操作</th></tr></thead>	 
	 <?php
		 $list_plug = $db->getdata("select  * from `Plug`");
      foreach($list_plug as $p){    
       echo '<tr id="plug'.$p['id'].'"><td>'.$p['title'].'</td><td><a id="kg'.$p['id'].'" href="javascript:kgplug('.$p['id'].')">'.($p['lock']==0?'开启':'关闭').'</a></td><td><a href="javascript:eplug('.$p['id'].')">配置</a> <a href="javascript:dplug('.$p['id'].')">删除</a></td></tr>';
       }?>	    
	 </table>
	 </div>
    <div class="tabcontent" style="display:none;">刷新系统缓存，修复显示不一致。</div>
    </div>
     <?php include ("right.php");?>
  </div>
  </div>
<?php include ("foot.php");?>
</body>
</html>