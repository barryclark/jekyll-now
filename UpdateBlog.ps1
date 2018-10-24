[PSCredential]$Credential = Import-Clixml -Path "$PSScriptRoot\SecureToken.clixml"

$ApiParams = @{
    Uri     = 'https://api.github.com/repos/vexx32/vexx32.github.io/pages/builds'
    Method  = 'POST'
    Headers = @{
        Authorization = 'token {0}' -f $Credential.GetNetworkCredential().Password
        Accept        = 'application/vnd.github.mister-fantastic-preview+json'
    }
}

Invoke-RestMethod @ApiParams

if ($Error[0]) {exit -1} else {exit 0}
