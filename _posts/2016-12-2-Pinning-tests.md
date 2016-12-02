---
layout: post
title: "Pinning tests"
image: pins.jpg
---

!["New pins" by Buttontree Lane]({{ site.baseurl }}/images/pins.jpg)

Pinning tests are a valuable addition to any developer's toolkit. They come primarily into play when you're given the scary task of making updates to legacy code, especially when the original developers are long gone, no one has more than a vague idea of what it does, and concepts like unit test or integration tests are the stuff of fairytales. Refactors in general become a lot less scary and less likely to result in a desperate plea-via-3am-phone-call of "fix it!"

The process of conducting a pinning test is the following:

1. Create a new branch for your change.
2. Capture everything that the existing program is doing. If it's a data retrieval operation, that could mean converting and then concatenating all the output into a JSON string. If it's writing to a data store, then prior to every write operation, log the command that's getting sent to the external store. Basically you need evidence of anything of importance that's happening in the chunk of code that you want to change and that will still have to occur post-code-change.
3. Save that output to a file as a snapshot of pre-change behavior.
4. Make your refactoring changes.
5. Do the same thing as #2 and #3 with the new code.
6. Do a diff between the file generated in #3 (pre-refactoring) and #5 (the new code)
7. If they're the same, congratulations! Assuming you successfully captured the important bits of whatever it is your code must do in your output file, you (probably) haven't broken the functionality. If they are different, then you get to dig through your refactor and figure out why.
8. Merge your branch into the parent branch and go on your merry way.

I was first introduced to the concept of the pinning test with the [Approval Tests](http://approvaltests.com/) libraries available for many major languages, but you don't need anything special to get started doing your own pinning tests. With this in your arsenal you may be able to sleep better at night even after a day spent refactoring gnarly legacy code.

(image credit: [Buttontree Lane](https://www.flickr.com/photos/quiltingmick/6040908522/in/photolist-acPeDd-6VHvxi-bK8o7-vaPgD4-93buAy-mQWuX-geYNK-syDsAC-4YEqbw-67Tat8-pU6RP5-guc4n-5muy2-xmk49-8oAqy3-yzUdM4-beE8oD-fpbW9d-qSJiLH-8ZbkyD-94wMdc-5Atitc-dCcLjX-3nC2uc-8oApYC-7Xx4PC-8oAqjm-7K7EpW-ab18kR-puQRd1-cpDso-eZ4ifT-6A7n8p-k9FPXu-dwuCA4-bH7Ho-drudLK-afFXif-8u8Qkj-fFeTP-qKpreG-aqcDa4-hoUZfJ-4Hwgd-fbKNhW-afqeCY-afnrGD-9pc65e-q8Aw6H-5bLCqj))
