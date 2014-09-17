---
layout: post
title: Misc. Shtuff
cover: cover.jpg
date:   2014-08-21 12:00:00
categories: posts
---

This week I learned how to send emails using actionmailer. In our app, property managers can invite potential renters using emails they gather at showings. They can then send an application to these people asking them to add any roommates and complete the usual process of renting a place. It was interesting because we had to instantiate a new renter, which required giving them a default password, and then when they clicked on the link provided in the email they were prompted to change their password into something of their own creation.


I learned about the ng-change directive, which is a built in angular directive that responds when something is changed within that element. I used this directive to check if the number of roommates was changed, in which case i would update the number of email fields that the user is prompted to enter.
