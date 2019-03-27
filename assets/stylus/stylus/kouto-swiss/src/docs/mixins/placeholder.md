### placeholder()

Outputs vendor-prefixes for placeholders.  
Must be called from a ruleset.

#### Example

##### Usage

```stylus
input
    color: #f00
    +placeholder()
        color: #f99
```

##### Result

```css
input {
  color: #f00;
}
input::-webkit-input-placeholder {
  color: #f99;
}
input:-moz-placeholder {
  color: #f99;
}
input::-moz-placeholder {
  color: #f99;
}
input:-ms-input-placeholder {
  color: #f99;
}
```
