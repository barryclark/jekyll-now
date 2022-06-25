namespace EventBasedWithConfigure;

public class Foo
{
    public void Bar(string message)
    {
        Console.Write(message);
    }
}

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
    // begin-snippet: event-based-configure
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
    // end-snippet
}