// tests for viewbox helper library
'use strict'

var expect = require('chai').expect

var viewbox = require('./')

describe('viewbox', function() {
  it('should be able to create a new viewbox', function() {
    var result = viewbox.create()

    expect(result).to.eql([])
  })

  it('should be able to add two viewboxes', function() {
    var box1 = [0, -1, 4, 5]
    var box2 = [-3, 1, 2, 6]
    var result = viewbox.add(box1, box2)

    expect(result).to.eql([-3, -1, 7, 8])
  })

  it('should be able to add a viewbox to a new viewbox', function() {
    var box1 = viewbox.create()
    var box2 = [-3, 1, 2, 6]
    var result = viewbox.add(box1, box2)

    expect(result).to.eql([-3, 1, 2, 6])
  })

  it('should be able to add a new viewbox to a viewbox', function() {
    var box1 = [0, -1, 4, 5]
    var box2 = viewbox.create()
    var result = viewbox.add(box1, box2)

    expect(result).to.eql([0, -1, 4, 5])
  })

  it('should be able to scale a viewbox', function() {
    var box = [-1.5, 0.5, 1, 3]
    var result = viewbox.scale(box, 2)

    expect(result).to.eql([-3, 1, 2, 6])
  })

  it('should be able to generate attributes for an SVG rectangle', function() {
    var box = [0, -1, 4, 5]
    var result = viewbox.rect(box)

    expect(result).to.eql({
      x: 0,
      y: -1,
      width: 4,
      height: 5
    })
  })

  it('should output a 0 size rectangle for a new viewbox', function() {
    var box = viewbox.create()
    var result = viewbox.rect(box)

    expect(result).to.eql({
      x: 0,
      y: 0,
      width: 0,
      height: 0
    })
  })

  it('should output a 0 size rectangle for something falsey', function() {
    var result = viewbox.rect()

    expect(result).to.eql({
      x: 0,
      y: 0,
      width: 0,
      height: 0
    })
  })

  it('should be able to generate a viewbox string', function() {
    var box = [1, 2, 3, 4]
    var result = viewbox.asString(box)

    expect(result).to.equal('1 2 3 4')
  })

  it('should output a new viewbox as a 0 size viewbox string', function() {
    var box = viewbox.create()
    var result = viewbox.asString(box)

    expect(result).to.equal('0 0 0 0')
  })

  it('should output something falsey as a 0 size viewbox string', function() {
    var result = viewbox.asString()

    expect(result).to.equal('0 0 0 0')
  })
})
