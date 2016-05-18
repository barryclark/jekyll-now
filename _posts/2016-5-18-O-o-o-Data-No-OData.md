---
layout: post
title: O, o, o Data ? No, OData!
---

It's hard to believe, but today I woke up. ( Just trust me, I am not lying. )

Have you hear about `asp.net WEBApi` and new `OData` library for it? I hope you know, otherwise, you can find more interesting things to waste time on it. E.g. watch porn. There is bug-bounty program in Pornhub. ( I hear, there is SQL Injection when uploading homemade video. )

Let's go back to the main thread. Blowjo... Ah, shit... WebApi OData is a very powerful library. But it has one main problem when working with multiple entities there are a lot of code duplicates. And because we are "good boys" we don't like duplicates. Where are duplicates?

* For each entity you must define controller
* For each controller you must define all CRUD operations
* Not only define you must implement it

Fuck, I can't concentrate. Let me have a rest 4-5 minutes.

Ok, I am back. There is a great library developed by Microsoft. [RESTier](https://github.com/OData/RESTier). But it is now in the development stage and there are a lot of bugs. ( I hope that 0.5 version will be fixed to work in production. )

Ok, but what for now? I just think there will be some workaround to avoid this duplicates. For it, I wrote Generic Controller with basic CRUD operations to avoid duplicating it in all controllers. 

```c#
 public abstract class BaseODataController<TEntity> : ODataController where TEntity : ModelBase
```

Ok, what is `ModelBase` ? It is a base class to help determine Primary Key of the table in generic class. All your models must inherit from it.


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

For what is `RowVersion` ? It is for entity-framework to avoid concurrency problems. I believe you are smart enough to Google it.

I combined all of these and created sample `WebApi` project to reuse it in multiple projects. Here it is: [WebApi.OData.Sample](https://github.com/arkoc/WebApi.OData.Sample)

What is workflow of developing `WebAPI OData` with this sample ?

* Download Sample Solution and Open It
* Define your models and inherit from `ModelBase`
* Define your controllers {entity_name} + "s" + Controller and inherit them from BaseODataController<TEntity> with specifying entity type
* You can override all CRUD operations in your controller
* Define your `OData` `EntitySet`-s in `WebApiConfig` file.

Now you have fully working `OData v4 WebAPI`. Have fun.

Holy horse, I forget about coding music...
[Coding Music](https://www.youtube.com/watch?v=-m7e7tCn7Bk)

