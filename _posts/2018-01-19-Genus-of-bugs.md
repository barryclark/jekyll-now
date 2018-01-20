---
layout: post
title: What is "a genus of bugs"?
---

When [Safeguarding](/Safeguarding) we want to reduce the size of a genus of bugs by 15% each time. So what makes a genus of bugs?

We were working on code that dealt with attributes. Attributes have names and values. Attribute Values are exact-match, case-sensitive strings, but Attribute Names are case-_insensitive_. We'd sometimes forget and write a bug:

```
string attribute1Name = attribute1.GetName();
string attribute2Name = attribute2.GetName();
if (attribute1Name == attribute2Name) ...                     // bug!
```

and sometimes the bug was more subtle:

```
if (attributeNames.contains("foo"))                           // bug!
```

after fixing this kind of bug a few times, we refactored the code to make it safer:

```
class AttributeName
{
    ctor(value) { Value = value; }
    
    Equals(AttributeName other) { return value = other.value; }
}
```

and the above code becomes:

```
AttributeName attribute1Name = attribute1.GetName();
AttributeName attribute2Name = attribute2.GetName();
if (attribute1Name == attribute2Name) ...                         // ok!

if (attributeNames.contains(AttributeName("foo")))                // ok!
```

The genus of bugs here is "case-sensitivy in attribute names".

Now that kind of bug can't easily happen, but there's a more general category of bugs we might notice. After noticing it in Attribute Names, we might also see it in Windows File Paths or Street Names. This genus is "case-sensitivity in strings". 

After addressing that one, the next might be "equality between values in the domain".

Like in biology, the boundaries of a genus of bugs are always changing, although in software the change can be very fast. Unlike biology, the key is to pick a genus that is big enough to be interesting, but small enough to fit in your brain.

I used to say "class of bugs", but when people heard me say "there's a large class of bugs and we should shrink it", they thought I meant "a `class` in code that has too many responsibilities and is buggy, which should be broken up and cleaned". And yes, that is a common occurrence, it's not quite what I'm trying to say right now, so I switched to "genus".
