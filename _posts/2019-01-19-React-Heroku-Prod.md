---
layout: post
title: The easiest way to deploy a production version of your npm React app to Heroku
---

If you’re anything like me, you hate when you see this in your browser bar on your “prod” Heroku site:

![Makes me so mad](/images/react_heroku_prod/running_dev.png) 

Even if it’s a side project, you’d like to see the optimized build. There’s not a lot of information out there on deploying a production build to Heroku, and if you Google for a while, you’ll probably come across blog posts and Stack Overflow answers that _sorta_ answer your question, but not really, and nothing’s really explained very well.

I hope you find this a quick and informative answer! As always, if you have comments or want me to edit this, please feel free to shoot me an email.

## Get Heroku ready to host your application

### Login to Heroku, create host machine

I want this to be free of cruft, so if you’re looking for how to ready Heroku for an app, check [their own documentation on setting up the CLI app](https://devcenter.heroku.com/articles/heroku-cli). For now, just install it and log in so you can push the build to Heroku. Once you’ve done that, go to your dashboard and create a new machine for your app. Name it whatever you want.

![Create Heroku App](/images/react_heroku_prod/create_heroku.png)

### A lone config variable

You’ll want to turn on the npm production variable for Heroku. This can be done two ways, both of which are pretty easy. In your Heroku machine’s dashboard, go to Settings -> Config Vars -> Reveal Config Vars, and add a new one like this:

`NPM_CONFIG_PRODUCTION` : `true`

That’s the only one you’ll need. This option stops npm from looking through and building developer dependencies. It’ll make your build a little faster.

## Make a new branch for your build

Normally, you send a build to Heroku with the following command:

```bash
git push heroku master
```

But the problem with this is that if master isn’t already your production branch, you’re just sending your test/developer code to the production server. In my side projects, I use master as a place to fold in feature branches, but that doesn’t mean it’s ready for the world.

So let’s make a new branch called `deploy`:

```bash
git checkout -b deploy
```

If you haven’t already, be sure to add the Heroku remote so you can push code to it later:

```bash 
heroku git:remote -a list-github-issues
```

Now that we’re in the deploy branch, let’s make some changes that won’t effect our normal dev environment.

## One new dependency

First, we’ll need a package called `serve`, which is a middleware for serving the files of a static site or single-page web app.

```bash
npm install serve
```

If you find this package useful, you could also install it globally. I’m keeping it on a per-app basis. `serve` will now be in your package.json and the lock file.

## Configure npm commands

Finally, we have to edit commands in `package.json`. Nothing extensive, we just need to be able to tell Heroku what to do when it receives a push from us.

Open package.json and edit or create the following lines under “scripts”:

```json 
"scripts": {
	"start": "serve -s build",
	...
	"heroku-postbuild": "npm run build"
}
```

When Heroku receives a push to its master branch, it builds the application from the code that lives there. This can involve `npm install`, finding cached files, etc. If we wanted to put more work into this, we could stop Heroku from doing this initial build, since it isn’t exactly what we’re looking for anyway, but I’d rather have as few steps on my side to get the site up and running. 

Instead, we’re telling Heroku to run `npm run build` _after_ it does its initial build. If you peek at the npm docs or that trusty warning in your browser from before, you know that this command builds an optimized, production-ready version of your app. 

Still, Heroku will run the build from the src files instead unless we overwrite the “start” command. (This is why we made another branch, it would be annoying to have to switch this back and forth or add a “dev” command to use npm normally on your own machine.) 

Now that we’ve setup the commands, imagine Heroku is running this (highly simplified) chain of events:

```bash
npm install # make the dev build
npm heroku-postbuild # make the prod build
npm start # run the app
```

Which, if we replace those commands with our new ones, become:

```bash
npm install # make the dev build
npm run build # make the prod build
serve -s build # run the app (from the /build folder)
```

**Again, this could probably be way more efficient** since we’re building the application twice, but we’re sacrificing computer-time for people-time, and for this, I don’t mind one bit.

## Push your code

All that has to happen now is a push to Heroku to get things started, just make sure you’re **pushing to** Heroku’s master branch **from the deploy branch**.

```bash
# format: git push [remote] [selected branch]:[remote branch]
git push heroku deploy:master 
```

Watch it build and open your site, then check your extension! You should be up and running with a prod build.

![SUCCESS](/images/react_heroku_prod/running_prod.png)
