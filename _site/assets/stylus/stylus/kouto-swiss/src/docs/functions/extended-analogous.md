### `extended-analogous( color )`

Returns more analogous variations of the given color.  
`returned[0]`: first analogous variation ( spinning given color by 30 degrees )  
`returned[1]`: second analogous variation ( spinning given color by -30 degrees )  
`returned[2]`: third analogous variation ( spinning given color by 60 degrees )  
`returned[3]`: fourth analogous variation ( spinning given color by -60 degrees )

#### Signature

`extended-analogous( color )`

* `color`: color to perform analogous variations.

#### Example

##### Usage

```stylus
variations = extended-analogous( #f00 )

.red-analog-one
    color: variations[0]

.red-analog-two
    color: variations[1]

.red-analog-three
    color: variations[2]

.red-analog-four
    color: variations[3]
```

##### Result

```css
.red-analog-one {
  color: #ff8000;
}

.red-analog-two {
  color: #ff0080;
}

.red-analog-three {
  color: #ff0;
}

.red-analog-four {
  color: #f0f;
}
```
