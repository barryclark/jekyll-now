---
layout: post
title: New PyPI Package - youtube-search
---

I've been working on a project recently that would allow a group of friends to collaboratively create a youtube playlist without any app or sign in. You basically create a 'room' on a device connected to a TV, see the room code, join the room from your phone, and then add videos to it.

This appeared to be a great opportunity to leverage the Youtube Data API, since this has a search function that allows you to perform a search like you were on youtube, then return various information about the video so that you could make a form that would let you add videos within the web app.

Really straightforward, or so it would seem. 

## First Attempt 

After struggling to relearn Javascript to perform http requests and return results in the browser (I really wish everything like like Python's requests...) I had a minimum viable product for my friends to test out.

Eveything was working, there was a form that would perform an ajax request to my server, get the search results, and post them on the browser.

Within minutes, we had hit the rate limit. This was strange, because it was just a couple of us performing a couple searches. Looking into the Google Developers Console, a single project had a daily quota of 10,000 query units, which seems like plenty since read operations only take 1-2 units depending on what data is returned. Ten thousand-ish searches should be plenty for quite a few users, and not be used up by the three of us.

Google has decided that it's youtube search would cost 100 units per search, plus any of the data that came out. This meant the web app was burning through ~100-103 query units per search, which meant it would only get <100 searches per day, which was definitely not enough.

Looking around online, I saw a couple other web apps with this same issue, and the solution seemed to be either requesting a higher quota (which used to be in the 1,000,000 range), caching responses, or using multiple project codes (so cycling through API keys). THe only one that seemed feasible was cycling through keys, but this felt like getting around the developer TOS so I decided to look elsewhere.

## Solution: youtube-search

After trying a couple other packages (all which used API keys), I decided to follow a statement I heard on some security podcast many months ago:

> "If your application has a website, it has an API. It may not return JSON, but it has an API"

That's a bit paraphrased, but the idea stands.

Using Python's requests library (woohoo!) I performed a GET request to the youtube search endpoint, collected the html response, then parsed it with Beautiful Soup to pull the resulting video imformation from the results page.

This worked!

To make it easier to use for my project, I put it together in a package and uploaded it to PyPI.

To use it in your project, use:

```pip install youtube-search```

And then in a python script:

```python
from youtube_search import YoutubeSearch

results = YoutubeSearch('search terms', max_results=10).to_json()

print(results)
```

I'll be adding more functionality over the next few weeks, so please submit an issue if you think something is missing. The critical value for me is the youtube_id value, but I can understand why others would be useful as well.

Feel free to try it out, break it, and let me know if you like it! I definitely need to add some documentation to it, but it definitely works for something hacked together to solve a problem.

[PyPI Link](https://pypi.org/project/youtube-search/)

[Github](https://github.com/joetats/youtube_search)
