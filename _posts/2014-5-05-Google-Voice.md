---
layout: post
title: Fixing Google Voice with iOS 8
---

Ever since my wife had gotten an iPhone 8 with i0S 8, Google Voice hadn't been working right. Either it wouldn't go to the proper voicemail, or all calls would go *straight* to voicemail. Turns out it's an issue with iOS 8. The normal method of dialing \*\*004\*1234567890# doesn't work anymore. It just enables call forwarding. (where 1234567890 is your Google Voice number)

Thankfully there's a way around this. You need to dial 3 different numbers to setup Google Voice on 3 different conditions:

- Call forwarding if phone isn't answered: \*61\*1234567890#
- Call forwarding if phone isn't reachable: \*62\*1234567890#
- Call forwarding if phone is busy: \*67\*1234567890#

After setting up those 3 you'll be all set with Google Voice again!


