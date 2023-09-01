---
layout: post
title: Note to self: PowerShell and user folders in Windows  
---

# Note to self: PowerShell and user folders in Windows

Sometimes in some situation default location of user folder in standard windows profiles are moved. I.e. because somebody use OneDrive, redirected folders, or have some fantasy to change. So in scripts better to use not %USERPROFILE%\Documents but i.e.

```[powershell]
[Environment]::GetFolderPath("MyDocuments"))
```

or for enymerate all of them: ```[enum]::GetNames( [System.Environment+SpecialFolder] )``` (spaces between [,] and ( ) are in some version of PS1 important).

For get table - we need something like that:

```[powershell]
[enum]::GetNames( [System.Environment+SpecialFolder] ) | 
Select @{ n="Name"; e={$_}}, @{ n="Path"; e={ [environment]::getfolderpath( $_ ) }}
```

what generate:

```[powershell]
Name                   Path
----                   ----
Desktop                C:\Users\jozek\OneDrive - Org\Desktop
Programs               C:\Users\jozek\AppData\Roaming\Microsoft\Windows\Start Menu\Programs
MyDocuments            C:\Users\jozek\OneDrive - Org\Documents
Personal               C:\Users\jozek\OneDrive - Org\Documents
Favorites              C:\Users\jozek\Favorites
Startup                C:\Users\jozek\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
Recent                 C:\Users\jozek\AppData\Roaming\Microsoft\Windows\Recent
SendTo                 C:\Users\jozek\AppData\Roaming\Microsoft\Windows\SendTo
StartMenu              C:\Users\jozek\AppData\Roaming\Microsoft\Windows\Start Menu
MyMusic                C:\Users\jozek\Music
MyVideos               C:\Users\jozek\Videos
DesktopDirectory       C:\Users\jozek\OneDrive - Org\Desktop
MyComputer
NetworkShortcuts       C:\Users\jozek\AppData\Roaming\Microsoft\Windows\Network Shortcuts
Fonts                  C:\Windows\Fonts
Templates              C:\Users\jozek\AppData\Roaming\Microsoft\Windows\Templates
CommonStartMenu        C:\ProgramData\Microsoft\Windows\Start Menu
CommonPrograms         C:\ProgramData\Microsoft\Windows\Start Menu\Programs
CommonStartup          C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
CommonDesktopDirectory C:\Users\Public\Desktop
ApplicationData        C:\Users\jozek\AppData\Roaming
PrinterShortcuts
LocalApplicationData   C:\Users\jozek\AppData\Local
InternetCache          C:\Users\jozek\AppData\Local\Microsoft\Windows\INetCache
Cookies                C:\Users\jozek\AppData\Local\Microsoft\Windows\INetCookies
History                C:\Users\jozek\AppData\Local\Microsoft\Windows\History
CommonApplicationData  C:\ProgramData
Windows                C:\Windows
System                 C:\Windows\system32
ProgramFiles           C:\Program Files
MyPictures             C:\Users\jozek\OneDrive - Org\Pictures
UserProfile            C:\Users\jozek
SystemX86              C:\Windows\SysWOW64
ProgramFilesX86        C:\Program Files (x86)
CommonProgramFiles     C:\Program Files\Common Files
CommonProgramFilesX86  C:\Program Files (x86)\Common Files
CommonTemplates        C:\ProgramData\Microsoft\Windows\Templates
CommonDocuments        C:\Users\Public\Documents
CommonAdminTools       C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Administrative Tools
AdminTools             C:\Users\jozek\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Administrative Tools
CommonMusic            C:\Users\Public\Music
CommonPictures         C:\Users\Public\Pictures
CommonVideos           C:\Users\Public\Videos
Resources              C:\Windows\resources
LocalizedResources
CommonOemLinks
CDBurning              C:\Users\jozek\AppData\Local\Microsoft\Windows\Burn\Burn
```

Frankly - it do not solve all "standard" folder issues. It left some PowerShell dirs. And i.e. location for default download folder for Chrome, MSEdge or Firefox. I will try next time.

## See also

* <https://stackoverflow.com/questions/24771455/getting-the-users-documents-folder-in-powershell> - some useful hints on stackoverflow. 
* <https://learn.microsoft.com/en-us/dotnet/api/system.environment.getfolderpath?view=net-8.0>  - "GetFolderPath in .NET on Windows" 
* <https://learn.microsoft.com/en-us/dotnet/core/compatibility/core-libraries/8.0/getfolderpath-unix> - "GetFolderPath behavior on Unix" @ MS
* <https://learn.microsoft.com/en-us/dotnet/api/system.environment.specialfolder?view=net-7.0#system-environment-specialfolder-mydocuments> list of folders with some description
* <https://learn.microsoft.com/en-us/windows-server/storage/folder-redirection/folder-redirection-rup-overview> "Folder Redirection, Offline Files, and Roaming User Profiles overview"
