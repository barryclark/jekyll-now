---
layout: post
title: GraphViz diagram base on PowerShell Test-NetConnection -Traceroute 
---
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

## See also 
* https://www.the-little-things.net/blog/2013/10/06/visualize-active-directory-site-connections/
* https://www.the-little-things.net/blog/2013/11/02/ad-audit-report-with-powershell-part-2/ 
* https://confluence.slac.stanford.edu/display/IEPM/PingER+Route+Visualizer+using+Traceroutes 
* https://github.com/lorenzog/NetworkMap
* https://hokstad.com/traceviz-visualizing-traceroute-output-with-graphivz