---
layout: post
title: Learning C# By Translating For PowerShell
date:
categories: [powershell, csharp]
tags: [powershell, csharp, function, translation, 'export-png']
---

## C# and PowerShell

PowerShell is built directly on top of C#, written in C#, and has access to almost everything that
.NET can give you. As a result, a lot of PowerShell syntax has very similar C# analogues, and much
of C# can be translated into usable PowerShell code without much hassle.

Of course, you can also work with `Add-Type` to simply execute arbitrary C# code for you to work
with from PS if you want, but for our purposes we'll be doing direct translating so that you can see
how the two languages relate to one another, and how similar tokens look a little different in each
language.

## Let's Get Translating

### Finding Code to Work With

This code came from [a StackOverflow answer](https://stackoverflow.com/questions/2070365/how-to-generate-an-image-from-text-on-fly-at-runtime)
asking about a similar goal; creating an image from text input. We can do a very near-direct
translation of this method to a PowerShell function.

```csharp
private Image DrawText(String text, Font font, Color textColor, Color backColor)
{
    //first, create a dummy bitmap just to get a graphics object
    Image img = new Bitmap(1, 1);
    Graphics drawing = Graphics.FromImage(img);

    //measure the string to see how big the image needs to be
    SizeF textSize = drawing.MeasureString(text, font);

    //free up the dummy image and old graphics object
    img.Dispose();
    drawing.Dispose();

    //create a new image of the right size
    img = new Bitmap((int) textSize.Width, (int)textSize.Height);

    drawing = Graphics.FromImage(img);

    //paint the background
    drawing.Clear(backColor);

    //create a brush for the text
    Brush textBrush = new SolidBrush(textColor);

    drawing.DrawString(text, font, textBrush, 0, 0);

    drawing.Save();

    textBrush.Dispose();
    drawing.Dispose();

    return img;
}
```

### The Method Signature

```csharp
private Image DrawText(String text, Font font, Color textColor, Color backColor)
```

In C#, this is known as a _method signature_. You can think of it a bit like a `param()` block in
PowerShell. In fact, this could be used almost directly in PowerShell as a simple function, but I
think it's more worthwhile to convert this to a `param()` block so that we can work with the
PowerShell pipeline.

#### Let's Break it Down

* `private`: This is an _access modifier_, preventing anything outside the class from accessing the following property or method. **Remove** these, as they are not valid in PowerShell.
* `Image`, `String`, `Font`, `Color`: These are _type declarations_, which are directly analogous to `[string]` and so forth in PowerShell, and we can translate them as such.
  * These type names are _not fully qualified_, and don't mention the namespace they belong to. Sometimes you'll have to Google for these, but these are kept in `System.Drawing`. We can keep the short names in PS 5 and up by declaring `using namespace System.Drawing`. In this case, `System.Drawing` isn't an assembly that's loaded by default, so we _also_ need to call `Add-Type -AssemblyName System.Drawing`.
* `DrawText( ... )`: This is the method name and parameters.
* `String text`, `Font font`, etc.: These are the method parameter names and their types, as mentioned above. These will be replaced with PowerShell **variables** and type declarations.

_Converting_ this is relatively straightforward. Let's do it step by step.

##### Step 1: Simple Function

Here, we'll just get as-close-as-possible PowerShell code by converting each of the aforementioned
pieces of the method signature in turn:

```csharp
private Image DrawText(String text, Font font, Color textColor, Color backColor)
```

```powershell
function DrawText([string] $text, [Font] $font, [Color] $textColor, [Color] $backColor) { }
```

## The Finished Product

With some additional bits and pieces, we make our way to a fully fleshed-out PowerShell function!

```powershell
using namespace System.Drawing
using namespace System.Windows.Forms
using namespace System.Collections.Generic

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

function Export-Png {
    [CmdletBinding()]
    [Alias('epng', 'draw')]
    param(
        [Parameter(Position = 0, Mandatory, ValueFromPipeline)]
        [Alias('InputObject','String')]
        [string[]]
        [ValidateNotNullOrEmpty()]
        $InputString,

        [Parameter(Position = 1, Mandatory, ParameterSetName = "SaveFile")]
        [Alias('OutFile','File')]
        [ValidateNotNullOrEmpty()]
        [string]
        $DestinationFile,

        [Parameter(Position = 1, Mandatory, ParameterSetName = "Clipboard")]
        [switch]
        $ToClipboard
    )
    begin {
        [Bitmap] $Image = [Bitmap]::new(1, 1)
        [List[string]] $StringList = @()

        $Width = 0
        $Height = 0
        # Create the Font object for the image text drawing.
        $ImageFont = [Font]::new(
            "Consolas",
            12,
            [FontStyle]::Regular,
            [GraphicsUnit]::Point
        )

        # Create a graphics object to measure the texts width and height.
        $Graphics = [Graphics]::FromImage($Image)
        $FontColor = [Color]::FromArgb(192, 192, 192)
    }
    process {
        foreach ($Line in $InputString) {
            $StringList.Add($Line)
        }
    }
    end {
        $ImageText = $StringList -join "`n"

        # This is where the bitmap size is determined.
        $Width = [int] $Graphics.MeasureString($ImageText, $ImageFont).Width
        $Height = [int] $Graphics.MeasureString($ImageText, $ImageFont).Height

        # Create the bmpImage again with the correct size for the text and font.
        $Image = [Bitmap]::new($Image, [Size]::new($Width, $Height))

        # Add the colors to the new bitmap.
        $Graphics = [Graphics]::FromImage($Image)

        # Set Background color
        $Graphics.Clear([Color]::Black)
        $Graphics.SmoothingMode = [Drawing2D.SmoothingMode]::AntiAlias
        $Graphics.TextRenderingHint = [Text.TextRenderingHint]::AntiAlias
        $Graphics.DrawString($ImageText, $ImageFont, [SolidBrush]::new($FontColor), 0, 0)
        $Graphics.Flush()
        switch ($PSCmdlet.ParameterSetName) {
            "SaveFile" {
                try {
                    $Image.Save($Path, [Imaging.ImageFormat]::Png)
                }
                catch {
                    $PSCmdlet.WriteError($_)
                }
            }
            "Clipboard" {
                [Clipboard]::SetImage($Image)
            }
        }
    }
}
```