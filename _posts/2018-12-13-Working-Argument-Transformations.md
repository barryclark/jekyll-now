---
layout: post
title: Working With Argument Transformations in PowerShell
date: 2018-12-13
categories: [powershell, advanced]
tags: [argument, parameter, transformation, powershell]
---

When dealing with some of the more interesting .NET code classes, and also in regular PowerShell
use, one often finds that we can come to a point where we feel as though we need half a dozen
parameter sets, just to handle the different ways that a user might want to input rather important
parameters for our functions.
Thankfully, PowerShell has a very effective answer for this:
`[System.Management.Automation.ArgumentTransformationAttribute]`.

# How It Works

A simple breakdown of how this feature can be implemented to _great_ effect is as follows:

* **Define your parameter type.** For example's sake, I'll use `System.Drawing.Size` as I've been using it for that recently.
* **Determine what types of input you'd like to accept.** For me, I'd like to allow users to input ordinary integers as well as specific string formats for sizes, e.g. `4096`, `1920x1080`, `1080p`.
* **Create a new class** that inherits `System.Management.Automation.ArgumentTransformationAttribute`.
* **Define the allowable transformations** by implementing the `[object] Transform([EngineIntrinsics]$engineIntrinsics, [object] $inputData) { }` method in your class.

# A Thorough Example

So, let's take a look at what we can do to work out how to translate a string or perhaps an integer
into a `System.Drawing.Size` object. I would like to allow users to input any of the following:

1. Any arbitrary integer (within reason); this would be used as both `Width` and `Height` values.
2. A well-formatted string; `1000x1000` &mdash; two numbers separated only by an `x` that will be used as width and height, respectively.
3. A predetermined resolution size; e.g., `1080p` or `720p`.
4. An actual `Size` or `SizeF` object.

So, what we really need here is to implement a switch statement that checks the input type and then
handles the input accordingly.
This will effectively step in and let PowerShell know how we want our input handled, when we apply
the attribute to a parameter.

## A Basic Function

First, let's look at a simple function that will let us check the input and how it's getting
handled, or just throw parameter binding errors when that fails.

```powershell
using namespace System.Drawing

$Assembly = if ($PSEdition -eq 'Core') { 'System.Drawing.Common' } else { 'System.Drawing' }

Add-Type -AssemblyName $Assembly

function Test-SizeInput {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [Size]
        $Size
    )

    Write-Host "The size is $Size."
}
```

If you try to input anything other than a valid `Size` object, there's a good chance it'll simply be
rejected out-of-hand.
The built-in argument transformation code paths aren't really designed to do what we want them to.

## The `ArgumentTransformationAttribute` Implementation

Now let's take a look at creating a transformation attribute.

```powershell
using namespace System.Drawing
using namespace System.Management.Automation

$Assembly = if ($PSEdition -eq 'Core') { 'System.Drawing.Common' } else { 'System.Drawing' }

Add-Type -AssemblyName $Assembly

# Inherit the base transformation attribute
class SizeTransformAttribute : ArgumentTransformationAttribute {
    # Implement the Transform() method
    [object] Transform([EngineIntrinsics]$engineIntrinsics, [object] $inputData) {
        <#
            The parameter value(s) are passed in here as $inputData. We aren't accepting array input
            for our function, but it's good to make these fairly versatile where possible, so that
            you can reuse them easily!
        #>
        $outputData = switch ($inputData) {
            { $_ -is [Size] } {
                # Handle direct Size input
                $_
            }
            { $_ -is [SizeF] } {
                # We don't want SizeF exactly, but it can be easily converted to Size
                $_.ToSize()
            }
            { $_ -is [int] } {
                # Use input data as both width and height parameters
                [Size]::new($_, $_)
            }
            { $_ -is [string] } {
                <#
                    Most input that doesn't come in as either a number or a complete object will be
                    read as string input, so we need to check what's actually being input.
                #>
                if ($_ -in [SizeTransformAttribute]::PredefinedSizes.Keys) {
                    # If we encounter a predefined input size string, we can just get the size back
                    [SizeTransformAttribute]::PredefinedSizes[$_]
                }
                elseif ($_ -match '(?<Width>[0-9,]+)x(?<Height>[0-9,]+)') {
                    # If we can regex match the string for a width and height, make the Size object
                    [Size]::new($Matches['Width'], $Matches['Height'])
                }
                else {
                    # Unrecognised string; throw an exception.
                    throw [ArgumentTransformationMetadataException]::new(
                        "Input string '$_' could not be converted to a valid Size object."
                    )
                }
            }
            default {
                # If we hit something we can't convert, throw an exception
                throw [ArgumentTransformationMetadataException]::new(
                    "Could not convert input '$_' to a valid Size object."
                )
            }
        }

        <#
            Now that we have one or more output Size objects, I'd like to validate that they're
            within reasonable limits; System.Drawing.Graphics and System.Drawing.Image only really
            support working with images up to just over 20,000x20,000 (400,000,000 pixels total)
            so we can validate based on that.
        #>
        foreach ($Size in $OutputData) {
            $Area = $Size.Width * $Size.Height
            if ($Area -gt 20000 x 20000) {
                throw [ArgumentTransformationMetadataException]::new(
                    "The size value '$Size' is larger than can be handled for Image or Graphics."
                )
            }
        }

        <#
            If nothing throws alarm bells, hand back the output data, which will contain one or more
            Size objects.
        #>
        return $OutputData
    }

    # Define our standard set of input strings
    static [hashtable] $PredefinedSizes = @{
        '4K'    = [Size]::new(4096, 2160)
        '1080p' = [Size]::new(1920, 1080)
        '720p'  = [Size]::new(1280, 720)
    }
}

function Test-SizeInput {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        # Add your attribute by name as a parameter attribute, like any other.
        [SizeTransformAttribute()]
        [Size]
        $Size
    )

    Write-Host "The size is $Size."
}

```

That seems like a fair bit of code, really, but in effect it's just a big `switch` statement that
tells PowerShell how to handle otherwise impossible to parse input.
This approach allows you to use standard .NET classes when working in your function, and offload the
messy work of parsing easy-to-write input to a helper class, which is _invaluable_ when dealing with
a more complex class.

Rather than needing a whole other _parameter set_ to handle the different input style, you can keep
your function's parameters nice and tidy, and simply list in your parameter's help secion the
various types of input formats that the parameter can accept.
This allows users to easily input whatever value(s) they wish, without having to figure out exactly
how to create a properly-formed object themselves.

## Alternatives

Realistically, the only comparable method here is to create your own parameter type as a class in
and of itself.
I personally _do not like_ the way this ends up hiding the underlying "true" parameter type.
When users check the help, instead of a class name they could easily look up, they see an unfamiliar
class name that may or may not have any available online documentation, let alone any readily
available comment-based help!

As a result, this tends to lead to more complex and hard to work with functions &mdash; in my
opinion.
I know of several successful modules that prefer this alternative solution, and while I am sure it
too has its advantages, I prefer _not_ to expose types from a module wherever possible, as
frequently it is difficult to handle them directly.
I am of the opinion that such implementation details should be hidden to the user except as
footnotes that inform them that alternate modes of input are acceptable for affected parameters.

Thank you for reading!