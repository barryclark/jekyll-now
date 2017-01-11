---
category: Stuff
path: '/stuff/:id'
title: 'Update a thing'
type: 'PUT'

layout: nil
---

This method allows the user to retrieve his stuff.

### Request

* **`:id`** is the id the thing to update.
* The headers must include a **valid authentication token**.
* **The body can't be empty** and must include at least the name attribute, a `string` that will be used as the name of the thing.

```Authentication: bearer f862f658-ad89-4fcb-995b-7a4c50554ff6```
```{
    name: 'My new thing'
}```

### Response

Sends back a collection of things.

```Status: 200 OK```
```{
    {
        id: thing_1,
        name: 'My first thing'
    },
    {
        id: thing_2,
        name: 'My second thing'
    }
}```

For errors responses, see the [response status codes documentation](#response-status-codes).