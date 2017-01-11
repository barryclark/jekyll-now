## The "What ?" and the "Why ?"

**Carte** is a simple Jekyll based documentation website for APIs. It is designed as a boilerplate to build your own documentation and is heavily inspired from [Swagger](http://swagger.wordnik.com/) and [I/O docs](http://www.mashery.com/product/io-docs). Fork it, add specifications for your APIs calls and customize the theme. <small>Go ahead, see if we care.</small>

We built **Carte** because the existing options (Swagger and the likes) were trying to do too much and did not match our needs:

1. Most of our API calls are sending JSON objects, as opposed to a series of parameters,
1. Being able to query the real API is nice, but running anything but `GET` calls can get tricky ("What do you mean I deleted my stuff? I was just trying out the API calls!"),
1. Overall, setting up a separate server for what really requires a good static documentation seemed overkill.

The real value of **Carte** is its structure for describing APIs, not its underlying technical stack (or lack-thereof). In a nutshell; **we built a static template for your API documentation, feel free to re-use it**.

## Install

It' Jekyll god dammit:

1. Clone this repository on your local,
1. [Install Jekyll](https://github.com/mojombo/jekyll/wiki/install),
1. Go at the root of the repository and run ```jekyll serve --watch```,
1. Go to http://localhost:4000,
1. [Great success! High five!](http://www.youtube.com/watch?v=wWWyJwHQ-4E)

## How to...

### Adding a new API call

You can add a new API call by simply adding a new post in the `_posts` folder. Jekyll by default forces you to specify a date in the file path: it makes us sad pandas too, but you'll have to stick to this format. You can use dates to control the order in which API calls are displayed in the interface.

Each API call can define a few values in its YAML header:

Variable | Mandatory | Default | Description
--- | --- | --- | ---
``title`` | Y | - | A short description of what that calls does.
``path`` | N | - | The URL for the API call, including potential parameters.
``type`` | N | - | Set it to `PUT`, `GET`, `POST`, `DELETE` or nothing (for parts of your documentation that do not relate to an actual API call).

A typical header:

```
---
path: '/stuff/:id'
title: 'Delete a thing'
type: 'DELETE'

layout: nil
---
```

We then describe the request and response (or whatever else you wish to talk about) in the body of our post. Check the placeholders present in the `_posts` folder to get an idea of what it can look like.

### Grouping calls

Adding a category to your YAML header will allows you to group methods in the navigation. It is particularly helpful as you start having a lot of methods and need to organize them. For example:

```
---
category: Stuff
path: '/stuff/:id'
title: 'Delete a thing'
type: 'DELETE'

layout: nil
---
```

### Edit the design

The default UI is mostly described through the `css/style.css` file and a couple short jQuery scripts in the `/_layouts/default.html` layout. Hack it to oblivion.
