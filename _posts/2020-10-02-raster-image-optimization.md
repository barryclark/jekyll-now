---
layout: post
title: Week 4F - Raster Image Optimization with Squoosh.app
categories: cpnt201
---
## Housekeeping
- Exam fixes
- Saturday Office Hours: 12pm-???

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
    - Read: [`picture` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)

## 1. Image formats Overview
### Learning Objectives
1. Define image encoder.
2. Distinguish between lossless, lossy compression.
3. Distinguish between high and low frequency imagery.
4. Predict whether lossless or lossy compression will be best for a particular image.

### Terminology
<dl>
  <dt>Image encoder</dt>
  <dd>A library/module that converts one image format to another. Not all encoders are created equal.</dd>
  <dt>High Frequency Imagery</dt>
  <dd>Parts of an image (or the whole image) where colour and contrast change a lot from one pixel to the next. Example: a photo of a busy intersection.</dd>
  <dt>Low Frequency Imagery</dt>
  <dd>Parts of an image (or the whole image) where colour and contrast change very little from one pixel to the next. Example: a vector logo or other image with a lot of flat colour.</dd>
  <dt>Colour Data</dt>
  <dd>The digital information in an image that controls pixel colour. Also called chroma data.</dd>
  <dt>Brightness Data</dt>
  <dd>The digital information in an image that controls pixel brightness.</dd>
</dl>

---

**Sample Source Images**: [Tony's Raw Screencaps](https://github.com/sait-wbdv/assets/)

---

## 2. Lossy Compression
### Activity 1: Squooshing high-frequency images with WebP (Lossy)
Optimize an image file size using [Squoosh.app](https://squoosh.app/):
1. Pick a high frequency image (try [jank](https://github.com/sait-wbdv/assets/blob/main/images/source/jank.png) and upload it to Squoosh.
2. Zoom the image to the size it will be on the web page (and resist the urge to zoom).
    - To account for high resolution displays, take the native size of your image and zoom out so it's about 50% of its original size.
3. Choose `WebP` encoder under "Compress".
4. Turn down Quality until the image "looks bad".
5. Increase Effort (to max?).
6. Advanced Settings: 
    - try toggling `Auto adjust filter strength`;
    - try adjusting `Spatial noise shaping`.
7. Download and save your optimized files in a `full` directory next to your `source` directory.

### Creating JPEG image (for Safari)
1. Choose `MozJPEG` encoder under "Compress".
2. Reduce `Quality` until the image "looks bad".
3. Advanced Settings:
    - try adjusting `Subsample chroma by`;
    - try toggling `Seperate chroma quality`.
4. Download the optmized image and use it as an asset in a project web page of your choice.
5. Complete two performance audits on your project page using Chrome Lighthouse: once with the original image file and a second with the optimized image file.
6. Download and save your optimized files in a `full` directory next to your `source` directory.

---

## 3. Lossless Compression
### Activity 3: Squooshing low-frequency images with WebP (Lossless)
1. Pick a low-frequency image (something with a lot of flat colour) and upload it to Squoosh.
2. Zoom the image to the size it will be on the web page (and resist the urge to zoom).
    - To account for high resolution displays, take the native size of your image and zoom out so it's about 50% of its original size.
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

---

## 4. Safari fallback using the `picture` element
### Activity 5: Create a test page
1. Create a new HTML page and centre one of your WebP images in the viewport.
2. Use the `picture` element to serve WebP to the browsers that support it and either a JPEG (high-frequency) or PNG (low-frequency) image for Safari.
3. How can we test if the fallback is working?

### Activity 6: Create a test page
1. Create an `assets` repo to store your `full` images (optional: also upload your `source` files).
2. Add your test page as an `index.html` in your repo root folder (to enable GH Pages).
3. Post your repo link to Brightspace.

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-10-05-editors-width-height.md %})