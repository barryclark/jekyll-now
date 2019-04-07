### hide-text()

The hide-text mixins will hide the text of the selector where it is declared. Used for background image like logo display, etc...

> This mixin is based on which from [bourbon.io](http://bourbon.io).

A height declaration is required for this to function.

#### Example

##### Usage

```stylus
h1
    height: 75px
    background: url( logo.png ) top left no-repeat
    hide-text()
```

##### Result

```css
h1 {
  height: 75px;
  background: url("logo.png") top left no-repeat;
  overflow: hidden;
}
h1:before {
  content: "";
  display: block;
  width: 0;
  height: 100%;
}
```
