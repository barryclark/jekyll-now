---
layout: post
title: "A Web Developer Goes Native (With Android)"
---

In the past week I've jumped head-first into Android development for a new Intridea project. This is my first time doing any real Android development as well as my first jump back to Java since I graduated from college. I thought it might be interesting to catalog some of my experiences developing for the platform, so here they are:

<p style='float:right;'><img src="http://img.skitch.com/20100912-xu2q3a9rskk9aj8wappskhh1rr.jpg"/></p>

### Things I Loved

**Intents:** Android is built on an "Intents" system. When you want the user to perform some kind of common action, you create an intent for it and activate that intent. Different applications can hook into the same intents, allowing the user to completely customize how they handle a given action.

Wow, what a brilliant system. Android is built from the ground up for insane levels of interoperability between applications. It took no time at all to get a basic QR code scanning process flowing thanks to intents, and the same went for composing e-mails and opening web pages. Literally couldn't be simpler.

**Activities:** The base unit of an Android application is an activity. An Activity class is what holds the context for your application as well as manages on-screen events and more. One application may have many activities, divided up logically based on user actions.

Once I was able to wrap my head around the idea that any given "screen" is really more like an "activity" that the user performs, the logic of the application design really fell into place. I think this is a perfect level of abstraction for a mobile platform, and it really made it easy to figure out where to draw the line between one screen and the next.

**On-Phone Debugging:** My mouth actually dropped open the first time I plugged my Nexus One in and hit "Run" in Eclipse. In just 5-10 seconds my app was launching natively on my phone for me to test. Not only that, but I was still able to see logs and uncaught exceptions as the program ran. Running on the phone is also **lots** faster than running in the emulator.

**Resources and NineScale:** Google has come up with a very elegant solution to the idea of handling binary and other resources in Android projects. All of the resources in a directory are pre-compiled into a big reference file called `R.java` that simply contains access to every menu, image, string, and view that you've created for the application. This makes it so easy to transition between referencing resources in the XML and the code, because it all uses a similar syntax. Great stuff.

When designing views, you will often want to have image-based backgrounds that intelligently stretch to fit their contents. This is called various things in different platforms and tools (NinePatch, NineScale, 9-Slice, etc.). Google's implementation is very simple and can be done without extra plugins from any image editor (it's just a 1px border around an ordinary `.png` file). Once again, very cleverly designed.

**The Overall Architecture:** Android overall just feels like it was really put together with a lot of thought and care. Everything fits together really well and even people without hardly any desktop or previous mobile application development experience can pick it up relatively quickly. Also, the documentation is pretty extensive (though it would be great to have an even more exhaustive list of code examples of various aspects of the API).

<p style='float:right;'><img src="http://img.skitch.com/20100912-rd3xpgd6ugp51j9jb71tferixy.jpg"/></p>

### Things I Didn't Love Quite So Much

**Compiling:** When you're used to viewing changes to your application just by clicking "Refresh" it can definitely feel like a waste of time to have to compile and run the app. There's absolutely nothing that can really be done about this (it is a native app, after all) and Google has gone out of their way to make the process feel as responsive as possible, but it's still an unwelcome break in the development cycle for someone used to working on web apps.

**Where's My CSS?** I'm guessing that some people will disagree with me here, but wow did I ever miss CSS when building an Android application. CSS makes it **so easy** to rapidly and iteratively style things. Android has a few ways to style things that definitely help over repetitive copy and paste XML attributes, but the expressiveness and power of CSS is sorely missing from building interfaces in Android.

**Exceptions:** When running an application in the emulator or on the phone, I really wanted a clear and easy way to view stack traces. The LogCat view on Eclipse is the way to do this, but I found a few problems with it:

1. The stack traces don't list the exception you're looking for at the top of the trace, but rather about half-way down. Takes a while to wade through and figure out what to look at.
2. When I tried to use the debugger, I never got any useful output or link-to-line type help that I expected from a fully integrated IDE. Maybe I was using it wrong, but it didn't help me out much.

**Java:** OK, OK, could take some flak for this one, but after developing full-time with Ruby for more than three years now, going back to Java feels like an unbearable chore. There's so much boilerplate code and I found myself really missing the simple, expressive, concise idioms of Ruby. Maybe once [Mirah](http://www.mirah.org/) gets a little more mature I can at least ease that part of the Android experience.

**SQLite:** I know that it's the go-to solution for small, simple storage, but *why on earth do mobile platforms have schema-driven data stores by default*? What a ridiculously square peg to pound into the round hole of mobile data persistence. You know what the default data store for mobile ought to look like? [Redis](http://code.google.com/p/redis/). If I had the simple data structure support provided in Redis (key-value, lists, and sets with simple combinatorial commands), I wouldn't need anything more for 99.9% of the applications I can think of. SQL is an awful, terrible fit for mobile and I hope that one day someone realizes it.

I'm glad to see that [CouchDB](http://www.couch.io/android) is trying to disrupt this space a little, and I hope that the disruption continues with more datastores and more choices being available for mobile development.

### Wrapping Up

It was certainly an interesting week and I've been learning a lot. Android development is starting to come more naturally (looking things up on the API docs maybe every 5 minutes instead of every 30 seconds) and I'm actually starting to enjoy myself. It's really satisfying building something that I can immediately run on my Nexus One, and I definitely look forward to working more with the platform in the future.

That being said, I don't think I would choose to develop for mobile applications as my primary focus. While mobile development is certainly rapid compared to old-school desktop development, I still don't think anything can match the ease and speed with which web applications can be developed. Since I'm ultimately more interested in ideas and solving the big-picture puzzles of applications than the low-level implementation details, web is still the place to be for me (for now).

And so we've reached the end of this rather wordy spiel; hopefully if you're a web developer you can read this and get some idea of what it would be like to dive into mobile development, and if you're already a mobile developer maybe you can tell me how I'm all wrong about everything I've just written. And maybe, just maybe, if you work for Google you'll implement Redis as the primary datastore for Android 3.0. Hey, a guy can hope, can't he?