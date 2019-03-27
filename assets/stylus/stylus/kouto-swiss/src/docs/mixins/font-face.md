### font-face()

Simple `@font-face` mixin.

#### Signature

`font-face( name, font-src [, weight [, style [, formats [, svg-font-name ] [, local-font-name ] ] ] ] )`

* `name`: name of the font, used for font-family
* `font-src`: the path for the font, minus the extension
* `weight`: the weight of the font, for font-weight. *Optional*.
* `style`: the style of the font, for font-style. *Optional*.
* `formats`: the formats to includes. *Optional*. Default: `eot woff2 woff truetype svg` Accepted words: `eot woff2 woff truetype ttf opentype otf svg local`
* `svg-font-name`: the svg font name. *Optional*. Default: use the `name` parameters.
* `local-font-name`: the local font name. *Optional*. Default: use the `name` parameters.

#### Example

##### Usage

```stylus
font-face( "Roboto", "./fonts/Roboto-Regular-webfont", normal )

font-face( "Roboto", "./fonts/Roboto-Italic-webfont", normal, italic )

font-face( "OpenSans", "./fonts/OpenSans", formats: woff )
```
##### Result

```css
@font-face {
  font-family: "Roboto";
  font-weight: normal;
  src: url("./fonts/Roboto-Regular-webfont.eot");
  src: local("Roboto", url("./fonts/Roboto-Regular-webfont.eot?#iefix") format("embedded-opentype"), url("./fonts/Roboto-Regular-webfont.woff2") format("woff2"), url("./fonts/Roboto-Regular-webfont.woff") format("woff"), url("./fonts/Roboto-Regular-webfont.ttf") format("truetype"), url("./fonts/Roboto-Regular-webfont.svg#Roboto") format("svg");
}

@font-face {
  font-family: "Roboto";
  font-weight: normal;
  font-style: italic;
  src: url("./fonts/Roboto-Italic-webfont.eot");
  src: local("Roboto"), url("./fonts/Roboto-Italic-webfont.eot?#iefix") format("embedded-opentype"), url("./fonts/Roboto-Italic-webfont.woff2") format("woff2"), url("./fonts/Roboto-Italic-webfont.woff") format("woff"), url("./fonts/Roboto-Italic-webfont.ttf") format("truetype"), url("./fonts/Roboto-Italic-webfont.svg#Roboto") format("svg");
}

@font-face {
  font-family: "OpenSans";
  src: url("./fonts/OpenSans.woff") format("woff");
}
```
