### easing()

Get a `cubic-bezier` preset to use with `transition` property.  
The presets are taken from the plugin [easie](http://jaukia.github.io/easie/), by [Janne Aukia](http://janne.aukia.com)

These are the preset included in **kouto swiss**:

* `"in-quad"`
* `"in-cubic"`
* `"in-quart"`
* `"in-quint"`
* `"in-sine"`
* `"in-expo"`
* `"in-circ"`
* `"in-back"`
* `"out-quad"`
* `"out-cubic"`
* `"out-quart"`
* `"out-quint"`
* `"out-sine"`
* `"out-expo"`
* `"out-circ"`
* `"out-back"`
* `"in-out-quad"`
* `"in-out-cubic"`
* `"in-out-quart"`
* `"in-out-quint"`
* `"in-out-sine"`
* `"in-out-expo"`
* `"in-out-circ"`
* `"in-out-back"`

#### Signature

`easing( name )`

* `name`: name of the preset. **Must be quoted**.

#### Example

##### Usage

```stylus
div
    transition: all .25s easing( "in-quad" )
```

##### Result

```css
div {
  -webkit-transition: all 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  -o-transition: all 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  transition: all 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}
```
