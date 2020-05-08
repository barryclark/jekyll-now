<?php if(!defined('WMBLOG'))exit; 
if ($widget=="1"){
?><div id="sidebar"> 
     <div class="sidebar">
	  <?php foreach($wid as $v){?>
      <div class="widget">
        <h3><?php echo $v['title'];?></h3>     
		<?php if($v['html']	==='topic'){?>	 
           <ul class="topic"><?php echo topic(10);?> </ul>
	    <?php }elseif ($v['html']	==='comment'){?>
           <ul class="comment"><?php echo comment(10);?></ul>	 
        <?php }elseif ($v['html']	==='class'){?>
           <ul class="comment"><?php echo _class();?></ul>	
		<?php }else{?>
		  <ul><?php echo $v['html'];?></ul>
		<?php } ?>
      </div>	  
	 <?php } ?>	  
	 </div>
</div>
<?php } ?>	  