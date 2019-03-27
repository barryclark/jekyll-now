### repeating-linear-gradient()

Display a `repeating-linear-gradient`.

> **Note:** must be used in a `background-image property`.

#### Signature

`repeating-linear-gradient( start, stops... )`

The implementation of `repeating-linear-gradient` follows [the CSS3 specs](https://developer.mozilla.org/en-US/docs/Web/CSS/repeating-linear-gradient).

#### Example

##### Usage

```stylus
div
    background-image: repeating-linear-gradient( rgb( 26, 198, 204 ), rgb( 26, 198, 204 ) 7%, rgb( 100, 100, 100 ) 10% )

div
    background-image: repeating-linear-gradient( -45deg, transparent, transparent 25px, rgba( 255, 255, 255, 1 ) 25px, rgba( 255, 255, 255, 1 ) 50px)

div
    background-image: repeating-linear-gradient( to left top, blue, green 40%, red );    
```

##### Result

```css
div {
  background-image: -webkit-repeating-linear-gradient(#1ac6cc,#1ac6cc 7%,#646464 10%);
  background-image: repeating-linear-gradient(#1ac6cc,#1ac6cc 7%,#646464 10%);
}
div {
  background-image: -webkit-repeating-linear-gradient(135deg,transparent,transparent 25px,#fff 25px,#fff 50px);
  background-image: repeating-linear-gradient(-45deg,transparent,transparent 25px,#fff 25px,#fff 50px);
}
div {
  background-image: -webkit-repeating-linear-gradient(right bottom,#00f,#008000 40%,#f00);
  background-image: repeating-linear-gradient(to left top,#00f,#008000 40%,#f00);
}
```
