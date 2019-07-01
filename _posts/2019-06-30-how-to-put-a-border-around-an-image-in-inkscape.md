---
layout: post
title: How To Put A Border Around An Image In Inkscape
tags: [inkscape]
keywords: [image, border, stroke]
image: /images/inkscape/image-border-7.png
---

This seems to be a common request in Inkscape: you've imported an image, and you want to put a stroke or border around that image.

Surely Inkscape has some simple option to do this? Maybe you could just apply a stroke and voilà - a border around your image!

Except, no, Inkscape has no such feature.

That doesn't mean it can't be done. Here's how to do it:

1. Select the image and note the width and height.
2. Create a rectangle that is the same width and height as the image.
3. Align the center of the rectangle to be the same as the center of the image.
4. Lower the rectangle below the image.
5. Apply a stroke to the rectangle.

Here's an example with images:

1. Select the image and note the width and height. Here the width is 132.292 and the height is 79.375:
![Step 1](/images/inkscape/image-border-1.png)

2. Here I've created a rectangle of the same width and height:

![Step 2](/images/inkscape/image-border-2.png)

3. Select both objects and open the *Align and Distribute* view (*Shift+Ctrl+A* or the 
![Align and Distribute](/images/inkscape/align-and-distribute-icon.png) icon)

![Step 3](/images/inkscape/image-border-3.png)

4. Align both the verticle and horizontal centers by selecting the *Center on vertical axis* ![Align and Distribute](/images/inkscape/align-and-distribute-icon.png) and *Center on horizontal axis* ![Align and Distribute](/images/inkscape/align-and-distribute-icon.png) icons.

![Step 4](/images/inkscape/image-border-4.png)

5. Select only the rectangle and lower it below the image:

![Step 5](/images/inkscape/image-border-5.png)

6. While the rectangle is still selected, set the stroke. I've set the stroke below by shift-clicking black on the bottom color rail:

![Step 6](/images/inkscape/image-border-6.png)

7. As always, you can play with the stoke by opening the *Fill and Stroke* view (*Shift+Ctrl+F* or whatever your favorite way is):

![Step 7](/images/inkscape/image-border-7.png)

Consider grouping the image and the rectangle together so you don't accidentally get them separated!

So there you have it. Putting a border around an image in Inkscape definitely could be easier, but it's not hard. At least for a rectangular image!

<style>
li img {
	display: initial;
}

li em {
	font-size: inherit;
	display: inherit;
	margin: inherit;
}
</style>