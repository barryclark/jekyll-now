---
layout: post
title:  Test-GMERemoteX509Cert
categories:
    - PowerShell
tags: 
    - PowerShell
    - X509
---
I need quick method to verify whichof our services expose expiring certificates (and verify to control process of changing done by Network security team). 
Of course there are many other methods. Sometimes are obvious (like ```curl```), other looks complicated like us for simple task all [PSPKI](https://github.com/PKISolutions/PSPKI) module (as Vadims Podāns, author of first propagate on his homepage code which in misterious way  [do not work](https://www.google.com/search?q=site%3Awww.sysadmins.lv+Test-WebServerSSL) and later include it to huge PowerShell module, with C# code behing - so it diffiult to audit those code before deploy). 

From other side existing code looks good for use once, and oriented to show once and now. I take one of example [PowerShell to get remote website’s SSL certificate expiration](https://iamoffthebus.wordpress.com/2014/02/04/powershell-to-get-remote-websites-ssl-certificate-expiration/) by CRCerr0r and convert it to module. 

```powershell 
function Test-GMERemoteX509Cert {
  [CmdletBinding()]
  param(
    [int]$minimumCertAgeDays =30 ,
    [int]$timeoutMilliseconds = 10000,
    [Object[]]$urls = @(
      'https://owa.site1.services.corp/owa/auth/logon.aspx?replaceCurrent=1&url=https%3a%2f%2fowa.site1.services.corp%2fowa%2f',  
      'https://owa.site2.services.corp/owa/auth/logon.aspx?replaceCurrent=1&url=https%3a%2f%2fowa.site1.services.corp%2fowa%2f'
  ))
  
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  #disabling the cert validation check. This is what makes this whole thing work with invalid certs...
  [Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}
  $certificates = @() 
  foreach ($url in $urls)
  {
    Write-Information -MessageData Checking -Tags $url 
    $req = [Net.HttpWebRequest]::Create($url)
    $req.CookieContainer = New-Object -TypeName System.Net.CookieContainer
    $req.Timeout = $timeoutMilliseconds
    try {$null = $req.GetResponse()} catch {$errorString = ('Exception while checking URL {0} {1} ' -f $url, $_)}
    [datetime]$expiration = [system.datetime]::Parse($req.ServicePoint.Certificate.GetExpirationDateString())
    [int]$certExpiresIn = ($expiration - $(get-date)).Days
    $certName = $req.ServicePoint.Certificate.GetName()
    $null = $req.ServicePoint.Certificate.GetPublicKeyString()
    $certSerialNumber = $req.ServicePoint.Certificate.GetSerialNumberString()
    $certThumbprint = $req.ServicePoint.Certificate.GetCertHashString()
    $certEffectiveDate = $req.ServicePoint.Certificate.GetEffectiveDateString()
    $certIssuer = $req.ServicePoint.Certificate.GetIssuerName()
    if ($certExpiresIn -gt $minimumCertAgeDays) {$certAlreadyExpired = $false  } else {$certAlreadyExpired = $true}
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
      ErrorString = $ErrorString 

    }#EndPSCustomObject 
   Clear-Variable req, expiration, certExpiresIn
    $certificates += $cert
  }
  return $certificates 
  <# based on https://iamoffthebus.wordpress.com/2014/02/04/powershell-to-get-remote-websites-ssl-certificate-expiration/ 
  (yes, it just CRCerr0r  code enpck in Module and with add line [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12)
  #>
 } #EndFunction
 ```