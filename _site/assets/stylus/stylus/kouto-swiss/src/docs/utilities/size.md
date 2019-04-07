### size mixins

The **size** mixins gives you a convenient shortcut for setting `width` and `height` properties at the same time.
Since version `0.14.0`, **min-size** & **max-size** mixins are added.

**Note:** If only one value is given, the `width` and `height` will have the same values.

**Note 2:** When giving two values, making one to false will not displaying it.

#### Example

##### Usage

```stylus
div
    size: 10px

div
    size: 10px 20px

div
    size: 10px false

div
    size: false 20px
```

##### Result

```css
div {
  width: 10px;
  height: 10px;
}

div {
  width: 10px;
  height: 20px;
}

div {
  width: 10px;
}

div {
  height: 20px;
}
```
