[CmdletBinding()]
param(
    [Parameter(Position = 0, Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]
    $ApiKey,

    [Parameter(Position = 1)]
    [ValidateNotNullOrEmpty()]
    [string]
    $Username = $env:system_teamProject -replace '\..+$',

    [Parameter(Position = 2)]
    [ValidateNotNullOrEmpty()]
    [string]
    $Repository = $env:system_teamProject
)
$ApiParams = @{
    Uri     = "https://api.github.com/repos/$Username/$Repository/pages/builds"
    Method  = 'POST'
    Headers = @{
        Authorization = 'token {0}' -f $ApiKey
        Accept        = 'application/vnd.github.mister-fantastic-preview+json'
    }
}

Invoke-RestMethod @ApiParams

if ($Error[0]) {exit -1} else {exit 0}
