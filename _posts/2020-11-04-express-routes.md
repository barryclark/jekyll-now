---
layout: post
title: Week 9W - MVC Controller and Routes
categories: cpnt262
---

## Homework
1. Review:
    - Reference: [Create, read, update and delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) on Wikipedia
    - [What Is a REST API?](https://www.sitepoint.com/developers-rest-api/) on SitePoint
    - Reference: [Create, read, update and delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) on Wikipedia
2. Model-View-Controller
    - [MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC) definition on MDN
    - [Model-view-controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) on Wikipedia
3. Express Routes
    - Watch: The first 20 minutes of [How to build a REST API with Node js & Express](https://youtu.be/pKd0Rpw7O48) by Mosh Hamedani (we'll eventually cover most of this video)
    - Read: [Express Routes](https://expressjs.com/en/guide/routing.html) in the ExpressJS Documentation
4. Postman
    - Watch: [The Basics of Using Postman for API Testing](https://youtu.be/t5n07Ybz7yI)

---

## Terminology
<dl>
  <dt>HTTP Request Method</dt>
  <dd>The desired action to be performed for a given resource. These are defined in the HTTP specification. The most common methods we will cover are <code>GET</code>, <code>POST</code>, <code>PUT</code> and <code>DELETE</code></dd>
  <dt>HTTP Uniform Resource Identifier (URI)</dt>
  <dd>A URI is a string that refers to a resource. We know these best as URLs. <a href="https://danielmiessler.com/study/difference-between-uri-url/">All URLs are URIs</a>, but not all URIs are URLs.</dd>
  <dt>Route</dt>
  <dd>An HTTP method combined with a URL. For example: <code>GET https://example.com/api/animals</code></dd>
</dl>

---

## 1. Model-View-Controller (MVC)
See [MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC) in the MDN glossary

MVC (Model-View-Controller) is a pattern in software design commonly used to implement user interfaces, data, and controlling logic. It emphasizes a separation between the software’s business logic and display. This "separation of concerns" provides for a better division of labor and improved maintenance. Some other design patterns are based on MVC, such as MVVM (Model-View-Viewmodel), MVP (Model-View-Presenter), and MVW (Model-View-Whatever).

The three parts of the MVC software-design pattern can be described as follows:

- Model: Manages data and business logic.
- View: Handles layout and display.
- Controller: Routes commands to the model and view parts.

---

## 2. Overview: Routes

**Cheatsheet**: [Express Routes](https://github.com/sait-wbdv/sample-code/tree/master/backend/express/routes)

---

## 3. Handling POST requests in Express

**Cheatsheet**: [`express.urlencoded` Middleware](https://github.com/sait-wbdv/sample-code/tree/master/backend/express/routes/post-requests)

---

## Activities
- [Postman Practice](https://github.com/sait-wbdv/sample-code/tree/master/backend/express/routes#activity)
- [Register form POST request ](https://github.com/sait-wbdv/sample-code/tree/master/backend/express/routes/post-requests#activity)

---

## Clean-up Time!
- Don't forget to submit your code to the appropriate Daily Code dropbox on Brightspace.
- [Tomorrow]({% link _posts/2020-11-05-express-view-engines.md %})