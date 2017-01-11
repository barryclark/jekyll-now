---
category: Stuff
path: '/stuff'
title: 'Post a thing'
type: 'POST'

layout: nil
---

This method allows users to create a new thing.

### Request

* The headers must include a **valid authentication token**.
* **The body can't be empty** and must include at least the name attribute, a `string` that will be used as the name of the thing.

```Authentication: bearer TOKEN```
```{
    name: 'My new thing'
}```

### Response

**If succeeds**, returns the created thing.

```Status: 201 Created```
```{
    id: new_thing,
    name: 'My new thing'
}```

For errors responses, see the [response status codes documentation](#response-status-codes).
