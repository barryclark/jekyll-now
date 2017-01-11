<?php

function isYouhosting() {
	$ip = $_SERVER['REMOTE_ADDR'];
	if($ip == '31.170.164.250' || $ip == '212.1.209.2') {
		return true;
	}
	return false;
}

$hash = stripslashes($_GET['login']);

if(isYouhosting() AND $hash) {
	$fileHandle = fopen('sessions/'.$hash, 'w') or die("can't open file");
	fclose($fileHandle);
	echo 'OK';
	exit;
}
else {
	echo 'ERROR';
	exit;
}