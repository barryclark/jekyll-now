---
layout: post
title: PS Core - Numeric Literals
date: 2018-10-14
tags: powershell core pscore csharp
---

PowerShell has had only very basic support for numeric literals for longer than I've been using it,
having only _two_ basic suffixes and a handful of numeric syntaxes.

## Standard Numeral Types in PowerShell

```powershell
100  # int32
100L # long aka Int64
100D # decimal
10.0 # double
1e2  # double
0xA  # hexadecimal, standard int32
0xAL # hexadecimal, int64
```

Add in the standard multipliers: `kb`, `mb`, `gb`, `tb`, and `pb` and you've got a decent working
set of numerals. This is sufficient for most purposes, but as we'll see there is... _room for
improvement_.

## Other Numeric Types

If you want to work with any other numeric types you've been forced to use type accelerators, which
are not without their problems. Perhaps most demonstrably, high integer values are always parsed as
`double` before being cast to any other values:

```powershell
PS> [bigint]111111111111111111111111111111111111111111111111111111
111111111111111100905595216014112456735339620444667904
```

What happened to the value? The value is parsed as a `double` first, losing precision in the higher
ranges. Certainly, this _is_ an edge case, but it's something to be aware of. The only current way
to properly circumvent this is to enter values as strings and then convert them:

```powershell
PS> [bigint]'111111111111111111111111111111111111111111111111111111'
111111111111111111111111111111111111111111111111111111
```

## Room for Improvement

Starting a couple months ago, I've been working on the tokenizer in PowerShell Core. It started,
really, as a minor frustration that PowerShell doesn't really work very well with unsigned numbers
&mdash; `uint` and its cousins &mdash; and grew from there.

So, I started digging. Github user [@SeeminglyScience](https://github.com/seeminglyscience)
(Patrick Meinecke) was kind enough to really point me in the right direction here.

Although it hasn't made it to a release at the time of writing, some of my changes have already been
merged into the PowerShell/PowerShell master branch and will see the light of day soon. So, let's
check out what I've managed to throw together!

### New Literal Type Suffixes

At the time of writing, the following numeric literal suffixes have been implemented:

```powershell
100u  # unsigned integer (uint/uint32), or (ulong/uint64)
100s  # short (int16)
100us # unsigned short (ushort/uint16)
100ul # unsigned long (ulong/uint64)
100y  # signed byte (sbyte)
100uy # unsigned byte (byte)
```

Just like the existing numerals automatically scale up to `long` values when you enter big enough
numbers, the `u` suffix will happily give you a `ulong` value when you enter numerals large enough.

To pair with the new suffixes that closely reflect C# or F# literal suffixes, I've also added
a couple additional type accelerators that alias existing ones:

```powershell
[short]  # same as [int16]
[ushort] # same as [uint16]
[uint]   # same as [uint32]
[ulong]  # same as [uint64]
```

(And for those of you asking "What about `[s/byte]` or `[long]`?" &mdash; they already exist.)

These are all useable alongside the existing multiplier values. However, should you attempt
something especially silly &mdash; for example `100uygb` (100, byte, multiplied by `1GB`) &mdash;
you will find the parser simply errors out completely, indicating that `The numeric literal
'100uygb' is not valid.`

## Future Additions

At the time of writing, I have opened
[PowerShell/PowerShell#7993](https://github.com/PowerShell/PowerShell/pull/7993) which contains the
following _approved_ changes:

* Support for binary literals &mdash; `0b11011011`
  * Thanks be to [@HumanEquivalentUnit](https://github.com/HumanEquivalentUnit) for his incredible work wringing the most performance out of the binary parser.
  * We actually opted to work with a new `BigInteger` constructor (introduced along with `ReadOnlySpan<T>` in .NET Core 2.0) for best performance:

    ```csharp
    new BigInteger(ReadOnlySpan<byte> value, bool isUnsigned, bool isBigEndian);
    ```

* Complete rework of the parsing logic for numerals when suffixes are applied to use simple bounds checks and straight casting instead of complex conversion methods.

It also currently contains the following _unapproved_ changes (which are subject to change or
exclusion, pending review by the PowerShell Committee):

* Support for underscore separators in numeric literals. Examples:
  * `1_000_000_000`
  * `0xFF_FE_EA_00`
  * `0b10_1111_1001_0011`
* Native `BigInteger` parsing support with `I` suffix. Unlike all other suffixes, this mimics F#'s BigInteger suffix and is only valid in uppercase. For those of us more mathematically inclined, lowercase `i` is typically used to denote _complex numbers_.
  * It should be noted that the parser _already_ utilised `BigInteger` for parsing numerals in order to prevent the possibility of overflow as much as possible. However, this would never be given back to the user in this form, even with a `[bigint]` cast applied.
  * PowerShell doesn't necessarily have a lot of use for complex numbers, but I did not wish to preclude the possibility that they may be added in future. After all, I've already gotten a working implementation, just to see if I _could_.
* Overly large binary or hexadecimal literals return as `[bigint]` rather than failing the parse. Sign bits are still respected above even `decimal` ranges, however:
  * If a binary string is some multiple of 8 bits long, the highest bit is treated as the sign bit.
  * If a hex string with length some multiple of 8 has the first digit with 8 or higher, the numeral is treated as negative. This may change before this PR has run its course, if the rest of these changes aren't removed, depending on feedback from the PS Core team.