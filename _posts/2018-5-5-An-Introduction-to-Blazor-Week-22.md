## What is Blazor ?
(this post is based on Blazor 0.3)
To make it easy : blazor is just like vuejs / angular / reactjs ... but you code in C# with the Razor syntax :)

## Main notions
Blazor is articulated around the followings notions :
- App Root (there is no official name for it) : mostly named "index.html", it's the first file loaded by the user and it will have the following content [My root file](https://github.com/RemiBou/Toss.Blazor/blob/master/Toss/Toss.Client/wwwroot/index.html)
  - html minimal tags (html/header/body)
  - external reference : the js / css files you need from external providers (like jqueryui or toastr)
  - a root tag on which the pages will be rendered
  - a tag for hsting the blazor script references
- App.cshtml : temporary file for configuring your app (by default only the Router scanning is here) (My App.cshtml)[https://github.com/RemiBou/Toss.Blazor/blob/master/Toss/Toss.Client/App.cshtml]
- component : a razor template and it's c# code that will generate a bloc html.
- page : just like a component but it will be created on the application body when the user loads an url on its browser
- interop functions : link you can create between a js function and a c# function (defined in this 2 files (C# side)[https://github.com/RemiBou/Toss.Blazor/blob/master/Toss/Toss.Client/Services/JsInterop.cs] and (JS side)[https://github.com/RemiBou/Toss.Blazor/blob/master/Toss/Toss.Client/wwwroot/index.html]
- Entry point (My File)[https://github.com/RemiBou/Toss.Blazor/blob/master/Toss/Toss.Client/Program.cs] just like the program.cs in asp.net core app you define :
  - Dependency injection configuration
  - Framework specific settings (here I just set the name of the tag on the root App Root that'll be replace by the page content).

You can view all these notions on my TOSS project (Here)[https://github.com/RemiBou/Toss.Blazor]

## Visual Studio integration
You need at least Visual Studio 15.7 and the Blazor Language Service (here)[https://go.microsoft.com/fwlink/?linkid=870389].
Visual Studio gives the following tools regarding Blazor :
- 2 project templates
- code coloration on pages/components
- code autocompletion on pages/components
- project building
- with the already existing IIS Express integration you can host your project locally and test it on your dev computer.

## How it works ? (or how I understand it works)
- When you build, all the components / pages are translated to pure C# classes (you can find them on your project obj folder)
- All these classes have interaction with Microsoft.AspNetCore.Blazor.RenderTree.RenderTreeBuilder which is and html tag writer
- When a changes occurs on the view modelof the component or page, the  BuildRenderTree is called and then the content is updated
- All these clases are the compiled for targeting .netstandard 2.0
- When the browser loads index.html it loads blazor.js a library that will 
  - load on the browser, your project entry point
  - load it's dependencies, all targeting .netstandard 2.0
  - init web assembly if the browser doesn't support it
  - load mono.wasm, an implementation of the platform working with Web Assembly (don't ask me more yet, I'm trying to understand it as I learn Blazor), so your code and your dependencies can actually get executed on the brower and interact ith the dom

## Reference / Links
[http://blog.stevensanderson.com/2018/02/06/blazor-intro/]
[https://blazor.net]
[https://github.com/aspnet/Blazor]
[http://www.mono-project.com/news/2017/08/09/hello-webassembly/]
