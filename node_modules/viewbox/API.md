# TOC
   - [viewbox](#viewbox)
<a name=""></a>
 
<a name="viewbox"></a>
# viewbox
should be able to create a new viewbox.

```js
var result = viewbox.create()
expect(result).to.eql([])
```

should be able to add two viewboxes.

```js
var box1 = [0, -1, 4, 5]
var box2 = [-3, 1, 2, 6]
var result = viewbox.add(box1, box2)
expect(result).to.eql([-3, -1, 7, 8])
```

should be able to add a viewbox to a new viewbox.

```js
var box1 = viewbox.create()
var box2 = [-3, 1, 2, 6]
var result = viewbox.add(box1, box2)
expect(result).to.eql([-3, 1, 2, 6])
```

should be able to add a new viewbox to a viewbox.

```js
var box1 = [0, -1, 4, 5]
var box2 = viewbox.create()
var result = viewbox.add(box1, box2)
expect(result).to.eql([0, -1, 4, 5])
```

should be able to scale a viewbox.

```js
var box = [-1.5, 0.5, 1, 3]
var result = viewbox.scale(box, 2)
expect(result).to.eql([-3, 1, 2, 6])
```

should be able to generate attributes for an SVG rectangle.

```js
var box = [0, -1, 4, 5]
var result = viewbox.rect(box)
expect(result).to.eql({
  x: 0,
  y: -1,
  width: 4,
  height: 5
})
```

should output a 0 size rectangle for a new viewbox.

```js
var box = viewbox.create()
var result = viewbox.rect(box)
expect(result).to.eql({
  x: 0,
  y: 0,
  width: 0,
  height: 0
})
```

should output a 0 size rectangle for something falsey.

```js
var result = viewbox.rect()
expect(result).to.eql({
  x: 0,
  y: 0,
  width: 0,
  height: 0
})
```

should be able to generate a viewbox string.

```js
var box = [1, 2, 3, 4]
var result = viewbox.asString(box)
expect(result).to.equal('1 2 3 4')
```

should output a new viewbox as a 0 size viewbox string.

```js
var box = viewbox.create()
var result = viewbox.asString(box)
expect(result).to.equal('0 0 0 0')
```

should output something falsey as a 0 size viewbox string.

```js
var result = viewbox.asString()
expect(result).to.equal('0 0 0 0')
```

