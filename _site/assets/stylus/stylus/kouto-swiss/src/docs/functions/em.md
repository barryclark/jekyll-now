### em()

Converts `pixels` to `em`.  
Uses the second value as base. If no base is given, uses `16px` as base.

#### Signature

`em( value [, base ] )`

* `value`: value to convert.
* `base`: base for conversion. *Optional* Defaults to `16`.

#### Example

##### Usage

```stylus
div
    font-size: em( 12px, 24 )

div
    font-size: em( 16 )

```

##### Result

```css
div {
  font-size: 0.5em;
}

div {
  font-size: 1em;
}
```
