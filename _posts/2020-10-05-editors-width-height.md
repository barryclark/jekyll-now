---
layout: post
title: Week 5M - Image Editors and `width`/`height` Attributes
categories: cpnt201
---
## Housekeeping
- CPNT 260 Assignment 1
- Student Showcase
- Scenarios

## Homework
1. Review
    - [First Contentful Paint (FCP) and First Meaningful Paint (FMP) Explained](https://www.acmethemes.com/blog/first-contentful-paint-and-first-meaningful-paint/)
2. Download and install an image editor, such as Photoshop, if you don't already have access to one. Some free(ish) Photoshop alternatives:
    - [GIMP](https://www.gimp.org/) (Window, Mac, Linux)
    - [Pixlr](https://pixlr.com/) (browser-based)
    - [Canva](https://www.canva.com/photo-editor/app/) (browser-based)
    - [Photo Pos Pro](https://www.photopos.com/PPP3_BS/Default.aspx) (Windows-only)
    - [Acorn](https://flyingmeat.com/acorn/) (Mac-only)
3. Explore the documentation of your chosen image editor to prepare for the objectives listed below in "Image Editor Tour".
4. Image `width` and `height` attributes
    - Read: [Setting Height And Width On Images Is Important Again](https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/)
    - Watch: [Do This to Improve Image Loading on Your Website](https://youtu.be/4-d_SoCHeWE)

## 1. Image Editor Tour
### Learning Objectives
- Use image editing software to:
  - re-size a raster image;
  - adjust colour levels of a raster image;
  - crop a raster image;
  - repair a raster image.

### Terminology
Sources
- [Photo Editing Terms Explained Simply](https://www.picmonkey.com/blog/photo-editing-terms-you-dont-know)
- [Digital Terminology and Essential Elements of Photo-Editing](https://extension.uga.edu/publications/detail.html?number=B1254-2&title=Part%202:%20Digital%20Terminology%20and%20Essential%20Elements%20of%20Photo-Editing)

<dl>
  <dt>Raster Image</dt>
  <dd>A digital image that is represented by a generally rectangular grid of pixels, each described in Red, Green and Blue 8-bit channels.</dd>
  <dt>Image Size</dt>
  <dd>The literal width and height of an image in pixels.</dd>
  <dt>Image Resolution</dt>
  <dd>The number of pixels per a given length unit to describe pixel density. For example, print images are usually described in `ppi` (pixels per inch). In web, this most often descries the pixel density of retina displays.</dd>
  <dt>Color Channel</dt>
  <dd>A data structure that stores the colour information of an image. Most images are made up of three 8-bit channels (256 levels of colour) for Red, Green and Blue.</dd>
  <dt>Exposure</dt>
  <dd>This is how light or dark the image appears after the image was created. Various image editors will call their exposure correction tools "levels", "curves".</dd>
  <dt>Histogram</dt>
  <dd>A graph displaying all the tones in your image as numbers, usually ranging from 0 to 255. This is usually the visual representation of an image's exposure</dd>
  <dt>Re-sample</dt>
  <dd>In other words, re-size. _Resampling_ tools are used to increase or decrease the size and/or the resolution of a bitmap-based image. An image is up-sampled to increase the resolution by adding new pixels. An image is down-sampled to decrease the resolution by deleting pixels.</dd>
  <dt>Cropping</dt>
  <dd>The removal of unwanted outer areas from a photographic or illustrated image.</dd>
</dl>

### Activity 1: Image Editing
Get comfortable with your image editor. Pick an image from the source images you used yesterday and try the following:
- Crop the image;
- Adjust its colour balance;
- Adjust its exposure;
- Try adding a filter (if supported by your editor)
  - sharpen
  - unsharp mask
  - blur
  - warp/skew
- Bonus: find an image editor that supports batch processing!

### Activity 2: Sizing images
We need some sample images to play with tomorrow. Using the sources images you used yesterday, create a:
1. Large image size:
    1. Using an image editor of your choice, create a large version of your file. You can decided what "large" is but it's usually wider than `1000px`. 
    2. Save this file in a `large`/`lg` directory next to the `full` and `source` directories you created yesterday.
2. Medium image size:
    1. Create a medium version of your file, usually between `500px` and `1000px`.
    2. Extra step for testing: desaturate your image by about 50% so that the colours are duller than the large version. This will be to make testing easier for tomorrow.
    3. Save this file in a `medium`/`md` directory.
3. Small image size:
    1. Create a small version of your file, usually less than `500px`.
    2. Extra step for testing: make this a grayscale image. This will be to make testing easier for tomorrow.
    3. Save this file in a `small`/`sm` directory.

## 2. Image `width` and `height` attributes
- Add `width` and `height` attributes to an `img` element.
- Demonstrate the advantages of using `width` and `height` attributes.
- Explore the risks of breaking image aspect ratio when `width` and `height` attributes are defined.
- Compare the performance of a web page with and without `width`/`height` attributes.

## 3. Open Lab Time
### Scenario: Blog home page with images
A client would like to start a company blog and has asked you for a proof-of-concept (PoC) blog home page listing five blog posts with the following components:
- Article title, byline (author) and date;
- Article excerpt (first 10-50 words of the full article);
- a preview image (assume every blog post will have an image);
- a link to the full article.

#### Scenario Requirements
- The client has supplied you with 5 source images of varying quality to be used in this PoC. 
  - You know the client will eventually ask for an image gallery so you create small and large versions of each image. See Task 1 below.
- Since the client hasn't written anything yet (of course) you may use Lorem Ipsum or any openly licensed content for the written blog content. See Task 2 below.
- You may use a page header/hero, nav menu and footer of your choice.
- This client is very picky about performance ever since you told them it's a huge factor in search page rank (your fault) so you know `width` and `height` attributes will be required. See Task 3 below.

#### Tasks 
1. Image processing
    1. Choose a souce image to process;
    2. Crop, correct and clean the image;
    3. Resize and save a large version of the image 
    4. Resize and save either/both a small and/or medium version of the image.
    5. Repeat for the other four images. If you're in a hurry you may resize only to the dimensions you need for the other tasks.
2. Blog home page
    1. Build or refactor a full blog page with header, navigation and footer.
    2. For your main content, list each blog summary so that it scrolls down the page.
    3. To keep the design simple, consider displaying the images full-column under the title, byline and date.
    4. Create an `img` element for each blog post:
        - link a `src` attribute relatively to the image in your project;
        - include alternate text using the `alt` attribute.
3. Image attributes
    1. For each image displayed in your project, locate/record the `width` and `height` of the file.
    2. Add `width` and `height` attributes to their respective `img` tag in the project.
    3. Reload the page to ensure each `img` has been marked up correctly.
    4. Purposely break your image paths by deleting a character from the `src` attribute.
    5. Reload your page, to confirm  the browser is recognizing your `width` and `height` attributes. There should be an empty in the page layout that is `width` x `height`.

## Clean-up Time!