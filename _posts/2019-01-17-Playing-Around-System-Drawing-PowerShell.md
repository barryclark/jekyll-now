---
layout: post
title: "Playing Around with System.Drawing in PowerShell"
date: 2019-01-17
categories: [powershell, graphics]
tags: [drawing, graphics, powershell]
---

Through a bit of fiddling with [PSWordCloud](https://github.com/vexx32/PSWordCloud) I've found some
rather neat features of `System.Drawing` that are a little on the weird side, and also not the most
discoverable, so I figured I should talk a little about them.

# Disclaimers

As I have myself only recently learned, what I've been able to do here, while available in
`System.Drawing.Common`, do not work especially _well_ in Linux or Mac.
[Tyler](https://twitter.com/TylerLeonhardt) has been road testing them for me just a little bit here
and there, and it appears that in both Linux and Mac they have a hard dependency on an external Mono
library called `libgdiplus` that does not usually come packaged with PowerShell or .NET Core by
default.

Even after this library is installed:

* On Linux, it appears that attempting to instantiate the `System.Drawing.Region` class completely crashes PowerShell.
* On Mac, it seems to _work_ but I cannot guarantee its accuracy; it seems to have trouble with rendering what I asked of it quite properly.

# Some Fun Possibilities

So what I've been toying with for PSWordCloud has been the ability to construct complex structures
in the abstract, and then my process has basically been to "store" them by adding them to a Region
object, and on each iteration I check that any new additions don't interfere or overlap with
pre-existing items.

This is sort of what it looks like:

```powershell
using namespace System.Drawing

Add-Type -AssemblyName System.Drawing # Specify System.Drawing.Common on PS Core

# Init base image and graphics drawing objects
[Image] $Image = [Bitmap]::new(1024, 1024) # Width, Height
[Graphics] $DrawingSurface = [Graphics]::FromImage($Image)

# Initialize an empty region
$FilledSpace = [Region]::new()
$FilledSpace.MakeEmpty()

# Pens for outlines, brushes for fills
$Brush  [SolidBrush]::new([Color]::Black)
$PenWidth = 4.5
$Pen = [Pen]::new([Brush] $Brush, [double] $PenWidth)

foreach ($Word in $WordList) {
    [PointF]::new([double] $x, [double] $y)

    $WordPath = [Drawing2d.GraphicsPath]::new()
    $WordPath.AddString(
        [string] $Word, # The text to render as a path
        [FontFamily] $FontFamily, # [System.Drawing.FontFamily] object, mostly has the font name
        [int] $FontStyle, # Bold, italic, whatever, [System.Drawing.FontStyle] enum value as an int
        [double] $FontSize, # Em-size of the font
        [PointF] $DrawLocation, # Location of the path in the graphics space
        [StringFormat] $Format # [System.Drawing.StringFormat] object with format flags etc.
    )

    $DrawingSurface.DrawPath([Pen] $Pen, $WordPath) # Outline text
    $DrawingSurface.FillPath([Brush] $Brush, $WordPath) # Fill text

    # Add path to region
    $FilledSpace.Union($WordPath)
}
```

There's a lot going on that I'm going to sort of skip over here, because we can be here for _hours_
before it's all fully explained.
Thankfully, the [Microsoft docs on System.Drawing](https://docs.microsoft.com/en-us/dotnet/api/system.drawing?view=netcore-2.2)
are fairly complete, with some useful examples.
Explore all you like, and experiment &mdash; that's the **fun** way to learn, in my opinion!

# Checking Collisions and Overlaps

Now, you'll notice one interesting thing a little _missing_ in the above example, and that's the
sort of "collision checking" or intersection checking that I'm doing **lots** of in PSWordCloud.
To do that, we have a fairly simple process we can follow, with one small caveat.
When we're drawing out first item, we need to _ignore_ the collision checking, because the libraries
do some funny things when trying to check collisions against an empty `Region`.

With that mentioned, we can check for collisions based on the `Region` object using the
`$Region.IsVisible()` method.
This method has a _bunch_ of [overloads](https://docs.microsoft.com/en-us/dotnet/api/system.drawing.region.isvisible?view=netcore-2.2),
for working with a variety of other graphical objects, both with and without reference to an
existing graphics surface object.

Using this and just retrying a bunch of times as we scan across the image space, we can check any
given area for empty space.
You will however notice the somewhat tricky lack of an exact overload for checking the visibility of
a `GraphicsPath` &mdash; this stymied me for a moment until I realised that the `GraphicsPath`
object has a `$Path.GetBounds()` method, which returns a `[RectangleF]` object.
Using this, we can check if a given path's bounds intersect with (are visible when drawn over) the
existing Region object.

```powershell
$WordBounds = $WordPath.GetBounds()

# Returns $true if the rectangle is within the region .IsVisible() is called on
$WordIsColliding = $FilledSpace.IsVisible($WordBounds)
```

With that, we have the framework for figuring out whether or not objects collide or not, and there
are a _whole_ lot of different objects you can work with in `System.Drawing` &mdash; lines, curves,
ellipses, polygons, paths, etc. And with the `GraphicsPath` objects, you can create literally
anything you want or need using its methods.

Some of this stuff is really handy for creating images, and it's also _so completely outside_ the
normal bent for PowerShell folks that working with it is utterly alien for myself, and I'm sure for
many others out there.

Go wild, have fun, and see what crazy things you can come up with!

Thanks for reading!