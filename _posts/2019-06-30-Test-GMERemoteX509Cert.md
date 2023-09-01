---
layout: post
title:  Test-GMERemoteX509Cert
categories:
    - PowerShell
tags: 
    - PowerShell
    - X509
---
I need quick method to verify which of our services expose expiring certificates (and verify to control process of changing done by Network security team).  

Of course there are many other methods. Sometimes are obvious (like [```openssl s_client -showcerts -connect wwww.google.com:443```](https://langui.sh/2009/03/14/checking-a-remote-certificate-chain-with-openssl/) or ```curl```), other looks complicated like us for simple task all [PSPKI](https://github.com/PKISolutions/PSPKI) module (as Vadims Podāns, author of first propagate on his homepage code which in misterious way  [do not work](https://www.google.com/search?q=site%3Awww.sysadmins.lv+Test-WebServerSSL) and later include it to huge PowerShell module, with C# code behing - so it diffiult to audit those code before deploy. But from other side it's very interesting to see his progress. For now it's high quality code). 

From other side existing code looks good for use once, and oriented to show once and now. I take one of example [PowerShell to get remote website’s SSL certificate expiration](https://iamoffthebus.wordpress.com/2014/02/04/powershell-to-get-remote-websites-ssl-certificate-expiration/) by CRCerr0r and convert it to module. 

```powershell
function Test-GMERemoteX509Cert {
  [CmdletBinding()]
  param(
    [int]$minimumCertAgeDays =30 ,
    [int]$timeoutMilliseconds = 10000,
    [Object[]]$urls = @(
      'https://owa.site1.m.services.corp/owa/healthcheck.htm',  
      'https://owa.site2.m.services.corp/owa/healthcheck.htm'
  ))
  #disabling the cert validation check. This is what makes this whole thing work with invalid certs...
  [Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}
  $certificates = @() 
  foreach ($url in $urls)
  {
    Write-Verbose -Message "Checking  $url "
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $req = [Net.HttpWebRequest]::Create($url)
    $req.CookieContainer = New-Object -TypeName System.Net.CookieContainer
    $req.Timeout = $timeoutMilliseconds
    
    try {$result = $req.GetResponse()} catch {$errorString = ('Exception while checking URL {0} {1} ' -f $url, $_); 
    $Protos = [Net.SecurityProtocolType] | select -ExpandProperty DeclaredFields| select -ExpandProperty  name| where {$_ -notmatch '__|Default'}
    foreach ($tryProto in $Protos) {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::$tryProto 
    $req = [Net.HttpWebRequest]::Create($url)
      try {$result = $req.GetResponse()} catch {  $errorString = ('Exception while checking URL {0} {1} ' -f $url, $_);}
      } #EndForEach
    }#EndDobleCatch
    if($result) {
    [datetime]$expiration = [system.datetime]::Parse($req.ServicePoint.Certificate.GetExpirationDateString())
    [int]$certExpiresIn = ($expiration - $(get-date)).Days
    $certName = $req.ServicePoint.Certificate.GetName()
    $certPublicKey = $req.ServicePoint.Certificate.GetPublicKeyString()
    $certSerialNumber = $req.ServicePoint.Certificate.GetSerialNumberString()
    $certThumbprint = $req.ServicePoint.Certificate.GetCertHashString()
    $certEffectiveDate = $req.ServicePoint.Certificate.GetEffectiveDateString()
    $certIssuer = $req.ServicePoint.Certificate.GetIssuerName()
    if ($certExpiresIn -gt $minimumCertAgeDays) {$certAlreadyExpired = $false  } else {$certAlreadyExpired = $true}
    } # EndIf 
    $cert = [PSCustomObject]@{
      url = $url; 
      certName=$certName;
      certSerialNumber=$certSerialNumber;
      certThumbprint=$certThumbprint; 
      certEffectiveDate=$certEffectiveDate; 
      certIssuer=$certIssuer; 
      certExpiration = $expiration;
      certExpiresIn=$certExpiresIn;
      certAlreadyExpired=$certAlreadyExpired; 
      ErrorString = $ErrorString ;
   #   certPublicKey = $certPublicKey;
    }#EndPSCustomObject 
   Remove-Variable req, expiration, certExpiresIn,ErrorString -Force -ea 0 
    $certificates += $cert
  }
  return $certificates 
  <# based on https://iamoffthebus.wordpress.com/2014/02/04/powershell-to-get-remote-websites-ssl-certificate-expiration/ 
  (yes, it just CRCerr0r  code enpck in Module and with add line [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12)
  #>
 } #EndFunction
```
And I use that as following: 
```powershell 
 $exCAS= foreach ($i in (get-ExchangeServer | `
 where {$_.Site -imatch 'S.-P1' -and $_.ServerRole -imatch 'Mailbox'}| select -ExpandProperty FQDN  )){'https://{0}/owa/healthcheck.htm' -f $i}
.  'C:\Program Files\WindowsPowerShell\Modules\GMExchange\Public\fx-Test-GMERemoteX509Cert.ps1'  
$rr = Test-GMERemoteX509Cert -urls $exCAS -Verbose
VERBOSE: Checking  https://exm21.int.corp/owa/healthcheck.htm
VERBOSE: Checking  https://exm20.int.corp/owa/healthcheck.htm
VERBOSE: Checking  https://exm22.int.corp/owa/healthcheck.htm
VERBOSE: Checking  https://exm23.int.corp/owa/healthcheck.htm
VERBOSE: Checking  https://exm24.int.corp/owa/healthcheck.htm
$rr[1]
url                : https://exm20.int.corp/owa/healthcheck.htm
certName           : C=US, O=BigCorp, CN=site1.m.services.corp
certSerialNumber   : 081720
certThumbprint     : 99914C0483A9AEAABCDEF6587263A7BEEC2EB0B3
certEffectiveDate  : 2019-02-05 09:39:24
certIssuer         : C=US, O=BigCorp, CN=BigCorp INFRA CA 2019
certExpiration     : 2021-02-04 15:00:00
certExpiresIn      : 585
certAlreadyExpired : False
ErrorString        :
$rr | where {$_.certExpiresIn -lt 100}| ft -a URL,certExpiresIn
url                                        certExpiresIn
---                                        -------------
https://exm21.int.corp/owa/healthcheck.htm            73
https://exm22.int.corp/owa/healthcheck.htm            73
``` 

HTH, 

Ziemek. :) 