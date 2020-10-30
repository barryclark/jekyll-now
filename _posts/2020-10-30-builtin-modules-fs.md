---
layout: post
title: Week 8F - Built-in fs and endpoint parameters
categories: cpnt262
---

## Housekeeping
- [Sample Code Fixes](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/http/3-request-url.js)

## Homework
1. Review
  - Read: [How to use Fetch API for CRUD operations](https://dev.to/duhbhavesh/how-to-use-fetch-api-for-crud-operations-57a0) on dev.to
  - Reference: [Create, read, update and delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) on Wikipedia
2. `fs` Module
    - Watch: [How To Read a File With Node.js](https://youtu.be/uvRwF1JFqt0) by Junior Developer Central
    - Watch: [Returning Files from Node JS Web Servers](https://youtu.be/3a9S3wubxLw) by Steve Griffith
    - Read: [Writing files in Node.js](https://stackoverflow.com/questions/2496710/writing-files-in-node-js) on Stack Overflow
    - Reference: [Node `fs` Documentation](https://nodejs.org/api/fs.html)
3. `path` Module
    - Reference: [Node `path` Documentation](https://nodejs.org/docs/latest/api/path.html)
4. RESTful APIs
    - Read: [What Is a REST API?](https://www.sitepoint.com/developers-rest-api/) on SitePoint

---

## Terminology
<dl>
  <dt>Error-first Callback</dt>
  <dd>A callback function that accepts an error object as its first argument.</dd>
</dl>

---

## 1. Reading files asynchonously using the `fs` module

**Sample code**: [Reading Files](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/fs)

### Key Takeaways
- Use of `fs.readFileSync()` is discouraged. Nothing else can happen on the server until the file is read from the file system.
- `fs.readFile()` accepts and error-first callback. If nothing bad happened, `error` will be `null`. Otherwise, `error` is an object(?) that contains details of what went wrong.

---

## 2. Creating dynamic JSON endpoints

**Sample code**: [Parsing endpoint parameters](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/http/4-path-params.js) in [`http` sample code](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/http/)

---

## 3. Lab-time

---

## Activities
- [Send a file as a `http` response](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/fs/json-response)
- [Dynamic Endpoints](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/http/dynamic-endpoints)

---

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-11-02-npm-package-json.md %})