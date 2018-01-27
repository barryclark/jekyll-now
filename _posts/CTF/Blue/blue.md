# Hack The Box - Blue

## Inital Information
Hack The Box shows that we are dealing with the Windows operating system. This halves the type of exploits we can possibly look at, in addition we can make informed assumptions on the possible information we enumerate.

## Enumeration
As like most pen tests we begin with NMAP and Nessus.

### NMAP
Image nmap_blue.png

We can see that ports 135, 139 and 445 are open. **Commonly** port 139 runs SMB and 445 is a HTTPS web server, confirming this information via Nessus to ensure that the NMAP results are indeed correct.
### Nessus
Image Nessus1.png

Nessus confirms that it is running SMBv1 on port 139 which we know is vulnerableas, well as running the Windows operating system. . 

## Exploitation
Knowing the machine is running SMBv1 and Windows, and the name of the box is "Blue", we can therefore make an assumption it is EternalBlue.

Running EternalBlue within msfconsole confirms our assumption and gives us root.

Image successful.png

## Conclusion
This machine is rated easy, however it is still extremly fun to run Eternalblue to pwn the machine.

