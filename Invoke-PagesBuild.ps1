[CmdletBinding()]
param(
    [Parameter(Position = 0, Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]
    $ApiKey,

    [Parameter(Position = 1)]
    [ValidateNotNullOrEmpty()]
    [string]
    $Username = $env:SYSTEM_TEAMPROJECT -replace '\..+$',

    [Parameter(Position = 2)]
    [ValidateNotNullOrEmpty()]
    [string]
    $Repository = $env:SYSTEM_TEAMPROJECT
)

$ApiParams = @{
    Uri     = "https://api.github.com/repos/$Username/$Repository/pages/builds"
    Method  = 'POST'
    Headers = @{
        Authorization = 'token {0}' -f $ApiKey
        Accept        = 'application/vnd.github.mister-fantastic-preview+json'
    }
}
'Query URI: {0}' -f $ApiParams['Uri'] | Write-Host -ForegroundColor Blue

Invoke-RestMethod @ApiParams

if ($Error[0]) {exit -1} else {exit 0}
