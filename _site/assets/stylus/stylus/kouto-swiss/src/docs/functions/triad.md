### `triad( color )`

Returns triad variations of the given color.  
`returned[0]`: first triad variation ( spinning given color by 120 degrees )  
`returned[1]`: second triad variation ( spinning given color by -120 degrees )

#### Signature

`triad( color )`

* `color`: color to perform triad variations.

#### Example

##### Usage

```stylus
variations = triad( #f00 )

.red-triad-one
    color: variations[0]

.red-triad-two
    color: variations[1]
```

##### Result

```css
.red-triad-one {
  color: #0f0;
}

.red-triad-two {
  color: #00f;
}
```
