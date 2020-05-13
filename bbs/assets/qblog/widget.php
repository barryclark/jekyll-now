<?php if(!defined('WMBLOG'))exit; ?>
<?php include "head.php";?>
  <div id="content">
    <div id="main"<?php if($widget=="0") echo ' class="w100"';?> style="background:#fff;padding:15px;box-sizing:border-box;">	 
   <ul class="tabtitle">
	  <?php foreach($wid as $v){?><li><?php echo $v['title']; ?></li> <?php } ?>
	<li>添加边栏</li>
   </ul> 
	<?php foreach($wid as $v){?>
	<div class="tabcontent" style="display:none">
     <form id="formwid<?php echo $v['id'];?>">
	<div class="s_e">
		<strong>标题:</strong>
		<input type="text" class="input_narrow" name="title" value="<?php echo $v['title']; ?>" maxlength="15" />
	</div> 
	<div class="s_h">
		<strong>代码:</strong>（系统标签支持 comment topic class）
		<textarea name="html" class="input_textarea"><?php echo $v['html']; ?></textarea>
	</div>
	<div class="s_e">
		<strong>排序:</strong>
		<input type="number" class="input_narrow" name="ord" value="<?php echo $v['ord']; ?>" maxlength="15" />
	</div> 
	<div class="s_s">
		<button name="save" type="button"  class="btn" onclick="savewid(<?php echo $v['id']; ?>)"> 保存 </button> 
        <button name="del" type="button"  class="btn" onclick="delwid(<?php echo $v['id']; ?>)"> 删除 </button> <span id="errmsg"></span>
	</div>
	</form>
	</div>
   <?php } ?>
   <div class="tabcontent"  style="display:none">
   <form id="formwid0">
	<div class="s_e">
		<strong>标题:</strong>
		<input type="text" class="input_narrow" name="title" value="" maxlength="15" />
	</div> 
	<div class="s_h">
		<strong>代码:</strong>（系统标签支持 comment topic）
		<textarea name="html" class="input_textarea"></textarea>
	</div>
	<div class="s_e">
		<strong>排序:</strong>
		<input type="number"  class="input_narrow" name="ord" value="5" maxlength="15" />
	</div> 
	<div class="s_s">
		<button name="save" type="button" onclick="savewid(0)" class="btn"> 保存 </button>  <span id="errmsg"></span>
	</div>
    </form>
	</div>
    </div>
     <?php include ("right.php");?>
  </div>
  </div>
<?php include ("foot.php");?>
</body>
</html>