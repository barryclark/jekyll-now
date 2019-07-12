---
layout: post
title: Fusing images with Pillow
---

Every once in a while I think it's nice to print out some photos, but often the paper sizes available to me are a bit to large and not appropriate for what I want to use the printouts for. A workaround I usually employ is fusing the images together pairwise, printing the fused images on the paper size I have available and then cut the printed images in half. Doing this manually is really frustrating so I managed to create a little script that does this for me, given a directory with images with the same aspect ratios.

{% gist 73498113541412935482bc45f959e189 %}

It is fairly easy to add logic to filter for the aspect ratio. A predicate to distinguish between 4:3 and 3:2 could look like this:

```python
three_two = lambda x: abs(3/2 - max(x.size)/min(x.size)) < abs(4/3 - max(x.size)/min(x.size))
```

Thought I'd leave this up here if it's of use to anyone and (mainly) for when I inevitably want to repeat the process having forgotten how I did it the last time.
