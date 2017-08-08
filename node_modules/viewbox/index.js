// viewbox helper library
'use strict'

module.exports = {
  create: function createViewbox() {
    return []
  },

  add: function addViewboxes(box, addend) {
    if (!box.length) {
      return addend
    }

    if (!addend.length) {
      return box
    }

    var xMin = Math.min(box[0], addend[0])
    var yMin = Math.min(box[1], addend[1])
    var xMax = Math.max((box[0] + box[2]), (addend[0] + addend[2]))
    var yMax = Math.max((box[1] + box[3]), (addend[1] + addend[3]))

    return [xMin, yMin, (xMax - xMin), (yMax - yMin)]
  },

  scale: function scaleViewboxes(box, scale) {
    return box.map(function(component) {
      return component * scale
    })
  },

  rect: function viewboxRect(box) {
    box = box && box.length
      ? box
      : [0, 0, 0, 0]

    return {
      x: box[0],
      y: box[1],
      width: box[2],
      height: box[3]
    }
  },

  asString: function(box) {
    box = box && box.length
      ? box
      : [0, 0, 0, 0]

    return box.join(' ')
  }
}
