---
layout: post
categories: [mef, plugins, assembly, loading]
title: MEF and Dynamic Module/Plugin Loading
author: emir_osmanoski
comments: true
---

## A couple of words about the blog.

## Dynamic Module loading

Recently I was involved in a preparation phase for a project where one of the
requirments was to be able to have and configure different plugins/modules
that described certain functionality which was to be invoked depending on
certain request parameters.

The basic requirment was for us to be able to drop assemblies in a folder with
some  configuration and to have them loaded and executed at the very least by
a "semi-public" facing ASP.NET Web API project.

My initial thought was that this could be achieved easily enough by loading
the assemblies, manually, and then using reflection to get to a class
implementing a specific plugin contract interface. I was pretty certain it can
be done using that aproach and probably we could have had a prototype running
in a day at most.

At this point one of the more experienced colleagues mentioned MEF (Managed
Extensibility Framework) as a possible solution which can be used to implement
the above requirments. I decided to give it a go as I have had heard about it
from other colleagues and wanted to start learning it and at the moment I had
the perfect learning oportunity.

## The Requirment and Architecture

*Short requirment description and Visio diagram*

## About MEF and learning process## 

One thing to mention here is that I had a very specific goal in regards to
what I wanted to acomplish with MEF. I did not start "learning" by reading the
basics and getting up to what I wanted to do, but went straight to research
about achieving  the actual goal of dynamicly loading libraries.

So this post will not cover the details regarding what is MEF, its usage,
basics or anything along those lines and will jump straight to a very usage of
the framework.

If you want to read up on MEF in more detail you can check out this
[link!](https://msdn.microsoft.com/en-us/library/dd460648(v=vs.110).aspx)

At this point I would like to mention that my impression about MEF, before
implementing the prototype was that it was a framework similar to depencendy
injection frameworks like StructureMap or NInject, and even though It can
probably can be used as such, turned out it offered additional features, which
may or may not be present in the mentioned DI frameworkds. Either way MEF made
it very easy to implement the requirments specified above.

## Plugin Contract

For the purposes of the demo project a library was defined that contained the
contract interfaces and method contracts for the plugins. This project also
contained a metadata interface used to identify the plugins. MEF has this
concept of Metadata which can be used to do some interesting queries later on
when loading the plugins.

The two core interfaces in the contract project and their respective
properties:

	public interface IPluginContract2
	{
	    PluginExecutionResult ExecutePlugin(PluginExecutionEntry entry);
	}

and 

	public interface IPluginMetadata
	{
    	string PluginName { get; }
	}

One defined the contract for the entry points for each of the plugins, while
the other describes the metadata which can be used to identify the entry
points and with that the plugins.

We will see how these are used furhter down the line.

## Example Plugins

When defining the actual plugins, I've buit the the Contract project and
references the output dll in the plugin projects as to simulate an enviorment
where we pass the contracts to different venodrs allowing them to define the
entry points which we can then utilize in the plugin client.

For the purposes of the demo implementation we defined two plugins:

- Plugin A
- PLugin B

For the purposes of the demo the actual sample plugins are simple one class
projectgs that reference the plugin contracts dll and use the IPluginContract
on a single entry point class:

	[Export(typeof(IPluginContract))]
	[ExportMetadata("PluginName", "ApiAPlugin")]
	public class PluginA : IPluginContract { }

At the class definition we encounter two key MEF attributes:

- `Export`
	- which tells MEF which Interface/Type this particular class is exposing
- `ExportMetadata`
	- First attribute "PluginName" defines the Metadata attribute name
	- Second attribute "ApiAPlugin" defines the actual value of the Metadata attribute.

We will see how the metadat attributes are used a bit later on, but for now we
can notice that the name of the metadata attribute is the same as defined in
the IPluginMetadata interface.

The actual implementation of the ExecutePlugin method can be seen here:

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
            Output = "Failed Configuratoin URL Processing"
        };
    }

The code is reading some internal configuration defined in a config.xml file
which in the project properties is set as content and copy always. The  plugin
them makes an API call  using an `HttpClient` to another *internal* API. 

The API call just returns a string result (*apiresult*) which is then returned to
the client code which calls the plugin. 

Plugin B is exactly the same calling a different API, so in a way there are
also two *internal* APIs  which return string result identified by A and B.

The two plugins are build and the outputs moved to a folder structure on disk,
together with the configuration files:

### Image of plugin folder structure

## The plugin loader

The idea was to create a "generic" plugin loader, which  could be reused in
multiple plugin clients. The current implemenation of the loader takes in a 
loader configuration object which currently is sued 

