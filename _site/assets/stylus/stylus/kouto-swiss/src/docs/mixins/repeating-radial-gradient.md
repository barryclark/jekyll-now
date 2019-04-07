### repeating-radial-gradient()

Display a `repeating-radial-gradient`.

> **Note:** must be used in a `background-image property`.

#### Signature

`repeating-radial-gradient( stops... )`

The implementation of `repeating-radial-gradient` follows [the CSS3 specs](https://developer.mozilla.org/en-US/docs/Web/CSS/repeating-radial-gradient).

#### Example

##### Usage

```stylus
div
    background-image: repeating-radial-gradient( black, black 5px, white 5px, white 10px )

div
    background-image: repeating-radial-gradient( ellipse farthest-corner, red, black 5%, blue 5%, green 10% )
```

##### Result

```css
div {
  background-image: -webkit-repeating-radial-gradient(#000,#000 5px,#fff 5px,#fff 10px);
  background-image: repeating-radial-gradient(#000,#000 5px,#fff 5px,#fff 10px);
}
div {
  background-image: -webkit-repeating-radial-gradient(ellipse farthest-corner,#f00,#000 5%,#00f 5%,#008000 10%);
  background-image: repeating-radial-gradient(ellipse farthest-corner,#f00,#000 5%,#00f 5%,#008000 10%);
}
```
