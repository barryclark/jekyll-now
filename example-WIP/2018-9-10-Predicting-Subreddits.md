---
layout: post
title: Predicting Which Subreddit A Post Is From (Part 1 of 2)
---

Last week I finished and presented the third project in my Data Science Immersive course: Predicting Which Subreddit A Post Is From. It was a really interesting project because it introduced a couple of new topics and modeling techniques, namely Natural Language Processing, multiple types of decision trees, and working with APIs / web scraping.  My previous post was about scraping webpages' HTML and using it for data gathering. This one is going to be a broad overview of my project as a whole and then a bit more on the first challenge, gathering my data from reddit.



## The Premise

Some angry, vengeful programmer has contaminated the databases of Reddit! All of the archived posts' subreddit category data have been changed from the subreddit name to ``¯\_(ツ)_/¯.`` What a ghastly thing to do. Now, Reddit needs to hire an outside contractor (that's me!) to try to figure out which posts came from which subreddit and to return Reddit's database to its former glory.

They never really went into why the Reddit data team couldn't do it. I like to imagine that they're off trying to solve the ever-so-important problem of classifying posts as toxic or not. Or maybe it was a security thing, didn't want any other potentially disgruntled engineers messing with what's left.  Either way, it get's me a job so I'm happy.

---
The project had two goals:
1. Using Reddit's API, I needed to collect posts from two subreddits of my choosing.
2. I then used NLP to train a classifier on which subreddit a given post came from. Because I'm only using data from two subreddits, this is a binary classification problem.

It had a few other requirements as well:
- Scrape and prepare the data using the `requests` library
- Create and compare a minimum of two models, one of which must be a random forest
- Finished product must be in a Jupyter Notebook with my analysis for a peer audience of data scientists
- An 8 minute presentation outlining the process and findings, geared towards a semi-technical audience


<br>
## Gathering The Data!

### The Toolset
First and foremost I needed to use Reddit's API to get access to their data. From there I used Python and a few  assorted packages including: pandas, requests, and time. And, of course, I did all of my work in a Jupyter Notebook.

Reddit's API is fairly straightforward. For example, if I want the posts from [`/r/TalesFromTechSupport`](https://www.reddit.com/r/talesfromtechsupport), all I have to do is add `.json` to the end of the url: https://www.reddit.com/r/talesfromtechsupport.json . I then get a JSON file back that I can interact with much easier than if I was interacting with the straight HTML of the page.

The `requests` library is used to send and receive data from websites/servers using specific protocols (like `GET`, `POST`, etc).

I also imported the `time` library just so I could see how long it took to run things like the data gathering script or other cells.

## What was your process? Tell the reader about what you actually did - incorporate imagery, charts, etc.

Initially, I needed to see what I was working with so I did a simple call to the r/TalesFromTechSupport subreddit using the `requests` library. The code looked something like this:
``` python
URL = "http://www.reddit.com/r/talesfromtechsupport.json"
the_headers = {'User-agent': 'project3 Bot 0.1'}
res = requests.get(URL, headers = the_headers) #Tells the website who I am
the_json = res.json()
```    
From this I got back a JSON object which I saved to a file and opened in my current favorite text editor, [Atom](https://atom.io/). Going through the information for the first post, I noted all of the potentially useful (but not cheat-y) attributes that I might want to collect. I didn't really want to keep everything that it returned to me because it would just be useless data taking up space for no reason. I then stored the names of the attributes that I decided could be worthwhile in a list, like so:  
```python
features = [
    'subreddit', #target
    'url',
    'author',
    'domain',
    'downs', #downvotes
    'is_self',
    'is_video',
    'likes',
    'media',
    'num_comments',
    'num_crossposts',
    'num_reports',
    'selftext', #body
    'score', #total score = upvotes - downvotes
    'title',
    'ups' #upvotes
]
```

Now that I knew what I wanted, it was time to start collecting the data. The thing about Reddit's API is that it only returns 25 posts at a time. This meant that I was going to loop.  

The way to get more posts after the initial 25 is to add an argument onto the end of the url with the id of the last post you received. The new url looked something like `http://www.reddit.com/r/talesfromtechsupport.json?after=lastpost`. Reddit's JSON file conveniently has an `'after'` attribute in its data that you can pull out just for this purpose. In order to get the data I had to run the initial `GET` request, initialize my `pandas` DataFrame to hold my data, and then create a loop for each subsequent `GET` request. I also wanted to do this for each of my subreddits, so I made an extra outer loop for that. This next code block is pretty big in comparison to the previous ones.

```python
%%time

# %%time will tell me how long this Jupyter Notebook cell took to run.
# Due to the fact that each request had a 3 second pause built in, it took a
# little while

# This is the meat of the data gathering file.  It goes through and gets
# posts+1 pages of posts from each subreddit, pulls out the relevant features,
# adds them to a DataFrame and appends to that DataFrame until the loop finishes

posts = 50
# Arbitrarily choose 50 as a round number to get. It always stopped before that
# though

jsons = {'talesfromtechsupport':pd.DataFrame(), 'buildapc':pd.DataFrame()}
the_headers = {'User-agent': 'project3 Bot 0.4'}

for k, v in jsons.items():
    # k and v stand for key and value here. In this case, the key is the name of
    # the subreddit and the value is the DataFrame of information for the
    # subreddit.
    URL = "http://www.reddit.com/r/" + k + ".json"

    # The initial request
    res = requests.get(URL, headers = the_headers)
    the_json = res.json()

    # Setting up the first DataFrame and saving it into the dictionary
    pre_temp_df = pd.DataFrame(the_json['data']['children'])
    # Save only the relevant features
    pre_temp_df = pd.DataFrame(list(pre_temp_df['data']))[features]
    jsons[k] = pre_temp_df.copy()

    URL_EXTENDER = "?after="

    # Shows me what subreddit it is gathering from
    print(k, 'Iterations:')

    # The loop for each subsequent request to Reddit incorporating the ?after=
    for i in range(posts):
        last_title = the_json['data']['after']

        # Retrieve new data
        try:

            if last_title==None:
                break

            temp_data = requests.get(URL+URL_EXTENDER+last_title, headers = the_headers)
            the_json = temp_data.json()

            # Create the temporary DataFrame of information from this request
            pre_temp_df = pd.DataFrame(the_json['data']['children'])

            # If there aren't any posts contained in this go around, break out
            # of the loop, otherwise continue
            if (len(pre_temp_df.columns) == 0):
                break
            pre_temp_df = pd.DataFrame(list(pre_temp_df['data']))[features]

            # Add the current request's data to the rest of the collected data
            jsons[k] = jsons[k].append(pre_temp_df, ignore_index = True)

            # Wait for 3 seconds so as not to overwhelm Reddit's servers
            time.sleep(3)

            # Output what iteration just happened so I can know how far along it
            # is. Nice neat rows of 10
            if i % 10 == 0:
                print()
            print('%02d' % (i+1), end=" ")

        #If anything goes wrong I want to make sure to keep my data that I have gathered up to this point
        except _ as e:
            print()
            print(e, "Let's see what we've got!")
            break


    print()
    # Show how much data I actually collected for this subreddit
    print(k,' temp df shape', jsons[k].shape)
    print('\n\n\n')

```

That's pretty much it. All of my code for the data gathering script is there. I did save the DataFrames to `.csv` files in order to import them into my main project's notebook. The notebooks were separated so that I could run the data gathering script in the background while I was working on the main notebook.


## What did you learn/discover? (What was the outcome?)
Reddit has some other API thing that is called PRAW. A few of my classmates used this and apparently it was much easier to deal with than getting all of the JSON files.




## What are your remaining questions?
How can I get more than ~1k posts using the .json way?



## What would you do if you had more time?
If I had more time for this project I would've liked to collect more data for one. Regarding the data gathering script, I would've liked to have been able to play around with PRAW and see how that works.  Other students were able to generate more data with that than I was able to with the JSON files so that would've been cool.

Along with that, I'd want to potentially include more of the data that I had collected into my modeling and see if I could get better results that way. I also would like to explore more modeling options, be that other model types or fine-tuning the hyper parameters for each
