---
layout: post
title: C#: Null conditional tightens it up
---

The other day I ran into a usage of the null conditional operator (added in C# 6) that made me realize that we can get our terseness on in some additional situations. Instead of having to do a thing like this:

var thing = someParameter != null && someProperty.subProperty != null && someSubProperty.subPropCollection != null
  ? new List<string>() 
  : someParameter.subProperty.subPropCollection;
  
We can just do it like this:

var thing = someProperty?.subProperty?.subPropCollection ?? new List<string>();

Go forth and do good with this newfound information!
