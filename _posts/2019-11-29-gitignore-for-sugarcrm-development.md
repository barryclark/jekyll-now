---
layout: post
title: .gitignore for SugarCRM Development
permalink: /general/gitignore-for-sugarcrm-development
post_id: 1652
categories:
- General
- Git
- SugarCRM
---

The `.gitignore` file I'm using by default for SugarCRM repos is as follows:
<!--more-->
<pre><code>
# Blacklist everything
*
# include .gitignore file
!.gitignore
# Whitelist custom directory and everything below it
!/custom/
!/custom/**
</code></pre>

This means that it's only the `/custom/` folder and everything below it that's kept in the git repo.
