[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [string]
    $ApiKey = $env:Build_ApiKey
)
$ApiParams = @{
    Uri     = 'https://api.github.com/repos/vexx32/vexx32.github.io/pages/builds'
    Method  = 'POST'
    Headers = @{
        Authorization = 'token {0}' -f $ApiKey
        Accept        = 'application/vnd.github.mister-fantastic-preview+json'
    }
}

Invoke-RestMethod @ApiParams

if ($Error[0]) {exit -1} else {exit 0}
