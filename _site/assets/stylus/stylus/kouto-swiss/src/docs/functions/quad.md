### `quad( color )` & `tetrad( color )`

Returns quad (*tetrad*) variations of the given color.  
`returned[0]`: first quad variation ( spinning given color by 90 degrees )  
`returned[1]`: second quad variation ( spinning given color by -90 degrees )  
`returned[2]`: third quad variation ( spinning given color by 180 degrees ) - complement color

#### Signature

`quad( color )` & `tetrad( color )`

* `color`: color to perform quad variations.

#### Example

##### Usage

```stylus
variations = quad( #f00 )

.red-quad-one
    color: variations[0]

.red-quad-two
    color: variations[1]

.red-quad-three
    color: variations[2]
```

##### Result

```css
.red-quad-one {
  color: #80ff00;
}

.red-quad-two {
  color: #7f00ff;
}

.red-quad-three {
  color: #0ff;
}
```
