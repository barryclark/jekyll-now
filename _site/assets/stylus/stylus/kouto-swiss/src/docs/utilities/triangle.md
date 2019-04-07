### triangle()

Change the target into a lovely triangle :)  
Useful for tooltips, arrows, or anything you want with pointy stuffs.

#### Signature

`triangle( direction, size, face-color [, back-color ] )`

* `direction`: the direction of the triangle. Can be `up`, `down`, `left`, `right`, `up-left`, `up-right`, `down-left`, `down-right`.
* `size`: size of the triangle.
* `face-color`: color of the triangle.
* `back-color`: background color of the triangle. *Optional*. Defaults to `transparent`.

#### Example

##### Usage

```stylus
div
    triangle( up, 10px, red )

div
    triangle( down-right, 10px, red )
```

##### Result

```css
div {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: #f00;
}

div {
  width: 0;
  height: 0;
  border: 10px solid #00f;
  border-bottom-color: #f00;
  border-right-color: #f00;
}
```
