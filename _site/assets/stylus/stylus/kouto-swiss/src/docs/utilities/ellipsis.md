### overflow ellipsis

The ellipsis mixin is a shortcut value to pass to an overflow property, which displays the code for a `text-overflow: ellipsis;`.

> This mixin is based on which from [nib](http://visionmedia.github.io/nib/).

#### Example

##### Usage

```stylus
div
    overflow: ellipsis
```

##### Result

```css
div {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
```
