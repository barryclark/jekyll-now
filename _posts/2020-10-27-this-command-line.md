---
layout: post
title: Week 8T - this and the Command Line
categories: cpnt262
---
## Homework
1. Review
    - W7M: [Functions]({% link _posts/2020-10-19-functions-scope.md %})
    - MDN: 
        - [Introducing objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects)
        - [Object basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics)
2. Server-side Programming
    - Read: [Server-side website programming first steps](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps) on MDN
    - Read: [What is a web server?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server)
    - Skim: [What software do I need to build a website?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_software_do_I_need)
    - [How do you upload your files to a web server?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Upload_files_to_a_web_server)
3. Node.js
    - Read: [Express/Node introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
    - Read: [Setting up a Node development environment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment)
    - Watch: [Node.js Tutorial for Beginners](https://youtu.be/TlB_eWDSMt4)
4. Node from the Command Line
    - [How to parse command line arguments](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)
5. Very Important: Harry Potter
    - [Forbidden Forest](https://harrypotter.fandom.com/wiki/Forbidden_Forest)
    - [Dobby](https://www.google.com/search?q=dobby)
    - [Hagrid](https://www.google.com/search?q=hagrid)

---

## Terminology
<dl>
  <dt><code>this</code></dt>
  <dd>The <code>this</code> keyword is created (by the Javascript engine) during the Creation Phase of every Execution Context. In other words, <code>this</code> is created for the Global Execution Context of your script plus all functions that are invoked within your code. The value of <code>this</code> changes depending on how a function is invoked.</dd>
  <dt>Global Object</dt>
  <dd>An object that always exists in the global scope. The global object's interface depends on the execution context in which the script is running.</dd>
</dl>

---

## 1. The Global Object and the `this` keyword

See: [@26:05](https://youtu.be/MiUdnv_T98A?t=1565) of Javascript the Weird Parts by Tony Alicea

---

## 2. WTF is `this`?!?

**Sample Code**: [The `this` keyword](https://github.com/sait-wbdv/sample-code/tree/master/js-base/this)

---

## 3. Greetings from the Command Line

**Sample Code**: [process.argv](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/argv)

---

## Clean-up Time!
