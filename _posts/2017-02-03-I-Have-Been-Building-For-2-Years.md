---
layout: post
categories: [angular, gulp, web, api, front, end, web, catalogue, e-commerce, demo, system, review, retrospective]
title: So, I've been building something for the past 2 years...
author: emir_osmanoski
comments: true
---

![WebCatalog]({{ site.baseurl }}/images/2017-02-03-So-I-Built-A-Thing/00_header.png)

First of all, first post of 2017! May there be many more! At least one more
than in 2016!

Now let's get to what this post is going to be about.

Somewhere in January 2015, 15th of January to be exact I made the first commit
on what has now become my longest running hobby project. Since then I've
worked on it, on and off, for the past 2 years and it has proven to be one of
the best things I've done from a technical/learning/programming aspect.

The project has been my go-to playground for learning Angular 1.5 as well as
containing the most advanced work I've ever done with Entity Framework as well
as some interesting stuff with Web API and back-end architecture
experimentations.

It's been the project where I tried and implemented a lot of things along the
way, like interesting algorithms for property comparisons, optimizing EF
database calls, and it has even been the main source for content for some of
the posts on this blog.

And now finally, it has reached a point where I feel it can be demo-ed. A
large chunk of the work around the core features is done. For the last couple
of months I've been working on smaller improvements and bug fixes around
different parts of the system.

Don't get me wrong, there are a lot of things which can be done (even things
that some might think are basic requirements for applications like these) and
the current feature list is a far cry from the initial plan, but at the same
time I feel I need to wrap it up. At least this initial part, and give myself
the chance to think about moving onto bigger and better things! More about
this at the end of this, what turned out to be a very long post!

So what I want to do now is, at the same time, try to convey and document the
ideas and features in the system and maybe have the experience of writing the
post act as a sounding board for future ideas as well.

Also the way I plan to write it up, at times it’s going to sound both like a
journal entry and a review/retrospective.

So let's get started!

## Almost Forgot!

Even though I have a bunch of screen-shots throughout the post the demo of the
application can be found here: 

<a href="http://web-shop-demo.azurewebsites.net" target="_blank"><b>Deployed Demo Application</b></a>

*Also remember that you can open the images in a new tab which will show the
full size image. Quite useful for the larger images like the graphs at the
bottom*

To access the administration views and actions you can log in with the good
old U:'admin', P:'adminA' credentials.

Please note that for demo purposes some of the administrator features have
been disabled!

> Can't wait to see what sorts of issues might arise from exposing the
> credentials like this publicly!

# The origins!

It was early January 2015 and I was looking for something challenging to do
while waiting to start a new job position. So, a coworker from my then current
work engagement, Refik Papraniku, and I started throwing around some ideas one
afternoon and basically came up with the core idea of the project.

I remember the initial concept was actually a very complex web catalog/web
shop, multi tenant system with our own administered front end which would
aggregate products from the different tenants.

We wanted to have a generic way of representing  products for each of the
tenants and allow them to define their own categories and product properties
and prices and so on, and then have our own front-end which would aggregate
and show deals from all of them.

We imagined like a virtual mall but with a fancy sleek shop you can visit at
the entrance that shows/sells the best of everything the entire mall has to
offer.

The plan obviously intended to cater to both business and individual users! We
were going to make everyone happy!

And  still I feel the scope was way too broad to have been tackled in any
reasonable manner by two people in a reasonable time. Talking about lessons!

If I remember correctly, the first thing we started with was thinking about
the database and possible solutions and approaches to what we wanted to
accomplish.

Cut to several days later, to keep things brief, following the example of many
other drives and initiative this one withered with time. We both sort of went
our own way and had different things going on and we basically could not fully
commit  to follow it through!

Yet, the idea nibbled at me and having been a bit bored at the time and quite
having a liking to the initial challenge of representing all kinds of
different product types in a generic way, I continued to explore it further. I
started to actually produce code for things like the definition of the
entities, code first migrations, simple data access and basic infrastructure
stuff.

> Learning Point: One of the more biggest lessons here was keeping things
> lean. This was supposed to be a quick startup type of project. And yet I
> believe there was a lot of over-engineering, over-designing and too much
> focus on doing things 100% right instead of doing them quickly and producing
> results as soon as possible. I remember having spent a bunch of time
> thinking about unit tests and different ways to produce tests for different
> aspects of the data access layer. I even wrote a [blog post about it](http://blog.emirosmanoski.mk/Unit-Testing-Database-Context/). It was a
> good thing I realized that wasn’t the correct approach and I quickly changed
> my ways and focused on producing features that can be visible and bring
> value to the entire system. I’m not saying you should never start projects
> with ground up test coverage and spending time thinking through, just that
> this was not quite applicable in my case.

And that was the beginning of January 2015! And then for some reason (judging
by the Bitbucket history) there was absolutely very little to nothing done on
the project until middle of August where worked picked up! And since then I’ve
been quite constantly committing code and adding features.

I had no idea at the time that the project would become so much more and I
would learn a lot more than just the experimentation around the generic
database.

The most important thing,I believe, was learning Angular 1.5 and implementing
some really interesting features/widgets and overall code!

And now, after 2 years of all of that, this little retrospective and reveal
could be considered like a final result! At least for the current phase.

# Why now

The main reason behind doing this now is that I want to do is actually
conclude a milestone so I can sort of clear my head and decide on some future
aspects. I’ve written a bunch about this at the end after reviewing
everything, so this could serve as a pre-explanation of sorts.

# Overview

The plan with the overview is to cover some of the more important milestones
and features.  I will try to write about interesting topics or insights that
arose from the past two years and at the same time try my best to document and
describe what the system actually does.

The approach to the descriptions will probably not be as technical as it would
take too much time and content and even now I feel this is going to be a bit
of a longer post.

The table of contents for the overview can be seen below.

1. Data Model

2. Back End

3. Front End

4. Major Features

5. Moving forward

So without further ado let's start! 

# Data Model

The first thing that was actually discussed on the project was the data model
and with that the database!

I remember having a brainstorming session with Refik about representing
different tenants and the products, driven mainly by the key feature of having
a vast data set of products and building a custom "Best Picks" catalog
represented on the front-page of the site.

This initial discussion inspired the initial design. Since then the model has
not undergone a lot of changes. It still contains artifacts of those initial
ideas, like the Tenants and System/Client columns representing the various
flags used to distinguish variations in the Data rows.

An interesting approach we thought about was, possibly even having the
different web catalogs organized in business domains. We would have had
predefined/administered domains so we could have offered pre-set catalogs
with preset categories and manufacturers applicable for specific domains.

For example we wanted to describe two general business categories/domains: a
"Book Shop" and a "Bike Shop". Having two general business domains, we could
have had pre-set categories/manufacturers and product properties for the 2
domains. For example SciFi, Non-Fiction as categories for the books domain or
Specialized or Trek as Manufacturers for the bikes domain.

We would have also allowed the actual shop owners to afterwards administrate
the pre-set settings or even start from scratch. It was all an idea to help
bring on people in the system without initially exposing them to a lot of
configuration.

> Learning Point: It was very interesting and fun to model the category
> hierarchy, the Tags and the actual relation with a Product, describing the
> various product properties. The design decision can be better glimpsed in
> the Db Diagram bellow. It was also very fun to implement a sort of
> inheritance system for the tags based on the category tree of a product
> which was done in C# code in the back-end.

Similar to the business domains, there are other parts of the database that
were initially designed but never used in the current version of the system. I
never got the chance/time to review it and trim it down.

So to simplify, the key parts of the database that are utilized at the moment
are the following:

#### Products

  The core products tables are used to represent a generic product entity with
  the a collection of basic properties like for example a price. All other
  product descriptions are expressed via the tags. Each product has a single
  manufacturer and a single category can have multiple associated images.

#### Categories

  The categories are organized in a hierarchy, with a single system Product
  category. This actually means that an item in the catalog can be described
  by multiple categories. For example: Product -> Bikes -> Mountain Bikes Each
  category also has a set of tags associated with it which describe a given
  product from that category

#### Manufacturers

  The system has multiple manufacturers. The manufacturers are a flat list and
  each product has a single manufacturer. Pretty simple!

#### Tags

  Tags are attributes that describe a certain category. We have the concept of
  TagTypes and TagValues. TagTypes are associated with a category and
  TagValuesrepresent instantiated tag types for a product and store the value
  of the property for that tag type. When dealing with tags we take into
  consideration the hierarchical structure of the categories for a product. So
  a product can have a tag values for each tag type associated to each
  category in its Category Hierarchy.

#### Images

  Images are quite simply pointers to files on the server. What I tried to do
  is have a single Images table with the URLs and then associate those with
  different entities like Products and Categories.

#### Tenants and Users

  Big part of the tenant and user system is currently not quite utilized in
  the demo. For purposes of login and authorization I currently use ASP.NET
  Token based authentication which came with some preset/predefined tables
  which are automatically created and prefixed with Asp.. For example AspUsers

# Back End

> It's important to mention here that most major features in the back-end
> have been completed a while ago. For the past year or so I've been working
> on small, but interesting and complex stuff, with the overall architecture
> being done a year ago or so.

The back end uses EF 6 for the Data Access layer which is built around the
Unit of Work Pattern. Each major entity in the system has its own repository
which handles all actions associated with the entity.

Each of these repositories inherits from a base generic repository which
handles basic stuff like returning Query able Collections from the DbSets and
fetching entities by an Id and so on.

The idea is that system logic which will be called on each HTTP request  will
make multiple calls via a UnitOfWork object which contains all repositories.
This object is the only point where the EF Save Changes is exposed, a call
which happens when the logic layer has finished processing the request.

The mapping between boundaries happens using AutoMapper. And all the
dependencies are injected using StructureMap.

The initial approach was to have a very generic data access layer, but as time
went on and requirements crystallized about what needed to be done for some of
the requests coming there were some changes to that approach.

I did a bunch of reading around organizing repositories with EF and I realized
that maybe having parts of the repositories be generic and parts be very
entity specific is not a bad thing at all.

> Learning point: It turned out it’s not always the best approach to over-
> engineer from the start. I remember a key  moment, which happened after
> several days or so of trying to get a generic update method working across
> all entities, including product with all the Tag Values and Category and
> Images and so on. At some point I went screw it and implemented a basic
> update method in a couple of hours. I think I found myself building a data
> access framework instead of a web catalog application, which I think was
> one of the more important realizations on the project.

## Solution organization

The solution organization is probably my most favorite part of these hobby
projects because I can  experiment and try different things.

And 2 years ago this is what I came up with:

![Solution]({{ site.baseurl }}/images/2017-02-03-So-I-Built-A-Thing/Solution.png)

#### Core 
Contains contracts (mainly POCOs) and toolbox utilities that are
used between the web API and the Logic layer.

#### Database

* The Domain

  Contains all the domain POCO classes used within EF Migrations (Code First)
  to define the database structure. Besides the directly mapped entities the
  domain contains an abstract Entity class that encapsulates all the common
  entity properties like the Id and Status.

* Configuration

  Contains all the [Entity Type Configuration](http://blog.emirosmanoski.mk/Entity-Type-Configuration-Many-To-Many-Relations/) objects for
  entities in the domain. Entity Type Configurations are used to customize the
  way EF creates the database from the Code First Model. For example you can
  rename/configure how M:N relationships are mapped.

* Bootstrap

  Contains the code that bootstraps the database, meaning EF Code First
  Migrations and the Migration Configuration.

* Data Access

  Contains the Unit Of Work object and all the individual
  repositories as well as the generic repository together with extensions and
  utilities for some common actions over entities.

#### FrontEnd

This project contains the Angular Client application, the Web Api talking to
all the back-end bits and pieces as well as a Console Application that also
talks to the back end, which at one point was used for some more easier
testing of back-end logic before introducing integration tests.

#### IoC

The IoC projects contain configuration and mapping projects that defines the
relationships between services and objects to be used throughout the app. I
like to put the configuration in separate projects so I can re-use it, for
example in Integration test projects.

#### Logic 

The Logic folder contains the business Logic and all the supporting code and is
composed of:

* Ws.Logic.Core 

  Contains Query Objects, Result Objects, validation
  utilities and other utilities used in the Logic Layer code and serve as
  communication bridges between the Web API and the Logic Layer.

* Ws.Logic.Products. 

  Initially the idea was to have different "Logic"
  projects pertaining to different parts of the system covering  features like
  Product Search, Catalog Administration, and Catalog Indexing. But as time
  went on I placed everything in the Logic.Products project. Arguably, some
  things should probably not be there! This was again a case of trying to avoid
  over-engineering.

#### Testing!

These projects both had a good side and a bad side to them and a
little bit of history:

* The Bad Part

  I probably spent a lot of time during the early phases of
  the project unit testing things I should not have been  unit testing for a
  project like this. I realize now, that for a hobby project and taking into
  consideration what I wanted to  achieve, it might have not been quite
  necessary.

*The Good Part

  Having integration tests really helped me with writing and
  testing some of the more trickier aspects of the  data access code with EF.
  Especially because I can say I was still learning EF, and for some of the
  things I needed to experiment  a bit. Integration tests gave me the option to
  do so without having to re-run the UI (Angular Client).

> I did not want to finish an exercise in TDD, but an I wanted to be able
> to produce as much features possible in the shortest time available. And
> with a goal like that I think I can be forgiven for skipping unit testing
> EF contexts!

## Back End: Category Feature

Because of the hierarchical nature of the categories handling the parent child
relationships with EF when creating and updating categories and products was
one of the back end features that stood out!

At the end it came down to some interesting configuration approaches as well
as some custom code to check and setup the change state of entities on each
request.

Like mentioned, one thing that really helped out here were the integration
tests, which allowed me to test the create/update code without having to do
any navigation on the UI.

## Back End: Tag Types, Tag Values and Products

Possibly the most challenging and the most fun part of the back-end code was
the Tags/Products feature.

It combined several key domain entities to achieve a somewhat generic way of
describing different types of products. The idea was to use this feature to
enhance both search and the way the users can compare products.

The code currently deals with building a Product Edit Object that can compose
data from multiple sources. The reason for this is that we need to allow the
UI access to all the Tags a product can have. This includes any tags that
might not be associated to the Category to which the product belongs to
directly.

Therefore the composition of the product edit object includes fetching all tag
types from the category hierarchy.

Same thing applies to the request to save a product (either new or update)
where using a customized repository that checks for Entity changes on the Tag
Values passed in from the client was of great help.

> The product data code is build to be very specific. It currently knows how
> to process and manage collection of tag objects and check for changes. But
> with the C# Generics capabilities in mind it can be very easily extracted
> to a generic extension that can be applied to a multitude of cases.

# Web Client

The actual web client is using Angular 1.5 and is following [John Papa's 1.5 style-guide:](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)

Building it was quite useful for me as it was the playground in which I
thought myself All about Angular. It allowed to write some interesting
components as well as some interesting features and tooling. To name a few:

Implemented a full build stream using Gulp to produce a optimized version
of the application. This was a more recent experiment which produced a [blog
post](http://blog.emirosmanoski.mk/How-I-Stopped-worying-and-learned-to-love-the-Gulp/) and is one of my fondest achievements in the project.

---

The client allowed me to get into Bootstrap 3. There was a lot of
optimizations To make the client look decent on different screen sizes which
of course is made easier by Bootstrap by default. Still I had to experiment
and think about the conceptual layout so it makes sense with Bootstrap's
responsive features. Doing this tended to generate quite a few problems which
were the perfect opportunity to get to know the framework a bit more in
detail.

---

Setting up general Angular infrastructure features like Logging,
Notifications and Authentication was quite useful to get to know the core
Angular approaches to achieving common functionality.

---

The navigation module, was a very fun way to explore ways to navigate from
and to the search screen and and the same time keep the filters saved. It
resulted in a way to reach to the search screen from other views and have the
search filters pre-filtered. For example I can now have a button with a
manufacturer's name and clicking on that could show all products from that
manufacturer.

---

Reusable components like the Hierarchy Tree  which  I'm quite fond of. It
can be used to display different JSON representable entities as it provides a
way to configure how the data is parsed/displayed. Even though it might be
considered as over-engineering thinking about the best way to achieve it gave
me quite an insight into angular directives.

As it can be seen the front-end proved to be quite productive in terms of
content for this blog. You can see the full list of posts here:

1. [How I stopped worrying and learned to love the Gulp!](http://blog.emirosmanoski.mk/How-I-Stopped-worying-and-learned-to-love-the-Gulp/)
2. [Securing UI-Router States with Simple Authentication](http://blog.emirosmanoski.mk/Ui-Router-Athentication/)
3. [Angular Hierarchy Data Directive](http://blog.emirosmanoski.mk/Angular-Tree-Data-Directive/)

---

Looking back I think the most important lesson I learned from this is that you
always need to experiment and try things for yourself to learn something new.
Two years ago I did not have a lot of experience with Angular. Turns out,
project was the right thing that allowed to Freely explore topics and learn
the framework just by the very nature of the problems I created for myself
with all the features I wanted to implement.

On a different note I can say that front end work takes A LOT of TIME! And
because of that there are still a lot of missing features. I focused on what
was interesting to me during all this time which Might have left some things
one might consider very important out. I’m looking at you search results
paging!

And of course there are quite a bunch of places that might require some
optimization as well.

> Learning Point: What I took with me from the front-end work is that if you
> want to learn a new tech or a framework you just have to go into and build
> something. Front-End is a lot of work! And it takes a lot of time, so for a
> project like this, planning how you spend that  time and trying to focus on
> key features is quite important

# Features

Having covered the “technicalities” we can move on to describe the current
feature set of the application. We will cover several major features:

1. Product Search
2. Product Details
3. Product Comparison

4. Administration
   1. Manufacturers
   2. Categories
   3. Tag Types
   4. Products

5. General Navigation Features


## Product Search

Search is the main screen of the application. You can search products by using
the filters on the left hand side which are separated into several sub-
sections.

The most interesting section, the property filters utilizes the tag system
which was discussed in the previous sections. Meaning, for example,  you can
search bikes which have a specific fork or all clothes with size availability
of "M".

> Learning Point: I wanted to make the UI as friendly as possible and allow
> the user to quickly enter, refine and clear search queries. With that in
> mind I introduces a bunch of keyboard shortcuts, like for example hitting
> escape to clear the current filters results.

![ProductSearch]({{ site.baseurl }}/images/2017-02-03-So-I-Built-A-Thing/Product_Search.png)

## Product Details

Clicking on a product from the search screen takes you to the details screen
for that product. Here users can see all the product details, including all
the images the administrators have added for that specific product.

--An interesting feature of both the search and details screens in regards to
--images is that the  images are dynamic in a sense. If a product is missing
--an image, the system tries to show the primary category image. If the
--primary category does not have an image, then a default system product
--catalog image is used.

In the details screen for a specific product, users can also see the category
hierarchy and manufacturer as well as the prices and descriptions.

-- The system has a way to indicate a given product is on sale. Administrators
-- can set two prices, a regular and a current price. If the current price is
-- bellow the regular price the system will treat the item as on sale.

The bottom of the screen also contains the similar products which are
generated on the back-end using a simple algorithm that seeks through the
category hierarchy to find at least 3 similar products.

![ProductDetails]({{ site.baseurl }}/images/2017-02-03-So-I-Built-A-Thing/details.png)

## Product Compare

From the search and details screens the user can mark a product for
comparison.

At that point a right hand side menu will appear to show which products have
been selected for comparison. Users can  remove and add different products but
can currently only compare 2 products at a time.

![ProductCompareWindow]({{ site.baseurl }}/images/2017-02-03-So-I-Built-A-Thing/compare_01.png)

Clicking on Compare takes the user to the Compare screen where the two
selected products are displayed side by side.

Product comparison was one of the bigger inspirations for the tag system. When
thinking about must have features to implement I was looking at already
existing web catalogs, especially for bicycles. I noticed that most of them
had a lacking comparison with the main problem being that the two products
compared Where in most cases described using text only.

So using the tag system and a little bit of code to find the common tags
between two products the compare screen tends to solve that problem:

![ProductCompareView]({{ site.baseurl }}/images/2017-02-03-So-I-Built-A-Thing/compare_02.png)

## Administration

All the administration screens are behind a simple authentication check. The
user must authenticate which means user is the administrator for the current
web catalog.

After logging in, addition navigation options are available both on the search
results and on the main top navigation menu.

### Manufacturer Management

The manufacturer management view is quite simple. The  manufacturers are a
flat list of entities. When the user makes either a create/delete/edit action
it is immediately propagated to the back end.

The main workhorse of this screen is a modal dialog for simple text property
editing which is all the manufacturer entity requires:

![ManufacturerManagement]({{ site.baseurl }}/images/2017-02-03-So-I-Built-A-Thing/admin_manu.png)

### Category Management

Category management is a bit different. A lot of work here actually went into
developing the hierarchy component that is used to display the categories.

Another difference is that the editing process is done using a batch approach.
The user can make a bunch of changes to the hierarchy tree, including
uploading an image for several categories at once, and then persist these
changes to the back end.

I remember that this was actually the management screen that was most
interesting to implement in regards to Angular UI Router. It took some time to
set up the correct state structure to allow for a better experience where you
can copy the URL of the current edited category and open it in a different
browser/tab and be able to edit the same category there as well.

This was the cause of a massive re-write of the routing and authentication
part of the code which at the end was absolutely worth it:

![CategoryManagement]({{ site.baseurl }}/images/2017-02-03-So-I-Built-A-Thing/admin_cat.png)

### Tag Type Management

As tag types are associated with categories this feature re-uses the Category
Hierarchy Component. You select a category in the tree and then are able to
add Tag Types for that category.

Doing this you can build descriptors (tags) of a product category that consist
of common higher level descriptors(tags) as well as specific descriptors(tags)
attached to the current specific category.

> Learning Point: While writing this post I noticed that even though the
> approach is somewhat similar the Tag Type management does not utilize the
> abstract state approach like Category Management. You cannot select a
> category and  edit it’s tag types and have that be an individual state you
> can access through in a different tab/browser via the URL. Goes to show
> that there are quite specific little missed parts in the front-end

![TagTypeManagement]({{ site.baseurl }}/images/2017-02-03-So-I-Built-A-Thing/admin_tags.png)

### Product Management

Product Management sort of brings together the rest of the administration
Features under one roof. The idea is that administrators will create
manufacturers, categories and Tag Types and then product management will
allows the creation and editing of products with Those specific manufacturer,
categories and tag types.

The product editing features consist of a screen where the administrator is
presented with a grid of products in the system. The grid can be used to
select products for editing as well as being one of the main tools for
deactivating and activating the products:

![ProductAdminList]({{ site.baseurl }}/images/2017-02-03-So-I-Built-A-Thing/admin_prod_grid.png)

--- Learning Point: The Product Management Grid Screen is one of the more
--- unfinished views in the application in my opinion. I am still struggling
--- with coming up with a way to present the administrator a quick and easy
--- way to find/create/edit products in a single screen. The administrator can
--- choose to edit a product found via the search screen as an alternative to
--- the grid, but that approach is missing a tie in for product creation
--- currently. Other ideas that come to mind are Improving the grid and taking
--- an approach similar to categories by having a sidebar, but that is
--- something that will take a substantial amount of time to implement. So
--- maybe in a future iteration.

After adding or selecting a product the administrator can navigate to the edit
screen. Here all possible properties of a product can be edited. This includes
all basic properties like naming, pricing and descriptions as well as changing
The category and manufacturer.

Additionally the administrator can set all the tag values for the product
defined by its category hierarchy.

Administrators can also add product images and set a primary image which is
displayed when the product is returned in the general search results.

![ProductAdminDetails]({{ site.baseurl }}/images/2017-02-03-So-I-Built-A-Thing/admin_prod_det.png)

One interesting feature here which deepened my knowledge of angular
services/factories/controllers is the undo changes feature. Administrators can
make all the changes they want for a product and decide at the end if they
want to persist these changes or not.

This is achieved by implementing a service called EntityEditService (and a
bunch of supporting utilities) which is used to track the current entity the
user is editing.

Of course one drawback is that currently you cannot edit multiple entities at
the same time, given the singleton nature of services. Currently there is also
no need to do that in the application, but  if such need arises, the
EntityEditService can be extended.

## General Navigation

One thing that I really wanted to achieve is make the user experience for
administrators as well as regular users a bit better. I spent a lot of time in
making small improvements and quality of life changes.

This was also one of the biggest lessons from the project. I tried to put
myself in the shoes of actual users which drove a lot of work on the UI and
navigation.

Initially each time a user navigation from a search results screen after
filtering they would have lost the filters they have set. Fixing that also
produced some interesting positive side-effects mentioned before.

In turn this caused a bunch of rewrites to parts of the UI to allow for more
generic and reusable components. All in all, focusing on the UI and improving
the user experience also resulted in improved UI code just because of the
focus on DRY and reusable components.

# Summary

I think that should cover all of the features on a somewhat basic level. There
is a bunch more that can be said for each of the features and components but
as mentioned at the beginning this is not the purpose of the post.

I started with the goal of giving an initial/first account of what I have been
doing for the past 2 years regarding one of my hobby projects and I sort of
feel this does the project justice. Again I say sort of, as there is part of
me that is quietly whispering that I should go into more detail or write more
about this or that feature.

But at this point I have to learn to listen to a more rational voice and just
settle for the best possible outcome. Which I believe its this post with this
exact content!

## The Future

I've been thinking a lot about what could be done next with the project. After
much thought I concluded that after this initial "demo" I think I'm going to
take a little break and see what happens and focus on some new ideas. Maybe
even finally find the time and motivation to move on and build something with
Angular 2 or heck, maybe even React!

Maybe after that I might think about enhancements and moving forward.The
project and the idea in general has a lot of challenging tidbits remaining.
For example I'd love to start working on the multi tenancy and the aggregation
aspects. But I also feel that there is quite some work to be done on the
current iteration, mostly stabilization and improving usability and
performance.

> One of the most interesting things I think can be done in the future is
> link the product descriptors/tag values to actual other products in the
> catalog. For example a Mountain Bike might can have a Front Fork Tag Type.
> It would be really cool if the system allowed you to enter links to other
> products, example from the category Front Forks, as the value to that
> specific tag.

I still think it's a fair ways out of a stable core feature application. But
moving Onwards, I would love to see a rewrite in to Angular2/React and have a
better foundation to maybe achieve a full core feature application status!

There are also a lot of possibilities and sources for different blog posts.
Even as I was working on different features and aspects for the past couple of
months, ideas kept popping up about things that could be perfect for a  Post
or two. So if there is nothing more interesting going on at any given moment I
might write up some more articles sourced from the current iteration.

An alternative, depending on how the other ideas I want to try go I might just
spend some time to fix up and document the code and just release it all as
open source on Github!

# Special: Statistics! 

Some graphs that might tell an interesting story! Generated using the Graphs
Plugin in Bitbucket!

First a look at the frequency of commits:

![CommitFrequency]({{ site.baseurl }}/images/2017-02-03-So-I-Built-A-Thing/Contributions.png)

And then a quick glance at a punch card which shows which days I've been most active:

![Punch]({{ site.baseurl }}/images/2017-02-03-So-I-Built-A-Thing/punch.png)

-- As it's not quite visible from the Graphs, I will just mention that I've
-- made a total of 237 commits!
