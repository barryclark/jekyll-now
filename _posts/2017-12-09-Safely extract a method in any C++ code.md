---
layout: post
title: Safely extract a method in any C++ code
---

([Reposted](https://jbazuzicode.blogspot.com/2017/02/safely-extract-method-in-any-c-code.html) to improve formatting).

Let me set the scene:

You're reading some code. Some old, gnarly C++ code. The method you're looking at is 5000 lines long. It's clearly really important. You need to understand it, but it's such a mess.

You notice a 1000 line block of code that seems to stand apart from the rest in some way. Your intuition as a programmer says "this chunk of code is different from the rest of the method, and it might make sense as a new method."

If you could Extract Method, that would help. It would let you shrink the problem space down as you endeavor to understand the code. The parameter list would make it obvious which variables are relevant to this block, and which are not - the data flow would become more clear.

Maybe you use CLion, or ReSharper, or Visual C++, or Visual Assist, and you try its built-in Extract Method feature. But these tools are far from perfect. They often introduce a behavior change, like copying a parameter instead of passing by reference. If you're lucky you get a compile error and back up; if you're unlucky, the behavior change is subtle and you've just introduced a bug.

With that in mind, I offer this recipe for C++ Extract Method. Follow the recipe exactly, and you can be sure the code will work the same after as before, or the recipe will kick you out, saying you can't extract this method. You won't have to do a bunch of careful analysis - we'll lean on the compiler for that. (If it ever does introduce a behavior change for you, that's a bug in the recipe. Let me know and we'll fix it.)

Thanks to Llewellyn Falco and Arlo Belshee who said the right things at the right time to make this recipe pop in to existence, and my coworkers at Tableau Software for filling in a bunch of details. They deserve 99% of the credit.

# The recipe.

*Edit 2018-09-01* An updated version of this recipe is now available on GitHub, along with a growing catalog of provably-safe refactorings. You should go there instead.

If you get to the end of step 1, the refactoring is possible - it will produce a valid result.

This recipe only works on whole blocks (surrounded by braces) or a single `for`/`while`/`if` statement. Consider using Introduce Block to get braces around the code you want to extract.

You need C++11 or later. You only need it for the duration of this refactoring, for this one file. So if you can't upgrade your whole project right now, that's fine. Get a C++11 compiler running on this file, refactor, and revert the tools.

Each step is a safe micro-refactoring. You can check in at the end of each step.

The underlying principle is Tennent's Correspondence Principle.

## 1. Introduce a lambda

Surround the block in question with:

```
[&]() {
  // original code
}();
```

If you haven't seen this syntax before, check out the C++ lambda docs.

*Compile* the file. Possible errors:
- *not all control paths return a value*. You have an early return. Back up and either Eliminate Early Return/Continue/Break or extract something different.
- *a break/continue statement may only be used within...*.  You have a break/continue. Back up and either Eliminate Early Return/Continue/Break or extract something different.

*Check the new lambda for any return statements*. If there are any returns and it's obvious that all code paths return, then add a return statement. If there are any returns and it's not obvious that all code paths return, then back up and either Eliminate Early Return/Continue/Break or try extracting something different.

## 2. Introduce Variable on the lambda

i.e.
```
[&]() {
  // ...
}();
```

becomes:

```
auto Applesauce = [&]() {
  // ...
};
Applesauce();
```

It's not important to pick a good name, but it is important to pick a name that doesn't affect how other names resolve, so pick something completely unique (a GUID!)

Compile to make sure you didn't tyop.

## 3. Set the return type

Set the return type on the lambda (even if it's `void`). In Visual Studio, the tooltip over `auto` will tell you the type.

i.e.:
```
auto Applesauce = [&]() -> SOMETYPE {
  // ...
};
```

Compile to make sure you got the return type correct.

## 4. Capture explicitly

*Replace* `[&]` with `[this]` (or `[]` in a free function) and compile.

*For each error* about a variable that must be captured:
- Copy the variable name
- Paste it in to the capture list, prefixed with `&`
- Repeat until green.

i.e.:
```
auto Applesauce = [this, &foo]() -> void {
    // something with foo...
};
```

The order of the capture list will influence the order of the parameters of the final function. If you want the parameters in a particular order, now is a good time to reorder the capture list.

## 5. Convert captures to parameters


*For each captur*ed local variable (except `this`)
- Go to the definition of the variable
- Copy the variable declaration (e.g. `Column* pCol`)
- Paste in to the lambda parameter list
- Make the parameter const and by-reference
- Remove the variable from the capture list
- Pass the variable in to the call
- Compile.

i.e.:

```
Foo foo = ...

Bar* bar = ...

auto Applesauce = [this, &foo, &bar]() -> void {
    // something with foo and bar...
};

Applesauce();
```

becomes

```
 Foo foo = ...

 Bar* bar = ...

 auto Applesauce = [this](Foo& foo, Bar*& bar) -> void {
    // something with foo and bar...

 };

 Applesauce(foo, bar);
```

Note: even pointers must be passed by reference.

## 6. Try to eliminate `this` capture


- Remove `this` from the capture list
- Compile
If the compile fails, undo

##7. Convert lambda to function

If `this` is captured, use 7A.
If `this` is not captured, use 7B.

### 7A. Convert this-bound lambda to member function

- Cut the lambda statement and paste it outside the current function
- Remove `= [this]`
- Copy the signature line
- Add `SomeClass::`
- In the header file, add the function declaration in a private section of the class.
- Compile 
i.e.:

```
auto SomeClass::Applesauce(Foo& foo, Bar*& bar) -> void {
    // ...
};
```

### 7B. Convert non-this Lambda to free function

- Cut the lambda statement and paste it above the current function.
- Remove `= []`
- Wrap it in an unnamed namespace
- Compile
If the free function uses typedefs/aliases or classes nested in the original class, convert the free function to a private static function of the original class (7A).

i.e.:

```
namespace {
   auto Applesauce(Foo& foo, Bar*& bar) -> void {
      // ...
   };
}
```
