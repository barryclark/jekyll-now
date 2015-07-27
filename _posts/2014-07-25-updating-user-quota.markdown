---
layout: post
title: Updating User Quota
date: '2014-07-25 15:43:14'
---

Today a colleague ask me the question if we could reduce the scope of the following query and then perform an update:
<pre class="language-sql">select 'update cms_files_users.xyf_files set quota=524288000 where file_id='||xu.file_id||';' , xu.full_path, xf.quota/1024 /1024
from
  cms_files_users.xyf_files xf, cms_files_users.xyf_urls xu
where
  xf.file_id = xu.file_id
  and not regexp_like(xu.full_path, '/users/.*[\/].*')
and xf.quota > 0
</pre>
The idea was to convert it to something particularly more updated since this script creates an update statement that then you will need to execute, so looking after it the need was:
#### Requirements:
1. Limit the user base to only Instructors
2. Try it first for only one user
3. Change the quota to 500Mb 
4. Able to modify it if needed to use another user base.

#### What we do?
Well we start reviewing the gist: https://gist.github.com/enriquemanuel/6500401
<script src="https://gist.github.com/enriquemanuel/6500401.js"></script>

And then we finish building our own:
https://gist.github.com/enriquemanuel/6372bdcad57e63f43dc7
<script src="https://gist.github.com/enriquemanuel/6372bdcad57e63f43dc7.js"></script>

If you want more information on it, I would encourage that you read the comments inside the gist and how to execute it. 
Also, you need to have the proper privileges to do it, since being the basic user don't have enough permissions.