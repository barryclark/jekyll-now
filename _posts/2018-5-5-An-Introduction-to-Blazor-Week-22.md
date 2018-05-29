## What is Blazor ?
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
- page : just like a component but it will be created on the application body when the user laods an url on its browser
- interop functions : link you can create between a js function and a c# function (defined in this 2 files (C# side)[https://github.com/RemiBou/Toss.Blazor/blob/master/Toss/Toss.Client/Services/JsInterop.cs] and (JS side)[https://github.com/RemiBou/Toss.Blazor/blob/master/Toss/Toss.Client/wwwroot/index.html]
- Entry point (My File)[https://github.com/RemiBou/Toss.Blazor/blob/master/Toss/Toss.Client/Program.cs] just like the program.cs in asp.net core app you define :
  - Dependency injection configuration
  - Framework specific settings (here I just set the name of the tag on the root App Root that'll be replace by the page content

## Visual Studio integration
You need at least Visual Studio 15.7 and to install the Blazor Language Service (here)[https://go.microsoft.com/fwlink/?linkid=870389].
Visual Studio gives the following tools regarding Blazor :
- 2 project templates
- code coloration on pages/components
- code autocompletion on pages/components
- project building
- with the already existing IIS Express integration you can host your project locally and test it on your dev computer.

## How it works ? (or how I understand it works)


## Reference / Links
