---
layout: post
title: "C#: Null conditional operator keeps it tight"
image: forkintheroad.jpg
description: The other day I ran into a usage of the null conditional operator (added in C# 6) that made me realize that we can get our terseness on in some additional situations.

---

![Image of fork in the road]({{ site.baseurl }}/images/forkintheroad.jpg)

The other day I ran into a usage of the [null conditional operator](https://docs.microsoft.com/en-us/dotnet/articles/csharp/language-reference/operators/null-conditional-operators) (added in C# 6) that made me realize that we can get our terseness on in some additional situations. <!--more-->Instead of having to do a thing like this to ensure no nulls:

```
var thing = someParameter != null && someProperty.subProperty != null && someSubProperty.subPropCollection != null
  ? someParameter.subProperty.subPropCollection
  : new List<string>();
```

We can just do it like this:

```
var thing = someProperty?.subProperty?.subPropCollection ?? new List<string>();
```

Go forth and do good with this newfound information!

(image credit: [judylcrook](https://www.flickr.com/photos/jlcrook/9044062080/in/photolist-eMcbyQ-aEKT28-obzuq8-iZ7av7-aZTMDn-jhkPYm-4rt9X3-eTigUA-5wWv6J-47qtZU-2XFBxi-dwi5WZ-BgouX-fEZrGy-qgZbbA-dX2pcL-9QdSjL-e8wojZ-JmPEwR-9NEtYQ-9NGKrb-9NJybd-9NEwpU-4z5BbR-4z5Bhr-4z9Nv5-aGfvNB-9NAsCc-5NamJJ-9M2DZZ-9NH11D-7oAg1t-kR45d1-4qLhhS-5QdduV-61aZcX-dUVyHm-7VXMp-bpqtgK-ekoPXf-4xPhz5-Nnjzv2-dwoCSh-anKXKa-7dWsL6-5qMRBw-66GSNp-6uuEJC-9R9ndb-65SKMb))
