using EventBased;
using Program = EventBasedWithConfigure.Program;

[TestClass]
public class TestEventBased
{
    [TestMethod]
    public void TestConfigure()
    {
        // begin-snippet: event-based-configure-test
        var (aClass, foo) = Program.Configure();

        Assert.IsTrue(
            aClass.OnBaz.GetInvocationList().Contains(foo.Bar)
        );
        // end-snippet
    }


    [TestMethod]
    public void TestRaiseEvent()
    {
        // begin-snippet: event-based-test
        var aClass = new AClass();
        var results = new List<string>();
        aClass.OnBaz += results.Add;

        aClass.Do();

        Assert.AreEqual(
            "Hello, World!",
            results.Single()
        );
        // end-snippet
    }
}