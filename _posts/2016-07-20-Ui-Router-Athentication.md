---
layout: post
categories: [angular, router, ui-router, authentication, redirect, states, stateChangeStart, custom, state, data]
title: Securing UI-Router States with Simple Authentication
author: emir_osmanoski
comments: true
---

![UiRouter]({{ site.baseurl }}/images/2016-07-20-Ui-Router-State-Secure/00_header.png)

Recently I started a refactoring pass on the front end of one of my bigger
private projects. It was started a long long time ago and it was the project
that I used to follow John Papas style guide for Angular 1.x applications and
actually even learn the more advanced features of Angular.

But at the time the project was started I used the ngRoute module which is
sort of the default. Now, recently, I had the opportunity to check out  ui-
router on some of the projects at work  and as I was not very familiar with it
I decided to learn a bit more by  switching out ng-route with ui-router on the
above mentioned project.

But this post is not going to be about that transition. It is going to be
about the way you can implement state security for your defined states and a
way you can redirect between the state you are trying to access and the login
page and back.

It is by no means anything special or highly complicated, it's mostly using
regular features of angular and ui-router but I found it extremely interesting
and easy to implement and wanted to "write it down" and share it.

So here goes!

# The application

I won't go into detail explaining the application. It is a web catalogue
application with a public and administrative section. The administrators can
define categories of products, properties for the categories, upload images,
create manufacturers and the products themselves. Basically it is imagined to
be a generic sort of interface where you can define a web catalogue of any
sort of item or items that can be categorized in a hierarchical structure.

The users can search the products on different filters, view details and
images and even compare products based on their properties.

What is important for this post though, is that there a set of administrative
states that require the user to be logged in to view them and perform actions
on them.

For the sake of brevity I will also just  mention that there exists a service
called UserAuthorization that exposes two key methods critical for this post:

* Login
  * Calls the backend service to verify credentials and set front end storage mechanisms to indicate user is authenticated.
* IsAuthorized
  * Check front end storage mechanisms to see if the user is authenticated.

This service is what will be used in the several key points for the topic at hand.

*Note: The current scheme for users is very simple. If you are logged in you
are and administrator that can view and do all the administrative actions.
There are currently no roles/privileges. So you can say the authentication and
authorization is actually done at once via the single UserAuthorization
service.*

# UI-Router and its States

Again now, even though it might seem this is a post where we are not going
into details about anything, we will not talk extensively about UI Router. Just
going to present the way the states have been defined for the needs of the web
catalogue application.

Finally! It's time we take a look at some code. Configuration code!! WooHOO!

We are going to look at some of the admin states and more importantly how they
have been decorated with a data attribute to indicate whether they require the
user to be authenticated when they try to navigate to the state:

``` javascript
$stateProvider
.state('admin_tags', {
    url: "/admin/tags",
    templateUrl: "app/administration/tags/tagManagement.html",
    controller: "TagManagementController",
    controllerAs: "vm",
    data: {
        auth: true
    },
    resolve: {
        //
    }
})
.state('admin_manufacturers', {
    url: "/admin/manufacturers",
    templateUrl: "app/administration/manufacturers/manufacturerManagement.html",
    controller: "ManufacturerManagementController",
    controllerAs: "vm",
    data: {
        auth: true
    },
    resolve: {
        //
    }
})
.state('admin_categories', {
    url: "/admin/categories",
    templateUrl: "app/administration/categories/categoryManagement.html",
    controller: "CategoryManagementController",
    controllerAs: "vm",
    data: {
        auth: true
    },
    resolve: {
        //
    }
})
.state('admin_categories.selected', {
    url: "/:id",
    templateUrl: "app/administration/categories/templates/categoryManagement.edit.html",
    controller: "CategoryManagementEditController",
    controllerAs: "vm",
    data: {
        auth: true
    }
})
.state('admin_products', {
    url: "/admin/products",
    templateUrl: "app/administration/products/productManagement.html",
    controller: "ProductManagementController",
    controllerAs: "vm",
    data: {
        auth: true
    },
    resolve: {
        //
    }
})
.state('admin_products_edit', {
    url: "/admin/products/edit/:id",
    templateUrl: "app/administration/products/productEdit.html",
    controller: "ProductEditController",
    controllerAs: "vm",
    data: {
        auth: true
    },
    resolve: {
        ///
    }
})
.state('admin_login', {
    url: "/admin/login?:previous",
    templateUrl: "app/administration/users/userLogin.html",
    controller: "LoginController",
    controllerAs: "vm"
});
```

We see that states that require the user to be authenticated have a
data property which is an object that defines an auth property set to true.

The data property is a way to attach some custom information to the states
during config time and I believe the data could have been named anything (as
long as we access it elsewhere by the given name), as mentioned
[here](https://github.com/angular-ui/ui-router/wiki#attach-custom-data-to-
state-objects)

So where do we access this data/auth properties?

# Securing the states that require authenticated users

Once we have defined our states we need to somehow check if the user is
authenticated when they try to access the state if the state has the data/auth property set.

We can do this with attaching a listener on the "$stateChangeStart" event that
gets fired by ui-router when we try to change states.

Attaching the event is done in a factory that gets initialized in a run block of the main core module:

``` javascript
angular
	.module("ws.core")
    //...
    .run(runBlock);

    runBlock.$inject = ["stateAuthorizationConfiguration"];

    function runBlock(stateAuthorizationConfiguration) {
        stateAuthorizationConfiguration.initialize();
    }
```

The run block is injected with the factory which exposes a method called
initialize which is called straight away.

The factory is then handling the injection of everything else required to
setup the state checks and attaches a function to listen to the state change
event:

``` javascript
(function () {
    "use strict";

    angular
        .module("blocks.authorization")
        .factory("stateAuthorizationConfiguration", stateAuthorizationConfiguration);

    stateAuthorizationConfiguration.$inject = ["common", "UserAuthorization"];

    function stateAuthorizationConfiguration(common, userAuth) {
        var factory = {};

        factory.initialize = initialize;

        return factory;

        function initialize() {
            common.$rootScope.$on('$stateChangeStart', function (event, toState) {
                var stateData = toState.data;

                if (stateData != undefined && stateData.auth) {
                	if (!userAuth.IsAuthorized()) {
                        common.logger.error("You must be authorized to access " + toState.url, "Authorization Failed");
                        event.preventDefault();
                        common.$state.go("admin_login", { previous: toState.name });
                    }
                }
            });
        }
    }
})();
```

The callback we receive on the $stateChangeStart event contains a bunch of
parameters you can read up more on [here](https://github.com/angular-ui/ui-
router/wiki#state-change-events)

The one we are most interested in is the "toState" parameter. It contains
properties about the state which we are trying to reach. It contains the name,
the url and of course if set, in the state configuration, the custom data property.

We are going to check if for each state the custom data object is defined and if so
does it contain the auth property and again if so, is the auth property set to true.

``` javascript
var stateData = toState.data;

if (stateData != undefined && stateData.auth) {
	// The state requires user authentication so check that!
}
```

At this point it's good to mention that we are taking the approach of doing
something in the case of the state requiring authentication but the user not
being authenticated. In any other case we will allow the state change to
continue as normal.

To check if the user is authenticated we can use the UserAuthorization service
which, like mentioned before, exposes the IsAuthorized method. 

If the user is not authorized we perform our action which in this case is
rendering a user message, preventing the loading of the toState (using the
event.preventDefault() call) and redirecting to the "admin_login" state as it
can be seen here:

``` javascript
common.logger.error("You must be authorized to access " + toState.url, "Authorization Failed");
event.preventDefault();
common.$state.go("admin_login", { previous: toState.name });
```

## The redirection

Now, we reach the point of the simple feature (or combination of features)
that fascinated me and inspired me to write this post. 

We saw and noticed, or maybe not,  that the ui state for the login page was
defined with a url parameter called previous:

```javascript
.state('admin_login', {
    url: "/admin/login?:previous", // <-------
    templateUrl: "app/administration/users/userLogin.html",
    controller: "LoginController",
    controllerAs: "vm"
});
```

The idea behind this is that when we go to the login page, we want to know
where we tried to go previously, before we were forced and redirected to
login.

We see in the previous section that when we redirect the user to the
"admin_login" state we are setting the previous parameter to the name of the
state we tried to reach but failed (because of not being authenticated):

``` javascript
common.$state.go("admin_login", { previous: toState.name });
```

So basically we are letting the LoginController know the name of the state we
wanted to reach. And it is that easy! 

The controller can then on successful authentication redirect us back to the
correct state. We'll see this in the next section.

As an example this is how  the url would look like for one of these redirects:

![Redirect Url!]({{ site.baseurl }}/images/2016-07-20-Ui-Router-State-Secure/01_Previous.png)

# Login controller

Now, lets have a look at the login controller which gets activated when we reach the login state:

``` javascript
(function () {
    "use strict";

    angular
        .module("ws.administration")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["common", "services"];

    function LoginController(common, services) {
        var vm = this;

        vm.loginInfo = {
            userName: "",
            password: ""
        };

        vm.login = _login;

        activate();

        function activate() {
            common.logger.log("Login controller activated");
        }

        function _login() {
            services.auth.Login(vm.loginInfo)
                .then(successLogin, failedLogin);

            function successLogin() {
                var redirectedFrom = common.$state.params.previous;

                if (redirectedFrom) {
                    common.$state.go(redirectedFrom);
                } else {
                    common.$state.go(common.defaults.route);
                }
            }

            function failedLogin(message) {
                common.logger.error(message, message, "Login Failed");
            }
        }
    };
})();
```

The controller is very simple. It exposes a login method which internally
makes a call to the same UserAuthorization service, but here via a common
services factory that contains all core app services.

The UserAuthorization "Login" method returns a promise, on whose successful
resolution we call the "successLogin" callback. A success resolution to the
promise would actually mean a couple of things:

1. The UserAuthorization service successfully made a call to the back end, passing the credentials.
  - When the call is made the UserAuthorization service returns a "custom" promise (using $q) to the controller which is resolved when steps 2 and 3 are satisfied.
2. The response from the server (passing the credentials) is not an HTTP 401 response. 
3. The UserAthorization service configures front end storage mechanisms to store that the current user is authenticated.
4. It resolved successfully the promise returned via $q to the controller.

In "successLogin" the controller will check if the "previous" parameter is set
on the $state.params ui-router collection. If so, we redirect to that state
and if not we redirect to an application wide default configured state. 

The important thing is that "successLogin" is called when the user is
authenticated and we needed to just handle the redirection back to where we
came from.

At this point, we have gone through one whole path of securing state cycle.

# Overview

To try and better explain things here is a short overview of the entire
procedure (happy path) that happens:

1. On state change:
	- Check if the state we are trying to reach requires the user to be authenticated.
	- If so check if the user is authenticated. 
	- If authenticated or state does not require authentication allow state transition to occur as normal.
2. If state requires authentication and user not authenticated redirect to login controller
	- Set the name of the state ("previous") we tried to reach in url parameters
3. Perform login action
4. If login success redirect to state:
	- If previous state provided go there
	- If not go to default state
5. If login failed, show message and prompt user to enter credentials again
	- At this point the user can use navigation to go back to any other state returning to step 1

# Small note on Security

Of course securing the states is just a little quality of life and UX
feature. This does not at all mean that now users of the application cannot
perform the actions that only administrators can if they "can't reach"
those pages.

In my case the back-end of the application is a REST-ful API which you can hit
using a lot of different ways, not confined to just via the actual app UI. So
of course there must be and there are additional ways to secure things.

In my case that is done using Token Authentication and built in ASP.NET Web
API 2 mechanisms onto the API controllers, but that is out of the scope for
this post.

# Summary

So that would be it! I really was amazed how easy it was to set up this small
little feature using UI-Rotuer.  I really like how the state names can be used
for almost everything, including the above case for redirecting and then  in
combination with the ui-sref directive on anchors.

I'm still new to UI-Router so I might try and write a couple more posts. I had
a very interesting journey with parent child/states while implementing the
category edit feature so that might be something I'd try writing about in the
future.

Cheers!