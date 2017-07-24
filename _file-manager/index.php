<?php

function hashFindFile($file) {
	if($file) {
		if (file_exists('sessions/'.$file)) {
			return filemtime('sessions/'.$file); // Return file creation time
		}
		return false;
	}
	return false;
}

$access = stripslashes($_GET['access']);
$login = stripslashes($_GET['login']);
$action = stripslashes($_GET['action']);

if($login) {
		require_once('php/hash.php');
	exit;
}
if($access) {
	if(hashFindFile($access)) {
		$expires = time() - hashFindFile($access);
		if($expires > 3600) {
			echo 'Session has expired!';
		} else {
			header("Location: elfinder.php?access=$access");
		}
	}
	else {
		echo 'Session not exists!';
	}
	exit;
}
if($action == 'ping') {
	echo 'OK';
	exit;
}