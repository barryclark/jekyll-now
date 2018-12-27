<#
    .SYNOPSIS
    Sends a request to the Github Pages API to trigger a Pages build for the repository.

    .DESCRIPTION
    Uses Invoke-WebRequest method to send a POST request to the Github Pages API. This request is directed at the repository
    API URL, and requires an OAuth token with appropriate permissions to be specified in order for the request to be
    accepted by the API.

    .PARAMETER Token
    Specify the OAuth API Token with which to query the Github API. If a token is not provided, or the provided token does
    not have sufficient permissions, the request will typically respond with a 404 error for any non-publicly-available
    information, such as Pages build statuses and build requests.

    .PARAMETER Username
    Specify the username of the github account the pages repo is attached to.

    .PARAMETER Repository
    Specify the repository name as it appears in the Github URL.

    .EXAMPLE
    Invoke-PagesBuild.ps1 -Token $ApiToken -Username 'GithubUser' -Repository 'GithubUser.github.io'

    .NOTES
    A 404 response may be **either** a malformed URI, caused by specifying the wrong username or repository name,
    **OR** it can also be a rejected token. Github's API opts to send a 404 response rather than a flat out rejection if the
    authentication token is rejected.

    .LINK
    https://developer.github.com/v3/repos/pages/
#>
[CmdletBinding()]
param(
    [Parameter(Position = 0, Mandatory)]
    [Alias('ApiKey', 'ApiToken', 'AuthToken')]
    [ValidateNotNullOrEmpty()]
    [string]
    $Token,

    [Parameter(Position = 1)]
    [ValidateNotNullOrEmpty()]
    [string]
    $Username = $env:SYSTEM_TEAMPROJECT -replace '\..+$',

    [Parameter(Position = 2)]
    [ValidateNotNullOrEmpty()]
    [string]
    $Repository = $env:SYSTEM_TEAMPROJECT
)

[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

$ApiParams = @{
    Uri     = "https://api.github.com/repos/$Username/$Repository/pages/builds"
    Method  = 'POST'
    Headers = @{
        Authorization = 'token {0}' -f $Token
        Accept        = 'application/vnd.github.mister-fantastic-preview+json'
    }
}
'Query URI: {0}' -f $ApiParams['Uri'] | Write-Host -ForegroundColor Blue

Invoke-RestMethod @ApiParams

Start-Sleep -Seconds 5

$ApiParams['Method'] = 'GET'
Invoke-RestMethod @ApiParams

$LocalTimeOffset = New-TimeSpan -Hours -5
$Date = [DateTimeOffset]::Now.ToOffset($LocalTimeOffset).ToString('yyyy-MM-dd')
Write-Host "Current date is: $Date" -ForegroundColor Blue

Write-Host "Available Blog Posts in [$PSScriptRoot/_posts]:" -ForegroundColor Green
Get-ChildItem "$PSScriptRoot/_posts" |
    Select-Object -Expand Basename |
    Write-Host -ForegroundColor Green

$BlogPostFile = Get-ChildItem "$PSScriptRoot/_posts" |
    Where-Object {$_.Name -match [regex]::Escape($Date)}

if ($BlogPostFile) {

    $UrlEnding = $BlogPostFile.Basename -replace '([0-9]{4})-([0-9]{2})-([0-9]{2})-(.+)', '$1/$2/$3/$4'

    $FriendlyTitle = @( $BlogPostFile | Select-String -Pattern '^title:' )[0].Line -replace '^title: '

    $BlogUrl = "https://vexx32.github.io/$UrlEnding"
    $ShortLink = Invoke-WebRequest -Uri "https://tinyurl.com/api-create.php?url=$BlogUrl" -UseBasicParsing |
        Select-Object -ExpandProperty Content

    $Tweet = "Check out my latest blog post! $FriendlyTitle - $ShortLink"
    if ($Tweet.Length -gt 140) { $Tweet.Substring(0, 108) + "... $ShortUri"}
    Write-Host "Writing Variables"
    Write-Host "##vso[task.setvariable variable=DoTweet]DO THE THING"
    Write-Host "Tweet Text: $Tweet"
    Write-Host "##vso[task.setvariable variable=Tweet]$Tweet"
}
else {
    Write-Host "No blog post detected."
}
if ($Error[0]) {exit -1} else {exit 0}
