---
layout: post
title: Ember, Ember-Data, RESTSerializer and Rails 2.3
date: '2014-05-30T09:38:00.001-04:00'
author: Daniel Smith
tags:
- ruby
- ember
- restserializer
- rails
modified_time: '2014-05-30T09:59:26.847-04:00'
blogger_id: tag:blogger.com,1999:blog-358950712929443967.post-9159653378892168083
blogger_orig_url: http://www.getabetterpic.com/2014/05/ember-ember-data-restserializer-and.html
---

I recently started trying to port portions of our main application into an Ember application. This has been educational, to say the least. One of the snags I hit early on was how to get data out of our old Rails 2.3 app and into a form that ember-data could read. After much nail-biting, I ran across the <a href="http://emberjs.com/api/data/classes/DS.RESTSerializer.html" target="_blank">DS.RESTSerializer class</a> and it's <a href="http://emberjs.com/api/data/classes/DS.RESTSerializer.html#method_extractArray" target="_blank">extractArray</a> and <a href="http://emberjs.com/api/data/classes/DS.RESTSerializer.html#method_extractSingle" target="_blank">extractSingle</a> functions, and how to extend it in such a way that when data comes in, it is massaged into the format that ember-data is expecting.<br /><br />

The main thing to remember about ember-data is it is expecting a root element (I believe this is easier in Rails 3+ due to the ActiveModelSerializer gem, but due to dependencies, I couldn't utilize this). So while my app was returning data that looked like this:

```json
[
  {
    title: "Something cool",
    body: "lots of stuff to say about something cool"
  }
] 
```
Ember-data wants it in something like this:

```json
{
  posts: [
    {
      title: "Something cool",
      body: " lots of stuff to say about something cool"
    }
  ]
}
```

You might be thinking, "Just use ActiveRecord::Base.include_root_in_json = true!" The problem is when you start nesting stuff inside (using the to_json(:include =&gt; :comments) syntax) it just completely broke ember-data, and I spent way too much time trying to get it to work. So finally I ran across the API documentation and adapted <a href="http://emberjs.com/api/data/classes/DS.RESTSerializer.html#method_extractArray" target="_blank">the example</a> they gave to turn it into something that finally worked. It looks something like this:

```javascript
App.PostSerializer = DS.RESTSerializer.extend({
  extractArray: function(store, type, payload, id, requestType) {
    var posts = payload;
    var comments = [];;

    posts.forEach(function(post) {
      var commentIds = [];
      if (post.comments) {
        post.comments.forEach(function(comment) {
          commentIds.push(comment.id);
          comments.push(comment);
        });
      }
      post.comments = commentIds;
    });

    payload = { posts: posts, comments: comments };

    return this._super(store, type, payload, id, requestType);
  }
});
```

This assumes each post item includes all of it's related comments nested within the JSON. The serializer then walks through all the comments in each post and adds the comment.id to the commentIds array. It then adds the comment itself to the comments array. Finally it sets the post.comments = commentIds. It then sets the payload to have root tags for each section, as ember-data seems to want.<br /><br />I believe there are other ways to do this, but I haven't been able to figure them out. 