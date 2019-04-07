### media-query()

Create the query part of a media query, which you can store in a variable, to use when you make a media block.

You can disable the media-queries by modifying the global `ks-support-media-queries` variable, which is by default valued to `true`.  
It's useful for legacy stylesheet for old IE versions.

> **Warning:** since version `0.9`, the media-query() mixin has changed: it's now a *block* mixin.

#### Signature

`+media-query( media [, conditions... ] )`

* `media`: the media of the query
* `conditions`: multiple pairs of conditions for the query. *Optional*.

**Note:** if you give a list as the `media` argument, the first element of this list will be assumed as the media value.

#### Example

##### Usage

```stylus
+media-query( all, min-width 640px )
    div
        color: red

+media-query( only screen, min-width 640px, min-height 960px, orientation portrait )
    div
        color: red

+media-query( print )
    div
        color: red

ks-support-media-queries = false

+media-query( all, min-width 640px )
    div
        color: red

+media-query( only screen, min-width 640px, min-height 960px, orientation portrait )
    div
        color: red

+media-query( print )
    div
        color: red

ks-support-media-queries = true

breakpointMain = only screen, max-width 767px

+media-query( breakpointMain )
    div
        width: 100%

```

##### Result

```css
@media all and (min-width: 640px) {
  div {
    color: #f00;
  }
}
@media only screen and (min-width: 640px) and (min-height: 960px) and (orientation: portrait) {
  div {
    color: #f00;
  }
}
@media print {
  div {
    color: #f00;
  }
}
div {
  color: #f00;
}
div {
  color: #f00;
}
div {
  color: #f00;
}
@media only screen and (max-width: 767px) {
  div {
    width: 100%;
  }
}
```
