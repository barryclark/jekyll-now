# Quoosh Cheatsheet
[Quoosh.app](https://squoosh.app)

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

## Popular Tasks


### Compress and image with WebP (Lossy)
Optimize an image file size using [Squoosh.app](https://squoosh.app/):
1. Pick a high frequency image (e.g. a "real" photo, not a logo) and upload it to Squoosh.
2. Zoom the image to the size it will be on the web page (and resist the urge to zoom).
    - To account for high resolution displays, take the native size of your image and zoom out so it's about 50% of its original size.
3. Choose `WebP` encoder under "Compress".
4. Turn down Quality until the image "looks bad".
5. Increase Effort (to max?).
6. Advanced Settings: 
    - try toggling `Auto adjust filter strength`;
    - try adjusting `Spatial noise shaping`.
7. Download the optmized image and use it as an asset in a project of your choice.

### Compress an image with MozJPEG
1. Pick a high frequency image (e.g. a "real" photo, not a logo) and upload it to Squoosh.
2. Zoom the image to the size it will be on the web page (and resist the urge to zoom).
    - To account for high resolution displays, take the native size of your image and zoom out so it's about 50% of its original size.
3. Choose `MozJPEG` encoder under "Compress".
4. Reduce `Quality` until the image "looks bad".
5. Advanced Settings:
    - try adjusting `Subsample chroma by`;
    - try toggling `Seperate chroma quality`.
6. Download the optmized image and use it as an asset in a project of your choice.

### Compress an image with WebP (Lossless)
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
8. Download the optmized image and use it as an asset in a project of your choice.

### Compress an image with OxiPNG
1. Pick a low-frequency image (something with a lot of flat colour) and upload it to Squoosh.
2. Zoom the image to the size it will be on the web page (and resist the urge to zoom).
    - To account for high resolution displays, take the native size of your image and zoom out so it's about 50% of its original size.
3. Choose `OxiPNG` encoder under "Compress".
4. Increase `Effort` (to max?).
5. Click `Reduce pallette`.
6. Reduce `Dithering` to zero (unless you need it, which you probably don't).
7. Reduce `Colors` as much as possible until the image "looks bad".
8. Download the optmized image and use it as an asset in a project of your choice.

---