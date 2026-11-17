---
title: Building a Voting System with Python
author: yakuhito
layout: post
permalink: building-a-voting-system-with-python
image: /images/building-a-voting-system-with-python/building-a-voting-system-with-python.jpg
category: blog
---
What if you could vote the next president of your country using an app on your phone?

In this article I’m going to build an online voting system. It is mostly based on [this paper](https://core.ac.uk/download/pdf/11779635.pdf), but it’ll be slightly modified. Also, in order to fully understand this article, you need to know the basics of RSA. For this, I recommend [my last article](https://blog.kuhi.to/rsa_encryption_signatures_and_blind_signatures).

## 0. Design

There will be 3 programs:

  * The validator server software: the validator server is responsible for verifying that a client is an eligible voter and blindly signing the masked vote.
  * The counter server software: this server just stores anonymous votes associated with valid signatures. In a real life scenario, it is recommended that voters mask their IP before sending their vote to the storage server in order to maximize anonymity.
  * The client software: the client will have hard-coded voting options. Once the user voted, it will handle vote encryption, blinding, signing, unblinding and submission.

If we do everything right, the voting process will be anonymous. Also, we will weight the pros and cons of online voting at the end of this article.

## 0.5. Is this approach anonymous?

Yes, because:

  * The validator knows your identity and that you voted – but can’t unblind your vote, so it has no knowledge of whom you voted for.
  * The counter only knows that you have a vote signed by the validator, so it doesn’t know who you are.

If you have a hard time understanding, leave a comment or PM me on [Twitter](https://twitter.com/yakuhito).

## 1. Generating the RSA key

We are going to need a RSA keypair to sign all the votes. The public key will be hardcoded into the client and storage server software, and the private key will only be held by the validator server. We can generate it with the following Python script:

{% highlight python %}
#!/usr/bin/python3
from Crypto.PublicKey import RSA
from Crypto import Random
import os

if os.path.isfile('public.pem'):
	print("public.pem already exists! Exiting...")
	os.exit(1)

print("Generating new keypair, please wait...")

random_generator = Random.new().read
key = RSA.generate(2048, random_generator)

print("Key generated, saving to files...")

open('public.pem', 'wb').write(key.publickey().exportKey('PEM'))
open('private.pem', 'wb').write(key.exportKey('PEM'))

print("Done!")

{% endhighlight %}

I’ll paste the generated public and private keys below (of course, yours will be different):

{% highlight python %}
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1dYYw3e/nRRmomgTaeF
1+ocseg2RMlhDGP16daOmcd//oBudGWqphDs+0a1d75I1wmj/YlviiRhiwRgPo4j
mXXb4akPyxnO44plK0IpO761gyod2WrxQXnCNmUYMVOSiZdE168WinrKcIijc8XY
bWLexx4RwKS0j+cinSTbJiIVvhefSWYXxOpz18gEIu3xgkOx9aD853n8BXA4Bv5t
cuwxZdF+ibIrE5TmNJe8kxJbfxsucDkamGvIWsummEMpuH4jGWEuTantYnNKG615
WhsA7eI/9xCR036O7nNTIjk5KRR/rZ1ytgBMceerK5g/bk8hYII/surpqxjZ+N/0
kwIDAQAB
-----END PUBLIC KEY-----

{% endhighlight %}

{% highlight python %}
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAv1dYYw3e/nRRmomgTaeF1+ocseg2RMlhDGP16daOmcd//oBu
dGWqphDs+0a1d75I1wmj/YlviiRhiwRgPo4jmXXb4akPyxnO44plK0IpO761gyod
2WrxQXnCNmUYMVOSiZdE168WinrKcIijc8XYbWLexx4RwKS0j+cinSTbJiIVvhef
SWYXxOpz18gEIu3xgkOx9aD853n8BXA4Bv5tcuwxZdF+ibIrE5TmNJe8kxJbfxsu
cDkamGvIWsummEMpuH4jGWEuTantYnNKG615WhsA7eI/9xCR036O7nNTIjk5KRR/
rZ1ytgBMceerK5g/bk8hYII/surpqxjZ+N/0kwIDAQABAoIBAA03TJTq7FrJpf6f
6uvyL5Mjnypv+O+fXo4AiYfGmMA+a196Iib1WWgcWyyv9vDND92VKOKQ5PIMY+sP
jlDueGmtHlbj2oITckV9Kv0QliXY8lNGTBwsVXr0R1nXzxKjzHH8eiDQ/c7q1E4Z
jKX+ewhzKngOYk4wEi4Dr6cIWKq1fqaNfjMMJ6MlZJ6Ilc0RcOlK/VyEH18St0gT
kEJs/Gn2B6Q4sVuFfjDAEOACHJfvQFNvI1qNhisvx6ZwgIyN8Z2yeNfE4xx5VZJR
T3X52OYeEe3QJL7IaHl8qF3pL/wPh/ILIlq8xYReSQd8FxMkrXLWrBSC3AQ6A9eL
xCaaDSECgYEAzC1FaCW5p/g1cvGl59V4ZSZ1AB8sCzGlnzxe0JAQa0/EeUOwOOJL
lVncSbjEYCuYCuUw9HJBk5v8jb7hTIoSHVuHaUhBAuyenfEjlUaXgJ6gukp3lJCJ
qLgsaaK23N7m7ZLkf0hAwOqTrIkLeEDuhmmTvRGMaWJugjRQoU4LqA8CgYEA7+gO
fzIrRFSaoAH3CQ5jVtE39fTWJckD4p9IlOWNyCKQhFqDlhlTyaDJCHWf00cP+qNy
QBRjUM4Z3GDKD2uNhdxkrGs7JwEHRglkHa+JGnC783kl6ALtWkID2IoCGrnisgxm
MftkXxYWIagsvMzkWrbU8JuhuxHI77U9V6z3hz0CgYEAvhUjebstZaAhenpX/0Zw
iJLN+CgNI/q7e0yD5N1KO+2ON2r542th/JAlEokuYW4UZYhMFDdOr7JX5Eqhi1U7
WhN9NFntFGDfpqD5hJ6sqzSC5Awx2aDaV7Xmuw2d+nCWQvUvPwQwLKn2g3kusWyZ
447k2O8+bloSEavMqO900KcCgYEA3t6y0QF3ZnQ+bVVF/LjMGnQky66XXuTeYiLd
V83lqD5MCVjZE5EV4KMo/13ei3Vh59L9qYAHP6MoLS4RqL+e6vNy5yZ6/mIbMro4
ssdG1DRUtvwd9er6OzZGwlx7Vf7IFeYk7lv/w8IN71h/rymdHpTpP1klp1b/V4kE
orXCAnUCgYBQ9VmKeMp+JkD9lUT1r8F10cGMB0EwETRGCV+MYdFwC8B81txb8ww3
eRbHvdClkS3nFxR3H7WZkUG7Zrw2zU8ldHphCcHBM8N8xsh5DH8D0I8XTQBUcbPe
WOf6ut2+h7M9yyz10mfAyqtFyIBcH/JGp/B0Rxm1GXDh/2JI63BspA==
-----END RSA PRIVATE KEY-----

{% endhighlight %}

Also, here’s a useful one-liner that will generate the variable declarations of the key:

{% highlight bash %}
python -c 'print("pubkey_pem = {}\nprivkey_pem = {}".format(open("public.pem", "rb").read(), open("private.pem", "rb").read()))'

{% endhighlight %}

## 2. The Validator Server

As I said before, the validator server will blindly sign one vote for every eligible voter. The validator cannot tell a blind vote apart from a random number, so a voter that sends an invalid vote will loose his/her ability to vote.

I believe the code is pretty readable and easy to understand, so I’ll just paste it below:

{% highlight python %}
from flask import Flask, request, jsonify, make_response
from Crypto.PublicKey import RSA
from Crypto.Util.number import long_to_bytes, bytes_to_long
import base64

privkey_pem = b'-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAv1dYYw3e/nRRmomgTaeF1+ocseg2RMlhDGP16daOmcd//oBu\ndGWqphDs+0a1d75I1wmj/YlviiRhiwRgPo4jmXXb4akPyxnO44plK0IpO761gyod\n2WrxQXnCNmUYMVOSiZdE168WinrKcIijc8XYbWLexx4RwKS0j+cinSTbJiIVvhef\nSWYXxOpz18gEIu3xgkOx9aD853n8BXA4Bv5tcuwxZdF+ibIrE5TmNJe8kxJbfxsu\ncDkamGvIWsummEMpuH4jGWEuTantYnNKG615WhsA7eI/9xCR036O7nNTIjk5KRR/\nrZ1ytgBMceerK5g/bk8hYII/surpqxjZ+N/0kwIDAQABAoIBAA03TJTq7FrJpf6f\n6uvyL5Mjnypv+O+fXo4AiYfGmMA+a196Iib1WWgcWyyv9vDND92VKOKQ5PIMY+sP\njlDueGmtHlbj2oITckV9Kv0QliXY8lNGTBwsVXr0R1nXzxKjzHH8eiDQ/c7q1E4Z\njKX+ewhzKngOYk4wEi4Dr6cIWKq1fqaNfjMMJ6MlZJ6Ilc0RcOlK/VyEH18St0gT\nkEJs/Gn2B6Q4sVuFfjDAEOACHJfvQFNvI1qNhisvx6ZwgIyN8Z2yeNfE4xx5VZJR\nT3X52OYeEe3QJL7IaHl8qF3pL/wPh/ILIlq8xYReSQd8FxMkrXLWrBSC3AQ6A9eL\nxCaaDSECgYEAzC1FaCW5p/g1cvGl59V4ZSZ1AB8sCzGlnzxe0JAQa0/EeUOwOOJL\nlVncSbjEYCuYCuUw9HJBk5v8jb7hTIoSHVuHaUhBAuyenfEjlUaXgJ6gukp3lJCJ\nqLgsaaK23N7m7ZLkf0hAwOqTrIkLeEDuhmmTvRGMaWJugjRQoU4LqA8CgYEA7+gO\nfzIrRFSaoAH3CQ5jVtE39fTWJckD4p9IlOWNyCKQhFqDlhlTyaDJCHWf00cP+qNy\nQBRjUM4Z3GDKD2uNhdxkrGs7JwEHRglkHa+JGnC783kl6ALtWkID2IoCGrnisgxm\nMftkXxYWIagsvMzkWrbU8JuhuxHI77U9V6z3hz0CgYEAvhUjebstZaAhenpX/0Zw\niJLN+CgNI/q7e0yD5N1KO+2ON2r542th/JAlEokuYW4UZYhMFDdOr7JX5Eqhi1U7\nWhN9NFntFGDfpqD5hJ6sqzSC5Awx2aDaV7Xmuw2d+nCWQvUvPwQwLKn2g3kusWyZ\n447k2O8+bloSEavMqO900KcCgYEA3t6y0QF3ZnQ+bVVF/LjMGnQky66XXuTeYiLd\nV83lqD5MCVjZE5EV4KMo/13ei3Vh59L9qYAHP6MoLS4RqL+e6vNy5yZ6/mIbMro4\nssdG1DRUtvwd9er6OzZGwlx7Vf7IFeYk7lv/w8IN71h/rymdHpTpP1klp1b/V4kE\norXCAnUCgYBQ9VmKeMp+JkD9lUT1r8F10cGMB0EwETRGCV+MYdFwC8B81txb8ww3\neRbHvdClkS3nFxR3H7WZkUG7Zrw2zU8ldHphCcHBM8N8xsh5DH8D0I8XTQBUcbPe\nWOf6ut2+h7M9yyz10mfAyqtFyIBcH/JGp/B0Rxm1GXDh/2JI63BspA==\n-----END RSA PRIVATE KEY-----'
privkey = RSA.importKey(privkey_pem)

app = Flask("Validator Server")

allowed_voters = ["yakuhito{}".format(i) for i in range(100)]
voters = []

@app.route('/')
def index():
	return 'The validator server is working!'


@app.route('/validate', methods=['POST'])
def validate():
	global voters
	global allowed_voters
	global privkey

	# Parse request
	data = request.get_json(force=True)
	if data.get('username', -1) == -1 or data.get('vote',  -1) == -1:
		return make_response(jsonify(error='username and vote are required!'), 200)
	username = str(data['username'])
	vote = str(data['vote'])
	try:
		vote = bytes_to_long(base64.b64decode(vote.encode()))
	except:
		return make_respone(jsonify(error="can;t decode vote!"), 200)

	# Check if user is allowed to vote
	if username not in allowed_voters:
		return make_response(jsonify(error="user isn;t allowed to vote"), 200)

	# Check if user already voted
	if username in voters:
		return make_response(jsonify(error='you already voted!'), 200)

	# Sign vote
	signature = pow(vote, privkey.d, privkey.n)

	# Add voter to voters
	voters.append(username)

	# Return signed vote
	return make_response(jsonify(signature=base64.b64encode(long_to_bytes(signature)).decode()), 200)


if __name__ == "__main__":
	app.run(host='127.0.0.1', port='1111')

{% endhighlight %}

## 3. The Counter Server

The counter server is even simpler than the validator server. After it receives a signed vote, it verifies the signature and add it to an array if it is valid. I also implemented a stats function that returns the current umber of votes for every option:

{% highlight python %}
from flask import Flask, request, jsonify, make_response
from Crypto.PublicKey import RSA
from Crypto.Util.number import long_to_bytes, bytes_to_long
import base64

options = [
(1, "Yakuhito"),
(2, "Also Yakuhito"),
(3, "Definetly Yakuhito"),
(4, "Yakuhito, of course!")
]

pubkey_pem = b'-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1dYYw3e/nRRmomgTaeF\n1+ocseg2RMlhDGP16daOmcd//oBudGWqphDs+0a1d75I1wmj/YlviiRhiwRgPo4j\nmXXb4akPyxnO44plK0IpO761gyod2WrxQXnCNmUYMVOSiZdE168WinrKcIijc8XY\nbWLexx4RwKS0j+cinSTbJiIVvhefSWYXxOpz18gEIu3xgkOx9aD853n8BXA4Bv5t\ncuwxZdF+ibIrE5TmNJe8kxJbfxsucDkamGvIWsummEMpuH4jGWEuTantYnNKG615\nWhsA7eI/9xCR036O7nNTIjk5KRR/rZ1ytgBMceerK5g/bk8hYII/surpqxjZ+N/0\nkwIDAQAB\n-----END PUBLIC KEY-----'
pubkey = RSA.importKey(pubkey_pem)

votes = []

app = Flask("Counter Server")

@app.route('/')
def index():
	return 'The counter zerver is working!'


@app.route('/submit', methods=['POST'])
def submit():
	global votes
	global pubkey_pem
	global options

	# Parse request
	data = request.get_json(force=True)
	if data.get('signed_vote', -1) == -1 or data.get('r', -1) == -1:
		return make_response(jsonify(error='bad request'), 200)
	signed_vote = str(data["signed_vote"])
	r = str(data["r"])

	try:
		signed_vote = bytes_to_long(base64.b64decode(signed_vote.encode()))
	except:
		return make_response(jsonify(error='bad b64 encoding!'), 200)

	# Decode vote
	decoded_vote = pow(signed_vote, pubkey.e, pubkey.n)
	decoded_vote = long_to_bytes(decoded_vote)

	# Search for correct vote and record it
	for option, strg in options:
		s = str(option).encode() + b'-' + r.encode()
		if s == decoded_vote:
			votes.append((str(option), signed_vote, r))
			return make_response(jsonify(message="Your vote has been recorded."), 200)

	# If no mach is found, the string that was sent wasn;t formatted correctly
	return make_response(jsonify(error="Bad vote."), 200)


@app.route('/stats', methods=['GET'])
def stats():
	global votes
	global options

	# Set all vote counts to 0
	counter = {}
	for option, strg in options:
		counter[str(option)] = 0

	# Count the votes
	for vote in votes:
		counter[vote[0]] += 1

	# Return the answer as json
	return make_response(jsonify(counter))


if __name__=="__main__":
	app.run(host='127.0.0.1', port='2222')

{% endhighlight %}

## 4. The Voter (Client) Software

In a real-life scenario, this would be a website or a mobile app. However, in order to keep thing simple, we will code the client software in Python.

First, we need to import the required libraries:

{% highlight python %}
#!/usr/bin/python3
from Crypto.Util.number import long_to_bytes, bytes_to_long, inverse
from Crypto.PublicKey import RSA

import string
import os
import requests
import random
import math
import base64
import json

{% endhighlight %}

Then, we need to hard-code the voting options. This is more secure than fetching them from another server every time (and is also more simple to code!).

{% highlight python %}
vote_subj = "If you could vote the next president of your country, who would that be?"

options = [
(1, "Yakuhito"),
(2, "Also Yakuhito"),
(3, "Definetly Yakuhito"),
(4, "Yakuhito, of course!")
]

{% endhighlight %}

We also need to set the addresses of the API point we will be using In my case, the validator and counter servers will be running on localhost, or 127.0.0.1.

{% highlight python %}
VALIDATOR_ADDR = "http://127.0.0.1:1111/validate"
COUNTER_ADDR = "http://127.0.0.1:2222/submit"
STATS_ADDR = "http://127.0.0.1:2222/stats"

{% endhighlight %}

The getSignedVote() function will take the voter name and choice as arguments and will return the signed vote. This means that it needs to blond the vote, talk to the validator server and then unblind the signature:

{% highlight python %}
def getSignedVote(username, vote):
	global pubkey_pem
	global VALIDATOR_ADDR
	pubkey = RSA.importKey(pubkey_pem)

	# Choose r
	r = random.randint(2, pubkey.n)
	while math.gcd(r, pubkey.n) != 1:
		r += 1

	# Calculate blinding factor
	blinding_factor = pow(r, pubkey.e, pubkey.n)

	# Calculate blinding vote
	blinded_vote = (int(vote) * blinding_factor) % pubkey.n

	# Get blinded signature
	enc_vote = base64.b64encode(long_to_bytes(blinded_vote)).decode()
	req = requests.post(VALIDATOR_ADDR, json={'username': username, 'vote': enc_vote})
	resp = json.loads(req.text)
	blinded_signature = bytes_to_long(base64.b64decode(resp["signature"]))

	# Calculate signature
	r_inv = inverse(r, pubkey.n)
	signature = blinded_signature * r_inv % pubkey.n

	return signature

{% endhighlight %}

We are also going to need a function that will submit the data to the counter server:

{% highlight python %}
def submitSignedVote(vote, r):
	global COUNTER_ADDR

	vote = base64.b64encode(long_to_bytes(vote)).decode()
	req = requests.post(COUNTER_ADDR, json={"signed_vote": vote, "r": str(r)})

	print(req.text)

{% endhighlight %}

Also, it would be nice if we could print the vote count to the user after he/she voted:

{% highlight python %}
def printStats():
	global STATS_ADDR

	req = requests.get(STATS_ADDR)
	stats = json.loads(req.text)

	print()
	print("Thank you for taking the time to vote! Here are the vote stats:")
	for key, value in stats.items():
		print("Option {} has {} votes.".format(key, value))
	print()

{% endhighlight %}

The next function makes sure that the integer representation of a vote is not the same between participants by adding a seed:

{% highlight python %}
def encodeVote(vote):
	alphabet = string.ascii_letters + "0123456789"
	r = ''.join([random.choice(alphabet) for i in range(64)])
	enc = "{}-{}".format(vote, r)
	return bytes_to_long(enc.encode()), r

{% endhighlight %}

Now that we have all the required methods, let’s see the main code:

{% highlight python %}
def main():
	global vote_subj
	global options

	# Intro
	print("Welcome to y@kuhi.to;s voting system demo!")
	print("PLEASE NOTE THAT YOUR VOTE IS FINAL")
	print("No pressure!")
	print()
	print("Today;s voting topic:")
	print(vote_subj)
	print()
	print("Yout voting options:")
	for opt in options:
		print("OPTION {}: {}".format(opt[0], opt[1]))
	print()

	# Get user;s username
	print("Username:", end=" ")
	username = input()

	# Get the user;s vote
	print("Your vote:", end=" ")
	try:
		vote = int(input()) # This is python3, please note that running this line on python2 will result in a code execution vuln
	except:
		print("Nope.")
		return ""

	# See if the vote is valid
	valid = False
	for opt in options:
		if opt[0] == vote:
			valid = True
	if valid == False:
		print("You were the chosen one! I trusted you!")
		return ""

	# Encode Vote
	vote, r = encodeVote(vote)

	# Get signed vote
	try:
		signed_vote = getSignedVote(username, vote)
	except:
		print("Something went wrong with vote signing :(")
		return ""

	# Send vote to counter
	submitSignedVote(signed_vote, r)

	# After the vote has been submitted, print the stats
	printStats()


if __name__ == "__main__":
	main()

{% endhighlight %}

## 5. Testing the System

Now that we have a working system, let’s test it. First, we need to start the validator and counter servers. By default, they will listen on localhost on ports 1111 and 2222.

<div>
<center><img src="/images/building-a-voting-system-with-python/image.png"></center>
</div>

<div>
<center><img src="/images/building-a-voting-system-with-python/image-1.png"></center>
</div>

Now, let’s go to vote! Remember, only usernames that start with yakuhito and end with a number from 0 to 99 are allowed to vote. Let’s first try an invalid name:

<div>
<center><img src="/images/building-a-voting-system-with-python/image-2.png"></center>
</div>

The validator server rejected our vote because our username wasn’t whitelisted. Let’s now try voting with a valid username:

<div>
<center><img src="/images/building-a-voting-system-with-python/image-4.png"></center>
</div>

Our vote was recorded. Let’s try to use the same username again:

<div>
<center><img src="/images/building-a-voting-system-with-python/image-5.png"></center>
</div>

The validator server rejects our vote again. This is because no voter is allowed to change his vote or vote twice.

## Moving to production

Here’s a short list I made of things that need to change in order to go into production (a.k.a. use the system in a real-world scenario):

  * Make the voter program work on multiple platforms. I would go with a website, but stand-alone apps for Android and iPhone could also work.
  * Connect the validator & counter servers to back-end databases. Test for SQL injections!
  * BUY HTTPS CERTIFICATES. This doesn’t need additional explanation.
  * Buy servers, hire sysadmins/programmers to set everything up.
  * Conduct at least one PENTEST and request the opinion of someone with a PhD in cryptography. I’m just an enthusiast and there might be a fatal flaw I cannot see because of my limited understanding of cryptography.

## Possible attacks

  * Someone might steal the RSA key and sign a lot of votes. This could be solved by increasing security and verifying that the number of people that were verified by the validator is equal to the number of signed votes.
  * The holder of the validator server might sign votes to support a party of his choice. This is the equivalent of inserting paper votes into a ballot to influence the outcome of the vote. This can be solved by having multiple validators/counters with different keys.
  * The counter server might report false data. This can be solved by publishing the list of signed votes at the end of election. If you have a signed vote that is not on the list, you can prove you voted in the election, and you could request a vote re-count.

## Conclusion

While using software to vote might be less secure, it’s still an option to consider. In this article, we saw that it is relatively easy to implement such system. However, it is also hard to protect it against viruses. The program works in theory, but what if malware intercepts your request and modifies them so you vote for another party? Making it available on mobile phones only is more secure, however, it is still insecure.

EDIT: You can find the code [here](https://github.com/Yakuhito/python-rsa-voting-system) and ask me questions [here](https://twitter.com/yakuhito).

Until next time, hack the world.

yakuhito, over.
