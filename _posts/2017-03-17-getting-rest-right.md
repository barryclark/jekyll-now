---
layout: post
title: Getting REST right
author: jake_hall
---

It seems everyone is building a REST API these days - this is great! There are some great public examples of how to do it right ([Stripe.com](http://www.stripe.com) - I'm looking at you!). Don't get me wrong, it's not easy, but there are a few key things you can do to make it easy for your consumers of the API.

## URLs represent a resource

Try to think carefully about your URL structure before you dive in, this will save a poor REST API later on.

Decide what resources you are dealing with. For these examples I'll be looking at articles, attachments and users. In my setup, articles can have attachments, but users can't, so for me it makes sense to have something similar to the following:

- `GET /article` _List articles_
- `GET /article/<id>` _Get a specific article_
- `GET /article/<id>/attachment` _List attachments on a specific article_
- `GET /article/<id>/attachment/<attId>` _Download a specific attachment_
- `GET /user` _List users_
- `GET /user/<id>` _Get a specific user_

You may have noticed from the above URL schema that I have gone for singular URL nouns across the board. There is still some debate about whether singular or plural nouns are preferable, with plural seeming to win out but with most admitting it's down to individual preference.

Most agree that you should stick to one or the other across the whole of your API, to keep the amount of learning to a minimum.

Verbs should not show up in your API URLs - if possible. _"But what about `/search`?"_ I hear you cry.

Well if search is specific to an account then maybe having something like `/article?q=search+term` may be more appropriate to limit the results of the article list. This article, is more of what you would call, guidelines than actual rules.

## Versioning

Think about versioning your API from the public first release. Unless your API is internal only and only being consumed by your own team can you probably get away with no versioning. There are a couple of different ways you can go about this.

1. In URL versioning (http://api.example.com/v1/article/43)
   - Probably the most popular, but unfortunately semi-breaks the "URL should represent a resource" principal
2. Custom header (X-API-Version: v1)
   - Developers have to learn a new header just to use your API.
3. Accept header (Accept: application/vnd.article-v1+json)
   - Developers can't explore your API just using a browser.

There's no easy answer, but I usually go for the compromise of in URL versioning for easy exploration of the API in combination with...

## HATEOAS

Standing for the easy to remember "Hypermedia As The Engine Of Application State", it's a fancy way of saying - return URLs to further resources in your API.

If you have a request to /v1/article, it should return something similar to the following:

```JSON
GET /v1/article HTTP/1.1
Host: api.example.com
Accept: application/json

[
  {
    'id': 42,
    'name': 'HG2G - Don\'t Panic',
    'url': '/v1/article/42'
  },
  {
    'id': 256,
    'name': 'Two to the Eight',
    'url': '/v1/article/256'
  }
]
```

The url property of the article object allows the consumer to know how view the detail of the article object without having to look at your documentation (you did ~~write~~ generate documentation right?). If you're using Postman, you can just click on the link and it will take you straight to the next resource!

## SSL Everywhere

With the invent of Let's Encrypt, there is no longer any excuse not to secure your API endpoint.

## Errors and HTTP status codes

There are more [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) than you can shake a stick at. Also all good libraries should be able to read these, so you may as well utilise them.

* 2xx series - success
* 3xx series - redirection
* 4xx series - client errors
* 5xx series - server errors

Using these errors, especially for success can avoid you having to use an envelope in your response. If you're returning a list of articles and everything was fine, you can just 200 OK, and return the list. There's no need for:

```JSON
{
  "status": 200,
  "status_msg": "OK",
  "articles": [
    {
      'id': 42,
      'name': 'HG2G - Don\'t Panic',
      'url': '/v1/article/42'
    }
    ...
  ]
}
```

## Caching

I'm talking about both types of caching, server side and client side. 

The server should tell the client if they need to get new data. You can use `Last-Modified` or `Etags` headers for this.

Also the server should keep a cache on the data from the datastore, especially if it's immutable or you when the data expires. This will keep response times snappy and consumers happy!

## Other stuff

These are things I haven't touched on in this article as it's getting pretty long already, but you should consider:

* Authentication/authorization (statelessly)
* Rate limiting
* Using PUT/POST/PATCH/DELETE for create/update/partial update/delete
* Pagination (and the different ways)
* Compression (gzip & pretty printing)