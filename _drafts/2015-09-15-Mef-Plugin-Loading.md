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
implementing a specific plugin contract interface. I was pretty certain
it can be done using that aproach and probably we could have had a prototype running
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

The two core interfaces in the contract project and their respective properties:

 public interface IPluginContract
{
    PluginExecutionResult ExecutePlugin(PluginExecutionEntry entry);
}

and 

 public interface IPluginMetadata
{
    string PluginName { get; }
}

One defined the contract for the entry points for each of the plugins, while
the other describes the metadata which can be used to identify the entry points and
with that the plugins.

We will see how these are used furhter down the line.

## Example Plugins

When defining the actual plugins, I've build the Contract project and 






