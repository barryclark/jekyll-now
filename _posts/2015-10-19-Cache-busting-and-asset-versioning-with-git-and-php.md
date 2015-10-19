---
layout: post
title: Cache-busting and asset-versioning with Git and PHP
tag: performance
published: true
---

One of the most efficient ways to leverage client-side caching of asset files (JS, CSS, images, fonts and others) is to configure the server so it will serve files with an expiration date set far in the future (say a month) via the `ExpiresDefault` header. Once clients have loaded a file, they won't check for updates on the server at all for a full month. The consequence is faster subsequent page loads. Nice. However, if you need to deploy changes to that file, your users are likely to see some issues since the browser won't download the updated version. So what do you do?

## The solution
A long-established practice to bust the browser cache is to make sure clients load assets with URLs they've never encountered before. We could just generate random names, but when will they change? Luckily, if you're using a versioning system (you are, right?), you can leverageto a file with each version. We'll just make that string part of the asset file names, and will be on our way to easy cache-busting.

SVN has revision numbers, Git has commit hashes. We're going to look into Git, but [check out this script if you want a (slightly different) example in SVN](
https://github.com/mikaelgramont/mountainboardfr/blob/master/bin/svnassets.php).


## How to do it
Let's break down the steps we need to take to solve this problem:

- First we build a list of the files we need to serve to the user.

```php
<?php
$unversionedPaths = array(
	'components/threejs/build/three.js',
	'components/webcomponentsjs/webcomponents.min.js',
	'fonts/archer_medium_regular.typeface.js',
	'imports.min.html',
	'scripts/scripts.min.js',
	'styles/style.min.css'
);
?>
```
- In our templates, we'll then replace all hardcoded URLs with a call to a function which will insert the versioning information:

```php
<?php
function getVersionedFilePath($path) {
	// Insert the commit hash right before the extension.
	$parts = explode('.', $path);
	$extension = array_pop($parts);
	$parts[] = self::getGitCommitHash($path);
	$parts[] = $extension;
	return implode('.', $parts);
}
?>
```

- `getGitCommitHash` is the most interesting function in this whole thing: it talks to git, and extracts the commit hash for a given file.

```php
<?php
function getGitCommitHash($path) {
	$commandTemplate = 'git log -n 1 %s';
	$gitResponse = @shell_exec(sprintf($commandTemplate, $path));
	$preg = '/commit ([a-f0-9]{32})/';
	preg_match($preg, $gitResponse, $matches);
	if(!isset($matches[1])) {
		error_log("Cannot find revision for file: ".$path);
		return '';
	}
				
	// Return only the first 6 characters of the commit hash,
	// as displayed in GitHub.
	return substr($matches[1], 0, 6);
}	
?>
```

- We're now sending versionned asset URLs to the browser. Next, once the browser has requested a versioned file, the server is going to need to strip the versioning information so it can find the real thing on the file system. This is typically done in the HTTP server configuration. In this example, I'll show you Apache:

```
# This requires mod_rewrite to be loaded.
RewriteEngine on
RewriteRule ^(.*\.)[a-f0-9]{1,32}+\.([a-z]{2,4})$ $1$2 [L]
FileETag none
Header unset Last-Modified
# This requires mod_expires to be loaded.
ExpiresDefault "access plus 1 month"
```

- Boom, we're done! Kind of. There are a few things you might want to do before launching this.

## You want this

One big caveat at this point is that with every page load we're going to call `'git log -n 1 xxx.xx'` for each file we need versioned. That's really dangerous in terms of performance, since that means multiple disk accesses for each request. The answer is pretty simple: you're gonna need a [~~montage~~](https://www.youtube.com/watch?v=pFrMLRQIT_k) cache to stuff all that versioning information into.

A second caveat, less obvious this one, is that all versioned file names really point to the same file on your server. That means that `main.123.js` and `main.234.js` will always point to the current `main.js` file on your file system. That may or may not be a problem, but the solution is pretty straightforward. If you store all your assets on a CDN and point all downloads to it, there's a good chance that it will store every version of a file that your users requested. No more conflating all versions!

## An example in the wild

I definitely skipped some steps here, but check out `index.php` and `php/versioning.php` in my [Draw Me a Kicker project](https://github.com/mikaelgramont/drawmeakicker) for the full thing, which you can see running at [http://drawmeakicker.com](http://drawmeakicker.com).