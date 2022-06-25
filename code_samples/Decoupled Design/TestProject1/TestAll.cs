using System.Reflection;
using Direct_Call;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;


[TestClass]
public class TestAll
{
    [TestMethod]
    public void all_program_Mains_do_the_same_thing()
    {
        var mains = Mains();

        foreach (var main in mains)
        {
            using var consoleOutput = new StringWriter();
            Console.SetOut(consoleOutput);

            main.Invoke(null, null);

            Assert.AreEqual("Hello, World!", consoleOutput.ToString());
        }
    }

    private static IEnumerable<MethodInfo?> Mains()
    {
        var assemblies = new[]
        {
            typeof(DependencyInversion.Program).Assembly,
            typeof(Direct_Call.Program).Assembly,
            typeof(EventBased.Program).Assembly,
            typeof(EventBasedWithConfigure.Program).Assembly,
            typeof(DependencyInjection.Program).Assembly,
        };

        var mains = assemblies.SelectMany(_ => _.GetTypes())
            .Where(_ => _.Name.StartsWith("Program"))
            .SelectMany(_ => _.GetMethods())
            .Where(_ => _.Name.StartsWith("Main"));
        mains.Should().HaveCount(5);
        return mains;
    }

    [TestMethod]
    public void All_have_AClass_with_method_Do()
    {
        foreach (var assembly in Mains().Select(_ => _.DeclaringType.Assembly))
        {
            assembly.GetTypes()
                .Should().Contain(_ => _.Name == "AClass")
                .Which.GetMethods()
                .Should().Contain(_ => _.Name == "Do");
        }
    }
}

[TestClass]
class TestDirectClass
{
    [TestMethod]
    public void EndToEndTest()
    {
        // begin-snippet: end-to-end-test
        using var consoleOutput = new StringWriter();
        Console.SetOut(consoleOutput);

        Program.Main();

        Assert.AreEqual("Hello, World!", consoleOutput.ToString());
        // end-snippet
    }
}