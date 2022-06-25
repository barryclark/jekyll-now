using ApprovalUtilities.Utilities;

namespace DependencyInjection;

public interface IFoo
{
    void Bar(string message);
}

public class Foo : IFoo
{
    public void Bar(string message)
    {
        Console.Write(message);
    }
}
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

// this is a fake implementation of Service Locator.
public class Services
{
    private Dictionary<Type, object> _items = new();

    public void Add<T>(T t)
    {
        this._items.Add(typeof(T), t);
    }

    public AClass CreateObject<T>()
    {
        return new AClass(GetService<IFoo>());
    }

    public T GetService<T>()
    {
        return (T)this._items[typeof(T)];
    }

    public override string ToString()
    {
        return this._items.ToReadableString();
    }
}
public static class Program
{
    // begin-snippet: dependency-injection-main
    public static void Main()
    {
        var services = new Services();
        services.Add<IFoo>(new Foo());

        var aClass = services.CreateObject<AClass>();

        aClass.Do();
    }
    // end-snippet
}

