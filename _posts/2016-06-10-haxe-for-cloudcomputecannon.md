---
title: Why I wrote Cloud-Compute-Cannon in Haxe
layout: post
---

<style type="text/css">
td {
    padding: 0px 10px;
}
table {
    font-size: 12px;
    text-align: left;
}
</style>



The [Bionano research group](http://bionano.autodesk.com/) at Autodesk needed an open source tool for performing scalable computes (e.g. molecular simulations) in the cloud. The problem it solves is *"I want to run 1000 simulations and get the results quickly, and I don't have access to a high performance cluster (or I don't know how to use the cluster)"*. We built [cloud-compute-cannon](https://github.com/Autodesk/cloudcomputecannon/) (CCC) for this. This blog describes some of the technology behind it.

#### Architecture and technical decisions

Cloud-compute-cannon is a client/server application. The server is installed on the users cloud (or their local machine) and creates workers to perform compute jobs. The server needs to:

 - Install locally and on cloud providers (e.g. AWS or GCE via their SDKs)
 - Interact with Docker daemons via the remote API
 - Interact with remote machines via SSH
 - Talk to a database (that stores state)
 - Interact with a thin CLI client
 - Potentially other, as yet unknown, requirements

Instead of worker machines pulling jobs from a queue, CCC works by pushing jobs to workers. The disadvantage with this approach is that if the servers goes down, the system stops working. The advantage is that the workers are extremely dumb: they are just bare CoreOS machines with nothing extra installed. Node.js can easily monitor many many workers in case they go down. By making the workers dumb, there is a single place for upgrading the system (simplicity was a goal here).

![CCC Architecture]({{ site.url }}/assets/architecture_ccc.svg)

Node.js was a pretty easy choice for the server because of the large third party library support. Redis was chosen for the database because its simplicity and crucially, it had scripting support. Scripting means no concurrency issues as redis lua scripts block other requests.

The added advantage of Node.js was using the same codebase for the client and server.

However, instead of writing Javascript, it was built in Haxe.


#### What is [Haxe](http://http://haxe.org/#learn-more/)?

[Haxe](http://http://haxe.org/#learn-more/) is an open source language and toolkit. The language is inspired from Javascript and Actionscript (Flash). The Haxe toolkit has *multiple compilers*, meaning you write in one language, and you export directly to multiple languages:

Currently, Haxe compiles to the following targets:

|-----+------+---------------+-----+-----------+------|
|**Name** | **Kind** | **Static typing** | **Sys** | **Use Cases** | **Since**|
|Flash | byte code | Yes | No | Games, Mobile | alpha (2005) |
|Neko | byte code | No | Yes | Web, CLI | alpha (2005) |
|JavaScript | source | No | No | Web, Desktop, API | beta (2006) |
|ActionScript 3 | source | Yes | No | Games, Mobile, API | 1.12 (2007) |
|PHP | source | No | Yes | Web | 2.0 (2008) |
|C++ | source | Yes | Yes | Games, CLI, Mobile, Desktop | 2.04 (2009) |
|Java | source | Yes | Yes | CLI, Mobile, Desktop | 2.10 (2012) |
|C# | source | Yes | Yes | Mobile, Desktop | 2.10 (2012) |
|Python | source | No | Yes | CLI, Web, Desktop | 3.2 (2015) |
|Lua | source | No | Yes | Games, CLI, Web, Desktop | 3.3 (2016) |
| |  |  |  |  | [Source](http://haxe.org/documentation/introduction/compiler-targets.html) |


For this project though, we're using just the Javascript compiler. Why Haxe and not e.g. Coffeescript or Typescript (or plain Javascript)? A more detailed answer is provided by [Andy Li](http://blog.onthewings.net/2015/08/05/typescript-vs-haxe/), but in short: Haxe provides far more useful language features, and it is more mature, and has compile time type checking that is invaluable in large code-bases. It has the added bonus that we could build multiple clients in different languages (e.g. Python or native binaries) if needed (the server would be more difficult due to the reliance on third party libraries).

Although Haxe has many [very useful language features](http://haxe.org/manual/lf.html), the features most important to this project are:

#### 1) Compile time typing

Functions, collections, and variables are *typed*, and checked at compile time. For example, the compiler will prevent you from calling a function with an Int argument when it's expecting an array. For a large-ish codebase of a cloud application this is crucial, as it reduces the number of bugs that make it into functional testing (and functional testing scalable cloud applications is *very* time consuming).

Javascript code. Note you can call a function with whatever arguments you like:

{% highlight javascript %}
//Javascript
class Foo
{
	constructor() {}

	doAThing(input)
	{
		return [input, input + 5];
	}
}
//Somewhere else:
var foo = new Foo();
var result = foo.doAThing(10);//This is correct
var result2 = foo.doAThing("somestring");//Legal, although bad.
{% endhighlight %}

In Haxe, you cannot compile with the last line. The compiler has caught a mistake the developer wrote.

{% highlight javascript %}
//Haxe
class Foo
{
	public function new() {}

	public function doAThing(input :Int) :Array<Int>
	{
		return [input, input + 5];
	}
}
//Somewhere else:
var foo = new Foo();
var result = foo.doAThing(10);//This is correct
var result2 = foo.doAThing("somestring");//Compile error!
{% endhighlight %}


#### 2) Macros

Haxe macros are incredibly powerful, and the full capabilities are beyond the scope of this blog post. For this project they automatically generate bindings between the CLI client and the server.

On the server, there are 'services' where the methods correspond to RPC (remote procedure calls), where the **@rpc** decorator marks it as a remote API endpoint:

{% highlight javascript %}
class ServiceBatchCompute
{
	//Server method for an API endpoint:
	@rpc({
		alias: 'jobs',
		doc: 'List all job ids'
	})
	public function jobs() :Promise<Array<JobId>>
	{
		return ComputeQueue.getAllJobIds(_redis);
	}
}
{% endhighlight %}



On the client


{% highlight javascript %}
//Server methods
var defs = Macros.getMethodDefinitions(ServiceBatchCompute);
for(def in defs) {
	CommanderTools.addCommand(program, def);
}
{% endhighlight %}

The above code generates (at compile time) a function that creates a [JSON-RPC](https://en.wikipedia.org/wiki/JSON-RPC) call to the remote server if the CLI command is called. E.g. calling the CLI client with the **jobs** sub-command:

{% highlight bash %}
> ccc jobs
{% endhighlight %}

creates the following JSON and sends it to the server (via http):
{% highlight javascript %}
{
	jsonrpc:"2.0",
	id: "_",
	method: "jobs",
	params: {}
}
{% endhighlight %}

The server maps the call to the correct function, calls the function, then sends the result back in the HTTP response. The CLI interacts with the server API, but it could easily be another server.

The important point is that new services have the corresponding CLI client commands *automatically* generated. There is no need to touch the client code ever again, and there is no chance that a typo will accidentally break client-server communication.

#### 3) Code completion

I just really like code completion. Code completion is handled by the Haxe compiler, so all text editors and IDEs can easily add sophisticated code completion.

![My helpful screenshot]({{ site.url }}/assets/2016-06-10-haxe-code-completion.png)

#### 4) Abstracts

These are classes and data structures that do not exist at run-time, only at compile time. In Cloud-compute-cannon, they are used to maintain specific compile-checked enum types between the server and the database scripts.

The redis scripts are in Lua, which is a new Haxe target! However the Lua target is not yet mature, so the database scripts are written manually, and embedded as raw strings in Haxe classes. This has the advantage of some compile time checking of constants and abstract types.

The following is a [Haxe abstract enum](http://haxe.org/manual/types-abstract-enum.html). It only exists at compile time, at runtime the values are just strings.

{% highlight javascript %}
@:enum
abstract JobStatus(String) from String {
	var Pending = 'pending';
	var Working = 'working';
	var Finalizing = 'finalizing';
	var Finished = 'finished';
}
{% endhighlight %}

However, the values can be embedded in a Lua script:

{% highlight Lua %}
local status = "${JobStatus.Pending}"
{% endhighlight %}

And this Lua script is embedded in a Haxe class (this example is contrived for simplicity):

{% highlight Javascript %}
var script = 'local status = "${JobStatus.Pending}"';
{% endhighlight %}

Then if we change the JobStatus abstract, all the values are compile time checked. This means that it is impossible for a simple typo in a string value to result in a value being sent between the server and the database.

When the Lua target stabilizes, the scripts may get written in Haxe and compiled. This would allow better code re-use, and allow compile-time checking of the actual types and objects being created, stored, and send from within the database.


### Conclusion

This demonstrates some of the power that the Haxe toolkit provides:

 - Flexibility: write code for multiple platforms without losing the power of a compiler.
 - Future proofing: as new platforms become available, the Haxe toolkit can target them.
 - More robust code: compiler prevent simple errors, and make maintenance (e.g. refactoring) of large code bases much easier.
 - Performance: function inline may not available on the target platform itself (e.g. Javascript in Node.js).




