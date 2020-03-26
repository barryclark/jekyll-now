---
layout: post
title: Swift Protocol
---

## What is protocol?

### In Swift:

  1. Protocol is a type just like class, struct and enum.
  2. Protocol is basically just a list of methods and properties with no implementation.
  
## How to use protocol?

### Protocol declaration:

```swift
protocol Moveable {
  func move()
}
```

### Conforming protocol:

```swift
class Car: Moveable {
  func move() {
    print("Moving")
  }
}
```

## Protocol property

A protocol can require any conforming type to provide an instance property or type property with a particular name and type.
