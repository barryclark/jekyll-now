<?php if(!defined('WMBLOG'))exit; ?><div id="footer">自豪的采用：<a href="http://www.4jax.net">无名轻博客</a> <?php echo VER;?>  Processed <?php $t2 = microtime(true); echo round($t2-$t1,3); ?>s <a href="http://www.miitbeian.gov.cn/" rel="nofollow" target="_blank"><?php echo $set['icp'];?></a></div>
<script type="text/javascript" language="javascript" src="assets/js/jquery.min.js"></script>
<script type="text/javascript" language="javascript" src="assets/js/layer.js"></script>
<script type="text/javascript" language="javascript" src="assets/js/ajax.js?v=4.1"></script>
<?php if(ADMIN) echo '<script type="text/javascript" language="javascript" src="assets/js/admin.js?v=4.0"></script>';?>