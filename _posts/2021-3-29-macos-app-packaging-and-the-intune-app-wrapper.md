---
layout: post
title: macOS App Packaging and the Intune App Wrapper
---

I've been doing some testing and research into Intune's 3rd party packaging capabilities and support for macOS.

Here's what I found so far ... ( if you're interested 😁 )

- It looks like apps that install directly to the /Applications folder should install just fine so long as the actual destination of the installation is specified as /Applications in the Info.plist file found inside of the .app bundle. (Possibly with some extra tuning.
- Intune can only consistently determine if an app installs when the app is placed in the /Applications folder.
    
    - If there are components of an app that install outside of the Applications folder in addition to the Applications folder (example AnyConnect VPN) the Detection.xml Metadata file can be modified so that it only contains the info related to the piece of the app that installs in the /Applications folder. Once the modification is done and repackaged, it should install properly (most of the time).
        
        - This issue was first mentioned in an issue on GitHub [here](https://github.com/msintuneappsdk/intune-app-wrapping-tool-mac/issues/35)
        - Additional detail about the error and possible workaround is documented in this Microsoft KB - [Error 0x87D13BA2 when you deploy a macOS LOB app](https://docs.microsoft.com/en-us/troubleshoot/mem/intune/error-0x87d13ba2-deploy-macos-lob-app)
    
- Some packages will install on the Mac even though the Intune console reports a failure. This has been hit or miss and can cause the packaged app to attempt reinstallation over and over again.
- An alternative to using a LOB package for macOS is to use scripted installs for the application. I have tested a number of them, and they appear to install successfully. But not all apps can be installed this way.
        
    - Firefox
    - Google Chrome
    - All of the office apps
    - Something like Installomator could be used in this case - [here](https://github.com/scriptingosx/Installomator)
        
- This is kind of outside the box, but it might be possible to host macOS packages in a file share or external repository then leverage scripts to pull those down for installation.
    - The downside here is that reporting becomes a challenge.
        - Custom Attributes may be able to help here.

In conclusion, macOS LOB app deployment still has some rough edges, and I do not think that it is ready for most Enterprise customers that are looking for a macOS solution that must contain 3rd party app packaging support (Jamf, WSO, MaaS360, MobileIron, Addigy, Kanji, etc). From what I can find online and in the Intune macOS slack channel is that Microsoft has plans to fix some of these issues in their package wrapper tool, but no ETA at present.
    