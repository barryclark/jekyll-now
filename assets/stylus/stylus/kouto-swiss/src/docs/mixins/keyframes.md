### keyframes & animation

To make animations with css3, you'll need to use the `animation` property & the `@keyframes` structure.

The `animation` property is already handled in **kouto swiss** by the [vendors mecanism](#vendors).

The `@keyframes` structure is currently handled by the [Stylus language](http://learnboost.github.io/stylus/docs/keyframes.html).  
**Note:** as precised on the stylus documentation, the *vendor expansion* of the `@keyframes` structure will be removed from Stylus in `1.0` version. When this time will come, we'll had that behaviour to **kouto swiss**.

#### Example

##### Usage

```stylus
@keyframes my-rainbow-animation
    0%
        color: red
    14%
        color: orange
    28%
        color: yellow
    42%
        color: green
    56%
        color: blue
    70%
        color: indigo
    84%
        color: violet

div.rainbow
    animation rainbow 3s linear
```

##### Result

```css
div.rainbow {
  -webkit-animation: rainbow 3s linear;
  animation: rainbow 3s linear;
}
@-moz-keyframes my-rainbow-animation {
  0% {
    color: #f00;
  }
  14% {
    color: #ffa500;
  }
  28% {
    color: #ff0;
  }
  42% {
    color: #008000;
  }
  56% {
    color: #00f;
  }
  70% {
    color: #4b0082;
  }
  84% {
    color: #ee82ee;
  }
}
@-webkit-keyframes my-rainbow-animation {
  0% {
    color: #f00;
  }
  14% {
    color: #ffa500;
  }
  28% {
    color: #ff0;
  }
  42% {
    color: #008000;
  }
  56% {
    color: #00f;
  }
  70% {
    color: #4b0082;
  }
  84% {
    color: #ee82ee;
  }
}
@-o-keyframes my-rainbow-animation {
  0% {
    color: #f00;
  }
  14% {
    color: #ffa500;
  }
  28% {
    color: #ff0;
  }
  42% {
    color: #008000;
  }
  56% {
    color: #00f;
  }
  70% {
    color: #4b0082;
  }
  84% {
    color: #ee82ee;
  }
}
@keyframes my-rainbow-animation {
  0% {
    color: #f00;
  }
  14% {
    color: #ffa500;
  }
  28% {
    color: #ff0;
  }
  42% {
    color: #008000;
  }
  56% {
    color: #00f;
  }
  70% {
    color: #4b0082;
  }
  84% {
    color: #ee82ee;
  }
}
```
