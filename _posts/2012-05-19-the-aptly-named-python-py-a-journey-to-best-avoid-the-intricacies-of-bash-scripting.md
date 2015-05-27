---
title: The Aptly Named 'python.py': A Journey To Best Avoid The Intricacies of Bash Scripting
link: https://flotsametc.wordpress.com/2012/05/19/the-aptly-named-python-py-a-journey-to-best-avoid-the-intricacies-of-bash-scripting/
author: jamesbuckland
description: 
post_id: 51
created: 2012/05/19 20:35:44
created_gmt: 2012/05/19 20:35:44
comment_status: open
post_name: the-aptly-named-python-py-a-journey-to-best-avoid-the-intricacies-of-bash-scripting
status: publish
post_type: post
layout: post
---

# The Aptly Named 'python.py': A Journey To Best Avoid The Intricacies of Bash Scripting

The following chunk of code was written over the last few months as part of an automation process at the AMNH for the purpose of creating stereo pairs from JPL database images. My partner Katie Bartel and I first tried to write the damn thing as a bash script, but it turned out to be hell. We went to consult my old mentor, Colin McNally, and he gave us the idea of writing it in a higher level language and calling lower-level commands from within.  [sourcecode language="python"] #!/usr/bin/env python import subprocess as sp import re, string files = sp.check_output(["ls"]).split(None) w = [] for i in range(len(files)): if (files[i][-5:] == ".tiff"): w.append(files[i]) for i in range(len(w)): w[i] = w[i][:-5] a = w[0] b = w[1] print a, b sp.check_call(["mer2camera", a + ".img"]) sp.check_call(["mer2camera", b + ".img"]) sp.check_call(["stereo", a + ".tiff", b + ".tiff", a + ".cahvor", b + ".cahvor", "product/product"]) sp.check_call(["point2mesh", "-s", "1", "-l", "product/product-PC.tif", "product/product-L.tif"]) [/sourcecode]