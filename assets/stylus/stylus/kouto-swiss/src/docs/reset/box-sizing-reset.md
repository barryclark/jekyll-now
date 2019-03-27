### `box-sizing-reset()`

The *box-sizing reset*, setting the `box-sizing` property to `border-box`.

For more information, read the post "[Box-sizing: Border-box FTW](http://www.paulirish.com/2012/box-sizing-border-box-ftw/)" by Paul Irish.

**Note:** From version `0.10`, the `box-sizing-reset()` function has changed his behaviour when its called from the root level : it [use an inheritance pattern](http://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/), which produce the same result, and is more reliable for cases where you want to use an other *box model* for a part of your page.

#### Example

##### Usage

```stylus

box-sizing-reset()

article
    box-sizing-reset()

```

##### Result

```css
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
article *,
article *:before,
article *:after {
  box-sizing: border-box;
}

```
