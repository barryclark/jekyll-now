---
layout: post
title: Designing SupermarKit
---

This is the first of a series of posts on the design of SupermarKit, a Rails web application I started last year. The goal of these posts is to show a very rough design of a user-facing web app from start to finish, for some definition of finish.

This post goes through the app's initial goals and setup. It examines many of the shared steps that are taken when building this sort of an application and starts to look at some of the application's core features.

# The initial idea

SupermarKit is a grocery tracking and management application that tries to improve the grocery shopping process. I have four roommates where I live, and we often can't decide how to co-ordinate shopping for groceries and keeping track of what we like, what we need, and how much things have cost.  

I was also at the time really itching for the opportunity to make a web application from the ground up, as the web projects I had at the time been working on were all using existing code bases.  

# Finding a feature set

After canvasing my roommates for features that they would like, we settled on some core functionality that would make for a good starting point:

1. Groups of users should be able to interact with a common grocery list.
2. Grocery list items should be re-usable, so users don't have to manually re-type each item they want every time they make a list.
3. Grocery items should have prices and quantities so users can keep track of how many items they need and at what cost.

Each of these features had many tasks that could be broken out of them, and it was definitely enough to get going.  

Towards the beginning of the project, I set up a [Waffle account](https://waffle.io) to keep track of the things I had to do. Waffle ties in to the issues on a GitHub repository and makes an interactive board similar to Trello or other project management software.

![Waffle Board]({{ site.baseurl }}/images/supermarkit/waffle.png)

It synchronizes with GitHub, so if you drag a card from the backlog to in progress, the labels on the issue will also be updated on GitHub, and vice-versa.  

Since I was the only one on the project, I used this mostly as a prioritized todo list, and I found it to be a great light-weight solution when something like PivotalTracker or Trello would seem like overkill.

# Getting Started

I chose Ruby on Rails as the framework for the project, as I knew it could handle all of the requirements I had for the app, such as a database of items and lists, a user model, and many different CRUD interactions.  

After typing `Rails new`, I had to setup some of the tools that I would first need before moving on to any of the application's features:

1. **Rspec**: A Behaviour-Driven Development (BDD) framework for writing scenarios to test applications.
2. **FactoryGirl**: A fixtures replacement that allows you to easily define prototypes for models for use in testing scenarios.
3. **Canard**: Role-based authorization in Rails using CanCan and Rolemodel.
4. **Sorcery**: Simple authentication with built-in Oauth support, account activation and password management.

Setting up authentication for identifying users and authorization for determining what each user can do are some of the first things that had to be done. I wanted the application to also be well-tested, so getting the testing framework in place for checking auth-logic was also one of the first things to do.

It was around this time that I also put in some automatic services to track my code quality and testing coverage. These tools should be used as a second-look sanity check, rather than the definitive answer to whether code is up to snuff.  
 They're useful for catching things that might have been overlooked, something that is important on a single person project without any collaboration or peer review.

![Coveralls]({{ site.baseurl }}/images/supermarkit/coveralls.png)

This was my first time using Coveralls, a tool that looks for code coverage holes introduced in branches and commits. It supports a number of languages, including Ruby which was my main focus. It lists code coverage per file, as well as overall coverage and coverage over time.  

I found it helpful in alerting me when branches had declined in coverage and its site makes it very easy to check what it has found to be overlooked.

![Code Climate]({{ site.baseurl }}/images/supermarkit/codeclimate.png)

I put CodeClimate in after Coveralls, and while it also does test coverage, I only used it for code quality on this project. Code climate integrates really well with GitHub and provides code quality analysis on each file in every new commit and branch. It supports all of the languages I would be using on the project, including Ruby and JavaScript.  

CodeClimate summaries the changes that new code has introduced to the project with an overall GPA score. As a new project, my quality began as a `4.0` and it tracks quality overtime. If it finds a section of code that has a high complexity, it will lower its overall GPA. You can go in to their site to evaluate the specific spot that is the source of the problem.  

Both of these tools are free to use for public repositories, and offer more features with paid tiers that teams can explore.

# More Setup

The next set of tools I needed were focused on the front-facing side of the app. I used HAML as my markup language because of its simplicity and readability. I've also used ERB and Slim on projects and tend to use Slim more today. For styling I like to use SASS for a number of its features including mixins, variables and imports.  

I wanted a responsive visual framework to get the app off the ground and went with Foundation over Bootstrap. I mostly chose Foundation because I had done more things with Bootstrap and wanted to see what the differences would be. Both of them have strong followings and are good choices for getting default visual styling.  

These frameworks are great for getting base styles and grids that you can build off of. I also really appreciated many of Foundation's JS components for navigations and modals. For anyone who wants to see what default Foundation looks like, you can look at Foundation's [kitchen sink](http://foundation.zurb.com/docs/components/kitchen_sink.html).

# Time for some features

Now that the base of the application is in place, we're going to go in to some of the features talked about earlier. A couple of them will be described in upcoming posts that will be listed below.  

There will then be a walkthrough on how to get an app like this deployed, followed by a second round of features that were implemented after getting some initial feedback.
