### position mixins

The position mixins gives you five convenient shortcuts for `position` property.
Simply call the value of position as property, and gives the values of `top`, `right`, `bottom` and `left` as value.

**Note:** The values are parsed in the same way as in `margin` or `padding` method : 1 value affect all, 2 values are for `top`/`bottom` and `left`/`right`, 3 values are for `top`, `left`/`right` and `bottom`, and 4 values are for `top`, `right`, `bottom` and `left`.

**Note 2:** If you give the `false` value to a parameter, it will be ignored

**Note 3:** Since version `0.11.7`, position mixin supports `sticky` value, using caniuse data.

**Note 4:** Since version `0.14.0`, position mixin supports _relative_ position like `background-position` (see exemple for more details).

#### Example

##### Usage

```stylus
div
    static: 10px

div
    relative: 10px 20px

div
    absolute: 10px 20px 30px

div
    fixed: 10px 20px 30px 40px

div
    fixed: 10px false 30px

div
    fixed: 10px 20px false 40px

div
    position: sticky

div
    sticky: 10px 20px 0 40px

div
    absolute: top right

div
    absolute: top 2rem right

div
    absolute: top 35px right 20%
```

##### Result

```css
div {
  position: static;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 10px;
}

div {
  position: relative;
  top: 10px;
  right: 20px;
  bottom: 10px;
  left: 20px;
}

div {
  position: absolute;
  top: 10px;
  right: 20px;
  bottom: 30px;
  left: 20px;
}

div {
  position: fixed;
  top: 10px;
  right: 20px;
  bottom: 30px;
  left: 40px;
}

div {
  position: fixed;
  top: 10px;
  bottom: 30px;
}

div {
  position: fixed;
  top: 10px;
  right: 20px;
  left: 40px;
}

div {
  position: -webkit-sticky;
  position: sticky;
}

div {
  position: -webkit-sticky;
  position: sticky;
  top: 10px;
  right: 20px;
  bottom: 0;
  left: 40px;
}
div {
  position: absolute;
  top: 0;
  right: 0;
}
div {
  position: absolute;
  top: 2rem;
  right: 0;
}
div {
  position: absolute;
  top: 35px;
  right: 20%;
}
```
