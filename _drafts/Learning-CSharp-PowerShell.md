---
layout: post
title: Learning C# By Translating For PowerShell
date:
categories: [powershell, csharp]
tags: [powershell, csharp, function, translation, 'export-png']
---

## C# and PowerShell

PowerShell is built directly on top of C#, written in C#, and has access to almost everything that
.NET can give you.

## Let's Get Translating

### Finding Code to Work With

This code came from [a StackOverflow answer](https://stackoverflow.com/questions/6826921/write-text-on-an-image-in-c-sharp)
asking about a similar goal; writing text over an image.

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