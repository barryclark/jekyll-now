namespace Direct_Call;

// begin-snippet: direct-call
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
// end-snippet
