### rem()

Converts `pixels` to `rem`.
Assumes `1rem = 16px`. You can override by passing a new value to the global variable `ks-rem-base`.

#### Signature

`rem( values )`

* `values`: value(s) to convert.

#### Example

##### Usage

```stylus
div
    font-size: rem( 12px )
    margin: rem( 10px auto 20 )

ks-rem-base = 20px

div
    font-size: rem( 16 )
    margin: rem( 10 auto 20px )

```

##### Result

```css
div {
  font-size: 0.75rem;
  margin: 0.625rem auto 1.25rem;
}

div {
  font-size: 0.8rem;
  margin: 0.5rem auto 1rem;
}
```
