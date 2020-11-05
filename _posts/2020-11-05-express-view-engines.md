---
layout: post
title: Week 9R - Express Views and View Engines
categories: cpnt262
---
## Housekeeping
- [CPNT 262 Assignment 4](https://github.com/sait-wbdv/assessments/tree/master/cpnt262/assignment-4) (so far)
  - Due: Wednesday November 11 @ 11:59pm
  - Worth: 20% of final mark
  - JSON portion to be released tomorrow
- Discussion on assignment schedule

## Homework
1. Review
    - [Parsing endpoint parameters](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/http/4-path-params.js) in [`http` sample code](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/http/)
2. View Engines
    - [Using template engines with Express](https://expressjs.com/en/guide/using-template-engines.html)
    - Watch: Starting @24:30 [ExpressJS Crash Course](https://youtu.be/gnsO8-xJ8rs?t=1468)
    - [EJS](https://ejs.co/)
      - [How To Use EJS to Template Your Node Application](https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application)
      - Search: [node ejs tutorial](https://www.google.com/search?q=node+ejs+tutorial)
      - Reference: [EJS home page](https://ejs.co/)
      - Reference: [EJS tag reference](https://www.npmjs.com/package/ejs#tags)
    - [Pug](https://pugjs.org/api/getting-started.html) by Brad Traversy
      - Search: [node pug tutorial](https://www.google.com/search?q=node+pug+tutorial)
    - [Handlebars](https://handlebarsjs.com/)
      - Search: [node handlebars tutorial](https://www.google.com/search?q=node+handlebars+tutorial)
3. `response.locals`
    - [res.locals](https://expressjs.com/en/api.html#res.locals) from Express documentation

---

## 1. Introduction to Express view engines

**Cheatsheet**: [EJS](https://github.com/sait-wbdv/sample-code/tree/master/backend/express/views)

---

## 2. Group Activity: Template hacking
You will be working in groups of 3-4:
1. As a group: decide on a team/company/product name (when in doubt, try Tony's [random name generator](https://acidtone.github.io/namor/));
2. Find a free, modern static HTML template to form the basis of your website.
3. Each team member will be responsible for creating:
  - one template partial (header, footer, nav, etc);
  - one `page` template representing an HTML file in the site map.
4. Each team should assign the following jobs:
    - Devops: 
        - create a collective Git repo;
        - add teammates as collaborators;
    - Team Lead:
        - Help coordinate tasks and break ties
    - Other jobs assigned as needed. Examples:
        - Copywriting
        - Data entry
        - Research
        - Imagery
        - Heroku setup

### Planning it out

---

## 3. Recap, Walk-through and Optimize
- How far did we get?
- What did we learn?
- Any trophies?

---

## Clean-up Time!