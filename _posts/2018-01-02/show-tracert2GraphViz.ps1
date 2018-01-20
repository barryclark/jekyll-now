Function get-tracert2GraphViz {
  <#
      .SYNOPSIS
      Function intended for 
   
      .DESCRIPTION
    
      .PARAMETER FirstParameter
     
      .OUTPUTS
      System.Object[]
  
      .EXAMPLE
     
      .LINK
      https://github.com/ziembor/<BASE_REPOSITORY_URL>
    
      .LINK
      https://www.linkedin.com/in/ziembor
          
      .NOTES
      AUTHOR: Ziemek Borowski
      KEYWORDS: PowerShell
   
      VERSIONS HISTORY
      0.1.0 -  2015-0x-xx - Short notes about version

      TODO
   
      DISCLAIMER
      This script is provided AS IS without warranty of any kind. I disclaim all implied warranties including, without limitation, any implied warranties of merchantability or of fitness for a particular purpose. The entire risk arising out of the use or performance of the sample scripts and documentation remains with you. In no event shall I be liable for any damages whatsoever (including, without limitation, damages for loss of business profits, business interruption, loss of business information, or other pecuniary loss) arising out of the use of or inability to use the script or documentation. 
     
  #>

  #Requires -Version 2.0 
  [OutputType([System.Object[]])]

  param(
    [parameter(mandatory=$true,HelpMessage='list of target for traceroute')][string[]]$targets
  )

  BEGIN {
    $datestr = $((get-date -format s).Replace(':','').Replace('-',''))
    $tempdir = "$env:temp\tracert"
    $null = new-item  -ItemType "directory" -Path $tempdir -Force -Verbose 
    $colors = 'red','green','orange','yellow','red','pink'
    $Results=@()
    $Results+= 'digraph tracert {'
  }
  PROCESS {
    $n = 0 
    $m = 0
    foreach ($target in $targets) {
      
      if($x11colors) {$x11ccount = ($x11colors).count
      $color = ($x11colors[$((Get-Random -Maximum $x11ccount))]).Trim()} else {$color = $colors | Get-Random}
      $n++ 
      <#if($env:COMPUTERNAME -imatch '(ASH|ZB)') { #>
      if(((Get-Host).Version).Major -le 4) {
        $object = Test-NetConnection -ComputerName $target -TraceRoute
        $FromHop = $object.SourceAddress| Select-Object -ExpandProperty IPAddress
        $hoplist = $object | Select-Object -ExpandProperty TraceRoute
      } 
      else {
        $t = Invoke-Tracert -RemoteHost $target
        $FromHop = "startT" 
        $hoplist = $t | Select-Object -ExpandProperty Node
      }
      foreach ($NextHop in $hoplist) {
        $m++
        if($NextHop -imatch '(0.0.0.0|Request timed out)') {$NextHop = "timeout$n$m$datestr"}
        $Result = ('"{0}" -> "{1}"[color={2};label="{3}:{4}"];' -f $FromHop, $NextHop, $color, $n, $m) 
        $FromHop = $NextHop 
        Write-Warning -Message $NextHop 
        $Results+=$Result
        $locresfile = ('{0}\{1}-traceroute-{2}' -f $tempdir, $target, $datestr)
        $null = $result | Out-File -append -Verbose -FilePath $locresfile    
      }
    } #EndForEach 
  }

  END { 
    $Results += '}'
  $Results }
}
function Invoke-Tracert {
  <#
      .SYNOPSIS
      Describe purpose of "Invoke-Tracert" in 1-2 sentences.

      .DESCRIPTION
      Add a more complete description of what the function does.

      .PARAMETER RemoteHost
      Describe parameter -RemoteHost.

      .EXAMPLE
      Invoke-Tracert -RemoteHost Value
      Describe what this call does

      .NOTES
      Place additional notes here.

      .LINK
      URLs to related sites
      The first link is opened by Get-Help -Online Invoke-Tracert

      .INPUTS
      List of input types that are accepted by this function.

      .OUTPUTS
      List of output types produced by this function.
  #>

  
    [CmdletBinding()]
    param([string]$RemoteHost)

    & "$env:windir\system32\tracert.exe" -d $RemoteHost |ForEach-Object{
        if($_.Trim() -match 'Tracing route to .*') {
            Write-warning -Message $_ #-ForegroundColor Green
        } elseif ($_.Trim() -match '^\d{1,2}\s+') {
            $n,$a1,$a2,$a3,$target,$null = $_.Trim() -split'\s{2,}'
            $Properties = @{
                Hop    = $n
                First  = $a1
                Second = $a2
                Third  = $a3
                Node   = $target
            }
            New-Object -TypeName psobject -Property $Properties
        }
    }
}

$script:x11color = 'aliceblue
  antiquewhite4
  aquamarine4
  azure4
  bisque3
  blue1
  brown
  burlywood
  cadetblue
  chartreuse
  chocolate
  coral
  cornflowerblue
  cornsilk4
  cyan3
  darkgoldenrod3
  darkolivegreen1
  darkorange1
  darkorchid1
  darkseagreen
  darkslateblue
  darkslategray4
  deeppink1
  deepskyblue1
  dimgrey
  dodgerblue4
  firebrick4
  goldenrod
  antiquewhite
  aquamarine
  azure
  beige
  bisque4
  blue2
  brown1
  burlywood1
  cadetblue1
  chartreuse1
  chocolate1
  coral1
  cornsilk
  crimson
  cyan4
  darkgoldenrod4
  darkolivegreen2
  darkorange2
  darkorchid2
  darkseagreen1
  darkslategray
  darkslategrey
  deeppink2
  deepskyblue2
  dodgerblue
  firebrick
  floralwhite
  gold1
  goldenrod1
  antiquewhite1
  aquamarine1
  azure1
  bisque
  black
  blue3
  brown2
  burlywood2
  cadetblue2
  chartreuse2
  chocolate2
  coral2
  cornsilk1
  cyan
  darkgoldenrod
  darkgreen
  darkolivegreen3
  darkorange3
  darkorchid3
  darkseagreen2
  darkslategray1
  darkturquoise
  deeppink3
  deepskyblue3
  dodgerblue1
  firebrick1
  forestgreen
  gold2
  goldenrod2
  antiquewhite2
  aquamarine2
  azure2
  bisque1
  blanchedalmond
  blue4
  brown3
  burlywood3
  cadetblue3
  chartreuse3
  chocolate3
  coral3
  cornsilk2
  cyan1
  darkgoldenrod1
  darkkhaki
  darkolivegreen4
  darkorange4
  darkorchid4
  darkseagreen3
  darkslategray2
  darkviolet
  deeppink4
  deepskyblue4
  dodgerblue2
  firebrick2
  gainsboro
  gold3
  goldenrod3
  antiquewhite3
  aquamarine3
  azure3
  bisque2
  blue
  blueviolet
  brown4
  burlywood4
  cadetblue4
  chartreuse4
  chocolate4
  coral4
  cornsilk3
  cyan2
  darkgoldenrod2
  darkolivegreen
  darkorange
  darkorchid
  darksalmon
  darkseagreen4
  darkslategray3
  deeppink
  deepskyblue
  dimgray
  dodgerblue3
  firebrick3
  ghostwhite
  gold4
  goldenrod4
  honeydew
  hotpink
  indianred
  indigo
  ivory3
  khaki3
  lavenderblush2
  lemonchiffon1
  magenta1
  maroon1
  mediumblue
  mediumorchid4
  mediumpurple4
  mediumvioletred
  mistyrose2
  navajowhite1
  navyblue
  olivedrab2
  orange2
  orangered2
  orchid2
  palegreen1
  paleturquoise1
  palevioletred1
  peachpuff
  peru
  pink4
  plum4
  purple3
  red3
  rosybrown3
  royalblue3
  salmon2
  seagreen1
  seashell1
  sienna1
  skyblue1
  slateblue1
  slategray1
  springgreen
  steelblue
  tan
  thistle
  tomato
  transparent
  turquoise4
  violetred3
  wheat3
  yellow1
  honeydew1
  hotpink1
  indianred1
  invis
  ivory4
  khaki4
  lavenderblush3
  lemonchiffon2
  magenta2
  maroon2
  mediumorchid
  mediumpurple
  mediumseagreen
  midnightblue
  mistyrose3
  none
  olivedrab3
  orange3
  orangered3
  orchid3
  palegreen2
  paleturquoise2
  palevioletred2
  peachpuff1
  pink
  plum
  powderblue
  purple4
  red4
  rosybrown4
  royalblue4
  salmon3
  seagreen2
  seashell2
  sienna2
  skyblue2
  slateblue2
  slategray2
  snow1
  springgreen1
  steelblue1
  tan1
  thistle1
  tomato1
  turquoise
  violet
  violetred4
  wheat4
  yellow2
  honeydew2
  hotpink2
  indianred2
  ivory
  khaki
  lavender
  lavenderblush4
  lemonchiffon3
  magenta3
  maroon3
  mediumorchid1
  mediumpurple1
  mediumslateblue
  mintcream
  mistyrose4
  oldlace
  olivedrab4
  orange4
  orangered4
  orchid4
  palegreen3
  paleturquoise3
  palevioletred3
  peachpuff2
  pink1
  plum1
  purple
  red
  rosybrown
  royalblue
  saddlebrown
  salmon4
  seagreen3
  seashell3
  sienna3
  skyblue3
  slateblue3
  slategray3
  snow2
  springgreen2
  steelblue2
  tan2
  thistle2
  tomato2
  turquoise1
  violetred
  wheat
  white
  yellow3
  honeydew3
  hotpink3
  indianred3
  ivory1
  khaki1
  lavenderblush
  lawngreen
  lemonchiffon4
  linen
  magenta4
  maroon4
  mediumorchid2
  mediumpurple2
  mediumspringgreen
  mistyrose
  moccasin
  navajowhite4
  olivedrab
  orange
  orangered
  orchid
  palegoldenrod
  palegreen4
  paleturquoise4
  palevioletred4
  peachpuff3
  pink2
  plum2
  purple1
  red1
  rosybrown1
  royalblue1
  salmon
  sandybrown
  seagreen4
  seashell4
  sienna4
  skyblue4
  slateblue4
  slategray4
  snow3
  springgreen3
  steelblue3
  tan3
  thistle3
  tomato3
  turquoise2
  violetred1
  wheat1
  whitesmoke
  yellow4
  honeydew4
  hotpink4
  indianred4
  ivory2
  khaki2
  lavenderblush1
  lemonchiffon
  magenta
  maroon
  mediumaquamarine
  mediumorchid3
  mediumpurple3
  mediumturquoise
  mistyrose1
  navajowhite
  navy
  olivedrab1
  orange1
  orangered1
  orchid1
  palegreen
  paleturquoise
  palevioletred
papayawhip
peachpuff4
pink3
plum3
purple2
red2
rosybrown2
royalblue2
salmon1
seagreen
seashell
sienna
skyblue
slateblue
slategray
slategrey
snow4
springgreen4
steelblue4
tan4
thistle4
tomato4
turquoise3
violetred2
wheat2
yellow
yellowgreen'
$script:x11colors = $x11color -split "`n"