---
layout: post
title: Enforce C# Coding Standards with StyleCop.MSBuild for VS
tags: [StyleCop, c#, .net]
comments: true
---
The [StyleCop](http://stylecop.soyuz5.com/StyleCop%20Rules.html) tool provides warnings that indicate style and consistency rule violations in C# code. The warnings are organized into rule areas such as documentation, layout, naming, ordering, readability, spacing, and so forth. Each warning signifies a violation of a style or consistency rule. This section provides an explanation of each of the default StyleCop rules.

# Getting it

Install Stylecop via [NuGet](https://www.nuget.org/packages/StyleCop.MSBuild/) (the StyleCop.MSBuild package),

Once downloaded package you will find the settings file in your project folder here:
`packages\StyleCop.MSBuild.{version}\tools\Settings.StyleCop`.

![screenshot](/images/StyleCop/StyleCop_1.png "settings file")

# Choosing rules

You can edit the rule settings by opening this file with `StyleCopSettingsEditor.exe`, located in the same directory. Just drag and drop `Settings.StyleCop` into the StyleCopSettingsEditor.exe. 

![screenshot](/images/StyleCop/StyleCop_2.png "StyleCopSettingsEditor")

The `StyleCopSettingsEditor.exe` is a utility that allows you to view the rules installed and enabled. 

![screenshot](/images/StyleCop/StyleCop_3.png "choosing_rules")

# Project manual configuration

If you copy the StyleCop.Settings file to the root of the solution, then it will be inherited by all projects. This means it can be kept in Source Control and accessed by any Continuous Integration server you are using.

# Enforce StyleCop warnings as errors

If you want to treat warnings as errors modify your *.csproj file to add the following configuration:

```
<PropertyGroup>
  <StyleCopTreatErrorsAsWarnings>false</StyleCopTreatErrorsAsWarnings>
  ...
</PropertyGroup>
```  
Now that the warnings are set to be treated as errors, the solution can no longer build until they are resolved.

For example, by default in StyleCop a closing curly bracket must not be preceded by a blank line. If one is set, an error will be received like the following:

![screenshot](/images/StyleCop/StyleCop_4.png "error")

Code readability and manageability are not big issues when working solo, but as the development team grows so does the issues related to managing a code base. A consistent coding standard simplifies the chore of code maintenance, and StyleCop provides this ability, as well as allows you to add your own rules to further enforce standards.