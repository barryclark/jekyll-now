---
title: Graphing pgstat output
author: kgorman
layout: post
permalink: graphing-pgd-output
fave-post_views:
  - 71
categories:
  - PostgreSQL
tags:
  - gnuplot
  - postgresql
  - tools
---
If you&#8217;re using the <a href=http://www.kennygorman.com/wordpress/?p=260><del datetime="2009-02-25T03:24:20+00:00">pgd</del> pgstat utility</a> I posted about previously, you can graph the output with very little effort using <a href=http://www.gnuplot.info/>gnuplot</a>. In my case I use <del datetime="2009-02-25T03:25:49+00:00">pgd</del> pgstat for capturing output for various PostgreSQL performance tests, and of course graphing that output is important.

<!--more-->

I won&#8217;t go into detail about installing gnuplot here. Once you have it installed, use this example script to create the graphs. In my case I spool the output to <a href=http://sourceforge.net/projects/aquaterm/>aquaterm</a> on my Macbook Pro. In the plot lines simply change &#8220;using 16&#8243; to &#8220;using N&#8221; where N is the pgd output column you would like to graph. For instance, column 2 is commits, column 16 is load average. This creates nice looking graphs for your reports, presentations or analytics. When your ready to go to the next level, <a href=http://t16web.lanl.gov/Kawano/gnuplot/index-e.html>this FAQ</a> is excellent.

I don&#8217;t think gnuplot is great to show graphs over time, for instance in monitoring tools or capacity tools. I will write about using <a href=http://oss.oetiker.ch/rrdtool/>rrdtool</a> for this at some point. But for quickly graphing the output of <del datetime="2009-02-25T03:24:20+00:00">pgd</del> pgstat, gnuplot can&#8217;t be beat.

Here is an example gnuplot file:

<pre lang="xml">set terminal aqua
	set title "PostgreSQL performance"
	set ylabel "executions / 10 seconds"
	plot \
	"data.out" using 11 title "Server #1 Inserts" with lines , \
	"data.out" using 12 title "Server #1 Updates" with lines, \
	"data.out" using 2 title "Server #1 Total Commits" with lines
</pre>

Here is an example graph:  
<a href=http://www.kennygorman.com/example.jpg><img src=http://www.kennygorman.com/example.jpg width=400></a>
