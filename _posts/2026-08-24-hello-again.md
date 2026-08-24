---
title: "Hello, again"
date: 2026-08-24 09:00:00 +0530
tags: [meta, writing]
description: "A rebuilt site, a tagging system, and a small tool that turns photographs of my notebook into blog posts."
---

I've had this domain for the better part of a decade and mostly let it rot. The old
theme was a fork of a fork, the last post went up in 2020, and every time I thought
about writing something I ran into the same wall: the distance between "I have a
thought" and "the thought is published" was too long.

So I rebuilt it, and I rebuilt it around that specific problem.

## What changed

Three things.

**The theme is gone.** Everything here is hand-written now — a couple of layouts, one
stylesheet, no framework. It loads instantly, reads well on a phone, and has a dark
mode that respects your system preference. That's the whole spec.

**Posts have tags.** Every post declares its tags in front matter and they're all
browsable from the [tags page](/tags/). If you only care about the machine learning
posts, you can read only those.

**Notes go in, posts come out.** This is the part I actually care about.

## The notebook problem

I think on paper. Not by choice exactly — it's just that when I'm working through
something hard, a whiteboard or a notebook is the only place the thinking actually
happens. Which means the good stuff lives in a pile of A5 pages that nobody, including
me, will ever read again.

Typing them up is a chore, and chores don't get done. So the fix had to remove the
chore entirely: photograph the pages, and let a model do the transcription and the
first structural pass.

There's a tool for this now — `notes2blog`, which lives locally at `~/tools/notes2blog`
(kept out of this repo). Drop in photos of a notebook, it reads the handwriting, works
out what the argument actually is, and writes a draft in my voice with suggested tags.
Then it stops and shows me the rendered result.

The stopping matters. It is not allowed to publish anything I haven't read. I edit the
draft in the browser, fix whatever it got wrong about my handwriting or my point, and
only then click **Approve & Publish** — which commits the markdown file and pushes it
here.

## What this isn't

It isn't a machine that writes posts for me. The model transcribes and structures; the
argument is mine, and the final pass is mine. What it removes is the twenty minutes of
retyping that was quietly killing every idea before it got written down.

We'll see if it works. The evidence will be whether there's a second post.
