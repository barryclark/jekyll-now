---
layout: post
title: Location of the SugarCRM log file
permalink: /general/location-of-the-sugarcrm-log-file
post_id: 1345
categories:
- General
- grep
- Linux
- SugarCRM
---

By default it’s in the same base folder as the SugarCRM application files. But on occasion we’ll move it. Quickly find it’s location by looking in the config.php file. The two relevant lines are:


`‘log_dir’ => ‘/var/log/sugarcrm/’,`

`‘log_file’ => ‘sugarcrm.log’,`

If you’re at the command line, then this makes it easy:

`grep 'log_dir' config.php`
