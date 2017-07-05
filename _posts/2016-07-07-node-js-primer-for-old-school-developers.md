---
layout: post
title: A node.js Primer for us Old School Developers
subtitle: Things in node.js that caught me on the wrong foot when I saw them the first time
category: dev
tags: [general, open-source, culture]
author: Martin Danielsson
author_email: martin.danielsson@haufe-lexware.com 
header-img: "images/new/Exportiert_33.jpg"
---

For long years, I developed almost exclusively for the Windows platform. We're talking desktop applications, a mix of C, C++ and later on C#, mixed with COM and .NET interoperability. Throw in MFC and WinForms, and you know approximately what I am talking about. Additionally, I have been fiddling with many other frameworks and languages, but the above were until now my area of expertise. 

Recently, I have been doing a lot of development in node.js, and as the <s>old school developer I am/have been/will always be/never was</s> Solution Architect I am, a couple of things struck some nerves with me, and I would like to share them with you.

### What you require, you always get the same thing back (or: Pointers, pointers, oh, I mean references)

Your upbringing and development experience tend to make you identify things in new programming languages (and I have seen quite a few over the years) with things in languages you know really well, which is why I immediately equaled the node function `require` with the C pragma `#include`. This sort of makes sense, as you use both to include libraries and other files into your current code.

What I had totally missed out on is how `require` actually works under the hood, and how you can use that to do really nasty stuff if you are inclined to. From C, I was used to the fact that `#include` actually always does something; it "copies" in the include file to where you put your `#include` pragma, in the preprocessor. Not so node.js; it works a lot more elaborately. I can't actually tell what it does exactly under the hood, but this is how it behaves: When it first sees a `require` call, it will check in its "required files" map if it has already read that file from disk or not. If it hasn't, it will read and evaluate the code, and otherwise it will just return a reference to the object it has in its "require map".

This is an important thing to remember: You will always get the same object back, disregarding how often you `require` the same file. This also means: If you change anything in the object you get back, all other references to this object will also change. Well, actually and more correctly, as it's the same object, everybody else will also see the changes. This can be intended, but sometimes it makes for a good debugging session when it's not.

If you're into C/C++ pointers or C# references (or Java references), you will feel quite comfortable with this. Just keep in mind that everything which is not an atomic element (numbers and strings, which are immutable, just like in C#) is a reference. Any copying is shallow copying; to do deep copying of objects, you have to jump through a couple of hoops.

Oh, another nifty thing: You can also `require` JSON files. As JSON is JavaScript code (JavaScript Object Notation), it will work just fine to do this:

~~~javascript
var jsonData = require('./data/settings.json');
~~~

### Remember the Win32 message loop?

When starting to work with node.js, I was always confused when seeing all these callback functions and nested looks and things that look recursive at first sight. The following things helped me lose the fear of these calls:

* Node.js is single threaded, and works very much like the old Windows Message loop (for those who were unfortunate enough to have to actually work with that): Asynchronuous calls are put on a message queue, and then they are called one after the other in the order they were put on there
* The following notion helped me "get" it: An async call is very much like `::PostMessage()`, and direct function calls are much like `::SendMessage()`

Node.js relies on everybody "playing by the rules": Anything I/O should be done asynchronuously, and if you have to do long running processing, you should split it up into pieces, so that you don't block everybody else. **Remember**: Node.js is single threaded. In case you have **really time consuming stuff**, you should consider splitting your work onto different servers (UI server and Worker server) to make sure your web UI always responds. This is the same thing as when you did long running tasks in your message handlers in Win32: Everything freezes until you return from your processing.

The fact that a single `node` instance is always running just on a single thread is both the bliss and problem with node.js: Things which work on a single node.js instance are not 100% guaranteed to run nicely when you load balance multiple instances. In case you have state in your application (be it just a session), you will have to make sure you get your persistence layer right. Fortunately, support for various databases (redis, postgres, mysql,... you name it) is very good. Putting your sessions into a `redis` instance is extremely simple for example (especially when deploying with `docker`).

### Don't fear the Async - Embrace it

So, what does it mean that we should "play by the rules"? It means that we should utilize asynchronuous functions where they make sense, and that you better get used to those callback methods rather quickly, or at least understand how they work, and why they are important (see above on the message queue as well).

**Example**: In the beginning you then end up with these kinds of structures in your code whenever you are doing subsequent asynchronuous calls (this is code calling some REST services one after the other):

~~~javascript
var request = require('request'); // https://github.com/request/request

app.get('/users/statistics', function (req, res, next) {
    request.get({
        url: 'https://api.contoso.com/endpoint/v1/users'
    }, function(err, apiRes, apiBody) {
        if (err) {
            // Oooh, an error, what now?
            console.log('Something went wrong.');
            return;
        }
        // Assume body is a JSON array of user ids
        var users = JSON.parse(body);
        var userDataList = [];
        for (var i = 0; i < users.length; i++) {

            request.get({
                url: 'https://api.contoso.com/endpoint/v1/users/' + users[i]
            }, function (err, apiRes, apiBody) {
                // Now, what do I do with the results?
                // When do I get those results?
                userDataList.push(JSON.parse(body));
            });
        }

        // As an "old school" developer, I would like to use
        // userDataList here, but it's still empty!

        // Try to render with jade/pug
        res.render('user_statistics', {
            userList: userDataList
        });
    });
});
~~~

This kind of code is where it gets really interesting and challenging to work asynchronuously: We want to do do a series of REST calls to a backend service, but we don't know how many of them, and we want to gather the results and continue working on them as soon as we have them.

The above code has a lot of problems. To just list a few of them:

* The error handling after the first `request.get()` call is suboptimal; it just outputs something to the console and returns; this will result in a "hanging web page" for the end user, as the `GET` on the URL `/users/statistics` defined never outputs anything to the `res` response variable.
    * This is due to the fact that (here it's express) the request gets routed into this call; `next()` is never called (which would in the end render a `404` if no other routes exists), and `res` is never filled.
    * Keep in mind: As everything is asynchronuous, the framework **can not know**, at the time this function returns, whether it will be returning anything useful, or will have failed! Async calls can have been put on the message queue, but may have not yet rendered any result.
* We're doing async calls in a `for` loop; this is not a real no-go, but it has some problematic properties you have to be aware of:
    * Each `request.get()` call inside the `for` loop is asynchronuous; this means that the request will be issued sometime in the future, and will return sometime in the future; it feels parallel.
    * The callback looks "inline" and nice, but you can't tell when it will be executed, as it depends on when the call to the backend service finishes. By the way: We don't get into trouble because we `push` into the `userDataList` variable - we're single threaded, so no race conditions or threading problems there, that's fine.
    * In the program execution, we want to render the `userDataList` when we have all the data back from the REST service, but right after the `for` loop, `userDataList` will **still be empty**. Everytime. This is because the `userDataList` isn't filled until the callbacks from the requests inside the `for` loop are called, and that will **never** be until the current function has finished (the message loop principle, you recall?).

OK, so, we're doomed, right?

Fortunately not. Many people have encountered these things, and have written super-useful libraries to remedy these kinds of things. Some prefer using "Promises" (see [Promise JS](https://www.promisejs.org) for example), and some things are more easily solved by using a library like `async` ([http://caolan.github.io/async/](http://caolan.github.io/async/)). In this case, I will use `async` to rewrite the above code.

~~~javascript
var request = require('request'); // https://github.com/request/request
var async = require('async'); // http://caolan.github.io/async/

app.get('/users/statistics', function (req, res, next) {
    request.get({
        url: 'https://api.contoso.com/endpoint/v1/users'
    }, function(err, apiRes, apiBody) {
        if (err) {
            // Pass on error to error handler (express defines one by default, see app.js).
            return next(err);
        }
        // Assume body is a JSON array of user ids
        var users = JSON.parse(body);
        async.map(
            users, 
            function (user, callback) {
                request.get({
                    url: 'https://api.contoso.com/endpoint/v1/users/' + user
                }, function (err, apiRes, apiBody) {
                    if (err)
                        return callback(err);
                    callback(null, JSON.parse(apiBody));
                });
            },
            function (err, results) {
                // results is an array of the results of the async calls
                // inside the mapped function
                if (err)
                    return next(err);
                res.render('user_statistics', {
                    userData: results
                });
            }
        );
    });
});
~~~

In the new version of the code, `async.map()` does the heavy lifting: It calls the (anonymous) mapping function (signature `function (user, callback)`) once per user ID, and then automatically assembles all the error messages and results into a single `err` and `results` return parameter. In the background, it will remember all calls it did and wait until all calls have returned correctly. Only after data for all user IDs has been retrieved, you will be presented with the entire result list (or with an error if something went wrong). The `async` library has a lot of different ways of calling async functions reliably and conveniently, e.g. in series (one after the other), in parallel or as a waterfall (passing on results to the next function).

The code is a lot clearer now, and you get back what you need without doing too much syncing overhead; that's abstracted away in the `async` implementation. [Roam the documentation](http://caolan.github.io/async/), it's totally worth it.

### Functional programming, anyone?

What ought to strike you when looking at node.js code are the plethora of anonymous function definitions strewn all over the place. If you're used to C, C++, Java or C#, you may be unaccustomed to those, even if (at least Java and C#) many constructs are in place for those languages nowadays as well, like anonymous delegates or lambda functions.

The difference is that, in node.js, everybody is using anonymous functions all over the place and implicitly expect you to know intuitively how closures work. If, like me, you learnt the hard way that variables have a certain life span and scope, and it's not easy to pass in and out stuff into function definitions, the concept of closures and currying function calls is something one may have a hard time with. If you are not "contaminated" with these other (older) language, chances are you find it super intuitive and don't get why I find it so hard.

So, closures. What does that mean? In short (and in my words, which may be wrong, but the notion works for me), it means that everything you pass into a function definitions will be remembered the way they were (I have a footnote for that) at the time the function was defined. If the variable is in scope, you can use it, even if the actual function you define will be executed asynchronuously, which, as we have learnt, is the default case in node.js.

Looking at the code above, we are implicitly using a ton of closures. The most striking example is perhaps the `res` variable we're using after having gathered all the results. We're inside an anonymous callback function which defines another callback function,... This means, we're by no means in the same execution context ("stack trace") as when the top most function is called when the `res.render()` call is made. Still, it will just work. This is the concept of closures. In C++ (at least pre-2015), you could not create such a construct without resorting to keeping large state structures someplace else and passing them around. But as I said: If you haven't seen it the old school way, you wouldn't even wonder why this is "magic" to some.

The promised **Footnote**: Keep in mind that even the closures are only keeping the references. If you change the *content* of the object you're referring to, it will have changed (whilst the reference has not).

The principle of closures can also be used for "currying" functions: Creating parametrized functions. Even if this perhaps isn't something you will use everyday all day, it's important to have seen the concept. It's quite frequently used in libraries such as passport.js, where not understanding the concepts makes you go slightly nuts with the syntax. It looks like magic or super weird syntax, but actually it isn't.

Let's look at an example of how that might look. Here, we want to run a couple of shell commands (it's a simplified snippet from a node.js component of mine which will run on docker, so this is okay, we control the environment).

~~~javascript
const exec = require('child_process').exec;
var async = require('async');

var backupExec = "tar cfz ...";
var rmExec = "rm -rf ...";
var untarExec = "tar xfz ...";

var execHandler = function (desc, callback) {
    return function (err, stdin, stdout) {
        if (err) {
            console.error(desc + ' failed.');
            console.error(err.stack);
            return callback(err);
        }
        console.log(desc + ' succeeded.');
        callback(null);
    }
}

async.series([
    function (callback) {
        exec(backupExec, options, execHandler('Backup', callback));
    },
    function (callback) {
        exec(rmExec, options, execHandler('Deleting previous configuration', callback));
    },
    function (callback) {
        exec(untarExec, options, execHandler('Unpacking imported configuration', callback));
    }
], function (err) {
    if (err)
        return cleanupAfterFailure(err);

    // We're done.
    // ...
});
~~~

The really interesting bit here is the `execHandler`. It's defining a function which in turn returns a function which has the correct signature which is needed for the callback of the `exec()` calls (`function (err, stdin, stdout)`). The "currying" takes place where we pass in the `desc` and `callback` parameters into the function calls (this is again closures), so we end up with a parameterized function we can pass in to `exec`. This makes the code a lot more readable (if you do it right) and compact, and it can help to pull out recurring code you couldn't pull out otherwise, due to minimal differences (like here the description and callback). Misuse this concept, and everybody will hate your code because they don't understand what it's doing.

On a side note, we're once more using `async` here, this time the `series()` functionality, which calls the async functions one after the other and returns the results after the last one has finished, or stops immediately if one fails.

**Footnote 2**: If you're in nitpicking mode, what I describe above is not the classical "currying" you might know from real functional languages such as Haskell or SML, where currying means automatic partial parameter evaluation. This is something you may also do in JavaScript, but you don't get it as a language construct as in Haskell. Perhaps I should just call it "parameterized function definition" or something similar, as that's more to the point.

### On `callback` and `err` parameters, exceptions

There's a last small thing which I found out about most node.js libraries, and probably I'm just too thick to find this written out someplace, so I do it here: If you're dealing with async functions (and, remember, you are, most of the time), follow these conventions:

* The first parameter of a callback function is `err`. Check for errors the first thing you do and react sensibly, e.g. by passing on the error to an upstream callback or render an error message. If you play by this convention, error handling turns out to be fairly painless. Try to fight the system and you're quickly doomed in error handling hell.
* If you need a callback for an asynchronuous function, this goes into the **last parameter**. This is quite obvious when you think about it; in many cases you will have an anonymous function serving as the callback, and passing parameters after this anonymous definition just looks weird.
* If you make use of exceptions, make sure you catch them inside the same execution context (message loop handler) as it was caught. This means, if you're in an async function (and you will be most of the time), wrap things which might go wrong in a try/catch and pass the exception as an `err` to your callback. Otherwise you may end up with a crashing node.js instance very easily, as soon as you have an uncaught exception bubbling up to the main message loop.  

### Conclusion: It's not (that much) magic in the end

These were a couple of the main "gotchas" I encountered in the last couple of months. I hope you found them interesting and perhaps, if you're <s>an old school</s> a developer with experience in other domains, it could enlighten you a little regarding some peculiarities of node.js. Some things look like magic, but actually aren't. But if you are not aware of the concepts which lie behind, you will try to fight the system, and that is most probably not going to end well.

I might also throw in a couple of experiences and "Aha!" moments I had with [express.js](http://expressjs.com) in a future post. But as this post is already too long, that will have to wait ;-)
