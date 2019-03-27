### calc()

Add vendor-prefix for the css3 `calc()` function.

#### Signature

`calc( expr [, fallback ] )`

* `expr`: expression for calc. **Must be quoted**.
* `fallback`: a fallback value for unsupported browsers. *Optional*.

#### Example

##### Usage

```stylus
body
    width: calc( "100% - 80px" )

body
    width: calc( "100% - 80px", 90% )
```

##### Result

```css
body {
  width: -webkit-calc(100% - 80px);
  width: calc(100% - 80px);
}

body {
  width: 90%;
  width: -webkit-calc(100% - 80px);
  width: calc(100% - 80px);
}
```
