<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
<title>无名轻博客安装程序</title>
<style>
body {
background: #444;
font-family: "Lucida Sans Unicode", Helvetica, "Microsoft Yahei", "Microsoft JhengHei", STHei, "Meiryo UI";
height:100%;color:#fff
}
a{color:#fff}

.abt{border: 1px solid #EFEFEF;
border-radius: 5px;
padding: 6px;
cursor: pointer; background: #fff;color:#000}
.txt{}
.green{color:green;}
.red{color:red;}
.ft{margin-top:40px;}
</style>
</head>
<body>

<div style="padding:100px 0 0 0;line-height:30px;width:750px;margin:0 auto">
<h1>欢迎使用</h1>
<p class="txt">无名轻博客是一款基于PHP+Sqlite的简单易用的个人微博系统(miniblog)。致力于为您提供快速、稳定，且在使用上又极其简单、舒适的博客服务。</p>
<?php
function endfoot(){
     echo '<p class="ft" align="center">Powered by <a href="https://fpx.ink/" target="_blank">无名轻博客</a> V4 ,  Design by <a href="https://www.4jax.net/" target="_blank">www.4jax.net</a></p>';
     exit('</div></body></html>');      
}
class DbHelpClass
    {
        private $conn;
        private $qxId;
        private $ret;
        
        function __construct($db)
        {              
			try{
			   $this->conn = new PDO('sqlite:'.$db); 
			 }			
			catch(Exception $errinfo){
				die ("PDO Connection faild.(可能空间不支持pdo_sqlite，详细错误信息：)".$errinfo);
			}

        }
        
        /*读取*/
        function getdata($sql,$params=array())
        {
            $bind=$this->conn->prepare($sql);
            $arrKeys=array_keys($params);
            foreach($arrKeys as $row)
            {
				if(strpos($sql,"like")>-1){
				  $bind->bindValue(":".$row,'%'.$params[$row].'%');
				}else{
                  $bind->bindValue(":".$row,$params[$row]);
				}
            }
            $bind->execute();// or die('sql error:'.$sql);
            $result=$bind->fetchAll(PDO::FETCH_ASSOC);            
            return $result;
        }

        function total($tab_name,$tj='')//求总记录数目
           {
             $bind = $this->conn->prepare('SELECT count(id) as c FROM '.$tab_name.' '.$tj);
             $bind->execute();
             $result = $bind->fetchAll();
             return $result[0]['c'];
           }        
        /*添加,修改需调用此方法*/
        function runsql($sql,$params=array())
        {  
            $bind=$this->conn->prepare($sql);
            $arrKeys=array_keys($params); 
            foreach($arrKeys as $row)
            {
				 
                $bind->bindValue(":".$row,$params[$row]);
                
            }	
            $a = $bind->execute();//or die('sql error');
			if(strpos($sql,"insert")>-1){
			   return $this->conn->lastInsertId();
			}else{
              return $a;
			}
        }
    }
$odb = 'app/db/log3.db';
//$ndb = 'app/db/log4.db';
//rename($odb,'log4.db');
//define('INSTALL','TRUE');
echo '<p>此文件升级v3.0版数据库为v4.0版，请备份好网站数据并真阅读升级步骤！！！<br />';
 echo '升级步骤：<br />1.把v3.0数据库命名为log3.db<br />2.上传V4.0程序(除数据库外)覆盖，运行本程序点击下方【开始升级】即可。<br /><br /><a class="abt" href="?up=1">开始升级</a></p>';
if(!isset($_GET['up'])){ 
   endfoot();
}
if (file_exists($odb)) { 
//@unlink ($ndb);
//echo '删除V4.0版本数据库<br />';
//rename($odb,$ndb);
//echo '更名V3.0版本数据库为'.$ndb.'<br />';
echo '开始升级...<br />';
}else{
   echo ('V3.0数据库('.$odb.')文件丢失！');
   endfoot();
}
$db = new DbHelpClass($odb);
$db->runsql("VACUUM");
$sql1 = 'CREATE TABLE sqlitestudio_temp_table AS SELECT * FROM Pl';
$db->runsql($sql1);
$sql2 = 'DROP TABLE Pl';
$db->runsql($sql2);
$sql3 = 'CREATE TABLE Pl (
    id       INTEGER       PRIMARY KEY AUTOINCREMENT,
    cid      INTEGER,
    pname    VARCHAR (20),
    pmail    VARCHAR (30),
    purl     VARCHAR (50),
    pcontent VARCHAR (300),
    rcontent VARCHAR (100),
    ptime    DATETIME      DEFAULT (datetime(\'now\', \'localtime\') ),
    isn      INT (1)       DEFAULT (0),
    hide     INT (1)       DEFAULT (0) 
)';
$db->runsql($sql3);
$sql4 = 'INSERT INTO Pl (
                   id,
                   cid,
                   pname,                 
                   purl,
                   pcontent,
                   rcontent,
                   ptime,
                   isn,
                   hide
               )
               SELECT id,
                      cid,
                      pname,                    
                      purl,
                      pcontent,
                      rcontent,
                      ptime,
                      isn,
                      0 
                 FROM sqlitestudio_temp_table';
$db->runsql($sql4);
$sql5 = 'DROP TABLE sqlitestudio_temp_table';
$db->runsql($sql5);
 
$sql1 = 'CREATE TABLE sqlitestudio_temp_table AS SELECT * FROM [Set]';
$db->runsql($sql1);
$sql2 = 'DROP TABLE [Set]';
$db->runsql($sql2);
$sql3 = 'CREATE TABLE [Set] (
    id       INT (1),
    webuser  VARCHAR (10),
    webmail  VARCHAR (30),
    webtitle VARCHAR (20),
    webkey   VARCHAR (100),
    webpass  VARCHAR (32),
    webdesc  VARCHAR (255),
    webmenu  TEXT,
    webclass VARCHAR (100),
    plsh     INT (1),
    rewrite  INT (1),
    safecode INT (1),
    page     INTEGER,
    width    INTEGER,
    icp      VARCHAR (20),
    foot     TEXT,
    widget   INT (1)       DEFAULT (1),
    motto    VARCHAR (255),
    ver      CHAR (5) 
)';
$db->runsql($sql3);
$sql4 = 'INSERT INTO [Set] (
                      id,
                      webuser,
                      webtitle,
                      webkey,
                      webpass,
                      webdesc,
                      webmenu,
                      webclass,
                      plsh,
                      rewrite,
                      safecode,
                      page,
                      width,
                      icp,
                      foot,
                      widget,
                      motto,
                      ver
                  )
                  SELECT id,
                         webuser,
                         webtitle,
                         webkey,
                         webpass,
                         webdesc,
                         webmenu,
                         webclass,
                         plsh,
                         rewrite,
                         safecode,
                         20 as page,
                         600 as width,
                         icp,
                         "<script>//统计代码</script>" as foot,
                         widget,
                         motto,
                         "4.0" as ver
                    FROM sqlitestudio_temp_table';
$db->runsql($sql4);
$sql5 = 'DROP TABLE sqlitestudio_temp_table';
$db->runsql($sql5);
 
$sql3 = 'CREATE TABLE Plug (
    id    INTEGER       PRIMARY KEY AUTOINCREMENT,
    title VARCHAR (15),
    hook  VARCHAR (10)  UNIQUE,
    init  TEXT,
    args  VARCHAR (100),
    lock  INT (1)       DEFAULT (0) 
)';
$db->runsql($sql3);

$sql4 = 'INSERT INTO Plug (
                     lock,
                     args,
                     init,
                     hook,
                     title,
                     id
                 )
                 VALUES (
                     0,
                     \'\',
                     \'a:5:{s:5:"title";s:31:"评论/回复邮件提醒通知";s:4:"file";s:9:"emmsg.php";s:3:"act";s:12:"addpl,plsave";s:4:"func";s:5:"emmsg";s:3:"cfg";a:3:{i:0;s:13:"smtp服务器";i:1;s:12:"邮箱地址";s:8:"password";s:12:"邮箱密码";}}\',
                     \'emmsg\',
                     \'评论/回复邮件提醒通知\',
                     1
                 ),
                 (
                     1,
                     \'\',
                     \'a:5:{s:5:"title";s:18:"评论微信通知";s:4:"file";s:9:"wxmsg.php";s:3:"act";s:5:"addpl";s:4:"func";s:5:"wxmsg";s:3:"cfg";a:1:{s:8:"password";s:5:"token";}}\',
                     \'wxmsg\',
                     \'评论微信通知\',
                     2
                 )';
$db->runsql($sql4);
$cfg = 'app/class/config.php';
$key =  md5(time().'WMQBK3');
$p = 'admin'.substr($key,2,4);
$sdb = substr($key,16,12);;
$key = substr($key,10,6);
$key = 'WMQBK3_'.$key;
$f = file_get_contents($cfg);
$f = preg_replace("/define\('KEY','.+?'\);/i","define('KEY','{$key}');",$f);
$f = preg_replace("/define\('DB',.+?;/i","define('DB',ROOT_PATH.'app/db/{$sdb}.db');",$f);
$f = preg_replace("/\/\*install-start\*\/.+?\/\*install-end\*\//is",'/*installed*/',$f);
$webpss = md5(md5($key.$p));
//echo $webpss;
$sql1="update `Set` set webpass='{$webpss}' where id=1";
$db->runsql($sql1);
$f = @file_put_contents($cfg,$f);
$db = null;
rename($odb,"app/db/{$sdb}.db");
$_SESSION[$key.'set'] = '';
//$m = '<li><a href="@index">首页</a></li><li><a href="@comment">评论</a></li>';
//$db->runsql("update `Set` set webmenu='$m'");
echo '升级完成！ 管理密码重置为：'.$p;
echo '<p><a class="abt" href="?ok">开始使用</a></p>';
@unlink ('uptov4.php'); endfoot();
?>
 