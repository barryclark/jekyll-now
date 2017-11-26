---
layout: post
categories: [mef, plugins, assembly, loading, architecture, containers, catalogue]
title: MEF and Dynamic Module/Plugin Loading
author: emir_osmanoski
headerimage: /images//2015-09-18-Mef-Plugin-Loading//01_PluginArchitecture_Head.png
comments: true
---

Recently I came across a requirement for a project where the system was to be
able to have and configure different plugins/modules that described certain
functionality which was to be invoked depending on certain request parameters.

The basic requirement was to be able to drop assemblies in a folder with some
configuration and to have them loaded and executed by, at the very least,
front facing ASP.NET Web API application.

My initial thought was that this could be achieved easily enough by loading
the assemblies, manually, and then using reflection to get to a class
implementing a specific plugin contract interface. After the initial planning
meetings I was eager to try my hands at a small demo project.

At this point one of the more experienced colleagues involved in the
discussion mentioned MEF (Managed Extensibility Framework) as a possible
solution which can be used to implement the above requirements. I decided to
give it a go, as I have had heard about it from other colleagues and wanted to
start learning it and luck would have it, at the moment I had the perfect
learning opportunity.

# About MEF and my aproach

One thing to mention here before getting into the actual architecture and
implementation is that I had a very specific goal in regards to what I wanted
to accomplish with MEF. I am still not very familiar, and in the process of
learning, probably even the more basic concepts, even though some of what I
know regarding DI and assembly architecture in .NET does help understand 
the core concepts behind the MEF usage in this example.

This post will not cover topics regarding MEF basics, its usage, or
anything along those lines and will jump straight to a very specific use case
for the framework.

If you want to read up on MEF in more detail you can check out this
[link!](https://msdn.microsoft.com/en-us/library/dd460648(v=vs.110).aspx)

Before implementing this small demo, my impression about MEF,  was mainly that
it was a framework similar to other dependency injection frameworks like
StructureMap or NInject, and even though it can probably can be used as such,
turned out it offered additional features, which may or may not be present in
the mentioned DI frameworks. Either way, MEF made it very easy to implement
the requirements specified above.

# The Requirment and Architecture

The entire idea and requirements can be glanced from the bellow high level diagram. We would be using MEF to load plugins, that encapsulate some functionality. The plugins would take in some parameters, execute some internal code, and return results to the client invoking the plugin. The plugins would all implement a commonly known plugin contract which would be shared among the client code and plugin code.

Once the plugins are build, by any party, we would store them in a common plugin repository, in our case here, a folder and we would want to use MEF and some custom plugin loading manager code to provide instance of the plugin entry points to calling code.

![High Level Plugin Architecture]({{ site.baseurl }}/images/2015-09-18-Mef-Plugin-Loading/02_PluginArchitecture.png)

# Plugin Contract

For the purposes of the demo project a library was defined that contained the
contract interfaces and methods for the plugins. This project also contained a
metadata interface used to identify the plugins. MEF has a concept of Metadata
which can be used to do some interesting queries to retrieve instances of
classes which we will take a look at a bit later on when looking at the code
loading the plugins.

The Plugin Contract library also defines the objects that are used in the
communication between the client and the plugins, the "PluginExecutionEntry"
and "PluginExecutionResult" classes.

The two core interfaces in the contract project and their respective
properties:

``` csharp
public interface IPluginContract
{
    PluginExecutionResult ExecutePlugin(PluginExecutionEntry entry);
}
```

and 

``` csharp
public interface IPluginMetadata
{
	string PluginName { get; }
}
```

One defines the contract for the entry points for each of the plugins, while
the other describes the metadata which can be used to identify the entry
points in MEF.

The plugin contracts and objects are defined in a separate project. The
project is build and the resulting .dll can then be referenced in all other
projects including the Plugin Projects. This allows third party developers
that only have access to the PluginContract .dll to build Plugins and give us
the  Plugin libraries which we can then store in the repository. It comes down
to third parties not having to know anything about our  plugin
manager/architecture or the calling client code.

# Example Plugins

For the purposes of the demo implementation we defined two plugins:

- Plugin A
- PLugin B

The plugins are quite simple. They define classes that implement the interface
defined in the Plugin Contracts.

``` csharp
[Export(typeof(IPluginContract))]
[ExportMetadata("PluginName", "ApiAPlugin")]
public class PluginA : IPluginContract { }
```

At the class definition we encounter two key MEF attributes:

- "Export"
	- which tells MEF which Interface/Type this particular class is exposing/implementing.
	- This tells MEF that the class is something that can be "plugged" in somewhere.
	- In our case we are going to query all "exports" of type IPluginContract
- "ExportMetadata"
	- First attribute "PluginName" defines the Metadata attribute name
	- Second attribute "ApiAPlugin" defines the actual value of the Metadata attribute.
	- In other terms, we can use this to search for a specific "pluggable" component of type IPluginContract by querying the metadata attribute.

We will see how all this is used a bit later on, but for now we can notice
that the name of the metadata attribute is the same as defined in the
IPluginMetadata interface.

An implementation of the ExecutePlugin method can be seen here:

``` csharp
public PluginExecutionResult ExecutePlugin(PluginExecutionEntry entry)
{
    var url = GetInternalApiUrl();

    if (!string.IsNullOrWhiteSpace(url))
    {
        var apiResult = ExecuteApiCall(url);

        return new PluginExecutionResult() { Output = apiResult };
    }

    return new PluginExecutionResult()
    {
        Output = "Failed Configuration URL Processing"
    };
}
```

The code is reading some internal configuration defined in a config.xml. The
plugin then makes an API call  using an "HttpClient" to another *internal*
API, which will not be covered in this post.

The API call just returns a string result (*apiresult*) which is then returned
to the client code which calls the plugin.

Plugin B is exactly the same calling a different API, so in a way there are
also two *internal* APIs  which return string result identified by A and B.

The two plugins are built and the outputs (.dll and config) moved to a folder
structure on disk, what the above high level diagram defines as the plugin
repository.

# The plugin loader

The idea was to create a "generic" plugin loader, which  could be re-used in
multiple plugin clients for different plugin repositories. The current
implementation of the loader takes in a loader configuration object which is
used, currently, to pass the folder on disk where the plugin libraries are
located.

The plugin manager is also where we actually utilize MEF to load/index the
plugin implementations/libraries from the plugin repository. The core of the
initialization work happens in the plugin manager constructor:

``` csharp
public PluginLoadingManager(PluginLoaderConfiguration pluginLoaderConfiguration)
{
	var catalogue = CreatePluginCatalog(pluginLoaderConfiguration);
	CreateCompositionContainer(catalogue);
}
```

We will look at each of the two steps individually in the next two sections.

## Creating the Aggregate Catalogue

A catalogue in MEF is an object/registry that can store all possible exports.
It can store these exports from assemblies it can scan or even folders on disk
that contain these assemblies. This of course sounds like the perfect
functionality to utilize to scan our Plugin Repository.

The plugin catalogue is created by getting all the directories in the
specified root directory of the plugin repository and iterating over each one to scan any assemblies for any MEF Exports.

This big aggregate catalogue will therefore contain multiple Directory Catalogues.

``` csharp
private AggregateCatalog CreatePluginCatalog(PluginLoaderConfiguration pluginLoaderConfiguration)
{
    var pluginsCatalog = new AggregateCatalog();

    foreach (var pluginDirectory in GetPluginDirectories(pluginLoaderConfiguration.PluginsRootLocation))
    {
        pluginsCatalog.Catalogs.Add(new DirectoryCatalog(pluginDirectory));
    }

    return pluginsCatalog;
}

private string[] GetPluginDirectories(string baseDirectory)
{
    var directories = Directory.EnumerateDirectories(baseDirectory, "*", SearchOption.TopDirectoryOnly);
    return directories.ToArray();
}
```

We are going to use this aggregate catalogue which knows about all the
exports defined in the plugin subfolders to search for a specific export of the
Plugin Contract interface using a MEF Composition Container.

## Creating the MEF Composition Container

A MEF container can be used to query the catalogues for the exports. Its populated with all the exports/parts/plugins found in the catalogues.

In our case the MEF composition container is created over the previously built
aggregate catalogue. We are going to use the container to ask the catalogues
to give us exports of, in our case, our plugin contract interface.

The simple creation of the Composition container can be seen in the following
code:

``` csharp
private void CreateCompositionContainer(AggregateCatalog catalogue)
{
    _container = new CompositionContainer(catalogue);
}
```

# Loading Plugin Instances with the Plugin Manager

This final section will look into how the actual plugin entry point instances 
are created and consumed from client code.

We are going to take a look at an example containing a simple Action in a WEB
API Controller which will create a Plugin Loading Manager for a folder
containing our 2 plugins, PluginA and PluginB.

The Web API corresponds to the Plugin Client in the high level architecture
diagram.

For the purposes of the demo note that the plugin manager is constructed in the Controller constructor:

``` csharp
private readonly string PluginRootLocation = "C:/external_plugins";

public PublicController()
{
    _pluginManager = new PluginLoadingManager(new PluginLoaderConfiguration
    {
        PluginsRootLocation = PluginRootLocation
    });
}
```

Which plugin is going to be utilized depends on a parameter passed to the
action via the HTTP call:

``` csharp
public string Get(string pluginIdentifier)
{
    // create a plugin manager to decide which internal system is going to handle the request
    
    var processPlugin = _pluginManager.GetPlugin(pluginIdentifier);

    // this is going to execute a call to an internal api and return the results? 
    var result = processPlugin.ExecutePlugin(null);

	return result.Output;
}
```

## Plugin Manager - Get Plugin Code

What remains to be seen is the actual code that utilizes the MEF composition
container  to get an instance of the pluggable export for the specific plugin:

``` csharp
public IPluginContract GetPlugin(string identifier)
{
    var pluginWrapper = _container
        .GetExports<IPluginContract, IPluginMetadata>()
        .FirstOrDefault(pl => pl.Metadata.PluginName == identifier);

    if (pluginWrapper != null)
    {
        return pluginWrapper.Value;
    }
    else
    {
        return null;
    }
}
```

What the GetPlugin Method does is search the defined MEF Container that
contains all exports found in the aggregate catalogue. The "GetExports" method
is told to search exports for IPluginContract. 

The second generic parameter defines the structure of the Metadata we are
expecting these IPluginContracts to define. Using IPluginMetadata allows us to
query the PluginName as and compare it to the identifier passed from the
Plugin Client.

We are in a sense telling MEF to get all exports defined in those assemblies,
that we have loaded in the catalogues and find us the exports for type
"IPluginContract". After this, using the "IPluginMetadata" interface we are
filtering based on the passed Plugin Identifier. If we remember we defined the
metadata information in a non-strongly typed approach:

``` csharp
[ExportMetadata("PluginName", "ApiAPlugin")]
```

where the PluginName attribute matches what we have defined on the
IPluginMetadata interface.

So if a for example the identifier is "ApiAPlugin" the plugin wrapper will
return an object where the Value is set to an instance of the class:

``` csharp
[Export(typeof(IPluginContract))]
[ExportMetadata("PluginName", "ApiAPlugin")]
public class PluginA : IPluginContract
```

After the core GetExports line is executed, the plugin manager will either
return an instance of the plugin or null. Note that we are calling
FirstOrDefault in the case of having multiple Exports in the catalogue for the
IPluginContract. Here we can of course add some logging/logic to make sure we
are notified of plugins in the repository behaving unexpectedly.

## Utilizing the Plugin and Sample Plugin Functionality

If all is well and the manager returns an actual instance, the client code as
it can be seen in the snippet previously will "ExecutePlugin", in the specific
case with a *null* parameter. The client code then just returns the "Output"
which is a simple string.

As described above the Plugin (both A and B) make a call to other API services
which return the strings that are then propagated back to the Plugin Client.

The code executed in the plugins can be seen in the repository which is linked
below. One important thing is that the execution is synchronous. The Plugin
waits for the response from the internal API before returning to the Plugin
Client Code.

Looking at asynchronicity would be next on the list in regards to the entire
plugin architecture and is something to be left for a following post.

Finally note that the plugin configurations for Plugin A and Plugin B contain
the addresses of the 'Internal' APIs the plugins call. The demo project and
sample code configuration is for development purposes and points to localhost
addresses. The 'Internal' APIs are defined in the Api folder in the sample solution.

# Summary

I feel/understand that the implementation and use case described above is
quite simple and straightforward. It was done as a learning exercise and
somewhat as a spike to see if what was required in regards to the plugin
architecture could be achieved with MEF.

This post is also an exercise in itself in a way. I had fun writing it even
though it took me longer to finish than I initially expected. As always, I hope
someone finds it useful. 

To wrap up all the example code can be found at [this github repository](https://github.com/emir01/spike.mef.plugins).


