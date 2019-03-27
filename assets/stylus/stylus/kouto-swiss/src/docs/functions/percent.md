### percent()

The `percent` function makes a simple percentage convertion operation. It takes two operands, makes a percentage of the first by the second, and return the result, with a percent unit.

> **Note:** the function doesn't care about the units you give and don't convert it.

#### Signature

`percent( value, total )`

* `value`: value to a percentage of `total`.
* `total`: the 100% reference number.

#### Example

##### Usage

```stylus
div
    width: percent( 50px, 200px )

div
    width: percent( 15, 200 )

div
    clear: percent( 30em, 10px )

```

##### Result

```css
div {
  width: 25%;
}

div {
  width: 7.5%;
}

div {
  width: 300%;
}
```
