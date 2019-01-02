---
layout: post
title: Contributing to Open Source Projects - PowerShell Core
date: 2019-01-03
categories: [powershell, contributing, "PS Core"]
tags: [powershell, csharp, github, "open source"]
---

It's been a little while now since I started contributing to PowerShell Core,
so I thought it's probably an apt time to talk about it a little bit.
I've come to the conclusion that sooner or later, we should probably _all_ look to see if we can
contribute anything to whichever tools we happen to be using.
After all, there really is no one better suited to guide the development of the tools _you're using_
on a daily basis than **you**.
I'll try to break down why I think we should all look to contribute a little something back to the
tools we use in our day-to-day lives wherever we can.

Developers often have their own ideas for where the project is headed, and that's fantastic &mdash;
having a concrete vision for where they want to take the project is essential, if they ever want to
get it off the ground and in common use.
However, it is also arguably just as important for those of us who actually use the end product to
be able to offer our own perspective, experience, and ideas.
A project maintained alone can only survive so long, after all.

Without a new perspective every once in a while, many things get ignored or overlooked; it's
essential to be able to hear about the areas where the product falls short as well as the areas it
does well.
Without that, it becomes a never-ending minefield of guessing what will be valuable in the short
term as well as what is worthwhile pursuing in the long-term.

# Selfish Selflessness: Perspective is Important

While it may not always be _voiced_, I can't help but feel that all too often I see people take the
attitude of _"well, it doesn't necessarily help me or what I'm doing; why should I bother?"_
Certainly, there may not always be a clear reason to contribute to an open source project.
It mightn't help you in your day to day _immediately_ with that specific tool, or you mightn't have
the necessary knowledge **right now** to make something happen that you'd like to see.

Even so, I think it's well worth your while to contribute as much as you're able to spare the time
for as a hobby.
I have at least a few reasons for believing this.

## Reason 1: It helps the overall development of the project

You mightn't be able to contribute immensely to the core functionality of a tool, you mightn't even
be all that familiar with the language used to create the tool.
Even so, you can chip in and help out with a small amount of the "simpler" things, like:

* Low-priority issues
* Minor bugs
* Small quality-of-life improvements
* **Documentation**

I emphasize documentation because it's the easiest to neglect, but also one of the most important
things that affects the adoption of products as well as new features.

Helping out with these "less-important" but frequently overlooked "minor" things can really free up
other contributors and the project maintainers to be able to dedicate their time to the more
flashy and impressive new features or overhauls that _always_ take more time.
If they're always finding their time chipped away by having to constantly handle the small stuff,
they'll be caught in the uncomfortable place of either having to _ignore_ these issues entirely to
get that new feature completed (often to the detriment of documentation), or they'll have to forego
the necessary time investment to properly complete or even get any work done at all on the new
feature they've been trying to work on.

With even a handful of people helping chip away at the smaller issues, the ones that seem on the
surface to be "less important" no longer need take up time for everyone else who is contributing to
the project.
As a result, the project's development can be accelerated quite a bit just by a few people taking a
little time to jot down some documentation or tackle the relatively simpler fixes and minor issues.

## Reason 2: It helps you develop your own skills, or learn new ones

My first contribution to PowerShell Core was very much a trial by fire, as Patrick put it.
I was grumbling in the PowerShell [Discord](https://j.mp/psdiscord) server about how it was very
annoying that you can't specify named parameters for .NET methods in PowerShell, I think.

Enter Patrick, stage left (known widely as [@seeminglyscienc](https://twitter.com/seeminglyscienc)
on Twitter, and similarly [SeeminglyScience](https://github.com/SeeminglyScience) on Github) who
simply asked me "Why don't _you_ make it happen?"

Frankly, I was surprised.
I hadn't even _considered_ doing it myself &mdash; and I suspect I am not the only one out there who
simply hasn't even considered contributing.
That's part of the reason I'm writing this at all, really.

I knew I was out of my depth, but Patrick was keen to help me figure it out.
He gave me initial pointers, some places to start, and told me to send him a message if I got stuck.
In the interests of transparency, that idea _still_ hasn't really gotten anywhere.
It's still out of my depth a bit, but I'm confident now that given enough time to work on it and
sufficient guidance, I could absolutely make it happen.
It's a pet project that I've not yet found the time to complete just yet, but it's very much doable.

Before I got too far with _that_, however, someone brought up PowerShell's rather **sparse** support
for different numeric types.
Sure, you can apply a type cast, but unlike many other languages &mdash; including its close cousin
C# &mdash; PowerShell really only supported `int`, `long`, `decimal`, and `double` at the time.
(This has [since](https://github.com/PowerShell/PowerShell/pull/7813) [changed](https://github.com/PowerShell/PowerShell/pull/7901).)

I started to wonder about this as well, and before long I asked Patrick if he knew where I should
start looking &mdash; and of course he did.
I've since found that quite a lot of the folks you'll run across in the PowerShell repository (and
indeed many of those who maintain or contribute to projects written in PowerShell) are _extremely_
helpful and willing to point you where you need to go.

After several iterations and a couple of pull requests I ended up closing because, frankly, my
commit history was an absolute **mess**, I had a three part project on my hands.
The last pull request in this particular saga is still pending review, but if you're interested in
checking out the improvements I coded into the tokenizer (including the native ability for PS to
parse binary numbers, with a _very_ gracious nod to [HumanEquivalentUnit](https://github.com/HumanEquivalentUnit)
for his impressive work helping me refine and optimize the binary parse method) you can find that
ongoing [here](https://github.com/PowerShell/PowerShell/pull/7993) at the time of writing.

And beyond that, I've since branched out into some extra smaller projects, like improving the type
inference for `$_` and `$PSItem` in a `catch {}` block, once again with some interesting ideas from
Patrick's inventive mind.

Now, I started out knowing _some_ C#, but not an awful lot.
I would say I knew just enough to be able to comprehend most code bases I would be reading, but in
terms of actually being able to _write_ it well, I was pretty rusty at best.
I took one year of a C# course back in college, and then got too bored to continue; I wasn't exactly
the model student for that sort of thing.
However, having a project to puzzle over for a time really helped me get a great many more tools
under my belt, and I'm relatively confident that at the moment I could probably work in any codebase
I want to, provided I have a little bit of extra time to familiarize myself with the code and
general structure.

## Reason 3: It prepares you to take on the tougher stuff

As I mentioned above, I made it rather hard for myself in the beginning when I started contributing
to PS Core; I can't say I would _recommend_ starting that way, but it certainly has its merits.
Even so, it's probably not for **everyone**.
We all learn in different ways, after all.

But no matter where you start, you'll be gaining some amount of familiarity with the project's code,
their general code of conduct, their methodology when it comes to the product's lifecycle and the
rhythm they like to work with.

Hang around the repository and look at other people's pull requests, talk about issues that are
raised, and keep learning.
Sooner or later, you'll be ready enough to tackle that issue you've been eyeing for the past couple
weeks.
And if you're not quite sure where to start, I can think of no better way than to simply submit an
issue on the problem or enhancement you're looking to create, lay out what you do know, what you
don't, and more often than not someone else will happily help you figure out where to start.

If you hit a major roadblock, don't be afraid to submit a WIP pull request and ping a few of the
active maintainers or contributors asking for a bit of assistance.
Most of them are only too happy to help, overjoyed that someone else is also willing to help out,
even if they're having difficulties.

# Contribute

With that all said, I really only can urge everyone to contribute wherever they can.
It's all too easy to say "Well, someone _else_ will make it happen eventually."
And, sure, maybe they will.
But maybe they **won't**, because they think _just like you_.

Change happens when a _community_ makes it happen, not when one lone person decides it's time.
Time and time again we see in this world that some corporate "leader" or CEO tries to make something
change, but doesn't really tell anyone else how or why it _should_ change.
Inevitably, it backfires &mdash; the community is a rubber band that pulls things back to how they
were in some form or another.

If you want your favourite tool, framework, or language to get better, it's very much up to you.
Many will grow without you, if they must, but in just about every case, another pair of helping
hands and a fresh set of eyes with just a _slightly_ different perspective can really amplify the
growth and accelerate progress immensely.

What deserves your time?

What deserves your perspective?

How can you make an impact?
