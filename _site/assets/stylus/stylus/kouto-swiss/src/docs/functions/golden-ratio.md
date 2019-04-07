### golden-ratio()

Returns the golden ratio (`1.618`) of a number for a given step.  

#### Signature

`golden-ratio( base, step )`

* `base`: number base to scale.
* `step`: step to scale.

#### Example

##### Usage

```stylus
div
    font-size: golden-ratio( 16px, 1 )

div
    font-size: golden-ratio( 1em, 2 )
```

##### Result

```css
div {
  font-size: 25.888px;
}

div {
  font-size: 2.617924em;
}
```
