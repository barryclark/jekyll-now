---
layout: post
title: Week 4F - Image Editors and `width`/`height` Attributes
categories: cpnt201
---
## Housekeeping
- Exam fixes

## Homework
1. Review
    - [First Contentful Paint (FCP) and First Meaningful Paint (FMP) Explained](https://www.acmethemes.com/blog/first-contentful-paint-and-first-meaningful-paint/)
    - Reference: [Image file type and format guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)
2. Sample images: 
    - Find 5 or more images that you've taken or designed so we can optimize their file size. 
    - _Do not_ use Lorem Picsum (or similar services) since these images are probably already optimized.
    - Try to find diverse image types such as photos, logos, graphic design, etc.
3. Image Formats and Compression
    - Watch: [Image compression deep-dive](https://youtu.be/F1kYBnY6mwg) by Jake and Surma
    - Read: `[picture] element`
4. Image `width` and `height` attributes
    - Read: [Setting Height And Width On Images Is Important Again](https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/)
    - Watch: [Do This to Improve Image Loading on Your Website](https://youtu.be/4-d_SoCHeWE)

## 1. Image formats Overview
### Learning Objectives
1. Define a codec.
2. Distinguish between lossless, lossy compression.
3. Distinguish between high and low frequency imagery.
4. Predict whether lossless or lossy compression will be best for a particular image.

**Sample Source Images**: [Tony's Raw Screencaps](https://github.com/sait-wbdv/assets/)

## 2. Lossy Compression
### Activity 1: Squooshing high-frequency images with WebP (Lossy)
Optimize an image file size using [Squoosh.app](https://squoosh.app/):
1. Pick a high frequency image (try [jank]({{site.baseurl}}/assets/_source/images/jank.png) and upload it to Squoosh.
2. Zoom the image to the size it will be on the web page (and resist the urge to zoom).
3. Choose `WebP` encoder under "Compress".
4. Turn down Quality until the image "looks bad".
5. Advanced Settings: 
    - try toggling `Auto adjust filter strength`;
    - try adjusting `Spatial noise shaping`.
6. Download and save your optimized files in a `full` directory next to your `source` directory.

### Activity 2: Creating JPEG image for Safari
1. Choose `MozJPEG` encoder under "Compress".
2. Reduce `Quality` until the image "looks bad".
3. Advanced Settings:
    - try adjusting `Subsample chroma by`;
    - try toggling `Seperate chroma quality`.
4. Download the optmized image and use it as an asset in a project web page of your choice.
5. Complete two performance audits on your project page using Chrome Lighthouse: once with the original image file and a second with the optimized image file.
6. Download and save your optimized files in a `full` directory next to your `source` directory.


## 2. Lossless Compression
### Activity 3: Squooshing low-frequency images with WebP (Lossless)
1. Pick a low-frequency image (something with a lot of flat colour) and upload it to Squoosh.
2. Zoom the image to the size it will be on the web page (and resist the urge to zoom).
3. Choose `WebP` encoder under "Compress".
4. Click `Lossless` to enable the low-frequency encoder.
5. Increase `Effort` (to max?).
6. Try increasing `Slight loss`. Your mileage may vary.
7. Try `reduce pallette` to remove unneeded colours.
    - Select `Browser PNG` under "Compress" to speed up the preview.
    - Click `Reduce pallette`.
    - Reduce `Dithering` to zero (unless you need it, which you probably don't).
    - Reduce `Colors` as much as possible until the image "looks bad".
8. Download and save your optimized files in a `full` directory next to your `source` directory.

### Activity 4: Creating PNG image for Safari
1. Choose `OxiPNG` encoder under "Compress".
2. Increase `Effort` (to max?).
3. Click `Reduce pallette`.
4. Reduce `Dithering` to zero (unless you need it, which you probably don't).
5. Reduce `Colors` as much as possible until the image "looks bad".
6. Download and save your optimized files in a `full` directory next to your `source` directory.
7. Does WebP provide enough savings to bother with it?

## 3. Safari fallback using the `picture` element
### Activity 5: Create a test page
1. Create a new HTML page and centre one of your WebP images in the viewport.
2. Use the `picture` element to serve WebP to the browsers that support it and either a JPEG (high-frequency) or PNG (low-frequency) image for Safari.
3. How can we test if the fallback is working?

### Activity 6: Create a test page
1. Create an `assets` repo to store your `full` images (optional: also upload your `source` files).
2. Add your test page as an `index.html` in your repo root folder (to enable GH Pages).
3. Post your repo link to Brightspace.

## Clean-up Time!