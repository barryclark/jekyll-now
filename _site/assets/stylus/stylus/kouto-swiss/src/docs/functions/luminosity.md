### `luminosity( color )`

Returns the [WCAG luminosity](http://www.w3.org/TR/WCAG20/#relativeluminancedef) of the given color, as a `Number` between `0` (*black*) and `1` (*white*).

#### Signature

`luminosity( color )`

* `color`: color to analyse.

#### Example

##### Usage

```stylus
.luminosity
    background: #ff0
    color: luminosity( #ff0 ) > 0.5 ? black : white
```

##### Result

```css
.luminosity {
  background: #ff0;
  color: white;
}
```
