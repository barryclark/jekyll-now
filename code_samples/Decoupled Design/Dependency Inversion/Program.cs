namespace DependencyInversion;

// begin-snippet: dependency-inversion-interface
public interface IFoo
{
    void Bar(string message);
}

public class Foo : IFoo
// end-snippet
{
    public void Bar(string message)
    {
        Console.Write(message);
    }
}

// begin-snippet: dependency-inversion-usage
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
// end-snippet
