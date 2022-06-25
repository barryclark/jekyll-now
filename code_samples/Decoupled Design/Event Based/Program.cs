namespace EventBased;

internal class Foo
{
    public void Bar(string message)
    {
        Console.Write(message);
    }
}

// begin-snippet: event-based
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
// end-snippet
