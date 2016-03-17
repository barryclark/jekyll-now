---
layout: post
title: Extending On-Premise Products With Mobile Apps - Follow-up
subtitle: Creating a Single Page App using Apache Cordova and AngularJS
category: general
tags: [mobile, cloud]
author: Biro Carol
author_email: carol.biro@haufe-lexware.com
header-img: "images/bg-post.jpg"
---

### What is this about?

This is a follow-up blog-post about a proof-of-concept project I have worked on together with my colleague Robert Fitch to find out what it takes to access on-premise data from an internet client. Robert have created the server side API and my role was to create a mobile app which consumes the methods exposed by this API. The technologies used in order to create the app were HTML5, AngularJS, Bootstrap css and Apache Cordova.

### Why Apache Cordova?

Apache Cordova targets multiple platforms with one code base, it is open source and for the apps you can use html, css and javascript. There are many pros and cons using this stack of technology but in this case we needed to address the app to a wide range of users with as little effort as possible. That is why we didn't use a pure native approach and for the proof of concept app we have targeted Android and iOS devices as potential consumers.

### What else do we need?
Apache Cordova is offering a good way to organize your project. It assured OS specific customizations and the OS specific mobile app builds. These being set up once are for good or very little modified during the lifetime of the project. For the effective development we have used AngularJS and Bootstrap.css.

Maybe it is interesting to know that when I have started to work on this project I had no experience with the above mentioned technologies: neither Apache Cordova , nor AngularJS or Bootstrap.css. I am a pretty experienced web developer who have worked before mainly on jquery based projects. Starting to learn about AngularJS I have discovered a new way of thinking about web development, that is how to develop a web application avoiding to use jquery , use two way bindings etc.

Beside frontend development I mainly do my daily job using Microsoft technologies like C#. I do this using Visual Studio as IDE. That is why a good choice to set up this project was to use Visual Studio Tools for Apache Cordova. By the time I have started to work on the project the Update 2 of these tools were available, now after a couple of months Update 7 can be downloaded with a lot of improvements.

{:.center}
![Reisekosten App Frontend - Visual Studio Tools for Apache Cordova]( /images/reisekosten-app/visualstudioupdate7.jpg){:style="margin:auto"}

This being installed you have what you need to start the work. It installs Android SDK and a lot of other dependent stuff you might need when you start working. I will not detail  this since this has been done before by others. If you want to read about you have a lot of resources available like :
http://taco.visualstudio.com/en-us/docs/get-started-first-mobile-app/

### Front-End requirements
In a few words we needed:
- a login page
- a list of trips
- the possibility to create/edit a trip
- add/edit receipts assigned to a trip
- the receipts form needed visibility rules of some fields(depending on a category)

### The project

Knowing the above here is a screenshot of how I ended up structuring the project:  
{:.center}
![Reisekosten App Frontend - Visual Studio Tools for Apache Cordova]( /images/reisekosten-app/projectstructure.jpg){:style="margin:auto"}

In the upper part of the solution we can see some folders where OS specific things are kept. For instance merges folder has android and ios subfolders each of them containing a css folder where resides a file called overrides.css. Of course these files have different content depending on the OS. What is cool with this is that at build time this Visual Studio project knows where to place automatically these files so that specific overrides actually happen in the apps.

The plugins folder is cool too , here will reside the plugins which helps to extend the web application with native app abilities. For instance we can install here a plugin which will be able to access the device camera.

The res folder contains OS specific icons (e.g. rounded icons for IOS and square icons for Android) and  screens. Finally in the upper part of the soulution there is a test folder where the unit and integration tests will reside.

The next folder www contains the project itself, the common code base. We see here a bunch of files which for me seems nicely and clearly organized, maybe not for you yet, but hopefully things become more clear with the next screenshot of the index.html where the whole app is running:  

```HTML5
<!doctype html>
<html ng-app="travelExpensesApp" ng-csp>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="email=no">
    <meta name="format-detection" content="telephone=no">
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/bootstrap-additions.css" rel="stylesheet" />
    <link href="css/index.css" rel="stylesheet"/>

    <!-- Cordova reference, this is added to the app when it's built. -->
    <link href="css/overrides.css" rel="stylesheet"/>

    <!-- Angular JS -->
    <script src="scripts/frameworks/angular.js"></script>
    <script src="scripts/frameworks/angular-resource.js"></script>
    <script src="scripts/frameworks/angular-route.js"></script>
    <script src="scripts/frameworks/angular-strap.js"></script>
    <script src="scripts/frameworks/angular-strap.tpl.js"></script>
    <script src="scripts/frameworks/angular-input-masks-standalone.min.js"></script>

    <!-- Cordova reference, this is added to the app when it's built. -->
    <script src="cordova.js"></script>
    <script src="scripts/platformOverrides.js"></script>

    <!-- Initialize all the modules -->
    <script src="scripts/index.js"></script>

    <!-- Services -->
    <script src="scripts/services/cordova.js"></script>
    <script src="scripts/services/global.js"></script>
    <script src="scripts/services/httpInterceptor.js"></script>

    <!-- Controllers -->
    <script src="scripts/controllers/loginController.js"></script>
    <script src="scripts/controllers/tripsController.js"></script>
    <script src="scripts/controllers/tripDetailsController.js"></script>
    <script src="scripts/controllers/receiptsController.js"></script>
    <script src="scripts/controllers/receiptDetailsController.js"></script>
</head>
<body >
    <div ng-view></div>
</body>
</html>
```

Being a SPA everything runs in one place. All the necessary files are included in the header : first the app specific css files, then the css override file which is replaced with OS specific one at build time. Next are included the AngularJS and AnfularJS specific libraries and then comes the platform specific javascript overrides. Until now we have included only libraries and overrides, what comes from now is the base of the app the index.js.

A code snippet from here helps to understand the AngularJS application:
```javascript
(function () {
    "use strict";

    var travelExpensesApp = angular.module("travelExpensesApp", ["ngRoute", "mgcrea.ngStrap", "ui.utils.masks", "travelExpensesControllers", "travelExpensesApp.services"]);
    angular.module("travelExpensesControllers", []);
    angular.module("travelExpensesApp.services", ["ngResource"]);

    travelExpensesApp.config([
        "$routeProvider",
        function($routeProvider) {
            $routeProvider.
                when("/", {
                    templateUrl: "partials/login.html",
                    controller: "LoginControl"
                }).
                when("/companies/:companyId/employees/:employeeId/trips", {
                    templateUrl: "partials/trips.html",
                    controller: "TripsControl"
                }).
                when("/companies/:companyId/employees/:employeeId/trips/:tripId", {
                    templateUrl: "partials/tripDetails.html",
                    controller: "TripDetailsControl"
                }).
                when("/companies/:companyId/employees/:employeeId/trips/:tripId/receipts/:receiptId", {
                    templateUrl: "partials/receiptDetails.html",
                    controller: "ReceiptDetailsControl"
                }).
                otherwise({
                    redirectTo: "/"
                });
        }
    ]);
```


The AngularJS application is organized using modules. We can think of modules as containers for controllers , services, directives, etc. These modules are reusable and testable. What we can see above is that I have declared an application level module (travelExpensesApp) which depends on other modules .

I have created a separate module for controllers(travelExpensesControllers) and one for services(travelExpensesApp.services). I have also used some libraries as modules like : ngRoute (from angular-route.js), mgCrea.ngStrap (from angular-strap.js) and ui.utils.masks (from angular-input-masks-standalone.min.js). The module declarations links everything together and creates the base of the app.

Beside modules the above screenshot contains the configuration of routing. Using ngRoute lets us use routing which helps us a lot to define a nice and clear structure for the frontend app. AngularJS routing permits a good separation of concerns. GUI resides in html templates defined by the templateUrls and the logic behind is separated in the controller javascript files.
