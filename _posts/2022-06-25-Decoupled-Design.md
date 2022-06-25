---
layout: post
title: Decoupled Design with Events
---

When we try to apply unit testing, a question that often comes up is "how can we test this difficult-to-test code?". That question has an important built-in assumption, that the code as currently written should not change for the sake of testing, and shall be tested as-is. That's unfortunate, since a big potential benefit of unit testing is that it helps you detect and repair harmful coupling. Let's look specifically at some options for decoupling for testability.

Consider this code:

<!-- snippet: direct-call -->
```cs
public static class Program
{
    public static void Main()
    {
        AClass aClass = new ();
        aClass.Do();
    }
}

public class AClass
{
    private readonly Foo _foo = new();

    public void Do()
    {
        // ...
        this._foo.Bar("Hello, World!");
        // ...
    }
}

public class Foo
{
    public void Bar(string message)
    {
        Console.Write(message);
    }
}
```
<!-- endSnippet -->

The three classes are all directly coupled. If we want to test that the right output is printed at the right time, we'll have to execute the entire program.

One option is to override `Console.Out` to capture that result:

<!-- snippet: end-to-end-test -->
```cs
using var consoleOutput = new StringWriter();
Console.SetOut(consoleOutput);

Program.Main();

Assert.AreEqual("Hello, World!", consoleOutput.ToString());
```
<!-- endSnippet -->

We're using `Console` here but this approach could work with every external dependency - the file system, HTTP, a database, etc. By redirecting any interaction with the outside world, we can control and inspect the whole program entirely in memory.

There are some things to like about this approach: Test coverage is excellent. Internal refactoring will not break tests. For code that makes over-the-network calls, network or server issues will not cause tests to fail.

This is a toy example; in the real world if we approached all testing this way -- by injecting/hijacking at the perimeter of the system to write only edge-to-edge tests -- our tests would lack some of the qualities we want:

- Tests will be hard to read because they do a lot of unrelated setup.
- A single bug might cause many tests to fail.
- A single failing test could be caused by problems anywhere in the system.

These tests are difficult to live with.

# Dependency Inversion

A popular alternative is to add a layer of indirection and use it to inject a test double. Suppose we refactor by extracting an interface:

<!-- snippet: dependency-inversion-interface -->
```cs
public interface IFoo
{
    void Bar(string message);
}

public class Foo : IFoo
```
<!-- endSnippet -->

And then parameterize:

<!-- snippet: dependency-inversion-usage -->
```cs
public class AClass
{
    private readonly IFoo _foo;

    public AClass(IFoo foo)
    {
        _foo = foo;
    }

    public void Do()
    {
        // ...
        _foo.Bar("Hello, World!");
        // ...
    }
}

public static class Program
{
    public static void Main()
    {
        var aClass = new AClass(new Foo());
        aClass.Do();
    }
}
```
<!-- endSnippet -->

Which allows us to substitute a test double:

<!-- snippet: dependency-inversion-test -->
```cs
[TestMethod]
public void Test()
{
    var fooMock = new FooMock();
    var aClass = new AClass(fooMock);

    aClass.Do();

    Assert.AreEqual(
        "Hello, World!",
        fooMock.Results.Single()
    );
}

private class FooMock : IFoo
{
    public readonly List<string> Results = new();

    void IFoo.Bar(string message)
    {
        Results.Add(message);
    }
}
```
<!-- endSnippet -->

I like that this lets me test `AClass` independently.

We might still use the `Console.SetOut()` approach to test `Foo`, but now we only have to use hijacking for a smaller chunk of the program instead of the whole. That's a big improvement.

Tests can now be more focused, making them easier to read, write, diagnose, and maintain. Cool.

Sadly we have lost all coverage of `Main()`. The only way to get that coverage back would be whole-system testing like the original example. Maybe that's is an acceptable loss, since `Main()` is quite small and simple. 

My design sense is annoyed that we have an interface that only exists for the purpose of testing, and that we have a class/interface pair with the same name (`Foo`/`IFoo`), and that this interface creates *indirection* without *abstraction*. These are code smells.

## Dependency Injection / Service Locator

A popular adjunct to dependency *inversion*, especially in large software systems is dependency *injection*. Oh, the sweet, sweet siren song of Service Locator. Instead of having `Main()` instantiating objects with the correct configuration, we might have something like:

<!-- snippet: dependency-injection-main -->
```cs
public static void Main()
{
    var services = new Services();
    services.Add<IFoo>(new Foo());

    var aClass = services.CreateObject<AClass>();

    aClass.Do();
}
```
<!-- endSnippet -->

`Services` might use reflection detect that `AClass` constructor takes an `IFoo` parameter, find an `IFoo`-implementing type in its collection of services, and pass it to the ctor.

In large systems, this approach can be *very* tempting, because it "solves" the problem of plumbing things all over the place. If I need to make a new `AClass`, I don't have to figure out where to find `Foo`, it just works. Like magic.

Let's call it what it is. We're making globals (bad) without it looking like we're making globals (worse) and making dependencies less visible (also bad). Do not like.

### Testing Configuration

Actually, there is one characteristic of this approach that I *do* particularly like: it is possible to write a test for the configuration without invoking the whole system:

<!-- snippet: service-locator-approval-test -->
```cs
var services = new Services();
services.Add<IFoo>(new Foo());

Approvals.Verify(services);
```
<!-- endSnippet -->


### Dynamic Configuration

In almost every codebase I've worked with, the configuration was known at compile time. Occasionally, though, some aspect of configuration might need to be adjusted in production or at runtime, and the above approach can be helpful there. I think the details are off-topic for this article, but I acknowledge the need is real. Let's come back to that another time.

# Event-based

Can we reduce coupling further, and how does that affect tests? Suppose we replace the interface with an event*, and make the top-level orchestrator subscribe the event:

<!-- snippet: event-based -->
```cs
public class AClass
{
    public Action<string> OnBaz = delegate { };

    public void Do()
    {
        // ...
        OnBaz("Hello, World!");
        // ...
    }
}

public static class Program
{
    public static void Main()
    {
        var foo = new Foo();
        var aClass = new AClass();
        aClass.OnBaz += foo.Bar;

        aClass.Do();
    }
}
```
<!-- endSnippet -->

We can test that `AClass` raises the event at the right time, like this:

<!-- snippet: event-based-test -->
```cs
var aClass = new AClass();
var results = new List<string>();
aClass.OnBaz += results.Add;

aClass.Do();

Assert.AreEqual(
    "Hello, World!",
    results.Single()
);
```
<!-- endSnippet -->

This test is basically accomplishing the same thing as the mock-based test in the previous section, but with an event instead of an interface, and without a mock.

Now there is even less coupling between `Foo` and `AClass`. They don't know about each other at all!

Unfortunately we have lost even more code coverage - the code in `Main()` is doing more than before, without tests. Luckily we can extract a method:

<!-- snippet: event-based-configure -->
```cs
public static (AClass, Foo) Configure()
{
    var foo = new Foo();
    var aClass = new AClass();
    aClass.OnBaz += foo.Bar;
    return (aClass, foo);
}

public static void Main()
{
    var (aClass, _) = Configure();
    aClass.Do();
}
```
<!-- endSnippet -->

and write this test:

<!-- snippet: event-based-configure-test -->
```cs
var (aClass, foo) = Program.Configure();

Assert.IsTrue(
    aClass.OnBaz.GetInvocationList().Contains(foo.Bar)
);
```
<!-- endSnippet -->

# Decoupled Design

In his article on [Decoupled Design](https://arlobelshee.com/decoupled-design/) Arlo Belshee says:

> A system has its static structure and its run-time structure.

This phrasing confused me for a long time. I think I understand it now.

In the original code we started with, the static structure and run-time structure were the same:
- `AClass` depends on `Foo` which writes to the console

In the second example, using Dependency Injection, the static structure becomes:
-  `AClass` uses `IFoo`
-  `Foo` implements `IFoo` and writes to the console
-  `Main()` ties them together

In the third example, using events, the static structure becomes:
- `AClass` is a thing
- `Foo` is a thing that writes to the console
- `Initialize()` ties them together

Arlo goes on to say:

> An application also has two relevant time frames: initialization and running 

Initialization is handled by `Configure()` which has no side effects and so is easy to test.

We can test each part in isolation. Everything that happens during Running is already tested separately, except for `Main()` which is *very* simple, and would be very hard to get wrong and still compile.

# Cross-component interaction

The less-coupled options described in this article are much less useful if the components involved need to be changed together: if changing one means you (probably) need to change the other and (definitely) need to test them together to ensure that they cooperate correctly. One way of describing this is that the features of the system are "emergent phenomena". In that case, the so-called decoupling strategies described here make the system worse - it becomes *harder* to modify. Finding the correct "cleaving points" is really important, but outside of the scope of this article. We'll come back to that another time.

# Footnote: events

*I mean an "event" in the general sense (this code tells the ether that something has happened, but doesn't know who is listening, if anyone), not in the [C# sense](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/event).
