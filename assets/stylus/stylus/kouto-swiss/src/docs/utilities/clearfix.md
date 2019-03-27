### clearfix

The clearfix mixins will output a clearfix to the selector where it is declared.

The clearfix comes with three syntaxes, each return the same result.

> This clearfix is based on [Nicolas Gallagher's micro clearfix](http://nicolasgallagher.com/micro-clearfix-hack/).

**Note:** the support of IE6&7 is added using the global `$ks-support-ie`.

#### Example

##### Usage

```stylus
// form one
div
    clearfix()

// form two
div
    clear: fix

// form three
div
    clear: fix()

```

##### Result

```css
div:before,
div:after {
  content: " ";
  display: table;
}
div:after {
  clear: both;
}
```
