---
layout: post
title: Week 8R - Built-in http Module
categories: cpnt262
---
## Homework
1. Built-in Modules
    - Read: [Top 5 Most Useful Node.js Built-in Modules](https://www.tutscoder.com/top-5-most-useful-node-js-built-in-modules/)
2. `http` Module
    - Read: [Anatomy of an HTTP Transaction](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
    - Watch: [Build a Basic Web Server with Node JS](https://youtu.be/UMKS6su8HQc)
    - Optional: Starting [@ 55:00](https://youtu.be/fBNz5xF-Kx4?t=3346) of Brad Traversy's Node.js Crash Course
    - Reference: ['http' Documentation](https://nodejs.org/api/http.html)
3. HTTP Protocol
    - Reference: [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) on MDN
4. `url` Module
    - Reference: [npm `url` Documentation](https://www.npmjs.com/package/url)
    - Reference: [Node 'url' Documentation](https://nodejs.org/docs/latest/api/url.html)

---

## Terminology
- See: 
  - [HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
  - [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
  - [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
  - [npm `url` Documentation](https://www.npmjs.com/package/url)

---

## 1. Overview: Built-in Modules and the HTTP request/response cycle

**Sample code**: [View a list of Node's built-in modules](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/builtin.js)

### Key Takeaways
- `http` will be replaced with `express` later in the course but `express` uses Node's built-in modules under the hood.
- The [`path` module](https://nodejs.org/docs/latest/api/path.html) will still be used often after we move to `express` and `mongoose`.

### The request/response cycle according to Tony
1. The client sends a GET request to the server.
2. Using the HTTP protocol, the Internet routes the request to our server.
3. The server takes the request headers and:
    - builds a `request` object that represents the information contained in the headers;
    - builds a `response` object that represents the information that will eventually become the headers and body of our response.
4. The server passes these new objects to our application callback function(s).
5. Our application then:
    - reads any useful information from the `request` object.
    - makes the needed modifications to the `response` object.
6. When the time comes, the server converts the response object into a response string and sends it back to the client.
7. The process ends.


---

## 2. Building a basic web server with Node's `http`

**Sample code**: [Node `http` module](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/http)

### Key Takeaways
- You still have to load built-in modules into your application using `require()`. The path should _not_ include a leading `./`. You can omit the `.js` file extension.
- When running a server from the command line, the window will no longer be functional so will need to open a second terminal to use Git, etc. `Ctrl`+`C` will stop the server.
- **Important**: The node server will need to be stopped and restarted before any of your changes will take effect. We will find a way around this when we cover npm.

---

## 3. Building a JSON endpoint

**Sample code**: [Static JSON Endpoint](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/2-json-endpoint.js)

### Key Takeaways
- The MIME Type should be `application/json` and _not_ `text/json`.
- `JSON.stringify()` converts any Javascript object into JSON. This is needed to send the data over the Internet.

---

## Activities
- [Static endpoints HTML with `url.parse()`](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/http/static-endpoints)

---

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-10-30-builtin-modules-fs.md %})