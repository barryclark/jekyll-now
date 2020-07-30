<h1> Digital capabilities <h1>

<h2>History</h2>

Arguably the biggest mistake in the history of computing is the permissions model or "access control list". This has resulted in billions of dollars in systems administrator costs and the emergence of centralised BIG tech (i.e. GAFA - Google, Amazon, Facebook, Apple), all thanks to a flawed security model that we'll discuss in just a minute.
<br>

It's been said that we make tools in our own image, and from then on the tools shape us in their image… Put more simply, if all we have is a hammer, then everything else looks like a nail. We have had over 50 years of permissions embedded at a low level of our digital model, which in turn has contributed to shaping our corporations, tools and ultimately perceptions of reality into a paradigm of command and control. We've even learned to depend on these structures!
<br>

But alas, it didn't have to be this way and probably wont be in the future; we could have created something more relational and had an entirely different present tense - we could have implemented capabilities as a pattern!
Capabilities vs Permissions
The difference between capabilities and permissions may seem pretty small but it has huge emergent effects, as illustrated above. So whats the difference in framing?
<br>

Let's take a very concrete example; I'm staying in your house and fancy a cup of tea - stating my thirst out loud you might say "help yourself to the kettle" (capability granted), or I might ask you for the permission to fish out a teabag from your cupboard. As you might observe, it's much of a muchness and they are two views of the same thing; but I pose to you reader - which one feels warmer and more enabling? Asking for something or being offered? I'm going to guess the latter according to most peoples preferences.
<br>

Ok, so thats the general concept - but whats actually going on deep down? Well in technological terms we are compressing an access matrix. In particular we've been using the pattern of relating subject to object for many years now rather than the other way around, which is where the pathology lies. Capabilities is relating object to subject; if you have the token then you can do the thing.
(For further information I recommend [this](https://www.youtube.com/watch?v=qZ2LltOmD5A&t=1s) video I filmed back at the internet identity workshop 2017)
<br>

<h2>Capabilities on Holochain</h2>
The Holochain security model is based on capabilities. The first capability token you might encounter is embedded in your source chain header as your agent ID. This token is a public key, which matches a private key that enables you to write to your source chain. You can then write an entry providing another ID the ability to read a given entry.

Lets go through a concrete example:
- Create a private entry on your source chain that contains a message.
- Create another entry containing a link to the post and allow the receiving agents ID. This is a capability grant, you can optionally parameterise it.
- Pass a hash of the capability grant to the second party so they can point at it when trying to access the message. This is a capabilities claim. When the second party wants to read the message they follow the hash and do a [send/receive on the entry](https://developer.holochain.org/docs/concepts/8_node_to_node_messaging/) <br>

<h2> Token structure </h2>

Now that we know how capabilities work, we can ask ourselves about the structure, which is relatively simple:
- Theres an array of keys (whos allowed to read)
- Theres an array of what (function calls/parameterisation)
- These arrays can be updated/deleted

<h2> The upside </h2>

The nice thing about capabilities is that unlike permissions lists you can delegate access as you wish and specify exactly who can call which functions and pre-parameterising them, with later flexibility to amplify or attenuate the level of access permitted. In a nutshell, it's a far more flexible and secure pattern than the permissions paradigm.
Links:
[A video of Art explaining Capabilities](https://www.youtube.com/watch?v=d2OofjB2Yj0)
[A very nice post by Paul on Capabilities](https://forum.holochain.org/t/capability-delegation/1082)