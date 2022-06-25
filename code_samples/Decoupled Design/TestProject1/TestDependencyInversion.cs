using ApprovalTests;
using DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AClass = DependencyInversion.AClass;
using Foo = DependencyInversion.Foo;
using IFoo = DependencyInversion.IFoo;

[TestClass]
public class TestDependencyInversion
{
// begin-snippet: dependency-inversion-test
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
// end-snippet
}

[TestClass]
public class TestDependencyInjection
{
    [TestMethod]
    public void MyTestMethod()
    {
        // begin-snippet: service-locator-approval-test
        var services = new Services();
        services.Add<IFoo>(new Foo());

        Approvals.Verify(services);
        // end-snippet
    }
}