### `analogous( color )`

Returns analogous variations of the given color.  
`returned[0]`: first analogous variation ( spinning given color by 30 degrees )  
`returned[1]`: second analogous variation ( spinning given color by -30 degrees )

#### Signature

`analogous( color )`

* `color`: color to perform analogous variations.

#### Example

##### Usage

```stylus
variations = analogous( #f00 )

.red-analog-one
    color: variations[0]

.red-analog-two
    color: variations[1]
```

##### Result

```css
.red-analog-one {
  color: #ff8000;
}

.red-analog-two {
  color: #ff0080;
}
```
