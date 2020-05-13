<?php
error_reporting(0);
session_start();
date_default_timezone_set('PRC');
define('KEY','27c56b'); 
define('TEMPLATE','qblog');
define('BASE_PATH',str_replace('\\','/',dirname(__FILE__)).'/');
define('ROOT_PATH',str_replace('app/class/','',BASE_PATH));
define('DB',ROOT_PATH.'app/db/768675ba35ee.db');
define('ImgW',180);
define('ImgH',120);
define('WMBLOG','TRUE');
/*install-start*/
header("Content-type: text/html; charset=gb2312");
require_once 'install.txt';
/*install-end*/