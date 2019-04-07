### ratio-box()

Give an element with unknown or fluid width a fixed aspect ratio.

Inspired by [Scut](http://davidtheclark.github.io/scut/).

#### Example

##### Usage

```stylus
.ratio-box-default
    ratio-box()

.ratio-box-1x1
    ratio-box( 1/1 )

.ratio-box-2x1
    ratio-box( 2/1 )
```

##### Result

```css
.ratio-box-default {
    overflow: hidden;
    position: relative;
}
.ratio-box-default:before {
    content: "";
    display: block;
    height: 0;
    padding-top: 100%;
}
.ratio-box-1x1 {
    overflow: hidden;
    position: relative;
}
.ratio-box-1x1:before {
    content: "";
    display: block;
    height: 0;
    padding-top: 100%;
}
.ratio-box-2x1 {
    overflow: hidden;
    position: relative;
}
.ratio-box-2x1:before {
    content: "";
    display: block;
    height: 0;
    padding-top: 50%;
}```
