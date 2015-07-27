---
layout: post
title: Forcing DLLs to output to .vsix 
---

When migrating to [Alive](http://comealive.io) to the final release of Visual Studio 2015, we noticed that some of our DLLs were not getting copied to our output `.vsix` file. Specifically, the `Microsoft.CodeAnalysis` files that were not getting copied into our `.vsix`. We'd set `CopyLocal` to true and verified they were being copied through to `/Debug/bin` folder. Despite this they were still not being copied through to our `.vsix`.

### Short version

You can force DLLs to be copied to the `.vsix` using the `ForceIncludeInVSIX` element.

```
<Reference Include="Microsoft.CodeAnalysis.dll, Version=14.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a, processorArchitecture=MSIL">
      <ForceIncludeInVSIX>true</ForceIncludeInVSIX>
</Reference>
```

### Long version

(I should preface this by saying I'm not deeply familiar with MSBuild and am usually content to let Visual Studio handle all this stuff)

When you open a project in Visual Studio, it executes a number of targets including `ResolveAssemblyReferences`. At this point, `ResolveAssemblyReferences` figures out whether or not to mark an assembly reference as "Copy Local". Although Visual Studio makes it seem like there are two states for "Copy Local", it turns out there are [no less than 11](https://github.com/Microsoft/msbuild/blob/1510d9a8cf346f01919c5b9545ef0b1a25bfbe9d/src/XMakeTasks/AssemblyDependency/CopyLocalState.cs), and the rules for these states are a little tricky.

MSBuild recently changed the rules for assemblies found in the GAC. Previously, GAC-ed assemblies were not marked as Copy Local. This meant that if Windows Update ran on your machine and GAC-ed a given assembly, it could change the copy local behavior for a given assembly. This has changed and now `ResolveAssemblyReferences` respects the "Copy Local" setting you've chosen. 

Meanwhile, `.vsix` projects were previously packaging up all of their "Copy Local" references. This meant that all `.vsix` files grew massive as they would now package up all of the Visual Studio DLLs they referenced. To get around this, the VSSDK manually suppresses the inclusion of Visual Studio DLLs.

For most projects this is fine as the DLLs come packaged with Visual Studio. However, we were writing an extension that used Roslyn but targeted Visual Studio 2013. This meant that the `Microsoft.CodeAnalysis` DLLs cannot be assumed to be loaded on our customer's machines and we need to package them up ourselves.

The full list of DLLs can be found at: `C:\Program Files (x86)\MSBuild\Microsoft\VisualStudio\v14.0\VSSDK\Microsoft.VsSDK.targets`

As of July 27, 2015 the suppressed DLLs are:

```
Microsoft.VisualStudio.CommandBars.dll
VSLangProj90.dll
VSLangProj100.dll
VSLangProj110.dll
VSLangProj140.dll
VsWebSite.Interop.dll
VsWebSite.Interop90.dll
VsWebSite.Interop100.dll
envdte.dll
envdte80.dll
envdte90.dll
envdte90a.dll
envdte100.dll
extensibility.dll
Microsoft.Build.Conversion.Core.dll
Microsoft.Build.dll
Microsoft.Build.Engine.dll
Microsoft.Build.Framework.dll
Microsoft.Build.Tasks.Core.dll
Microsoft.Build.Utilities.Core.dll
Microsoft.CodeAnalysis.CSharp.dll
Microsoft.CodeAnalysis.dll
Microsoft.MSXML.dll
Microsoft.VisualStudio.CommonIDE.dll
Microsoft.VisualStudio.ComponentModelHost.dll
Microsoft.VisualStudio.Diagnostics.Assert.dll
Microsoft.VisualStudio.ExtensibilityHosting.dll
Microsoft.VisualStudio.GraphModel.dll
Microsoft.VisualStudio.TemplateWizardInterface.dll
Microsoft.VisualStudio.Text.Internal.dll
microsoft.visualstudio.vcprojectengine.dll
Microsoft.VisualStudio.VSHelp.dll
Microsoft.VisualStudio.VSHelp80.dll
stdole.dll
System.Collections.Concurrent.dll
System.Collections.dll
System.Collections.Immutable.dll
System.Composition.AttributedModel.dll
System.Composition.Convention.dll
System.Composition.Hosting.dll
System.Composition.Runtime.dll
System.Composition.TypedParts.dll
System.Diagnostics.Debug.dll
System.Diagnostics.Tools.dll
System.Diagnostics.Tracing.dll
System.Dynamic.Runtime.dll
System.Globalization.dll
System.IO.dll
System.Linq.dll
System.Reflection.dll
System.Reflection.Extensions.dll
System.Reflection.Metadata.dll
System.Reflection.Primitives.dll
System.Resources.ResourceManager.dll
System.Runtime.dll
System.Runtime.Extensions.dll
System.Text.Encoding.dll
System.Text.Encoding.Extensions.dll
System.Threading.dll
System.Threading.Tasks.Dataflow.dll
System.Threading.Tasks.dll
VSLangProj.dll
VSLangProj2.dll
VSLangProj80.dll
Microsoft.VisualStudio.ProjectSystem.v14only.dll
Microsoft.VisualStudio.ProjectSystem.VS.V14Only.dll
Microsoft.VisualStudio.ProjectSystem.Utilities.v14.0.dll
Microsoft.VisualStudio.ProjectSystem.Interop.dll
Microsoft.VisualStudio.Threading.dll
Microsoft.VisualStudio.Validation.dll
Microsoft.VisualStudio.Composition.dll
Microsoft.VisualStudio.Composition.Configuration.dll
Microsoft.VisualStudio.Debugger.Interop.10.0.dll
Microsoft.VisualStudio.Debugger.Interop.11.0.dll
Microsoft.VisualStudio.Debugger.Interop.12.0.dll
Microsoft.VisualStudio.Debugger.Interop.14.0.dll
Microsoft.VisualStudio.Debugger.Interop.dll
Microsoft.VisualStudio.Debugger.InteropA.dll
Microsoft.VisualStudio.Designer.Interfaces.dll
Microsoft.VisualStudio.ManagedInterfaces.9.0.dll
Microsoft.VisualStudio.ManagedInterfaces.dll
Microsoft.VisualStudio.ManagedInterfaces.WCF.dll
Microsoft.VisualStudio.OLE.Interop.dll
Microsoft.VisualStudio.ProjectAggregator.dll
Microsoft.VisualStudio.Shell.Interop.10.0.dll
Microsoft.VisualStudio.Shell.Interop.8.0.dll
Microsoft.VisualStudio.Shell.Interop.9.0.dll
Microsoft.VisualStudio.Shell.Interop.dll
Microsoft.VisualStudio.TextManager.Interop.10.0.dll
Microsoft.VisualStudio.TextManager.Interop.8.0.dll
Microsoft.VisualStudio.TextManager.Interop.9.0.dll
Microsoft.VisualStudio.TextManager.Interop.dll
Microsoft.VisualStudio.WCFReference.Interop.dll
Microsoft.Data.ConnectionUI.dll
Microsoft.VisualStudio.CoreUtility.dll
Microsoft.VisualStudio.Data.Core.dll
Microsoft.VisualStudio.Data.dll
Microsoft.VisualStudio.Data.Framework.dll
Microsoft.VisualStudio.Data.Services.dll
Microsoft.VisualStudio.Debugger.Engine.dll
Microsoft.VisualStudio.Editor.dll
Microsoft.VisualStudio.ImageCatalog.dll
Microsoft.VisualStudio.Imaging.dll
Microsoft.VisualStudio.Imaging.Interop.14.0.DesignTime.dll
Microsoft.VisualStudio.Language.Intellisense.dll
Microsoft.VisualStudio.Language.StandardClassification.dll
Microsoft.VisualStudio.Package.LanguageService.14.0.dll
Microsoft.VisualStudio.QualityTools.Vsip.dll
Microsoft.VisualStudio.Settings.14.0.dll
Microsoft.VisualStudio.Shell.14.0.dll
Microsoft.VisualStudio.Shell.Design.dll
Microsoft.VisualStudio.Shell.Immutable.10.0.dll
Microsoft.VisualStudio.Shell.Immutable.11.0.dll
Microsoft.VisualStudio.Shell.Immutable.12.0.dll
Microsoft.VisualStudio.Shell.Immutable.14.0.dll
Microsoft.VisualStudio.Shell.Interop.11.0.dll
Microsoft.VisualStudio.Shell.Interop.12.0.dll
Microsoft.VisualStudio.Shell.Interop.12.1.DesignTime.dll
Microsoft.VisualStudio.Shell.Interop.14.0.DesignTime.dll
Microsoft.VisualStudio.Text.Data.dll
Microsoft.VisualStudio.Text.Logic.dll
Microsoft.VisualStudio.Text.UI.dll
Microsoft.VisualStudio.Text.UI.Wpf.dll
Microsoft.VisualStudio.TextManager.Interop.11.0.dll
Microsoft.VisualStudio.TextManager.Interop.12.0.dll
Microsoft.VisualStudio.TextManager.Interop.12.1.DesignTime.dll
Microsoft.VisualStudio.TextTemplating.14.0.dll
Microsoft.VisualStudio.TextTemplating.Interfaces.10.0.dll
Microsoft.VisualStudio.TextTemplating.Interfaces.11.0.dll
Microsoft.VisualStudio.TextTemplating.Interfaces.14.0.dll
Microsoft.VisualStudio.TextTemplating.VSHost.14.0.dll
Microsoft.VisualStudio.Utilities.dll
Microsoft.VSSDK.UnitTestLibrary.dll
Microsoft.Windows.Simulator.Client.dll
Microsoft.CodeAnalysis.VisualBasic.dll
Microsoft.CodeAnalysis.Workspaces.dll
Microsoft.CodeAnalysis.Workspaces.Desktop.dll
Microsoft.CodeAnalysis.CSharp.Workspaces.dll
Microsoft.CodeAnalysis.VisualBasic.Workspaces.dll
Microsoft.VisualStudio.LanguageServices.dll
Microsof.VisualStudio.Shell.12.0.dll
Microsof.VisualStudio.Shell.11.0.dll
Microsof.VisualStudio.Shell.10.0.dll
Microsof.VisualStudio.Settings.12.0.dll
Microsof.VisualStudio.Settings.11.0.dll
Microsof.VisualStudio.Settings.10.0.dll
Microsof.VisualStudio.Shell.Platform.WindowManagement.dll
Microsof.VisualStudio.Shell.ViewManager.dll
```
