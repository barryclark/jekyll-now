---
layout: post
title: Clean foreach loop over dictionaries in C# 7
---

My new GitHub-hosted blog is online! There will hopefully be much more informative, insightful, hilarious, and multi-subject posts to come, but as a quick test to make sure I have Jekyll set up correctly, here's a little thing to make your C# code a little nicer.

I love C#, but a minor sticking point for me has always been the slightly ugly syntax for iterating over all values in a dictionary. You either have to do this:

```c#
IDictionary<string, int> dict = GetDictionary();
foreach (var kvp in dict) {
  string key = kvp.Key;
  int val = kvp.Value;
  // do stuff...
}
```

or this:

```c#
IDictionary<string, int> dict = GetDictionary();
foreach (string key in dict.Keys) {
  int val = dict[key];
  // do stuff...
}
```

Neither of which look very nice. I just want the kind of super-clean syntax you can get in more scripting-oriented languages like Python. I want to write this:

```c#
IDictionary<string, int> dict = GetDictionary();
foreach ((string key, int val) in dict) {
  // do stuff...
}
```

As it turns out, this is now possible thanks to some of the [new features in C# 7](https://msdn.microsoft.com/en-us/magazine/mt790184.aspx), including deconstructors and the new (and long-awaited) tuple literals as a replacement for the barely-functional-but-very-ugly KeyValuePair. 

It's not possible out of the box, but, assuming you're cool with extension methods, all you need to do is add this to your project:

```c#
public static class ExtensionMethods {
  public static void Deconstruct<TKey, TValue>(this KeyValuePair<TKey, TValue> kvp, out TKey key, out TValue val) {
    key = kvp.Key;
    val = kvp.Value;
  }
}
```

and then the above loop will work just right!

I filed [a small PR](https://github.com/dotnet/roslyn/issues/20393) with the Roslyn team to get this added as default behavior, and was told it will probably make it into an upcoming version of .NET Core (yay!), but there was no ETA for .NET Standard (aww). So hopefully this little snippet can make you just a little happier while you wait.
