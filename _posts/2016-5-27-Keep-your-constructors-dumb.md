---
layout: post
title: Keep your constructors dumb
---

!["Construction site" image by Hugh Dutton Associés](/content/images/2016/05/10537026884_f640986794_k.jpg)

In a [Pluralsight course by John Papa](https://www.pluralsight.com/courses/angular-2-first-look) covering Angular 2, he made an offhand comment about how constructors should be kept as simple as possible, and though it was the first time I had heard this philosophy, it made a lot of sense. [Brendan Enrick on his blog post from back in 2009](http://brendan.enrick.com/post/Constructors-Should-Be-Simple-and-Stupid) goes into more detail that really reinforces the idea, but it boils down to making your objects easy to use in testing and to avoid hidden complexity. 

Objects get instantiated in a lot of places, especially in frameworks, and stack traces become a lot less intelligible when logic inside the constructor blows up while connecting to a database or constructing an elaborate object graph. Constructors should be limited to setting fields. Anything more complicated should be calculated outside of the object and provided as an argument (perhaps through a factory), or the logic should be performed in a separate method to be called after object instantiation. Keep your constructors dumb to keep your objects happy, and put the smarts somewhere else.

(image credit: [Hugh Dutton Associés](https://www.flickr.com/photos/hdaparis/10537026884/in/photolist-h481Zj-h48mgM-nYacVm-icDKVT-h482GJ-h47Nuj-h7R6mV-h7Pm8x-avGFC4-h48Eyg-6eXd1r-4akytG-h47CQu-h48jT6-h48ADx-h7R77T-h47LCy-h49bEt-h7Psqn-h7QJqK-h7QSFV-h47FZM-4pK8gr-bvqHVq-h7Prz4-7bjvzT-h7RhKC-4ErqsG-hVtj5U-jbgwQr-h7S4rF-4t71e-DbiJym-h7QRdn-h7Tt6v-h49k78-opW6H1-FXFuu-FXFus-FXFuy-FXFuq-dBXeJb-hZjJxq-hACiGL-hDZYwC-q8tVmX-8NS5Wu-okEEg7-okiDWk-ofoopE))