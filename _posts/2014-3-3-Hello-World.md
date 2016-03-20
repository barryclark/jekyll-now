---
layout: post
title: Make a game like Flappy Bird with Swift
published: true
---


Learn SpriteKit and get an introduction to Swfit by making a clone of Flappy Bird.

SpriteKit is a great API for making 2D games for iOS, tvOS and the Mac. Together we'll build a game like Flappy Bird from the ground up. Along the way I'll introduce you to some concepts that will reduce bugs, make your games more robust, your code re-usable and readable.

This simple game will introduce you to several game programming concepts that will get you off to a good start developing games with SpriteKit in the Swift programming language.

```swift
    // MARK: - Animation Functions
    func flashBackground() {
        let colorFlash = SKAction.runBlock({
            self.backgroundColor = Colors.colorFromRGB(rgbvalue: Colors.Magic)
            self.runAction(SKAction.waitForDuration(0.25), completion: {
                self.backgroundColor = Colors.colorFromRGB(rgbvalue: Colors.Background)
            })
        })
        self.runAction(colorFlash)
    }
```
