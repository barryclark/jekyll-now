### radial-gradient()

Display a `radial-gradient`.

> **Note:** must be used in a `background-image property`.

#### Signature

`radial-gradient( stops... )`

The implementation of `radial-gradient` follows [the CSS3 specs](https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient).

#### Example

##### Usage

```stylus
div
    background-image: radial-gradient( 50% 50%, black, white )

div
    background-image: radial-gradient( ellipse at center, yellow 0%, green 100% )    
```

##### Result

```css
div {
  background-image: -webkit-radial-gradient(50% 50%,#000,#fff);
  background-image: -moz-radial-gradient(50% 50%,#000,#fff);
  background-image: -ms-radial-gradient(50% 50%,#000,#fff);
  background-image: -o-radial-gradient(50% 50%,#000,#fff);
  background-image: radial-gradient(50% 50%,#000,#fff);
}
div {
  background-image: -webkit-radial-gradient(ellipse at center,#ff0 0%,#008000 100%);
  background-image: -moz-radial-gradient(ellipse at center,#ff0 0%,#008000 100%);
  background-image: -ms-radial-gradient(ellipse at center,#ff0 0%,#008000 100%);
  background-image: -o-radial-gradient(ellipse at center,#ff0 0%,#008000 100%);
  background-image: radial-gradient(ellipse at center,#ff0 0%,#008000 100%);
}
```
