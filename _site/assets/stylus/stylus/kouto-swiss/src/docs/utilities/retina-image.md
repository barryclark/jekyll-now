### retina-image()

Generate a media query for an image.  
If no size is given, the mixin tries to get the sizes from the file.

#### Signature

`retina-image( img-src [, size [, suffix ] ] )`

* `img-src`: the path for the image
* `size`: width and height of the image, uses as `background-size` for the retina image. *Optional*. If none is given, the sizes are computed from the path. If it fails, the `background-size` value will be `contain`.
* `suffix`: the suffix to add to the file to reach retina image. *Optional*. Default: `@2x`.

#### Example

##### Usage

```stylus
div
  retina-image( "logo.png", 277px 292px, "-2x" )
```

##### Result

```css
div {
  background-image: url("logo.png");
}
@media only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 1.3/1), only screen and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 125dpi), only screen and (min-resolution: 1.3dppx) {
  div {
    background-image: url("logo-2x.png");
    -webkit-background-size: 277px 292px;
    background-size: 277px 292px;
  }
}
```

#### Alias

`hidpi-image()`
