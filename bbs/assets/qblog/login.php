<?php if(!defined('WMBLOG'))exit; ?>
<?php include ("head.php");?>
  <div id="content">
    <div id="main" class="login<?php if($widget=="0") echo ' w100';?>"> 
    <form  action="<?php echo $file;?>?act=dologin" method="post"> 	
	   <input class="search-text" name="pass" placeholder="输入密码..." autocomplete="off"  required="required" type="password" value=""> <button class="search-submit" alt="登 陆 " type="submit">登 陆 </button> 	
	</form> 
    </div>
     <?php include ("right.php");?>
  </div>
  </div>
<?php include ("foot.php");?>
</body>
</html>