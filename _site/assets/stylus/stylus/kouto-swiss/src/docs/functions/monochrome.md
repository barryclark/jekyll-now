### `monochrome( color )`

Returns monochromatic variations of the given color.  
`returned[0]`: first monochrome variation ( given color's lightness minus 33% )  
`returned[1]`: second monochrome variation ( given color's lightness minus 66% )

#### Signature

`monochrome( color )`

* `color`: color to perform monochromatic variations.

#### Example

##### Usage

```stylus
variations = monochrome( #f00 )

.red-mono-one
    color: variations[0]

.red-mono-two
    color: variations[1]
```

##### Result

```css
.red-mono-one {
  color: #f55;
}

.red-mono-two {
  color: #ff2a2a;
}
```
