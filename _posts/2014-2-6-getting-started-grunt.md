---
layout: post
title: Getting Started with Grunt.js
---

First things first, let’s talk about what Grunt is exactly. Grunt is a JavaScript based task runner. Helpful? Probably not.

Grunt is a great tool for automating many of the things that you probably do on a daily basis - things such as compiling Sass or Coffeescript, concatenating JavaScript files, running unit tests, minifying images - the list [goes on](http://gruntjs.com/plugins).

Odds are that as a front-end developer you’re doing many of these things on a fairly regular basis. You’ve also probably wondered if there was a way to automate all of these process so that you can focus your efforts on what you do best - building websites!

## Grunt.js to the Rescue!

[![grunt1](http://jordanforeman.com/wp-content/uploads/2014/02/grunt1-300x158.jpg)](http://jordanforeman.com/wp-content/uploads/2014/02/grunt1.jpg)

Until recently, GUI applications such as CodeKit could be used to automate a lot of these activities. While CodeKit is great and definitely still relevant, it doesn’t offer much in the way of customization. If you wanted CodeKit to watch for changes to your Node.js code and restart your server accordingly (think [Nodemon](https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;ved=0CCcQFjAA&amp;url=https%3A%2F%2Fgithub.com%2Fremy%2Fnodemon&amp;ei=ztPzUrvxBfDlyAG2p4GgDg&amp;usg=AFQjCNFHbUeA0bxSPwV2kiA3cABhYgchDw&amp;sig2=evUbBGdV0dBCjpc6yjUMgg&amp;bvm=bv.60799247,d.aWc)) for example, you’d be out of luck.

So whether you’re completely new to workflow automation, or are starting to get annoyed with the limitations of other tools, this article should be able to get you up and running with a pretty slick automation setup.

## What You’ll Need

Grunt runs on Node.js, so inherently Node and NPM are prerequisites. If you don’t already have these installed, its pretty straightforward as they come packaged together and can be installed from [nodejs.org](http://nodejs.org/).

With NPM installed, navigate to the command line and type the following:

{% highlight bash %}
npm install -g grunt-cli
{% endhighlight %}

This will install the Grunt command line tools globally. This way you will be able to use Grunt from the command line for every project in the future (which I guarantee you’ll want to do).

Now, `cd` into your project’s directory. If your project doesn’t already have a `package.json` file - create one. `package.json` is a Node file that contains important metadata about our project that will be used by NPM. In our `package.json` file, add the following lines of code (replacing bracketed content):

{% highlight javascript linenos %}
{
  "name": "[project-name]",
  "version": "0.0.1",
  "description": "[project-description]",
  "author": "[your-name-here]"
}
{% endhighlight %}

You might be wondering why this is important - especially if you’re project is not really a Node application. The reason is, again, because Grunt is a Node module. So even if your project isn’t built with Node we’ll still be using it to power Grunt.

The last thing to do is to install Grunt as a dependency for our project. Since we’ll only be using Grunt for development, it will be registered as a `devDependency`. Go back to the command line and type the following (in your project’s root):

{% highlight bash %}
npm install grunt --save-dev
{% endhighlight %}

This will install the Grunt module into your project, as well as update your `package.json` with the following:

{% highlight javascript linenos %}
devDependencies: {
  "grunt": "~0.4.1", //or whatever the current version is
}
{% endhighlight %}

Phew! Now we’re finally ready to start configuring our automatic builds. This may seem like a lot of work so far, but the benefits of setting up Grunt for your project will far outweigh the time it takes to get set up and running - as you will soon find out!

## Setting up our Build

With Grunt installed and ready to go, our last step is setting up build definitions. For those of you not familiar with the concept, a build definition is simply a file that tells our compiler (in this case, Grunt) what exactly to do.

Start by creating a file called `Gruntfile.json` in your project root. Make sure that you capitalize the G! This file will store our build definitions. Your `Gruntfile` will consist of three different sections all contained within a function: `module.exports = function(grunt){ .. }`. Again, this particular code is very Node specific. Don’t worry if you don’t know what `module.exports` means - you don’t need to know to get Grunt up and running, you just have to have to use it.

Copy the following code into your `Gruntfile.js`:

{% highlight javascript linenos %}
module.exports = function(grunt) {

  grunt.initConfig({
    //TODO
  });

  grunt.loadNpmTasks(''); //TODO

  grunt.registerTask('default', []); //TODO

};
{% endhighlight %}

Lets take a quick look at what each of these three pieces are for:

*   `grunt.initConfig({..});` - this is where the bulk of our configuration will go. Once we start installing Grunt plugins, we will configure them inside of the JSON object parameter of the `.initConfig` function.
*   `grunt.loadNpmTasks('');` - every Grunt plugin we install needs to be loaded with its own `grunt.loadNpmTasks()` line
*   `grunt.registerTask(‘default’, []);` - finally, we’ll tell Grunt what tasks to run for a given command. By specifying `default` here, we’re telling Grunt what to run when we don’t provide it with a command.
    
Just for reference, when I say “with a command” I mean this from the command line:

{% highlight bash %}
grunt     //will run default
grunt command   //will run command
{% endhighlight %}

Now, lets start using Grunt!

### Minify All The Code!

Our first task will be to minify our CSS and JavaScript. There is a popular code minification plugin for Grunt known as `grunt-contrib-uglify` that we’ll use to do this.

Go back to the command line and install `grunt-contrib-uglify` as a `devDependency`:

{% highlight bash %}
npm install grunt-contrib-uglify --save-dev
{% endhighlight %}

Now we need to write our configuration for the plugin. In the case of `grunt-contrib-uglify`, we need to define what files we want to minify, and where we’re going to save them. Inside of `grunt.initConfig({ .. });`, add the following:

{% highlight javascript linenos %}
uglify:{
  build: {
    src: 'js/main.js',
    dest: 'js/main.min.js'
  }
}
{% endhighlight %}

Here we’ve told Grunt to go to our `js` folder, grab `main.js` and then minify and save it into the same folder with the name `main.min.js`. You can modify the `src` and `dest` values however you’d like as well.

Then, we’ll make sure to actually load the plugin:

{% highlight javascript linenos %}
grunt.loadNpmTasks('grunt-contrib-uglify');
{% endhighlight %}

And finally, we’ll add the `uglify` task to our `default` build process:

{% highlight javascript linenos %}
grunt.registerTask('default', ['uglify']);
{% endhighlight %}

The second parameter of the `registerTask` function tells Grunt what tasks will be run and **in what order**. As our builds become more and more complex, task order will be something to keep in mind.

Now make sure you have something to minify, because you’re about to see Grunt in action! Head back over to the command line and simply type:

{% highlight bash %}
grunt
{% endhighlight %}

You’ll see some output in the console. If everything went smoothly, you should see a `main.min.js` file (unless you specified something else in your build) inside of your main `js` folder. If you open it up and take a look at it you’ll notice that is indeed your JavaScript file, but minified.

### Compiling Sass

What if we wanted to compile some Sass? The process is surprisingly similar. We’ll use `grunt-contrib-sass` for this one. Install it like you would any Grunt plugin:

{% highlight bash %}
npm install grunt-contrib-sass --save-dev
{% endhighlight %}

Configuration is a breeze if you know how to write JSON:

{% highlight javascript linenos %}
sass: {
  dist:{
    options: {
      style: 'compressed'
    },
    files: {
      'css/main.css': 'scss/main.scss'
    }
  } 
},
{% endhighlight %}

After our `uglify` configuration, we create a `sass` configuration. Inside the config’s `dist` object, we define our Sass options - in this case compressed, so that our compiled CSS is also minified - and then files. If you’ve worked with Sass from the command line, you should understand what is going on. First we tell Grunt where our output file is going to go, and then what Sass (or SCSS) file we want to pull from.

Its interesting to note here that we are declaring these two files in the same line, rather than through separate `src` and `dest` properties. The writer of `grunt-contrib-sass` wrote the plugin that way, so that’s how we’ll have to use it.

Now load the plugin

{% highlight javascript linenos %}
grunt.loadNpmTasks('grunt-contrib-sass');
{% endhighlight %}

and finally add `sass` to your `default` build

{% highlight javascript linenos %}
grunt.registerTask('default', ['uglify', 'sass']);
{% endhighlight %}

Now when we run `grunt` from the command line, our JavaScripts will be minified and then our Sass files will be compiled and compressed. Pretty neat huh? Now we don’t have to do these tasks ourselves ever again - and we’ve only just scratched the surface! There are **thousands** of Grunt plugins for you to download and implement in your project builds. Odds are if you’re doing it more than once during your workflow, there’s a Grunt plugin for it.

So go ahead! Keep experimenting! In future articles, I’ll discuss how we can use `grunt-contrib-watch` to watch for changes to files and run Grunt tasks without us event having to go back to the command line. Stay posted!