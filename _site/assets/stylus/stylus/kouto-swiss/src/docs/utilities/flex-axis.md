### flex-axis mixin

The flex-axis mixin gives you five convenient shortcut for `justify-content` and `align-items` properties.
The first value is affected to `justify-content`, the second to `align-items`.
If only one value is given, it is affected to both properties, if possible. If the given property is not valid, it use the default value instead.

**NOTE:** the `flex-axis` mixin use the **vendors** prefixes following your configuration.

#### Example

##### Usage

```stylus
div
    flex-axis: flex-start center

div
    flex-axis: flex-start stretch

div
    flex-axis: flex-start baseline

div
    flex-axis: flex-start flex-end

div
    flex-axis: space-between baseline

div
    flex-axis: center center

div
    flex-axis: center

div
    flex-axis: flex-end

div
    flex-axis: space-between

div
    flex-axis: space-evenly

div
    flex-axis: space-around

div
    flex-axis: baseline

div
    flex-axis: stretch
```

##### Result

```css
div {
  justify-content: flex-start;
  align-items: center;
}
div {
  justify-content: flex-start;
  align-items: stretch;
}
div {
  justify-content: flex-start;
  align-items: baseline;
}
div {
  justify-content: flex-start;
  align-items: flex-end;
}
div {
  justify-content: space-between;
  align-items: baseline;
}
div {
  justify-content: center;
  align-items: center;
}
div {
  justify-content: center;
  align-items: center;
}
div {
  justify-content: flex-end;
  align-items: flex-end;
}
div {
  justify-content: space-between;
  align-items: stretch;
}
div {
  justify-content: space-evenly;
  align-items: stretch;
}
div {
  justify-content: space-around;
  align-items: stretch;
}
div {
  justify-content: flex-start;
  align-items: baseline;
}
div {
  justify-content: flex-start;
  align-items: stretch;
}
```
