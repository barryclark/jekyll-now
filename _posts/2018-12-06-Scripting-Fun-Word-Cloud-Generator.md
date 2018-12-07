---
layout: post
title: Scripting for Fun - Building a Word Cloud Generator
date: 2018-12-06
categories: [powershell, scriptingforfun]
tags: [wordcloud, 'word cloud', fun]
tweet: Word clouds are fun!
---

Sometimes I stumble across a particularly _intriguing_ idea which just captures my attention until
I finish making it work.
This was suggested by **[@sifb](https://github.com/HumanEquivalentUnit)** in the PowerShell [Slack](https://j.mp/psslack)
& [Discord](http://j.mp/psdiscord) group after I detailed the [process of writing Export-Png](/2018/11/15/Learning-CSharp-PowerShell/)
here.
This time around, his suggestion was to take the code from `Export-Png` and use it to create a word
cloud generator.

![The finished product!](/images/WordCloud-Lee_Dailey.png)
_Word cloud of Reddit user [/u/Lee\_Dailey](https://www.reddit.com/u/Lee_Dailey)'s posts._

@sifb has also helped me out with one of my favourite [pull requests](https://github.com/PowerShell/PowerShell/pull/7993)
to PowerShell Core, creating some of the most arcane and yet ruthlessly performant code I've seen
in a while.

This is a more or less complete little tool at the present moment, so if you'd like to check out the
finished code as you follow along, you're more than welcome to examine it in detail in
[my Github repo](https://github.com/vexx32/PSWordCloud).

# First Hurdles

This _sounds_ like a relatively straightforward thing to do, right?
I suppose, once you've got a good conceptual grasp of it, it's not too ridiculous to figure out.
However, never having approached it before, I wasn't sure how to attack the challenge.

## Position and Size of Words

Word cloud generators, typically, need some way to work out the _position_ and covered area of each
word. Thankfully, in `Export-Png` we have precisely that &mdash; sort of.

```powershell
$Width = [int] $Graphics.MeasureString($ImageText, $ImageFont).Width
$Height = [int] $Graphics.MeasureString($ImageText, $ImageFont).Height

$Image = [Bitmap]::new($Image, [Size]::new($Width, $Height))
$Graphics = [Graphics]::FromImage($Image)

# ...

$Graphics.DrawString($ImageText, $ImageFont, [SolidBrush]::new($ForegroundColor), 0, 0)
```

So, from this we have:

1. The size of the text we want to draw.
2. The position we're drawing at.

That gives us a good start, but in order to make an effective word cloud we also need to be
_keeping track_ of these things.
I'd typically use a `List<T>` for this sort of thing, but I need an object type that can store
the _position_ as well as the size.
Thankfully, in this instance, a bit of searching turns up the [Rectangle](https://docs.microsoft.com/en-us/dotnet/api/system.drawing.rectangle?view=netcore-2.1)
and [RectangleF](https://docs.microsoft.com/en-us/dotnet/api/system.drawing.rectanglef?view=netcore-2.1)
classes, which gives me exactly what I need.

In this instance, I selected `RectangleF` as it will handle floating-point position and size data,
which just makes it easier to work with the `MeasureString()` method's output.
I opted to store the objects in a `[List[RectangleF]]` collection, so that I can build it as we go.
And yes, we're drawing text, but the simplest way to avoid collisions is to treat it as a solid
rectangle and just avoid drawing over another word's "reserved space" completely.

## Avoiding Collisions or Overwrites

One of the other important things about word clouds is that they should generally avoid letting the
words overwrite each other.
This isn't particularly easy to calculate just from storing location and size information; it's
certainly _doable_, but it means a lot of manual calculation.
I suspect there is a shortcut method, if you know more geometry than I do, for determining whether a
rectangle intersects another, but I'm not familiar with it.

Instead, more looking through the `RectangleF` class shows that the .NET developers have already
considered this problem, and wrote a `[bool] IntersectsWith([RectangleF] $Other)` method.
I'll have to take a look at their code sometime, but for now it gives us exactly what we're looking
for. We can simply check any new potential draw locations by creating a rectangle and checking if
that intersects with any of our previously stored rectangles.

With those initial hurdles out of the way, we really need to think about our approach to building
the word cloud.

# How _Do_ You Build a Word Cloud, Anyway

The common approach to building a word cloud seems to be more or less stick things in a vaguely
circular or ovoid shape around the centrepoint of an image.
I've been playing in the PowerShell tokenizer still relatively recently, and a small part of that
was a fun little project to implement imaginary numbers; I'll cover _that_ perhaps in my next
[PSPowerHour](https://github.com/PSPowerHour/PSPowerHour) session!

As I was considering ways to scan for available positions to place words, I realised that complex
numbers (a.k.a. imaginary numbers) might offer a very easy solution.
For those of you who are like me, never having really looked at them until I found a lovely little
Youtube series on them, imaginary numbers can always be represented in two forms: rectangular form
**(a + bi)**, and polar coordinate form **(m &#8736; &theta;)**.

## Complex Numbers As Coordinates

Now, that's fun and all, but our _use case_ here is that they offer a fairly neat way to very easily
translate a `magnitude` and `angle` from a center point into `real` and `imaginary` portions.
With a bit of handwaving, we can pretend they are instead `X` and `Y` coordinates, which is actually
not that far from the truth: just a pair of coordinates, or a single point, in the complex plane.

That means we can quite easily create a loop that scans a full circle, and expand that to scan the
entire image in a circular or even spiral fashion, should we want to! Just one more hurdle... you
see, polar coordinate form in .NET's `System.Numerics.Complex` numbers requires us to input angles
in _radians_.
Just a little extra math!

```powershell
using namespace System.Drawing
using namespace System.Numerics

foreach ($Angle in 0..360) {
    $Radians = ([math]::PI / 180) * $Angle
    $Distance = 10
    $Complex = [Complex]::FromPolarCoordinates($Distance, $Radians)

    $Point = [PointF]::new($Complex.Real, $Complex.Imaginary)
}
```

# A Complete Algorithm

The _full_ code is rather more complicated, having additional random jitter here and there for a bit
more variety in output, and adding a bit of scaling for different image sizes, but that is
essentially the idea with its scanning algorithm, plus a bit of checking to see if the space it's
looking at is already occupied.

Working out font sizes was a particular sticking point for a short while, but in the end I came up
with a way to calculate everything out relatively neatly.
I also decided to alternate direction of radial scanning to avoid the tendency to place words on one
side instead of the other, and added a small bit of backtracking to help maximise packing as much as
possible, as it scans through words progressively.

There is one or two more interesting little bits of code that I could mention, but we covered
[ArgumentCompleters](/2018/11/29/Dynamic-ValidateSet/#option-1:-[argumentcompleter()]-and-[validatescript()])
last week, and in truth the more interesting `[ArgumentTransformationAttribute]` class in
`System.Management.Automation` deserves its own blog post, which I'll write for next week!

Once again, if you'd like to check out the word cloud code in detail, head on over to
[my Github repo](https://github.com/vexx32/PSWordCloud) where you can see the full working code.

You can also download it as a module from the PowerShell gallery with a simple command.

```powershell
Import-Module PSWordCloud
```

It will accept piped or direct input of text to its `New-WordCloud` command, and you can freely
explore different possibilities with the rather overdone set of parameters I gave it.
If you make anything particularly interesting or pretty with it, do let me know.

Thanks for reading!