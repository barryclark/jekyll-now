---
layout: post
title: Notes on Broken Image Parsers (Procreate's not-so-pro bugs)
---
Procreate is awesome! My wife is an artist and literally lives on her tablet thanks to it. That said, anytime we try to upload a PNG to:
- Redbubble
- StickerApp
- Gooten
- Other apps like VectorQ

we get served with a big book of fail.

Having done some experiments:
- PNGs I export from procreate on the Ipad CANNOT be uploaded to redbubble from the Ipad.
- The EXACT SAME FILE, when airdropped/emailed/dropboxxed to my laptop, will upload just fine.
- Attempting to load that PNG from procreate into VectorQ (an app that vectorizes raster images) on my Ipad causes the app to crash.
- The exact same file, opens fine in VectorQ on my mac (they have a mobile and mac version)
- Using any other software to generate a PNG, I can upload them from mobile just fine.

So what does this tell me:
- The code that Procreate uses to generate/export PNGs results in files that are only SLIGHTLY malformed enough to trigger a bug in the MOBILE version of a common file/image handling library
- I need to break out the RE tools to see what these things have in common.


### Part 2
More to follow, if you have a problem with Procreate exports and uploading to redbubble/other sites from your ipad... please let me know what you've learned.


### TODO
- Screen recording on Ipad of export/failed upload
- Screen recording on Ipad of VectorQ app crash
- PCAP of failed upload from mobile
- PCAP of successful upload from mobile (non-procreate file)
- PCAP of successful upload from laptop (procreate file)
- Crashdumps of VectorQ
