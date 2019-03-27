### `font-stack()`

Get a font stack to use with `font-family`.  
The font stacks are taken from the site [cssfontstack.com](http://cssfontstack.com), by [Denis Leblanc](http://denisleblanc.com)

These are the stacks included in **kouto swiss**:

* `"Arial"`
* `"Arial Black"`
* `"Arial Narrow"`
* `"Arial Rounded MT Bold"`
* `"Avant Garde"`
* `"Calibri"`
* `"Candara"`
* `"Century Gothic"`
* `"Franklin Gothic Medium"`
* `"Futura"`
* `"Geneva"`
* `"Gill Sans"`
* `"Helvetica"`
* `"Impact"`
* `"Lucida Grande"`
* `"Optima"`
* `"Segoe UI"`
* `"Tahoma"`
* `"Trebuchet MS"`
* `"Verdana"`
* `"Baskerville"`
* `"Big Caslon"`
* `"Bodoni MT"`
* `"Book Antiqua"`
* `"Calisto MT"`
* `"Cambria"`
* `"Didot"`
* `"Garamond"`
* `"Georgia"`
* `"Goudy Old Style"`
* `"Hoefler Text"`
* `"Lucida Bright"`
* `"Palatino"`
* `"Perpetua"`
* `"Rockwell"`
* `"Rockwell Extra Bold"`
* `"Times New Roman"`
* `"Andale Mono"`
* `"Consolas"`
* `"Courier New"`
* `"Lucida Console"`
* `"Lucida Sans Typewriter"`
* `"Monaco"`
* `"Copperplate"`
* `"Papyrus"`
* `"Brush Script MT"`
* `"System"`
* `"System with Emojis"`

#### System font-stack

The `"System"` and `"System with Emojis"` stacks are [the ones used on GitHub](https://bitsofco.de/the-new-system-font-stack/) : `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif` and `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`.

#### Signature

`font-stack( name )`

* `name`: name of the stack. **Must be quoted**.

#### Example

##### Usage

```stylus
body
    font-family font-stack( "Arial" )

body
    font-family font-stack( "Helvetica" )

body
    font-family font-stack( "Lucida Console" )
```

##### Result

```css
body {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

body {
  font-family: "Lucida Console", "Lucida Sans Typewriter", Monaco, "Bitstream Vera Sans Mono", monospace;
}
```
