---
id: 138
title: Enter Messenger!
date: 2017-06-13T05:55:04+00:00
author: Scott Shapiro
layout: post
guid: http://www.scottshapiro.com/?p=138
permalink: /how-i-built-solar-messenger-bot-v1/
ampforwp_custom_content_editor:
  - ""
ampforwp_custom_content_editor_checkbox:
  - ""
ampforwp-amp-on-off:
  - default
instant_articles_force_submit:
  - "1"
dsq_thread_id:
  - "5889052791"
instant_articles_submission_id:
  - "103361320302204"
dpsp_networks_shares:
  - 'a:2:{s:9:"pinterest";i:0;s:8:"facebook";i:55;}'
dpsp_networks_shares_total:
  - "55"
dpsp_networks_shares_last_updated:
  - "1553829605"
image: /newblog/wp-content/uploads/2017/06/18765781_1696016267359802_5971401537594786070_n.jpg
categories:
  - "I'm building a bot"
---
_I recently built a Messenger Bot. This is the fourth part in a series describing how I built it and what I learned._

[After implementing Alexa](http://www.scottshapiro.com/how-i-got-started-building-a-messenger-bot-with-alexa/), I realized that it wouldn&#8217;t be a huge step to [do something similar on Messenger](http://www.scottshapiro.com/why-i-chose-messenger-to-build-a-bot/). After all, push notifications was my top requirement.

## Thankful for tutorials

I had no experience building bots, let alone anything modern. It&#8217;s been over a decade since I graduated with my degree in Computer Science and I&#8217;ve never worked as a software engineer.

So I jumped straight into a [step-by-step tutorial](https://blog.hartleybrody.com/fb-messenger-bot/) about building a Messenger bot on [Heroku in Python](https://devcenter.heroku.com/articles/getting-started-with-python#introduction). I know enough Python to be dangerous. I heard about this Heroku platform as a service thing for years and this was my chance to try it.

Heroku was a breeze to setup: creating keys, a CLI environment, integrating with git (I never used this before, just SVN). Then I created a Messenger bot, linked it to a Page and App, and auth&#8217;d it.

The next step was to hack the tutorial script and combine what I was able to do with the Alexa skill.

So I was able to pull solar data by manually executing python code in the CLI, but how would I push notify? How could I do this in the &#8220;free&#8221; dyno tier?

## Now, [redis](https://redis.io/)

I had to figure out a data model for my bot so I could cache solar data. I didn&#8217;t want to have to query the Enphase API if I didn&#8217;t need to. The free developer tier has fairly low limits.

Creating a database and writing queries was the last thing I wanted to do. It&#8217;s also the thing I&#8217;m most experienced in over the last decade. So I googled around and all signs pointed to using a key-value store.

I discovered the redis revolution. Turns out this software is a big deal &#8211; there&#8217;s even a [convention in SF about it](http://redisconf.com). Of course, user turnkey Heroku offers a redis package that I simply had to add to my requirements.txt.

It&#8217;s pretty easy to store and retrieve in redis using hashed keys `hset()` and `hget()`. I set it up using a Heroku worker so that it would run asynchronously and not stall the rest of the Python code.

So now I had some efficiency. How would I schedule notifications? How do I cache this data?

## Caching solar power data in Redis

I scheduled a job to pull from the solar system API every 10 minutes and store in redis. That way it would avoid hitting the Enphase solar power API too often in case this bot becomes super popular or gets DOS&#8217;d (yeah right).  
<img src="/wp-content/uploads/2017/05/Screen-Shot-2017-05-28-at-5.31.24-PM.png" class="alignnone size-medium wp-image-144"/> 

The essence is pulling from the solar power API and storing those values in Redis

    r = redis.from_url(os.environ.get("REDIS_URL"))
    def setsolar(key,user_id,system_id):
    request =
    Request('https://api.enphaseenergy.com/api/v2/systems/'
    +system_id
    +'/summary?key='
    +key
    +'&user_id='+user_id)
    response = urlopen(request)
    solar = json.loads(response.read())
    r.hset(user_id,'energy_today',solar['energy_today'])
    r.hset(user_id,'current_power',solar['current_power'])
    

## Enter scheduler

This was the easiest but most valuable part. I wanted to be notified once a day about my power output. How many Kilowatt hours I&#8217;m producing at the moment and how many I produced throughout the day.

Thinking back to my prior life as a Computer Science student, I started reading about cron jobs and other scheduling tools. Turns out Heroku offers a simple scheduling GUI that let&#8217;s you execute a script one-time or on a schedule.

Everyday at 11am, the Heroku worker hgets the most recent production data and packages that as a message:

    r = redis.from_url(os.environ.get("REDIS_URL"))
    def getsolar(key,user_id,system_id):
    message = str(r.hget(user_id,'energy_today'))
    + "Wh were produced today. "
    + str(r.hget(user_id,'current_power'))
    + "W this moment."
    return message
    

This is what my conversation looks like. One message for each day, each with a push notification. It&#8217;s more of a monologue actually, but that will change.  
<img src="/wp-content/uploads/2017/05/img_8766.png" class="alignnone size-large wp-image-139" sizes="(max-width: 442px) 100vw, 642px" /> 

# Now I know my power

This bot solves for the 80/20 base case &#8211; I can confirm that my solar is working on a daily basis. It only does that one thing. I can&#8217;t pull weekly or monthly stats. I can&#8217;t ask it questions. It won&#8217;t work for anyone else&#8217;s solar system (yet).

I also haven&#8217;t uploaded my code to GitHub (this would be my first contribution).

_Next post I&#8217;ll share what else I&#8217;m thinking of doing next. What ideas do you have? What&#8217;s obvious that I&#8217;m missing?_
