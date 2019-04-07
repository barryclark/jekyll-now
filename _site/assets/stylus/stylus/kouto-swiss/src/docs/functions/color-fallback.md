### `color-fallback( color )`

> **Warning:** must be used within a property.

Create a fallback property for color with alpha value different than `1`.  
If the given color has an alpha of `1`, the function doesn't do anything.

#### Signature

`color-fallback( color )`

* `color`: color to fallback.

#### Example

##### Usage

```stylus
.no-alpha
    color: color-fallback( red )

.alpha
    color: color-fallback( rgba( 255, 0, 0, .5 ) )
```

##### Result

```css
.no-alpha {
  color: #f00;
}

.alpha {
  color: #f00;
  color: rgba(255,0,0,0.5);
}
```

#### Implicit color fallback

The `implicit color fallback` mecanism allows you to use the `color-fallback` function without calling it, by declaring an `ks-color-fallback-enabled` variable to `true`.

**Note:** prior to version `0.11.0`, the `ks-color-fallback-enabled` variable was called `ks-color-fallback`.

##### Usage

```stylus
.foo
    color: rgba( 255, 0, 0, .5 )

ks-color-fallback-enabled = true

.bar
    color: rgba( 255, 0, 0, .5 )

.bar
    background: rgba( 202, 43, 120, .5 ) url( test.png ) top left repeat

ks-color-fallback-enabled = false

.foo
    color: rgba( 255, 0, 0, .5 )

```

##### Result

```css
.foo {
  color: rgba( 255, 0, 0, .5 );
}

.bar {
  color: #f00;
  color: rgba( 255, 0, 0, .5 );
}

.foo {
  background: #ca2b78 url("test.png") top left repeat;
  background: rgba(202,43,120,0.5) url("test.png") top left repeat;
}

.foo {
  color: rgba( 255, 0, 0, .5 );
}
```
