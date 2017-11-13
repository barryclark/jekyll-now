I use Ports-and-Adapters to abstract away my application's interactions with external systems.
I bend the dependency's interface to the shape that I want for my domain.
This makes it easier to think about my code and to unit test it.

This kind of interface might look something like:

	IUserSettings
		Settings Get()
		Set(name, value)
	
	UserSettingsOnDisk : IUSerSettings
		Settings Get()
			jsonText = ReadTextFile('~/.myapp.json')
			return JsonDeserialize(jsonText)

Now imagine a distribute system, where I have code running on multiple computers.
For example, maybe there is a security restriction that forces certain code to run on a certain computer, while some business logic runs on another computer.
This is a lot like talking to an external system, except that I fully control the interface and can make it look however I want.
I don't need the same kind of adapting.
But I do want to abstract away the remote communication, and I don't want to deal with remoting when testing the business rules.
If both sides are implemented using the same technology, I use this trick or organize and test them in a convenient way. 

1. Define the interface I wish I had.
2. Make one component implement that interface.
3. Make the other component talk to that interface.
4. Test the components together.

```
IFoo
	Bar()
	
class Manager(IFoo foo)
	DoWork()
		foo.Bar()

class Foo : IFoo
	Bar()
		...

// Test
manager = new Manager(new Bar())
manager.DoWork()
Assert(Foo.Bar did the right thing)
```

5. Write a transport for that interface.
6. Test the transport. The question is "if I send in message X, does message X pop out on the other side?". There's no business logic, no conditionals to test. 

```
class FooToHttp(IPAddress ipAddress) : IFoo
	Bar()
		HttpPost(ipAddress, "bar")

class HttpToFoo(IFoo foo)
	["bar"]
	OnPost()
		foo.Bar();

// Test
loggingFoo = new LoggingFoo()
new HttpServer(new HttpToFoo(loggingFoo))
subject = new FooToHttp(localhost)

subject.Bar()
Assert(loggingFoo got a call to Bar())
```

7. In production, wire it all up together:

```
// System 1
manager = new Manager(new FooToHttp(system2ipAddress))
manager.DoWork()

// System 2
new HttpServer(new HttpToFoo(new Foo()))
```

I've only had the chance to use this in the wild one time, so I don't know how to triangulate it: Where is it not appropriate? What are its weaknesses? How could it be better?

A lot of web development uses JavaScript in a browser to talk to Ruby/C#/PHP on the server, which doesn't lend itself to this technique. But if you're using Node on the server, then you should be able to run the client- and server-side JavaScript together this way. You'll still need to factor out the client-side business logic from the client-side display logic, to decouple from the browser, which I think almost no one does. So this may be difficult to apply for most people.
