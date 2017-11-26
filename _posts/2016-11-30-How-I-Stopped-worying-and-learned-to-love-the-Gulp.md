---
layout: post
categories: [node, gulp, npm, build, angular, front, end]
title: How I stopped worrying and learned to love the Gulp! 
author: emir_osmanoski
comments: true
---

![GulpAngular]({{ site.baseurl }}/images/2016-11-30-How-I-Stopped-worying-and-learned-to-love-the-Gulp/00_header.png)

# Introduction

This post will cover the workflow and process of starting from scratch,
scratch! and creating a [Gulp](http://gulpjs.com/) build  chain for my main
hobby project! Gulp you say?! That is so {insert year < 2016 here!}!

Well, hold on a minute! There are several reasons I did what I did...

1. First of all, at work we are using Grunt which was set up by someone else.
So I wanted to try and create my own build chain specifically for Angular 1.5
using Gulp, just to try something else, even though I've previously have had
some Gulp experience, but not on a actual application!

2. This project was started a while ago and at the point of starting the Gulp
build (week ago) there was already a solid amount of existing code and going
over everything to make it usable with some of the newer package managers,
bundling and module tools was not quite the option.

3. I wanted to see first hand what the problem that tools like Browserify and
Webpack solve, is. I wanted to hit a wall and say, ok I can no longer use Gulp
and the tools I have available at the moment to do this certain thing or use
this particular approach/framework, so I will have to move on to something
else. At the end of it I can say that I've reached that point and the learning
points are described in the Outstanding Problems Section.

4. Finally I needed to use something I was somewhat familiar with and I knew
it could finish the job quickly with! For this particular job I was not
interested in using a new flashy tools/framework which would have caused me
some additional time setting things up taking all things into consideration.

# Starting point

My starting point is an Angular 1.5 application which follows the
style/organization guide for Angular applications by John Pappa which can be
found [here!](https://github.com/johnpapa/angular-
styleguide/blob/master/a1/README.md)

So, to get started there were several requirements I wanted met with the build: 

1. Minify and concatenate my application Javascript files.
2. Minify and concatenate all third party library files including Angular.
3. Minify and Concat all CSS files.
4. Minify and cache all the templates, reducing requests.

There were a bunch of challenges that came up while doing some of these steps
which I will cover in their appropriate sections.

The front end project around which this post is built around is part of a
larger ASP.NET MVC solution. 

The front end project specifically is built on top of one of the earlier
release candidates for ASP.NET Core application. This doesn't really matter but
it's here as an explanation of the folder structure: The root of the front end
application is a folder called wwwroot which lives under a ASP.NET MVC Core
Web Application root.

# Tackling requirements 1 and 2

This section covers the following two requirements:

1. Minify and concatenate my application Javascript files.
2. Minify and concatenate all third party library files including Angular.

My initial approach was to use gulp to select all of the javascript files,
minify them and then string them all together in a single file. Then reference
this file in the index.html replacing all other references to the normal
versions of the files.

## Folder Structure

Before starting, let's have an overview about the folder structure and how everything is
organized and configured.

Within the gulpfile I've setup a paths configuration object which contained
the following paths:

``` javascript 
var paths = {
    root: "./wwwroot/",
    app: "app/",
    lib: "lib/",
    dist: "../dist/"
}
```
As mentioned, the development root of the application is the wwwroot folder.
It contains all the files relevant to the app. It contains several key folders:

<dl markdown="0">
  <dt>App Folder</dt>
  <dd>Contains all the App Angular modules, controllers, services and other components, including all the templates!</dd>

  <dt>Lib Folder</dt>
  <dd>Is actually the bower_components folder, configured in .bowerrc and contains all the third party CSS and Javascript libraries</dd>
  
  <dt>Css folder</dt>
  <dd>Contains all the custom css files and content, including custom icon fonts</dd>
</dl>

## Reading, Concatenation and Minification of the App folder

A very simple and, as we will see, not quite the right way to do this is just
read all the files, uglify/minify them, bunch them all together in a single
file and copy the output in a destination folder. Then just inject the
minified file in the index file in the destination folder.

This was my initial approach and it was done using several gulp modules
alongside regular gulp streaming file utilities:

``` javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');

gulp.task('build-app-javascript', ["clean"], function () {
   return gulp.src(paths.root + paths.app + "/**/*.js")
        .pipe(uglify())
        .pipe(concat("app.js"))
        .pipe(gulp.dest(paths.dist + "/js"));
});

gulp.task("clean", function () {
    return gulp.src(paths.dist, { read: false }).pipe(clean({ force: true }));
});

```

> Note on Clean: The clean task is regularly used as a dependent task during
the building to clean up the  destination folder before running all the other
tasks.

The obvious problem with this is that because I'm using Angular there needs to
be a way to control the order of the loading of the scripts. 

And, yes, this is one perfect argument to use the module loading approach alongside Browserify/WebPack.

But having somewhat ruled that out as an option, I went ahead to see if there
was a way to solve this using more conventional and approachable methods,
considering the already existing codebase.

As it turned out there is a way to solve this using a little gulp module
called Gulp Angular File Sort which can be found [here!](https://github.com/klei/gulp-angular-filesort).

So, if we pipe the files to the sort module before concatenating them it all works fine:

``` javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var angularFilesort = require('gulp-angular-filesort'),

gulp.task('build-app-javascript', ["clean"], function () {
    return gulp.src(paths.root + paths.app + "/**/*.js")
        .pipe(angularFilesort())
        .pipe(uglify())
        .pipe(concat("app.js"))
        .pipe(gulp.dest(paths.dist + "/js"));
});

gulp.task("clean", function () {
    return gulp.src(paths.dist, { read: false }).pipe(clean({ force: true }));
});
```

## Injecting the minified App.js file 

Because we now have an app.js file with all our javascript application files
inside, neatly sorted, we need to replace the references we have in our
index.html pointing to each of the individual files with the one app.js file.

This can be done with a gulp module called gulp-inject which can be found
[here!](https://www.npmjs.com/package/gulp-inject)

Basically we can take a source index.html file and wrap the references to all
the applications files in a special comment section and have inject replace
everything with one or multiple specific files.

This is also very convenient, as one possible way, to handle the development
time/mode where we prefer to use actual unminified application files for
debugging.

When we introduce Inject the gulp build gets extended to two tasks that are
connected and we will explore why:

``` javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var angularFilesort = require('gulp-angular-filesort');

gulp.task('build-app-javascript', ["clean", "create-app-js"], function () {
    var target = gulp.src(paths.root + "index.html");

    // will fetch only the js file we've build and moved to distribution
    var sources = gulp.src([paths.dist + "**/*.js"], { read: false });

    return target.pipe(inject(sources)).pipe(gulp.dest(paths.dist));
});

gulp.task('create-app-js', ["clean"], function () {
    return gulp.src(paths.root + paths.app + "/**/*.js")
        .pipe(count())
        .pipe(print())
        .pipe(uglify())
        .pipe(concat("app.js"))
        .pipe(gulp.dest(paths.dist + "/js"));
});

gulp.task("clean", function () {
    return gulp.src(paths.dist, { read: false }).pipe(clean({ force: true }));
});
```

The reason we need to have a **create-app-js** task is so we can wait on it to
finish when running **build-app-javascript**. Because we want to inject the app.js
file we must wait and be sure that it has been created first. This is done by
doing two key things which are Gulp related:

1. Declaring **create-app-js** as a dependency in the second optional array
parameter of gulp.task

2. Returning a gulp stream from the **create-app-js** which forces Gulp to wait
for it to finish before continuing.

> At this point we can say that we have a solution that will take all our
application files,  sort them, minify and, concatenate the minified files and
replace the app script references with a single app.js reference

## Reading, Concatenation and Minification - Library Files

Now let's take a look at  loading up up third party libraries and dependencies!

I initially tried taking the same approach as with the application files which
turned out to not be quite correct for a very particular reason. Below is the
example, that builds lib.js,  without the inject task:

``` javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');

gulp.task('build-lib-javascript', ["clean"], function () {
    // fetch from the wwwroot/lib folder
    return gulp.src(paths.root + paths.lib + "/**/*.js")
       .pipe(uglify())
       .pipe(concat("lib.js"))
       .pipe(gulp.dest(paths.dist + "/js"));
});

gulp.task("clean", function () {
    return gulp.src(paths.dist, { read: false }).pipe(clean({ force: true }));
});

```

The problem with this is that we are going to pull a bunch of files we do
not need. 

The bower packages can contain supporting files and linked libraries that we
might be pulling from another place. The folders also contain both the
unminified and minified version of the same library. To put it shortly there
is a lot of crap we do not actually need that gets concatenated into lib.js

The number of files in the stream, when running the script comes to around 279
files, even though in index.html we are referencing a total of 28 library
files.

To fix this we can use a gulp plugin called [**main-bower-files**](https://github.com/ck86/main-bower-files), which when we point at the bower root folder, in our case **wwwroot/lib** it will look at it will fetch,
organize and only select the required main bower Javascript files from each of
the bower packages:

``` javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');

gulp.task('build-lib-javascript', ["clean"], function () {
    return gulp.src(mainBowerFiles({ filter: "**/*.js" }))
       .pipe(uglify())
       .pipe(concat("lib.js"))
       .pipe(gulp.dest(paths.dist + "js"));
});

gulp.task("clean", function () {
    return gulp.src(paths.dist, { read: false }).pipe(clean({ force: true }));
});
```

But, still, this is not a final solution! 

The problem with this, turns out to be some that I have some Angular
directives that were relying on the full jQuery implementation. Main Bower
Files loads the Angular scripts before jQuery which caused Angular to use its
own minimal jQuery implementation and never look for the full jQuery library.
This was not much liked by my directives expecting the full jQuery library.

The root cause of this is because the Angular bower.json configuration does
not declare jQuery as a dependency.

This can probably be solved by using an override in the Angular Bower
configuration and set jQuery as a dependency, but at this particular point of
the development and research I gave up on using this approach and moved on to
something more interesting.

## gulp-pipemin

[gulp-pipemin](https://www.npmjs.com/package/gulp-pipemin) is a very simple
solution that reads file (js/css) references in an HTML file wrapped in
specific regions and provides streams and concatenation modules allowing me to
do whatever I want with the files before concatenating them and having gulp-
pipemin inject them in a destination html file.

Let's take a look at the final version of the task that handles requirments 1
and 2:

``` javascript
var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var pipemin = require('gulp-pipemin');

gulp.task("gulp-pipemin", ["clean"], function () {
    return gulp.src(paths.root + "index.html")
    .pipe(pipemin({
        js: function (stream, concat) {
            return stream
                .pipe(uglify())
                .pipe(concat);
        },
        js1: function (stream, concat) {
            return stream
                .pipe(uglify())
                .pipe(concat);
        }
    }))
   .pipe(gulp.dest(paths.dist));
});

gulp.task("clean", function () {
    return gulp.src(paths.dist, { read: false }).pipe(clean({ force: true }));
});

```

There are several things happening in the gulp-pipemin task:

1. I'm taking the index.html file which has been decorated with some comments
around the library and app files which can be seen below and pipe it to a
pipemin() call

2. Provide configuration to the pipemin() call with two configuration
properties pointing to specific functions.

3. The configuration function property names, js and j1 match special comments
section in the index.html

4. The functions take 2 parameters
  * A gulp stream
  * A concat callback

5. The stream object is actually made of off all the files that are wrapped by
the html comments/regions with the given function property name.

6. I can do whatever with the two file streams and in this case I pipe them to
the uglify module

7. It's noticeable that we are not using the concat module here and relying on
the gulp-pipemin provided concat callback to concat the files and inject the
result in the index.html

8. gulp-pipemin's concat picks up some configuration parameters from the
actual special comment/regions in the html

9. Finally pipe the resulting index into the destination folder

Here are the js and js1 regions defined in the HTML:

``` html
<!-- build:js js/lib.js -->
<!-- Third Party Libraries -->
<!-- jQuery -->
<script src="lib/jquery/dist/jquery.js"></script>

<!-- Bootstrap Core JavaScript -->
<script src="lib/bootstrap/dist/js/bootstrap.min.js"></script>

<!-- Angular -->
<script src="lib/angular/angular.min.js"></script>

<!-- ..... Other Files.... -->
<!-- .... -->

<!-- endbuild -->
```
And the application files:

``` html
<!-- build:js1 js/app.js -->
<!-- Application files -->
<!-- Main application module -->
<script src="app/app.module.js"></script>

<!-- Layout -->
<script src="app/layout/layout.module.js"></script>
<script src="app/layout/nav.controller.js"></script>

<!-- ..... Other Files.... -->
<!-- .... -->
<!-- endbuild -->
```

The concat configuration that was mentioned is actually the name and the
location of the resulting concatenated files per stream, which is relative to
the location where we pipe the index file to. In our case those js/app.js and
js/lib.js paths will live under the distribution folder.

> What can save some more lines is having a single HTML special region/comment
> section and only have a single gulp-pipemin configuration which would result
> in a single somewhat big file containing all of the third party and
> application scripts. The benefits of this are debatable and probably best
> left for another time.

# Tackling Requirement 3

There actually wasn't much "exploration" around the requirement to handle CSS files.

Once I discovered gulp-pipemin and what is possible it was very easy to extend
the gulp-pipemin task and modify the index.html file to include a CSS section.

``` javascript
var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var pipemin = require('gulp-pipemin');
var uglifycss = require('gulp-uglifycss');

gulp.task("gulp-pipemin", ["clean"], function () {
    return gulp.src(paths.root + "index.html")
    .pipe(pipemin({
         css: function (stream, concat) {
            return stream
                .pipe(uglifycss({
                    "maxLineLen": 80,
                    "uglyComments": true
                }))
                .pipe(concat);
        },
        js: function (stream, concat) {
            return stream
                .pipe(uglify())
                .pipe(concat);
        },
        js1: function (stream, concat) {
            return stream
                .pipe(uglify())
                .pipe(concat);
        }
    }))
   .pipe(gulp.dest(paths.dist));
});

gulp.task("clean", function () {
    return gulp.src(paths.dist, { read: false }).pipe(clean({ force: true }));
});

```
An initial addition was the new module called uglifycss as the uglify module
only works with javascript files. 

## Emergent requirement 3.1 - Importing CSS Fonts

One specific problem that arose here was that one of the css files that
defines the custom bootstrap theme (Bootswatch Theme) is using an import to
bring in a Google CSS font:

``` css
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,400,300,700");
```

And because the CSS files needed to be minified the import statement was I
think "lost in translation". This was easily solved by using another gulp
plugin called cssimport. So finally the CSS gulp-pipemin function looked
like this:

``` javascript
function (stream, concat) {
    return stream
        .pipe(cssimport())
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(concat);
}
```

Let's also take a look at the index.html file and how the region is defined:

``` html
<!-- build:css css/minified/style.css -->
<!-- Third Party CSS -->
<!-- Bootstrap Core CSS -->
<link href="css/template/bootstrap.min.css" rel="stylesheet">

<link href="lib/toastr/toastr.min.css" rel="stylesheet">
<link href="lib/animate.css/animate.min.css" rel="stylesheet">

<!-- Font awesome -->
<link href="lib/font-awesome/css/font-awesome.min.css" rel="stylesheet">

<!-- ..... Other third party css files..... -->
<!-- CSS -->
<!--<link href="css/template/shop-homepage.css" rebol="stylesheet">-->
<link href="css/core.css" rel="stylesheet">
<link href="css/overides.css" rel="stylesheet">

<!-- ....Other App css files.... -->
<!-- endbuild -->
```

We can see that we use the same special region/comment section to wrap all of
the CSS files. This includes both the third party library css files and the
custom app files.

One specific point in the gulp-pipemin special region/comment section is the
destination where the concatenated css file is created: dist/css/minified/style.css

This was done because of icon font references. A library like font-awesome
expects a specific location where the fonts would be located. The library
itself is a bower package which contains a *font-awesome/css* folder where a css file
references the fonts which are located in a *font-awesome/fonts* folder. 

This reference is done using *../fonts* which navigates one level above and
expects a fonts folder.

So we had to have the css files nested under a minified folder. Whatever the
case gulp-pipemin knows and references the correct path in the distribution
index.html

But it turned out I need to bring in all the fonts that might be used by both
the third party and app CSS files.

## Emergent Requirement 3.2 Working with general fonts

The idea behind copying fonts was to have them in an appropriate location so
they can be referenced by the minified CSS file, which, for starters, contains
font-awesome, a library that relies heavily on font files.

>Of course one other idea behind copying fonts, was the look of the application
which uses icon-fonts and font-awesome heavily for all sorts of icons on
buttons and various other UI components!

The task that accomplished this is simple and is mostly done by using the regular Gulp library:

``` javascript
var gulp = require('gulp');
var clean = require('gulp-clean');
var flatten = require('gulp-flatten');

gulp.task("copy-fonts", ["clean"], function () {
    return gulp.src(paths.root + paths.lib + "**/*.{ttf,woff,woff2,eof}")
    .pipe(flatten())
    .pipe(gulp.dest(paths.dist + "css/fonts"));
});

gulp.task("clean", function () {
    return gulp.src(paths.dist, { read: false }).pipe(clean({ force: true }));
});

```

This task uses the Gulp blob selectors to select all files of any of the font
types under the root library path.  

Then we flatten the list of files to remove any folder "references", and then
just paste/move the files in the distribution folder under dist/css/fonts. The
same dist folder also contains dist/css/minified/style.css. Having this folder
structure solved the font-referencing problem we discussed in the previous
section.

> Note on the flatten module: If we don't use use flatten, the task would copy
> all the fonts into subfolders in the dist/css/fonts folder. This is because
> different libraries in root/lib define their own fonts so the task would
> copy each of the library fonts into its own folder, which is not what I
> wanted to do. This would also break the solution to the font-referencing
> problem.

# Handling Requirement 4: Templates!

Templates are something without which an Angular application is not complete.
Each state, controller, directive and so on can define an html template
associated with it which can quickly cause the number of requests, fetching
all these template, to skyrocket!

So one great way to reduce the number and size of calls to the server is to
pre-load the templates with the first application load/initialization call.

To accomplish this I used an Angular service called TemplateCache. You can read
about it more
[here](https://docs.angularjs.org/api/ng/service/$templateCache).

Very shortly template cache does exactly what the name suggest. Each time a
template is referenced/loaded, Angular, on it's own, adds the template to a
cache service, making the next load much faster!

So what we can do is take all our html template files and load then up in
Template Cache even before the application is "loaded". For this we can use a
gulp module, appropriately called [**gulp-angular-
templatecache**](https://www.npmjs.com/package/gulp-angular-templatecache)

It's very easy to get a hold of all the html files under our wwwroot/app
folder, minify them and generate a templates.js file which loads all of them
in Angular Template cache:

``` javascript
var gulp = require('gulp');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var templateCache = require('gulp-angular-templatecache');

gulp.task("build-template-cache", ["clean"], function () {
    return gulp
        .src([paths.root + "app/**/*.html"])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(templateCache("templates.js", {
            module: 'ws.core',
            root: "app",
            standAlone: false
        }))
        .pipe(gulp.dest(paths.dist + "js"));
});

gulp.task("clean", function () {
    return gulp.src(paths.dist, { read: false }).pipe(clean({ force: true }));
});
```
There are several things going on here:

1. We source and create a stream all of our HTML files that are located under the wwwroot/app folder.

2. We minify the html files using a gulp plugin called [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin)

3. We pipe the minified html files to [gulp angular template cache](https://www.npmjs.com/package/gulp-angular-templatecache)

The template cache plugin takes in several parameters:

A file name ('templates.js')
: The output file that will register all the templates in template cache. 

A module name (ws.core) 
: On which the plugin will add a run block that does
the template cache registration. This run block takes the [$templateCache service](https://docs.angularjs.org/api/ng/service/$templateCache) as a injectable dependency and will run all the registrations of the minified html.

A root parameter (name)
: Used as a prefix in the registrations to $templateCache, which is explained a bit better in the next section

The 'app' parameter can best be explained if we take a look at one of the
template references in a component:

``` javascript
var directive = {
    scope: {
        product: "=",
        showManufacturer: "=?"
    },
    restrict: "E",
    templateUrl: 'app/components/products/details/productName.directive.html',
    link: link
};
```

We can see that the templateUrl (which serves as the template identifier/name
in template cache) is prefixed with app.  Because of the way we've defined the
blob which fetches all of our templates, **app/\*\*/\*.html** all of our files
in the gulp stream will have paths that will be missing the **app** prefix.
Which is why we've used the **app** root parameter to prefix the template
names.

Running the task will produce a templates.js file in the **dist/js/** folder.
A truncated example of the file contents  can be seen below:

``` javascript
angular.module('ws.core').run(['$templateCache',
function($templateCache) {
    $templateCache.put('app/layout/footer.html','<div class="container"><hr><!-- Footer --><footer><div class="row"><div class="col-lg-12"><p>Application 2016</p></div></div></footer></div>');}]);
```

At this point the only thing left to do is combine this with the app.js file
generated from gulp-pipemin. This is done in the main build task after
build-template-cache is finished:

``` javascript
var gulp = require('gulp');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');

gulp.task('build', ["clean", "build-template-cache", "pipe-min"], function () {
    // Add templates.js at the end of app.js
    return gulp.src([paths.dist + "js/app.js", paths.dist + "js/templates.js"])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.dist + "js"));
});

gulp.task("gulp-pipemin", ["clean"], function () {
    // Task Definition
});

gulp.task("build-template-cache", ["clean"], function () {
    return gulp
        .src([paths.root + "app/**/*.html"])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(templateCache("templates.js", {
            module: 'ws.core',
            root: "app",
            standAlone: false
        }))
        .pipe(gulp.dest(paths.dist + "js"));
});

gulp.task("clean", function () {
    return gulp.src(paths.dist, { read: false }).pipe(clean({ force: true }));
});
```

# The final Gulpfile and metrics!

The final Gulpfile containing all the tasks for the build arranged in a
proper order with the final dependencies, including a serve-dist task using
[gulp-live-server](https://www.npmjs.com/package/gulp-live-server), now looks
like this:

``` javascript
var gulp = require('gulp');
var gls = require('gulp-live-server');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var pipemin = require('gulp-pipemin');
var flatten = require('gulp-flatten');
var cssimport = require("gulp-cssimport");
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');

var paths = {
    root: "./wwwroot/",
    app: "app/",
    lib: "lib/",
    dist: "../dist/"
}

gulp.task('serve-dist', ["build"], function () {
    var server = gls.static(paths.dist, 80);
    return server.start();
});

gulp.task('build', ["clean", "templates", "copy-fonts", "pipe-min"], function () {
    return gulp.src([paths.dist + "js/app.js", paths.dist + "js/templates.js"])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.dist + "js"));
});

gulp.task("pipe-min", ["clean", "build-template-cache", "copy-fonts"], function () {
    return gulp.src(paths.root + "index.html")
    .pipe(pipemin({
        css: function (stream, concat) {
            return stream
                .pipe(cssimport())
                .pipe(uglifycss({
                    "maxLineLen": 80,
                    "uglyComments": true
                }))
                .pipe(concat);
        },
        js: function (stream, concat) {
            return stream
                .pipe(uglify())
                .pipe(count())
                .pipe(concat);
        },
        js1: function (stream, concat) {
            return stream
                .pipe(uglify())
                .pipe(concat);
        }
    }))
   .pipe(gulp.dest(paths.dist));
});

gulp.task("build-template-cache", ["clean"], function () {
    return gulp
        .src([paths.root + "app/**/*.html"])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(templateCache("templates.js", {
            root: "app",
            module: 'ws.core',
            standAlone: false
        }))
        .pipe(gulp.dest(paths.dist + "js"));
});

gulp.task("clean", function () {
    return gulp.src(paths.dist, { read: false }).pipe(clean({ force: true }));
});

gulp.task("copy-fonts", ["clean"], function () {
    return gulp.src(paths.root + paths.lib + "**/*.{ttf,woff,woff2,eof,svg}")
    .pipe(flatten())
   .pipe(gulp.dest(paths.dist + "css/fonts"));
});
```

## Metrics

The difference when serving from dist vs development environment is quite
noticeable especially in the number of requests metric. 

Taking the application's default page as an example benchmark, we get the
following metric results from the  Google Chrome Network tab:

| Metrics              | Distribution  | Build  |
| :------------------: |:-------------:| :-----:|
| Number Of Requests   | 26            | 179    |
| MB Transfered        | 2.0MB         | 3.6MB  |
| Finish               | 1.23s         | 1.69s  |
| DomContentLoaded     | 717ms         | 1.06s  |
| Load                 | 717ms         | 1.06s  |

Looking at the metrics we see the key difference is in the number of requests.
We've also managed to save about 1.6MB in size transferred and cut about
460ms on the time to load the resources.

The distribution build's largest and "slowest" loading file is the combined
lib.js with an approximate size of 1.3MBs and a load time of 300ms. In the
future this can probably be optimized by refining what is actually required
and loading just required parts of certain third party dependencies.

# Outstanding Topics

## Managing index.html

One thing currently outstanding with the current setup is that I still have to
manually add/configure references in the index file.

First of all, this can probably be solved by of the regular gulp commands and
using a combination of main-bower-files and angular-sort plugins. Like
mentioned I personally had some issues setting it fully which is why I
switched to pipemin and the static configuration.

I'm going to leave those experimentations for another iteration of the build,
as the requirements I had now were basically fulfilled using the gulp-pipemin
approach.

## Loading everything all at once

Another possible improvement is the way everything is loaded at once, even
though not all pages require everything.

Not all pages/views require all the components, controllers and services, to
be loaded which in turn do not require all of the third party libraries to
have been initialized.

Currently there is no way to separate that. And I'm not even sure how would
you approach something like that without increasing the number of request during the application lifespan.

Does it even provide any benefits in regards to performance if you somehow
manage not to initialize everything all at once?

## Futureproofing

Currently the application upon which this was based is built on Angular 1.5
and is using EcmaScript 5. This project was started a while back, and this
tooling was what I was most familiar with, but I can indeed see the benefits
of moving towards more modern approaches, mainly EcmaScript 2015 and possibly a
typed superset of the language like TypeScript.

Additionally migrating to Angular 2 is also always an option, of course in
combination with the above mentioned technologies.

These considerations of course bring with them a flurry of other points, like
possible better architectures, more readability, easier maintenance and testing
and so on.

I don't think that the current build would be quite suitable for moving on to
these new technologies/frameworks

# Summary

The build started out with the goal of setting up a deployable version of a
particular Angular 1.5 front end application. Using gulp this was easily
achieved after getting over some initial hurdles.

Doing this gave me some insight into the problems some of these more modern
tools like Browserify/WebPack can solve. I honestly don't see the need to
update the current project in the near, so I hope that one of these days I can
spend some free time in starting a small project to get into the new tools and
frameworks in more detail.

Until then I hope what's been  written up here helps someone else that has a
substantial codebase and looking to automate some of the deployment dependent
tasks.