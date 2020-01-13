---
layout: post
title: Installing Ruby Despite Errors
---

In order to run [Jekyll Now]() locally, so I can see changes before they are committed and published publicly, I've needed to get Ruby installed. However each attempt produced this error

<pre><code>
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /Library/Ruby/Gems/2.3.0 directory.
</code></pre>

This [answer on StackExchange](https://stackoverflow.com/a/54874320/1220017) which advises using [this automated script (*laptop*)](https://github.com/monfresh/laptop), in combination with ensuring that the correct instance of ruby is in the `PATH` variable solved my problems.

The automated script can be run multiple times. In fact you should regularly run it to keep the components up to date. Thank you [Moncef](https://github.com/monfresh).
