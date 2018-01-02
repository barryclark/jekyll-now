---
layout: post
title: GraphViz diagram base on PowerShell Test-NetConnection -Traceroute 
---
I need to understood some dependencies between my WAN network traces. Most of my system are hosted on Windows (or at least available to me). So I rather prefer to use windows tools (both on WS 2012 R2, WS 2008 R2 and (don't ask, please, some older Windows)).  

First approach: 
```powershell
Import-Module PSGraph
$m = $null
$m = $null
$r = "start"
$nodes = @() 
foreach ($m in (Test-NetConnection -computername 8.8.8.8 -TraceRoute | select -ExpandProperty TraceRoute )) { write-warning "$r to $m" ; $nodes += edge $r $m;$r = $m}
$r = "start"
foreach ($m in (Test-NetConnection -computername 8.8.4.4 -TraceRoute  | select -ExpandProperty TraceRoute )) { write-warning "$r to $m" ; $nodes += edge $r $m;$r = $m}
$r = "start"
foreach ($m in (Test-NetConnection -computername 9.9.9.9 -TraceRoute  | select -ExpandProperty TraceRoute )) { write-warning "$r to $m" ; $nodes += edge $r $m;$r = $m}
$r = "start"
foreach ($m in (Test-NetConnection -computername www.google.com -TraceRoute | select -ExpandProperty TraceRoute )) { write-warning "$r to $m" ; $nodes += edge $r $m;$r = $m}

$res = graph g {$nodes} 
$res | out-file tracer.dot -Verbose
$res | Export-PSGraph -OutputFormat png -DestinationPath ooo.png
```
so... I need make some separation of collecting data and process it before send to GraphViz. In general I've 2 possible method to collect it: 
- tracert.exe 
- Test-NetConnection -computername 8.8.8.8 -traceroute 
and I'm afraid 2nd of them are not available on my machines. so it left only to use first or both. 

ok, it looks like that: https://github.com/ziembor/ziembor.github.io/blob/master/_posts/2018-01-02/show-tracert2GraphViz.ps1 
![](https://ziembor.github.io/_posts/2018-01-02/5921960349401088.png)

## See also 
* 
* https://www.the-little-things.net/blog/2013/10/06/visualize-active-directory-site-connections/
* https://www.the-little-things.net/blog/2013/11/02/ad-audit-report-with-powershell-part-2/ 
* https://confluence.slac.stanford.edu/display/IEPM/PingER+Route+Visualizer+using+Traceroutes 
* https://github.com/lorenzog/NetworkMap
* https://hokstad.com/traceviz-visualizing-traceroute-output-with-graphivz