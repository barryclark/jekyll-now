---
layout: post
title: More understandable C# APIs through flags
---


![Image of flags hanging from the ceiling at the Nixon Presidential Library in Yorba Linda, California]({{ site.baseurl }}/images/775287_10100542294938588_2026077564_o-1.jpg)

Making your APIs more understandable and easy to use is a constant consideration in programming. When I say API, I don't just mean APIs exposed via HTTP or whatever protocol. I also mean any public interface that another component might invoke in an application. Documentation can fill in some blanks, but nothing beats an intuitive signature. Have you ever written a method whose invocations tend to look something like this?

```
LogTheInfo(relevantObject, true, false, true, false, false);
```

Intellisense can fill in the blanks on that chain of booleans if you hover over the method name, but you may not always have the benefits of Intellisense (e.g., github, more basic text editors). The humble Enumeration can come in handy here. You may be familiar with its standard form, but have you used the [`[Flags]`](https://msdn.microsoft.com/en-us/library/system.flagsattribute(v=vs.110).aspx) attribute? By adding it to an Enum and ensuring that all values are set to powers of 2, you can make for a much more expressive method call:

```
LogTheInfo(relevantObject, LogOptions.WriteToFile | LogOptions.VerboseLogging);
```

Gone is the indecipherable list of bools. As long as you're sure these are independent config options, this is a nice way to clean up the argument list. Then in the implementation you just have to call the [`Enum.HasFlag`](https://msdn.microsoft.com/en-us/library/system.enum.hasflag(v=vs.110).aspx) method to check and see if it was set. Your first swipe at the LogOptions enum definition might look like this:

```
[Flags]
public enum LogOptions
{
    None = 0,
    WriteToFile = 1,
    WriteToDatabase = 2,
    MakeTea = 4,
    TakeOverTheWorld = 8,
    VerboseLogging = 16
}
```

Turns out there's an easier way, as I discovered [in a tweet from Nick Craver](https://twitter.com/Nick_Craver/status/721309088458674176) who works for Stack Overflow:

```
[Flags]
public enum LogOptions
{
    None = 0,
    WriteToFile = 1 << 0,
    WriteToDatabase = 1 << 1,
    MakeTea = 1 << 2,
    TakeOverTheWorld = 1 << 3,
    VerboseLogging = 1 << 4
}
```

This uses [bitwise operations](https://msdn.microsoft.com/en-us/library/17zwb64t.aspx) to shift to the left, which makes it easier to ensure that each value is the next power of 2 after the previous entry. It does require knowledge of what's going on with the calculation, but the conciseness is a big win. Whether you specify the values explicitly or use the bit shifting, it can make your methods much more easy to use and invocations more comprehensible at a glance. 