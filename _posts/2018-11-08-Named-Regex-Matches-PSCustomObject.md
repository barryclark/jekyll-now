---
layout: post
title: Using Named Regex Matches to Build PSCustomObjects
date: 2018-11-08
categories: [powershell]
tags: [powershell, regex, PSCustomObject, PSObject, tips, match]
---

Regex is often considered something of a black art, and not without reason. It is, arguably, the
antithesis to PowerShell in terms of syntax. It's terse, unforgiving, and difficult to get
meaningful debug data out of. However, sometimes you just have to parse text, and there often is no
better tool than some well-applied regex.

## Text Parsing is Messy

There's no way around it, really. At some point when parsing text, the code gets messy. Personally,
I like to constrain the awful bits to regex, and make the most of it. Its terseness becomes an
advantage here, as it contains the mess in one small spot, rather than resulting in large blocks of
crude, messy parsing code.

### Objects Are Not

There are a lot of ways to cram otherwise messy text into an object in PS. You can manually parse
with or without regex, extracting data one painful piece at a time to build your object. You can use
`ConvertFrom-String` or `ConvertFrom-StringData` (a personal favourite of mine).

But using the built-in language features of PowerShell's regex engine, which originates from the
.NET libraries, is perhaps the most effective and simple way to go.

## The Setup

Let's say we're trying to parse the output from the Windows `netstat` command, which looks like
this:

```code
PS ~\> netstat

Active Connections

  Proto  Local Address          Foreign Address        State
  TCP    127.0.0.1:2002         WS-JOEL:51464          ESTABLISHED
  TCP    127.0.0.1:5354         WS-JOEL:49695          ESTABLISHED
  TCP    127.0.0.1:5354         WS-JOEL:49696          ESTABLISHED
  TCP    127.0.0.1:27015        WS-JOEL:51470          ESTABLISHED
```

We _could_ parse this with a whole bunch of ```$string.Split('`t')``` methods and a `while` loop,
but cramming all that into a custom object would leave us with messy and difficult to read and
review code.

## Parsing with Regex

The ultimate goal here is to end up with an array of custom objects that we can emit to the
pipeline, and to remove any unusable munged data. A basic regex pattern capable of parsing the
netstat output would look something like this:

`(\w+)\t(([0-9]+\.){3}[0-9]+):([0-9]+)\t([\w\d_-]+):([0-9]+)\t(\w+)`

Okay, _wow_, what a mess. We could stop this pattern here and deem it "good enough," but it would
likely need at _least_ five lines of comments to properly document what that pattern is doing, so
that it's recognisable at a glance. Let's improve this with a few **named match groups**:

### Named Matches

```powershell
$MatchPattern = @(
    '(?<Protocol>\w+)'
    '(?<LocalAddress>(?:[0-9]+\.){3}[0-9]+):(?<LocalPort>[0-9]+)'
    '(?<RemoteAddress>[\w\d_-]+):(?<RemotePort>[0-9]+)'
    '(?<State>\w+)'
) -join '\s+'
```

Notice that due to the _length_ of the string I have split it with a common delimiter here and
opted to have it programatically joined into a single match string with the missing `\s`
(whitespace) characters that are also a necessary part of the pattern. This is an optional step
that lends us some extra readability in the match pattern.

### Try Before You Buy

It's always a good idea to check your pattern against the string you _want_ to match, to see what
happens.

```powershell
# String copied from NETSTAT output
$String = '  TCP    192.168.22.144:51546   vs-in-f188:5228        ESTABLISHED'
$String -match $MatchPattern

# Output
$true
```

Okay, great! Now let's check the `$Matches` variable. This is automatically populated when doing a
`-match` operation on a single string.

```powershell
$Matches

# Output
Name                           Value
----                           -----
Protocol                       TCP
RemotePort                     5228
LocalPort                      51546
State                          ESTABLISHED
LocalAddress                   192.168.22.144
RemoteAddress                  vs-in-f188
0                              TCP    192.168.22.144:51546   vs-in-f188:5228        ESTABLISHED
```

Interesting. You can see that _all_ our requested match groups are there, plus one extra. One of
those is the result of the unnamed match group within the IP address match, and the other is the
_full_ matched string. We're halfway there.

## Let's Get Down to Business

`$Matches` is a `[hashtable]`, and in PowerShell we can convert this directly to `[PSCustomObject]`.
However, in a case like this we're not particularly interested in the full string that gets matched,
since that's basically just our original data. Instead, we'd _much_ rather trim out the extra values
and just convert the result.

Making use of output from `netstat` itself, this is one possible method of making it happen:

```powershell
$Pattern = @(
    '(?<Protocol>\w+)'
    '(?<LocalAddress>(?:[0-9]+\.){3}[0-9]+):(?<LocalPort>[0-9]+)'
    '(?<RemoteAddress>[\w\d_-]+):(?<RemotePort>[0-9]+)'
    '(?<State>\w+)'
) -join '\s+'

$Connections = netstat | ForEach-Object {
    if ($_ -match $Pattern) {
        $Matches.Remove(0)
        [PSCustomObject]$Matches
    }
} | Select-Object -First 5

$Connections | Format-Table

# Output
RemotePort LocalPort State       LocalAddress RemoteAddress Protocol
---------- --------- -----       ------------ ------------- --------
51464      2002      ESTABLISHED 127.0.0.1    WS-JOEL       TCP
49695      5354      ESTABLISHED 127.0.0.1    WS-JOEL       TCP
49696      5354      ESTABLISHED 127.0.0.1    WS-JOEL       TCP
51470      27015     ESTABLISHED 127.0.0.1    WS-JOEL       TCP
5354       49695     ESTABLISHED 127.0.0.1    WS-JOEL       TCP
```

The `Format-Table` is simply for display here, as custom objects with more than 4 properties output
in list format by default.

### Caveats

As always, each approach has its share of potentially-undesirable results. Most immediately obvious
is that the order of the properties is not preserved, because `$Matches` is a hashtable. If we want
to define a specific display order, we have two fairly simple options.

One is to insert a `PSTypeName` property and add a formatting hint for that type name in order to
specify the order the properties are displayed in.

The other option is to define a class with these properties and cast the hashtable to that class
type instead of `[PSCustomObject]`.

In _both_ cases you can add other formatting hints, such as properties to avoid displaying by default.

### Using Classes

```powershell
class Connection {
    [datetime] $Timestamp
    [string] $Protocol

    [string] $LocalAddress
    [int] $LocalPort

    [string] $RemoteAddress
    [int] $RemotePort

    [string] $State

    Connection() {
        $this.Timestamp = Get-Date
    }
}

$Pattern = @(
    '(?<Protocol>\w+)'
    '(?<LocalAddress>(?:[0-9]+\.){3}[0-9]+):(?<LocalPort>[0-9]+)'
    '(?<RemoteAddress>[\w\d_-]+):(?<RemotePort>[0-9]+)'
    '(?<State>\w+)'
) -join '\s+'

$Connections = netstat | ForEach-Object {
    if ($_ -match $Pattern) {
        $Matches.Remove(0)
        [Connection]$Matches
    }
} | Select-Object -First 5

$Connections | Format-Table
```

As you can see, it's relatively similar to working with a `[PSCustomObject]`. In essence, as long as
the properties you're trying to set are publily settable, and the object type you're casting to has
a default public constructor (i.e., one that takes no parameters) you can cast a hashtable to it.

If there is an appropriate .NET type the fits the bill, you can even cast to _that_, should you see
the need to do so.

Not all data is sufficiently consistent for regex to yield meaningful results, but _most_ data
sources can be regexed. However, in a lot of cases there are more effective and quick methods to
get the data in PowerShell.

Thanks for reading!
