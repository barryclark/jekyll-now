---
layout: post
title: Docker Compose to host Django APIs
image: /images/django-docker.png
---

Docker compose helps to simplify a lot of steps in hosting the APIs especially with auto reload. Details on how I've set up the environment will be posted at another time.

##### The Problem
But being it the first time I've deployed anything with Docker Compose, I've made a silly mistake, which drastically slow down the performance. At one point in time the API is **60x slower than normal**, and I've checked the code, nothing seems abnormal. You can imagine what level of frustration I have with that.

This post is simply a reminder to myself not to repeat the simple mistake again.

**So here it is:** every time we do any updates that are related to Database in Django we will need to at least apply a migrations. And how i usually do that (**api** is the service that i need to run command on):

{% highlight ruby %}
docker-compose -f docker-compose.yaml -f docker-compose.production.yaml run api ./manage migrate
{% endhighlight %}

What it does is it will create another container and run the command execution there to migrate the django. However, I didn't know the container will stay there if you don't do any thing extra.   

So it turns out, with only all these supposedly one time commands, I've ended up to have tens of ghost containers... And the server does not take it so well. The solution is simply to stop and remove all the unnecessary containers. 

So simple note, next time any one who do 1 time command on docker-compose, please do add the `--rm` flag like this:
{% highlight ruby %}
docker-compose -f docker-compose.yaml -f docker-compose.production.yaml run --rm api ./manage migrate
{% endhighlight %}

At least, it won't cost you hours or days to figure out why suddenly your APIs are supremely slow. 

##### Enhancement
Now the above commands does work now. However, it's quite tedious to keep repeating `docker-compose -f ...` every time you want to run a command.

Luckily we have `alias` to the rescue. With this, we can simply assign alias for the repeating command. 

So first open your `.bashrc` for editing: `nano ~/.bashrc`

Add these lines at the end of the file (and remember to change the paths to the correct paths you have, as well as the service name **api**)

{% highlight ruby %}
# Add alias for docker compose command
alias docker-prod="docker-compose -f /path/to/docker-compose.yml -f /path/to/docker-compose.production.yml"
alias docker-run-api="docker-prod run --rm api"
{% endhighlight %}

Save `.bashrc` and apply its effect by: `source ~/.bashrc`

With this set up, you can now use much shorter/prettier commands such as:

{% highlight ruby %}
# Restart services
docker-prod restart
# DB migrate
docker-run-api ./manage.py migrate
{% endhighlight %}

These are just tips right now, will try to come up with a full tutorial on setting up the environment next time. Have fun!`
