## Setting up jekyll on Mac OS X

If you happen to have Mac OS X device, it is a lot simpler to test your additions using the `jekyll` command line directly; you don't have to set up github pages, and you can still verify everything is fine.

To install `jekyll`, issue the following command in Terminal (I here assume you have the Mac OS X developer command line tools installed, which include ruby/gem):

```
$ sudo gem install jekyll
```

That will take a while. After that, `cd` into your `Haufe-Lexware.github.io` git clone (on your own fork obviously) and issue a 

```
$ jekyll build
```

This will throw a couple of errors due to missing gems; install them one after the other in the order they occur:

```
$ sudo gem install jekyll-paginate
$ ...
```

Eventually (and hopefully) your `jekyll build` will succeed. After the build has succeeded, you can do a `jekyll serve`, and after that, you can browse the site locally on [`http://127.0.0.1:4000`](http://127.0.0.1:4000).

**Note**: The `https_proxy` setting is also needed on Mac OS X if you're inside the Haufe intranet:

```
$ export http_proxy=http://10.12.1.236:8083
$ export https_proxy=https://10.12.1.236:8083
```

## Setting up jekyll on Windows

The short version of this is: It's complicated, and not actually advisable.

The most promising path to doing this is most probably to set up a Linux VM and do it from there; that involves setting up ruby correctly, which may also be challenging, but it's still a lot simpler (and more supported) than directly on Windows.

But you can try this:

## Setting up jekyll using docker

**Note**: This will work both on Windows and Mac OS X, in case you do not want to "pollute" your local machine with ruby packages.

If you have a working `docker` setup on your machine, you can use the prepackaged docker image by the jekyll team to try out the blog generation using that image.

Pull the `jekyll/jekyll:pages` image to get something which behaves almost exactly (or really close to) the github pages generation engine:

```sh
$ docker pull jekyll/jekyll:pages
```

Inside the docker Quickstart terminal, `cd` into your `Haufe-Lexware.github.io` fork containing your changes, and then issue the following command:

```sh
$ docker run --rm --label=jekyll --volume=$(pwd):/srv/jekyll \
  -it -p $(docker-machine ip `docker-machine active`):4000:4000 \
    jekyll/jekyll:pages
```

If everything works out, the jekyll server will serve the blog preview on `http://<ip of your docker machine>:4000`. More information on running jekyll inside docker can be found here: [github.com/jekyll/docker](https://github.com/jekyll/docker).

#### Using docker for Mac and Windows beta

Using docker for Mac and Windows beta, the command looks a little simpler, as `docker-machine` is not involved:

```sh
$ docker run --rm --label=jekyll --volume=$(pwd):/src/jekyll \
   -it -p 4000:4000 jekyll/jekyll:pages
```

Jekyll will then be served from [localhost](http://localhost:4000), just like from Linux.

## Setting up jekyll using Kitematic

If you are working with Kitematic (which has fewer proxy issues behind company firewalls than the Quickstart terminal), follow these steps:

First make sure the local copy of your Haufe-Lexware.github.io clone is located somewhere under your documents folder, for example:

`C:\Users\<username>\Documents\GitHub\Haufe-Lexware.github.io`

In Kitematic, click on the "DOCKER CLI" button (lower left), opening a power shell window.

Pull the `jekyll/jekyll:pages` image:

`> docker pull jekyll/jekyll:pages`

In this environment, you cannot use the mapping variables $(pwd) or $(docker-machine ...), so you need to enter two things explicitly:


- The path to your local repository in the following format, for example:

    `/c/Users/<username>/Documents/GitHub/Haufe-Lexware.github.io`

- The ip of your docker VM. To get this, enter

    `> docker-machine ip`

Now enter the following to compile the project and start the web server:

`> docker run --rm --label=jekyll --volume=/c/Users/<username>/Documents/GitHub/Haufe-Lexware.github.io:/srv/jekyll -it -p 192.168.99.100:4000:4000 jekyll/jekyll:pages` 

(replacing the path and ip with your values)

The web server should now be running, so start your browser at `http://<ip>:4000` to see the results. When finished, shut down the web server with `^C` in the power shell window.
