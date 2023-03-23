---
layout: post
title: URI Comparison in JS
---

We write a function checkURIs(uri1, uri2) that can check if 2 URIs are equivalent. The function should return true if match, and false otherwise.

The constraints and assumptions are as follow:

* A port that is empty, or not given, is equivalent to the default port of 80
* Comparisons of scheme names must be case-insensitive
* Comparisons of host names must case-insensitive
* Comparisons of path, hash, and querystring must be case-sensitive
* Paths may contain traversal tokens . (same dir) and .. (one dir up) which must be accounted for
* Characters are equivalent to their % HEX HEX encodings. (Other than typical reserved characters in urls like , / ? : @ & = + $ #)
* Query string parameters must be equivalent in arbitrary order, BUT query string arguments of the same name must be listed in the same order in both URIs to be equivalent. There may be multiple (not just 2) args of the same name that need to be accounted for.
* In-URI basic auth may be present: e.g. http://uname:passwd@host.com/foo/bar.html, auth must be case-sensitive

## Solution

URI search strings may have encoded components, and needed to be decoded before two different URI's are compared. JavaScript offers us `encodeURI()` `decodeURI()` `encodeURIComponent()` and `decodeURIComponent()`, but these functions have their limitations. I have highlighted the key issues with these functions below. For a detailed explanation please visit [this link](http://unixpapa.com/js/querystring.html)
 
 1. First off these functions were not built for handling query string parameters
 2. `encodeURI()` and `decodeURI()` are pretty much useless when it comes to dealing with 
 
 ```
  # $ & + , / ; = ? @
 ```
 3. `decodeURIComponent()` throws an error when it encounters an unrecognizable character.
 
 Knowing these limitations, the custom decoder given in the [above link](http://unixpapa.com/js/querystring.html) was used for decoding each of the two URL's.
 
 Once the URI is decoded we then split it into its components using the regex given below:
 
 ```
 url_split_regex = /^(?:(?:(([^:\/#\?]+:)?(?:(?:\/\/)(?:(?:(?:([^:@\/#\?]+)(?:\:([^:@\/#\?]*))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((?:\/?(?:[^\/\?#]+\/+)*)(?:[^\?#]*)))?(\?[^#]+)?)(#.*)?/;
 ```
 
 The above regex splits the URI into an array. The array corresponding to the URI components' keys is:
 
 ```
   [
    "href",                    // http://user:pass@host.com:81/directory/file.ext?query=1#anchor
    "origin",                  // http://user:pass@host.com:81
    "protocol",                // http:
    "username",                // user
    "password",                // pass
    "host",                    // host.com:81
    "hostname",                // host.com
    "port",                    // 81
    "pathname",                // /directory/file.ext
    "search",                  // ?query=1
    "hash"                     // #anchor
];

 ```
 
 After reconciling the split uri values and the above keys array we get an URI object. For this URI object, we resolve the path component to its absolute value which removes all `.` and `..`.  With the properly formed URI object, we can proceed for comparison of the uri components. There however is just one additional thing to take care of and that is the **search string**. 
 
 For the search string, we create a dictionary that maps each **key** in the search string to its corresponding array of **value(s)**. Thus comparing the search strings of two different URI's then comes down to the comparison of two objects.
 
 The detailed solution is outlined in this pen. 
 
 <p data-height="1100" data-theme-id="dark" data-slug-hash="PmgmYL" data-default-tab="js" data-user="ali008" data-embed-version="2" data-pen-title="URL Comparison in JS" class="codepen"> See the Pen <a href="https://codepen.io/ali008/pen/PmgmYL/"> URL Comparison in JS </a> by MIR ALI (<a href="https://codepen.io/ali008">@ali008</a>) on <a href="https://codepen.io"> CodePen </a>. </p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"> </script>

Please comment if you have any suggestions/improvements for my solution.
