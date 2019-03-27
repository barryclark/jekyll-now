### linear-gradient()

Display a `linear-gradient`.

> **Note:** must be used in a `background-image property`.

#### Signature

`linear-gradient( start, stops... )`

The implementation of `linear-gradient` follows [the CSS3 specs](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient).

#### Example

##### Usage

```stylus
div
  background-image: linear-gradient( -45deg, yellow, green )

div
  background-image: linear-gradient( to top right, red, white 30%, blue )    
```

##### Result

```css
div {
  background-image: -webkit-linear-gradient(135deg,#ff0,#008000);
  background-image: -moz-linear-gradient(135deg,#ff0,#008000);
  background-image: -ms-linear-gradient(135deg,#ff0,#008000);
  background-image: -o-linear-gradient(135deg,#ff0,#008000);
  background-image: linear-gradient(-45deg,#ff0,#008000);
}
div {
  background-image: -webkit-linear-gradient(bottom left,#f00,#fff 30%,#00f);
  background-image: -moz-linear-gradient(bottom left,#f00,#fff 30%,#00f);
  background-image: -ms-linear-gradient(bottom left,#f00,#fff 30%,#00f);
  background-image: -o-linear-gradient(bottom left,#f00,#fff 30%,#00f);
  background-image: linear-gradient(to top right,#f00,#fff 30%,#00f);
}
```
