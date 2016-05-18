---
layout: post
title: Oh, oh, oh Data ? No, OData!
---

It's hard to believe, but today I woke up. Just trust me, I am not lying, I really woke up. I mean the filling when you fell that you had a great sleep, and not just opened your eyes and went to work. 

Anyway..... 

#### Have you heard about `asp.net WEBApi` and new `OData` library for it? 

I hope you know, otherwise, you I am sure you can find more interesting things to waste your precious time on it. Like watching porn. By the way there is a bug-bounty program at Pornhub. And I can swear that I think there is a SQL Injection when uploading your homemade videos :) 

Let's go back to the main thread. Blowjo... Ah, shit... sorry I meant ASP.NET's WebApi OData seems to be a very powerful library, it works great. But when you start to model something then a fancy simple sample to encounter the need to make a lot of code duplication to support multiple entities. And because we are "good boys" and "clean" programmers we don't like duplicated codes sections ghosting around in our codes. Let's us define what we mean when we say a duplicate?

#### But it has one main problem when working with multiple entities there are a lot of code duplicates. 

And because we are "good boys" we don't like duplicates. Where are duplicates?

* For each entity you must define controller
* For each controller you must define all CRUD operations
* Not only define you must implement it

#### F***, it is getting really hard to concentrate. Let me have a rest for 4-5 minutes.
5.......
4.......
3.......
2.......
1.......
0.......

Ok, I am back. Microsoft wouldn't be Microsoft if they haven't made a library for such cases. The library is called [RESTier](https://github.com/OData/RESTier). But as everything Microsoft it is now in the development stage and it's quite buggy. I hope that the version 0.5 will be more or less stable for production use.

But there is a big problem with this frameworks. This mega-boom tools that do all work instead of you are harassing our brain. Of course, there are many powerful tools that make our life easy, but some tools harm us. 

#### `OData` isn't very complex to use a 3-rd party tool. 

When we decide to use the 3-rd part tool we are binding us to it, if there is a bug, you should wait for a fix, or you can fix it and wait for merge. And remember that they release date isn't tomorrow or not even in this week.

#### These complex tools have boundaries and when we decide to do something that isn't in that boundaries, we suck. 

Think twice when choosing a framework. After that think again and only then write that fucking `Install-Package`. 

Do you remember the story with left-pad...a library of 10 rows, stop here please, 10 rows KARL, a library of 10 rows. Ah, what I was going to say. It broke a big amount of solutions in `node.js`.  ( It was removed from node.js packages and all dependencies to it failed. )

Don't miss understand me, I am not forcing you to not use frameworks. Frameworks are great. Just use them if you really need them. 

#### Ok, but what for now? I think there must a way or a some workaround to avoid these duplicates. To solve this problem I have wrote a mega generic controller with implemented basic CRUD operations in-order to avoid duplicating it in all controllers.

```c#
 public abstract class BaseODataController<TEntity> : ODataController where TEntity : ModelBase
```

Ok, what is `ModelBase` ? It is a base class to help determine Primary Key of the table in generic class. All your models must be inherited from it.


```c#
public abstract class ModelBase
{
        [Key]
        [Required]
        public int Id { get; set; }
        public DateTimeOffset? Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTimeOffset? Modified { get; set; }
        public string ModifiedBy { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
}
```

For what is `RowVersion` ? This field is used by EntityFramework to avoid concurrency problems. I believe you are smart enough to Google it.

#### I have combined all of these and created sample `WebApi` project to reuse it as a base for future projects. Here it is: [WebApi.OData.Sample](https://github.com/arkoc/WebApi.OData.Sample)

What is workflow of developing `WebAPI OData` with this sample ?

* Download Sample Solution and Open It
* Define your models and inherit from `ModelBase`
* Define your controllers {entity_name} + "s" + Controller and inherit them from BaseODataController<TEntity> with specifying entity type
* You can override all CRUD operations in your controller
* Define your `OData` `EntitySet`-s in `WebApiConfig` file.

Now you have fully working `OData v4 WebAPI`. Have fun.

If you missed, here is repository: [WebApi.OData.Sample](https://github.com/arkoc/WebApi.OData.Sample)

Holy horse, I have totally forgotten about the coding music...

[Coding Music](https://www.youtube.com/watch?v=-m7e7tCn7Bk)
