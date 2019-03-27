### modular-scale()

Returns the `modular scale` of a number for a given step of ratio.  

#### Signature

`modular-scale( base, step [, ratio ] )`

* `base`: number base to scale.
* `step`: step to scale.
* `ratio`: the ratio to use. *Optional*. Default: `ks-perfect-fifth`.

##### Ratios

For the `ratio` parameter, you can give any number, or use one of the following global variables:

* `ks-golden`: 1.618
* `ks-minor-second`: 1.067
* `ks-major-second`: 1.125
* `ks-minor-third`: 1.2
* `ks-major-third`: 1.25
* `ks-perfect-fourth`: 1.333
* `ks-augmented-fourth`: 1.414
* `ks-perfect-fifth`: 1.5
* `ks-minor-sixth`: 1.6
* `ks-major-sixth`: 1.667
* `ks-minor-seventh`: 1.778
* `ks-major-seventh`: 1.875
* `ks-octave`: 2
* `ks-major-tenth`: 2.5
* `ks-major-eleventh`: 2.667
* `ks-major-twelfth`: 3
* `ks-double-octave`: 4

#### Example

##### Usage

```stylus
div
    font-size: modular-scale( 16px, 1, 1.5 )

div
    font-size: modular-scale( 16px, 2, 1.618 )

div
    font-size: modular-scale( 16px, -2, ks-octave )

div
    font-size: modular-scale( 1em, 2, 1.5 )
```

##### Result

```css
div {
  font-size: 24px;
}

div {
  font-size: 41.886784px;
}

div {
  font-size: 4px;
}

div {
  font-size: 2.25em;
}
```
