---
layout: post
title: Searching the PowerShell Abstract Syntax Tree
date: 2018-12-20
categories: [PowerShell, Advanced, Reference]
tags: [powershell, ast]
tweet: The AST in PowerShell is readily accessible, and occasionally it pays to know how to use it!
---

PowerShell's Abstract Syntax Tree, or AST for short, contains a full listing of all parsed content
in PowerShell code.
This means that it contains just about _everything_ you need to be able to figure out precisely what
is going on in someone's code &mdash; all without ever having to delve into regex or other text
parsing messiness.
About the only thing it **doesn't** contain are code comments, but in this instance that's not what
we're here for anyway.

If you need comments, I'm afraid that you'll have to take to searching and filtering by tokens, and
that means manually invoking the PowerShell parser &mdash; but that will have to be a story for
another day!

# Accessing the AST

Before you can search the AST, you will first need to _access_ the root AST node.
You can find these on any `scriptblock` object, which gives us a few options when it comes to
retrieving them.

1. For functions in a module or loaded in the current session, we can use `(Get-Command MyFunction).ScriptBlock.Ast`
2. For scriptblocks themselves, we can just pick it right off of them with `$ScriptBlock.Ast`
    * This also works on scriptblock literals &mdash; `{Test-Path 'C:\'}.Ast`
3. For script files themselves you can call `(Get-Command .\Path\Script.ps1).ScriptBlock.Ast` similar to how you would a function.

For the purposes of anyone following along at home, in this post I'll actually be working with a
script function from my [PSKoans](https://bit.ly/pskoans) module, namely the `Measure-Karma`
function.
To get the AST from this command, enter the following line of code:

```powershell
$CommandAST = (Get-Command -Name Measure-Karma -Module PSKoans).ScriptBlock.Ast
```

You'll actually notice that outputting either the ScriptBlock or the AST object itself _looks_
essentially identical in the console.
This is primarily because an AST object will typically just output its `Extent` property when asked
to convert to string, which should be generally the same as a scriptblock's string representation.
However, under the hood, the AST has a _ton_ of extremely important and helpful methods available.

# AST Methods and Properties

If you run check the `Get-Member` output from this AST object, you'll see the following list of
properties and methods.
I've reformatted it as a proper table to make it easier to read here, with members I think are
particularly useful marked in bold.

|Name|Type|Definition|
|----|:--------:|----------|
|Copy|Method|`System.Management.Automation.Language.Ast Copy()`|
|Equals|Method|`bool Equals(System.Object obj)`|
|Find|Method|`System.Management.Automation.Language.Ast Find(System.Func[System.Management.Automation.Language.Ast,bool] predicate, bool searchNestedScriptBlocks)`|
|**FindAll**|Method|`System.Collections.Generic.IEnumerable[System.Management.Automation.Language.Ast] FindAll(System.Func[System.Management.Automation.Language.Ast,bool] predicate, bool searchNestedScriptBlocks)`|
|GetHashCode|Method|`int GetHashCode()`|
|**GetHelpContent**|Method|`System.Management.Automation.Language.CommentHelpInfo GetHelpContent(), System.Management.Automation.Language.CommentHelpInfo GetHelpContent(System.Collections.Generic.Dictionary[System.Management.Automation.Language.Ast,System.Management.Automation.Language.Token[]] scriptBlockTokenCache)`|
|GetType|Method|`type GetType()`|
|**SafeGetValue**|Method|`System.Object SafeGetValue()`|
|ToString|Method|`string ToString()`|
|Visit|Method|`System.Object Visit(System.Management.Automation.Language.ICustomAstVisitor astVisitor), void Visit(System.Management.Automation.Language.AstVisitor astVisitor)`|
|Body|Property|`System.Management.Automation.Language.ScriptBlockAst Body {get;}`|
|Extent|Property|`System.Management.Automation.Language.IScriptExtent Extent {get;}`|
|IsFilter|Property|`bool IsFilter {get;}`|
|IsWorkflow|Property|`bool IsWorkflow {get;}`|
|Name|Property|`string Name {get;}`|
|Parameters|Property|`System.Collections.ObjectModel.ReadOnlyCollection[System.Management.Automation.Language.ParameterAst] Parameters {get;}`|
|**Parent**|Property|`System.Management.Automation.Language.Ast Parent {get;}`|

Let's take a closer look at the ones I've bolded.

## FindAll

This is what I would consider the essential method for actually _finding what you want_ in most
cases where a pre-existing function or property won't just hand you what you're looking for.

It takes two parameters: a `System.Func` predicate parameter with two generic parameters itself, and
a `bool` parameter that determines if it will recursively search nested script blocks, or just the
immediately "level" of the AST.

As I mentioned in my [Anonymous Functions](/2018/10/26/Anonymous-Functions/) post, however, we can
actually just use a rather more familiar PowerShell `scriptblock` instead of the `Func[Ast,bool]`
predicate.
The important thing is that we take note of the types specified in the `Func` parameter &mdash;
looking at the [Func[T, TResult] documentation](http://tinyurl.com/y8lndm5v) we can see that the
first type parameter is the _input_ type and the second is the _output_ type; we need a script block
that accepts an `Ast` object and outputs a `bool` object.

What does this mean? Well, effectively, it means we actually need a `param()` block in our predicate
scriptblock that accepts an AST object.
The actual _name(s)_ of the parameters you use in scriptblocks that are used for predicates doesn't
matter, but the amount of them and the type of them _will_!

You can search for AST objects based on any condition you fancy, but for a brief example I'll show
you how to use it to find all loop statements in a given AST.

```powershell
# All AST types are kept in here; this will save a LOT of writing!
using namespace System.Management.Automation.Language

$Predicate = {
    param( [Ast] $AstObject )

    return ( $AstObject -is [LoopStatementAst] )
}

$Ast.FindAll($Predicate, $true)
```

Note that this scriptblock accepts exactly one parameter &mdash; specifying the type is optional,
but will help immensely with giving you options for type inference to autocomplete property names as
you explore.
It also only outputs _one_ object; due to the type signature of the method we're calling and the
parameters it accepts, your output **will** be coerced to the expected `bool` type regardless of
whatever you output.

_N.B.: `Find()` is essentially identical, but will only return the first result, rather than a list
of all results found._

Due to the fact that any array of length two or greater resolves to `$true` when cast to `bool`
&mdash; yes, even `@($false, $false)` &mdash; you will want to ensure you don't accidentally
output multiple objects.
As such, despite the usual warnings against the `return` statement remaining very much valid, I
would recommend including one, and ensuring that that really _is_ the only thing you output here.
Just a bit of a visual reminder: _"Hey, we're only supposed to return_ **one** _thing here!"_

Naturally, you can also enter the script block as a literal, but be mindful of the often confusing
morass of code you can end up buried in.
If you _do_ want to do this, I'd recommend writing the expression like this:

```powershell
using namespace System.Management.Automation.Language

$Ast.FindAll(
    {
        param( [Ast] $AstObject )

        return ( $AstObject -is [LoopStatementAst] )
    },
    $true
)
```

This isn't a very _typical_ PowerShell style, but I have found that having too many braces or
parentheses close to each other just leads quickly to very hard to read code.
The additional spacing here is a _very_ welcome addition if you choose to write your script blocks
in the actual method calls.

The output from `FindAll()` is a rather straightforward collection that you can search or
filter with more common PowerShell methods, like `Where-Object` or the `.Where{}` method.

## GetHelpContent

Full disclosure: I had _no idea_ this existed until I started writing this post.

I'm not entirely sure **how** it works, but it seems to be the method that `Get-Help` calls in order
to look for comment-based-help data in any given function or script.
Good to know!

## SafeGetValue

This is a very interesting little method that can be executed on any AST object in order to attempt
to get a value back from it.
Mind you, only "safe" values are permitted; anything else will throw an error.

A "safe" value is one that can be expressed as a literal value and doesn't depend on anything that
might give changed values.
As far as I know, it only accepts items that can be expressed as PowerShell literals, e.g., numbers,
strings, hashtable literals, arrays, and so forth.
If you attempt to use SafeGetValue on something that may have a dynamic value (anything containing
scriptblocks, commands, .NET object instantiations, etc.) you will get the following error:

```code
Exception calling "SafeGetValue" with "0" argument(s): "Cannot generate a PowerShell object for a ScriptBlock evaluating dynamic expressions. Dynamic expression: {"A"}."
At line:1 char:1
+ {"A"}.ast.Find({$args[0] -is [System.Management.Automation.Language.S ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
+ CategoryInfo          : NotSpecified: (:) [], MethodInvocationException
+ FullyQualifiedErrorId : InvalidOperationException
```

However, if the value you want to retrieve is relatively simple, this is a guaranteed safe way to
get a value that quickly just errors out if anyone tries to replace it with something that might
possibly be dangerous to look at / execute directly.

## Parent

Each AST node actually contains a link to its parent node, which helps immensely when you need to
find something weirdly specific, for example which function in a file has a specific mandatory
parameter with position 1.
It can really simplify your code and minimise the number of furious `.Where{}` filter levels you
need.

# Rummaging Through the AST

Now that we've covered the basics of the AST, let's run through a quick example here, using
`Measure-Karma` as our guinea pig.
Follow along in your own shell, if you like, just remember to add the using statement I mentioned
before, unless you _love_ typing `System.Management.Automation.Language` _over_ and _over_ again!

```powershell
$Ast = Get-Command -Module PSKoans -Name Measure-Karma |
    ForEach-Object { $_.ScriptBlock.Ast }
```

## Finding Hashtables

Yep, we can just up and find whatever hashtables happen to be in this function.
Weird? Maybe, but let's take a look!

```powershell
$Hashtables = $Ast.FindAll(
    {
        param($Item)
        return ($Item -is [HashtableAst])
    }
)
```

Alright, let's see what these look like!

```powershell
PS> $Hashtables.Extent.Text

@{
    Script   = $KoanFile
    PassThru = $true
    Show     = 'None'
}
@{
    DescribeName = $NextKoanFailed.Describe
    Expectation  = $NextKoanFailed.ErrorRecord
    ItName       = $NextKoanFailed.Name
    Meditation   = $NextKoanFailed.StackTrace
    KoansPassed  = $KoansPassed
    TotalKoans   = $TotalKoans
}
@{
    Complete    = $true
    KoansPassed = $KoansPassed
    TotalKoans  = $PesterTestCount
}
```

You'll note that in your own console, these show up with strangely mismatching indents.
The AST for hashtables takes into account indentation in its `Extent`, but the AST only sees from
the opening symbols to the closing symbol, so no indents prior to the opening symbol will be stored
in this AST object.

What else can we get at here, programmatically?

```powershell
PS> $Hashtables.KeyValuePairs

Item1        Item2                       Length
-----        -----                       ------
Script       $KoanFile                        2
PassThru     $true                            2
Show         'None'                           2
DescribeName $NextKoanFailed.Describe         2
Expectation  $NextKoanFailed.ErrorRecord      2
ItName       $NextKoanFailed.Name             2
Meditation   $NextKoanFailed.StackTrace       2
KoansPassed  $KoansPassed                     2
TotalKoans   $TotalKoans                      2
Complete     $true                            2
KoansPassed  $KoansPassed                     2
TotalKoans   $PesterTestCount                 2
```

_Interesting_... Feel free to explore these as we go; I could spend **weeks** in some of these, so
I'll just touch on each briefly as we poke about.

## Finding Param() Declarations

We could probably just look for `[ParamBlockAst]`, I _think_, and there's probably a list of
actual parameters in it, judging by how helpful `HashtableAst` was in listing every `KeyValuePair`.
Let's check it out!

```powershell
$ParamBlock = $Ast.FindAll(
    {
        param($Item)
        return ($Item -is [ParamBlockAst])
    },
    $true
)
```

Alright, let's see what we have in here...

```powershell
PS> $ParamBlock

Attributes             Parameters             Extent
----------             ----------             ------
{CmdletBinding, Alias} {$Contemplate, $Reset} param(...
```

Fantastic! We have everything we need.
Before we delve into the parameters themselves, we can already see that there are a couple of
`Attributes` on this `ParamBlockAst` &mdash; they look rather familiar!

```powershell
PS> $ParamBlock.Attributes.Extent.Text
[CmdletBinding(SupportsShouldProcess, DefaultParameterSetName = "Default")]
[Alias('Invoke-PSKoans', 'Test-Koans', 'Get-Enlightenment', 'Meditate','Clear-Path')]
```

Now, we could do some fancy regex to go ahead and figure out which functions in a huge file actually
have `ShouldProcess` support, if we wanted.
_Or_, we could be a little more clever, and actually be 100% sure, with no regex required.

```powershell
$ParamBlocks = $Ast.FindAll(
    {
        param($Item)
        return ($Item -is [ParamBlockAst])
    },
    $true
)

$ParamBlocks |
    Where-Object {
        $_.Attributes |
            Where-Object {
                $_.Parent.Parent -is [FunctionDefinitionAst] -and
                $_.TypeName.Name -eq 'CmdletBinding'
            } |
            ForEach-Object NamedArguments |
            Where-Object {
                $_.ArgumentName -eq 'SupportsShouldProcess'
            } |
            ForEach-Object { $_.Argument.Value }
    } |
    ForEach-Object { $_.Parent.Parent.Name }
```

We need to go _two_ levels up here, because the first `Parent` of a `ParamBlockAst` is just
the `ScriptBlockAst`; the `FunctionDefinitionAst` will be _its_ parent, if this is even a function.

Okay, that may have been a _little_ intense, and for many things you can often check the
`Get-Command` output instead.
However, sometimes you might need to check specific attribute values or _how_ they were declared;
for example, checking `$_.Argument.Value` resolves even arguments like `SupportsShouldProcess` to
their inferred value.

If you were, for example, creating a compatibility-checking script, you might need to traverse the
AST of a given file or function and determine whether or not that attribute argument has had the
`= $true` omitted and flag that.
Turns out you can do just that by checking the `ExpressionOmitted` property on each of the arguments
listed in the `NamedArguments` property.

## Finding Mandatory Parameters

Now that we have the `Param()` block easily accessible, we can either use its `.Parameters` property
to look at the parameters it contains, _or_ we can simply use `FindAll()` once more to find each
`[ParameterAst]` object.
In both cases we'll get back similar output.
Let's see if we can figure out which parameters are `Mandatory`!

```powershell
$Parameters = $ParamBlocks.Parameter | Where-Object {
    $_.Attributes |
        Where-Object {
            $_.TypeName.Name -eq 'Parameter'
        } |
        ForEach-Object -MemberName NamedArguments |
        Where-Object {
            $_.ArgumentName -eq 'Mandatory'
        }
        ForEach-Object {$_.Argument.Value} # Will either be $true or $false
}
```

Let's see what that gets us!

```powershell
PS> $Parameters.Name


VariablePath : Contemplate
Splatted     : False
StaticType   : System.Object
Extent       : $Contemplate
Parent       : [Parameter(Mandatory, ParameterSetName = "OpenFolder")]
                       [Alias('Koans', 'Meditate')]
                       [switch]
                       $Contemplate

VariablePath : Reset
Splatted     : False
StaticType   : System.Object
Extent       : $Reset
Parent       : [Parameter(Mandatory, ParameterSetName = "Reset")]
                       [switch]
                       $Reset
```

The AST is a bit of a wild ride no matter how you're looking at it, but knowing how to search
through it to find exactly what you need really helps deal with it.
It's one of the core PowerShell language features that helps PowerShell itself actually handle the
script code, so don't be _too_ surprised if you sometimes get more than you bargained for; it's all
there for a very good reason.

Thanks for reading!