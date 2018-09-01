---
layout: post
title: Windows CVE 2016-7256 diffing
category: VRD
---

# Introduction
The blog post is the process in which vulnerabilities can be identified through file diffing (this post is written from something I wrote during 2017). Within this blog post, the vulnerability CVE-2016-7256 also referred to as ms16-132, will be reviewed via the patched version, atmfd.dll Version 5.2.1.250 and the vulnerable version, atmfd.dll Version 5.2.1.248. A potential test case will be created to demonstrate a windows hang through the adapting an open type font to be used within a virtual machine that uses the vulnerable security patch.

# Overview of CVE-2016-7256
CVE-2016-7256 is a vulnerability that has been found within the atmfd.dll file which is in the font library within the Windows Operating System. The vulnerability effects the following [operating systems](http://www.securityfocus.com/bid/94156):
* Microsoft Windows Vista x64 Edition Service Pack 2
* Microsoft Windows Vista Service Pack 2
* Microsoft Windows Server 2016 for x64
* Microsoft Windows Server 2012 R2
* Microsoft Windows Server 2012
* Microsoft Windows Server 2008 R2 for x64-based Systems SP1
* Microsoft Windows Server 2008 R2 for Itanium-based Systems SP1
* Microsoft Windows Server 2008 for x64-based Systems SP2
* Microsoft Windows Server 2008 for Itanium-based Systems SP2
* Microsoft Windows Server 2008 for 32-bit 
* Microsoft Windows RT 8.1
* Microsoft Windows 8.1 for x64 
* Microsoft Windows 8.1 for 32
* Microsoft Windows 7 for x64 
* Microsoft Windows 7 for 32-bit
* Microsoft Windows 10 Version 1607 for x64 
* Microsoft Windows 10 Version 1607 for 32-bit 
* Microsoft Windows 10 version 1511 for x64
* Microsoft Windows 10 version 1511 for 32-bit
* Microsoft Windows 10 for x64 
* Microsoft Windows 10 for 32-bit

The list spans a significant amount of operating systems within the Windows domain and in such is labelled as a significant danger to a Windows eco system. The security vulnerability is rated as 9.3 which signifies an extremely high risk to the operating system. It is rated as such, due to the security vulnerability being able to carry out Remote Code Execution. Further to this, a failed exploitation of this bug lead to a [Denial of Service](http://www.securityfocus.com/bid/94156/discuss) conditions. 

# Technical Breakdown of CVE-2016-7256
The security vulnerability CVE-2016-7256 is a vulnerability with the atmfd.dll which is a kernel font driver. The latest version of atmfd.dll is version 5.1.2.250, while the previous version of atmfd.dll is 5.1.2.248.

To confirm that the changes have been made to atmfd.dll we can download the Microsoft Security Update files (.msu and .cab) . 

To get both DLL files together, we can download the previous and patched dll file. Each of which can be found at:
Vulnerable - [Microsoft Old Security Patch](https://www.microsoft.com/en-us/download/confirmation.aspx?id=52868), 
Patched version - [Microsoft New Security Update](http://www.catalog.update.microsoft.com/Search.aspx?q=3203859). 

Microsoft supply us the means to decompile such files through the [expand.exe](https://msdn.microsoft.com/en-us/library/dn898569.aspx) tool. Running the tool we can unpack and extract all the contents of this update and then search the general distribution files for what has been changed.

Expanding the .msu file first, with the command expand.exe -F:* <filename> <destination>, which then provides us with four new files.

![Expand MSU](/images/diffing/expand_msu.png "Expanding MSU file")

Next we do the same but for the .cab file which gives us 66 new files.
![Expand CAB](/images/diffing/expand_cab.png "Expanding CAB file")

Repeating this process for the second DLL we should get both the 248 and 250 versions of our dll.

## Dumpbin
[Dumpbin](https://msdn.microsoft.com/en-us/library/20y05bd5.aspx) is a tool which is also developed by Microsoft (how kind of them to provide everything we need) that displays information about COFF binary files. Dumpbin can provide us with some useful information when carrying out patch analysis in terms of what has been changed or altered, using the command:
` 
dumpbin /headers atmfd.dll 
`
we get the results for both 248 and 250 file versions of the dll.

### atmfd.dll Version 5.1.2.248
Using the dumpbin tool we get confirmation that we are working with an x64 based DLL file that has no symbol table and that it is a recent version of the file based on the time stamp given by Microsoft, this coincides with both the security update MS16-074.
![Dumpbin 248](/images/diffing/dumpbin_248_1.png "Dumpbin 2481")

In addition, the confirmation of the file we also get the size of the .text section of the file which in this version is 43512.
![Dumpbin 248](/images/diffing/dumpbin_248_2.png "Dumpbin 2482")

### atmfd.dll Version 5.1.2.250
Using dumpbin we can see that there are significant changes between the file versions 250 and 240.
![Dumpbin 250](/images/diffing/dumpbin_250_1.png "Dumpbin 2501")
![Dumpbin 250](/images/diffing/dumpbin_250_2.png "Dumpbin 2502")


# IDA PRO - Diaphora
The Diaphora plugin for IDA [Diaphora](https://github.com/joxeankoret/diaphora) allows for the differential analysis of files to extract, previous content, matched functionality and new content. New or modified content is the target for this process, as to check to see what Microsoft have done to fix the vulnerability.

We first need to create our SQLi database for atmfd.dll version 5.1.2.248 so that Diaphora can store the results and then compare them to the SQLi database of atmfd.dll version 5.1.2.250. Once the database has been exported we repeated the process for atmfd.dll version 5.1.2.250.
![Diaphora](/images/diffing/diaphora_bin.png "Diaphora")

With the two exported databases, we can compare the SQLi databases for some exciting diffing.
![Diaphora Compare](/images/diffing/diaphora_bin_compare.png "Diaphora Compare")

Diaphora has provided us with information regarding what has changed. If we further examine the functions that have had an increase or decrease in functionality we get four functions which we can focus on.
![Diaphora Results](/images/diffing/diaphora_results.png "Diaphora Results")

Further inspection of the changes that have been made in these files indicate to us that there are some changes in structure and better practices such as changing a direct location access to an offset + a value, but doesn’t provide any information on how the structure of the file has changed in the program. However, looking at the red shaded function block we can see that assembly instructions have changed which could indicate to us if there was a problem with a memory access or a boundary check.
![Diaphora Results Extended](/images/diffing/diaphora_results_two.png "Diaphora Results Extended")

# Function 22418
The changes in Function 22418 from the previously file (left side) and the patched version (right side) are slight but significant. Looking at the code it indicates that the there are changes within the way an if statement is structure.

![Function 22418](/images/diffing/function22418.png "Function 22418")

The LEA command in a pseudo instruction is that of getting the address value of Array[Index]. It is then doing an operation, in this case adding the value of rdx with 10H (16decimal) and then storing it. Next it is taking the computational value of the LEA command and then comparing it to that of rbx. This indicates that rbx holds a fixed amount of space such as the MAX_SIZE of the array, and that the possibility of jumping above rbx through the use of addition indicates that this vulnerability which was patched was an integer overflow through the unsanitized LEA command.

![Function 22418](/images/diffing/function22418_two.png "Function 224182")

The solution that has been implemented by Microsoft is that the function now does the comparison of the data that is in RAX and the value that was in RDX and compares them. If the value in rax is less than rdx it will jump to another comparison. If the value in rax is a negative or NULL value it will always return true making it always jump to the next function. The second comparison then compares the value of rax to the value stored in r9 which if the value in rax is above it will jump true. If, however it is not true then it will exit the module. The purpose of comparison two is to provide a method to check and prevent a pointer dereference. 

![Function 22418](/images/diffing/function22418_three.png "Function 224183")

# Potential Exploits through the vulnerability
The vulnerability may be exploited by changing the address in which the font file is loaded to. This will trigger the vulnerability and either cause a crash or load the shellcode into the next address space.

Writing an exploit that will trigger this vulnerability will require a test case which causes a crash. As we can see that the vulnerability causes an overflow with information that is supplied by a user, which would indicate that the first step is to create a font with a large font name and description.

Using a fresh install of a machine that is listed as a risk of the vulnerability we can begin to try and explore a possibility of a crash, in this case it will be Microsoft Windows 7 Home Basic Edition.

Using an OTF font file, the first point of call would be to look at how the fonts are structured and look for any possible array data types which are being utilised as the vulnerability is in regards to an array.

Reviewing the documentation on [Microsoft’s typography page](https://docs.microsoft.com/en-us/typography/opentype/spec/otff) we can see the listed data types.
![Open Type Fonts](/images/diffing/opentypefont.png "Open Type Fonts")

Searching the term “tag”, which lists a set of Open Type Font tables as illustrated below.
![Open Type Fonts Tag](/images/diffing/opentypefont_tag.png "Open Type Fonts Tag")

The information supplied provide us the possible vectors for us to abuse the array may have the vulnerability in. The next step would require us to create an array which is larger than the 32-bit size within those headers to create a test case.

using the virtual machine running the vulnerable operating system we can utilise a crafted font file. This file will generate a potential crash within the operating system
The file format as shown below is designated as the following:
* Blue = Offset Table,
* Red = Table Records,
* Green = Table

![Open Type Font File](/images/diffing/font_file.png "Open Type Font File")
![Open Type Font File Extended](/images/diffing/font_file_extended.png "Open Type Font File Extended")

By filling the table with “41” s we hope to overwrite the tag values so that when the information is run it causes the system to crash. Utilising a font fuzzer such as MsFontFuzz by Cr4ash (2013) (Which I can't seem to find the link anymore) allowed for changes to be made in legitimate font files as well as the crafted font file above.

Running the tool creates a window which loads the font file and then changes the addresses and resources within the font file until a crash has been generated, this is demonstrated in the below figure.
![Font Fuzzer](/images/diffing/font_fuzzer.png "Font Fuzzer")

The MsFontFuzzer works by increasing the Block size, File Range Start and End location, as well as the Block start, end and N ranges until there is a possible crash. 
When Installing the font file caused the system to freeze and not respond indicating that this file has caused a possible crash. 


![Windows Hang](/images/diffing/hang.png "Windows Hang")
After this has happened the next step would to inspect the Crash dump and then repeat the process with a debugger attached to the Fuzzer to further understand in which location the font file was loaded and caused the crash.

# Conclusion
From the analysis of the two versions, it was found that the vulnerability was an integer overflow. This was due to it taking a value and only doing upper bounds checking. If the value could go past this value or wrap around then it would cause an overflow. The checks were then implemented to fix the problem in atmfd.dll version 5.1.2.250 to encompass greater or equal to MAX_SIZE of the array but also lower bounds checking. With the caveat to prevent any null dereference pointers as well as any integer and buffer overflows.

With the use of fuzzing techniques, it was possible to generate a possible test case for future use as well as future development of a working Proof of Concept Code.
As it has been described the vulnerability can cause a significant threat to a system or network as it allows for kernel exploitation. In which case is justified at the 9.3 CVE score of 10. The fix that Microsoft has published to fix this vulnerability has allowed for the vulnerability from causing any further damage to any updates systems.
