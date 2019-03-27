### `split-complements( color )`

Returns split-complements variations of the given color.  
`returned[0]`: first split-complements variation ( spinning given color by 150 degrees )  
`returned[1]`: second split-complements variation ( spinning given color by -150 degrees )

#### Signature

`split-complements( color )`

* `color`: color to perform split-complements variations.

#### Example

##### Usage

```stylus
variations = split-complements( #f00 )

.red-split-complement-one
    color: variations[0]

.red-split-complement-two
    color: variations[1]
```

##### Result

```css
.red-split-complement-one {
  color: #00ff80;
}

.red-split-complement-two {
  color: #007fff;
}
```
