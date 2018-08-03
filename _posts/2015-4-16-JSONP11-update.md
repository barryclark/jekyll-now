---
layout: post
title: JSON-P 1.1 update - JSON Pointer & JSON Patch
excerpt: JSON-P (JSR 353) is the standard JSON Processing API that was added in Java EE 7...
---

'Java API for JSON Processing 1.0' also known as JSON-P (JSR 353) is the standard JSON Processing API that was added in Java EE 7.  JSON-P will be updated and that update ([JSON-P 1.1 - JSR 374](https://jcp.org/en/jsr/detail?id=374)) should be included in Java EE 8. One of the goals of that revision is to add support for 2 JSON standards namely JSON Patch and JSON Pointer.

By nature JSON is simple and most of the standards in that space are simple as well. [JSON Pointer](http://tools.ietf.org/html/rfc6901) and [JSON Patch](http://tools.ietf.org/html/rfc6902) are 2 IETF RFCs that are closely related. JSON Pointer defines string syntax for identifying a specific value within a JSON document while JSON Patch defines a set (one or more) of operations to apply to a target JSON document. JSON Patch is leveraging JSON Pointer to specify where operation(s) need to be performed in the target JSON document. And a JSON Patch is in itself a JSON document. The most common pattern will be to apply a JSON Patch to transform a JSON document but it will also be possible to obtain a JSON Patch by comparing 2 JSON documents, the returned JSON Patch will then be a 'diff' between the 2 JSON documents.

It is the early day of JSR 374 but the EG is certainly making progress. At this stage, it is already possible to test, amongst other new features, JSON Pointer and JSON Patch as the early build of the JSR 374 RI already support those. Those tests would be a good place to look to understand how the API works. Note that at time of writing, the 'diff' method isn't yet implemented in the early JSR 374 RI build.

Getting feedback early on is really important for the various EGs!  Make sure to look and test the various APIs that will, at some point, be part of Java EE 8.


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/json-p-11-jsr-374-update%3A-json-pointer-json-patch) blog.*
