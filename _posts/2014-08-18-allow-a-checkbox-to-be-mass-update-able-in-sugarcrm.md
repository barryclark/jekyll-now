---
layout: post
title: Allow a Checkbox to be Mass Update-able in SugarCRM
permalink: /how-to/allow-a-checkbox-to-be-mass-update-able-in-sugarcrm
post_id: 1304
categories:
- Checkbox
- Customisation
- How to
- MassUpdate
- SugarCRM
---

Here's how to enable a checkbox to be updated enmasse.
<!--more-->
First create a new *extvardef.php* file containing the following:

*OPPS - somthings gone wrong. There should be something else here, but it isn't. Sorry!*

Then put that file into at the following location

`/var/www/html/custom/Extension/modules/
Module_Name/Ext/Vardefs/`

Of course, you'd want to check any existing files in the folder to make sure none of them already deal with that field.
