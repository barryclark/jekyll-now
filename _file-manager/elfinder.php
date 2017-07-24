<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>File Manager</title>
		<!-- jQuery and jQuery UI (REQUIRED) -->
		<link rel="stylesheet" type="text/css" media="screen" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/themes/smoothness/jquery-ui.css">
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
		<!-- elFinder CSS (REQUIRED) -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/elfinder.min.css">
		<link rel="stylesheet" type="text/css" media="screen" href="css/theme.css">
		<!-- elFinder JS (REQUIRED) -->
		<script type="text/javascript" src="js/elfinder.min.js"></script>
		<!-- elFinder translation (OPTIONAL) -->
		<script type="text/javascript" src="js/i18n/elfinder.en.js"></script>
		<?php
			/*
				Function: Hash checker
			*/
			function checkHash($path, $fileName) {
				if(file_exists($path.$fileName)) {
					return true;
				}
				return false;
			}
			function hashFindFile($file) {
				if($file) {
					if (file_exists('sessions/'.$file)) {
						return filemtime('sessions/'.$file); // Return file creation time
					}
					return false;
				}
				return false;
			}
			$getHash = stripslashes($_GET['access']);
			$getIP = explode("_", $getHash);
			$userIP = $_SERVER['REMOTE_ADDR'];
			// IF checkHash returns true then show elfinder
			if(checkHash('sessions/', $getHash) AND $userIP == $getIP[0]) {
				if(hashFindFile($getHash)) {
					$expires = time() - hashFindFile($getHash);
					if($expires > 3600) {
						echo 'Session has expired!';
						exit;
					}
				} else {
					echo 'Session not exists!';
					exit;
				}
				echo '<!-- elFinder initialization -->
				<script type="text/javascript" charset="utf-8">
					$().ready(function() {
						var elf = $(\'#elfinder\').elfinder({
							url : \'php/connector.php?access='.$getHash.'\',
							lang: \'en\',
							resizable: false,
							width: 890,
							height: 580,
						}).elfinder(\'instance\');
					});
				</script>';
			}
			
		
		?>
		
	</head>
	<body>
		<!-- Element where elFinder will be created (REQUIRED) -->
		<div id="elfinder"></div>
	</body>
</html>
