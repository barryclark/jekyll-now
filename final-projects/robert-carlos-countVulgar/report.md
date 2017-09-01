#Pop Music gets explicit


### What is the worst thing possible in the music industry?

It’s 1956, and a young man is performing one of his chart topping hits live on national television on “The Milton Berle Show”.  The whole country of USA goes crazy, with television critics claiming the performance was despicable due to it’s “appalling lack of musicality”, it’s “vulgarity” and “animalism”.

![elvisPresley](https://s-media-cache-ak0.pinimg.com/236x/6b/f8/b3/6bf8b38d73723c91baf232ded1346b53.jpg)

Even the church had something to say, sending out a headline, “Beware Elvis Presley”.  The young man, Elvis Presley, had performed on live television and did something that was obscene at the time, move his hips back and forth.  He would go on to become one of the most influential artist in American music history. 

A couple years later, a new band comes to the world stage and enchants millions with their nitty gritty musical lyrics, ecstatic onstage presence, and do what they want lifestyle.  While other bands tried to keep their public image as clean as they could, these guys didn’t care what their fans thought about their way of living, in which they abuse alcohol, marijuana, heroin, and a whole host of other drugs.  The Rolling Stones would turn out to be a controversial band, with many believing them to be devil worshipers, that would last the test of time all the way into the modern day.

![rollingStones](https://upload.wikimedia.org/wikipedia/en/2/2b/Beggar_Banquet.jpg)

Flash forward to more recent trends in music, and you have songs with explicit language, about all kinds of sex, killing others, doing drugs, idealising women, etc putting to shame with songs of years prior have said within the lyrics.  Not just any music but many of the top billboard hits that garnered plenty of airplay on the radio.  The public seems to have gone complacent with the taboo ideas of years before.

Me and my co-researcher decided to look into the music industry to try and find out if there was an actual increase in raunchy, adulterated themes in the most popular music.  In order to have an actual measurement of any possible change we settled on analysing the frequency of profanity and curse words.  To us it seemed that there had to have been some sort of increase in explicit songs becoming popular, because if you listen to a song from 1965 and a song from 2015, it is evident that there is a difference in the subtleties of old genres and the straightforward approach of today's top hits.

### So what did you guys find out?
Well, from the initial data we gathered we were wrong. I'm talking about the time span from 2000 - 2015, in which we had the full lyrics of each top ten song of every year.  This was surprising because out of the 150 songs we assumed that more swear words would appear in the later years because of the increase of rap artists that have become more mainstream than ever before.  Thought there was an increase in swear words in that time span there was not much of a difference in use.  The increase can even be attributed to an increase in songs being published that include more swear word than usual.

After we got the results back from that range of years, we thought about it and chose to scan songs from a larger range, even though our data showed we were wrong.  

Originally we thought of using the first range of years because it was a small enough range that we could copy each songs full lyrics into a text file by hand.  Thanks to the help of our professor though, we found out that it was possible to use the api of a music lyric website to get the lyrics as a direct input into our existing python script.  We ran into a problem with getting the api to download all of the lyrics for each song that was in our list.  Musixmatch was the best source we found for getting the lyrics but we were only given access to about 33% of the lyrics of each song, so that was a bit of a setback. 

Now armed with over 50 years of top 100 songs, although only partial lyrics, we went on to analyz the large list of lyrics with a python script(so large that github can only show it in raw format).  

What were we gonna classify as explicit words?  Obviously we were gonna use the usual swear words that we hear every day (not gonna say which ones exactly), but that only gave us a handful of "colorful" words while we were sure that the lyrics contained more than just the ones we thought up.  We were able to find 3 list of banned words all from <insert site from where>, a reputable site for fetching the list of swear words. 

Were we surprised or what, when we saw that 1 list alone contained more the 700 words, we couldn't believe that there were that many curse words in existance.  Yes, some of those words were the same just written with different symbols, that still means a cr** load of explicit words(yes, cra* is considered a dirty word).

This analysis showed us that we were correct in our original hypothesis, in which we believed that popular music has beccome more and more explicit.

#### Frequency of explicit curse words
<div>
    <a href="https://plot.ly/~rsjudka/6/" target="_blank" title="" style="display: block; text-align: center;"><img src="https://plot.ly/~rsjudka/6.png" alt="" style="max-width: 100%;width: 1000px;"  width="500" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="rsjudka:6"  src="https://plot.ly/embed.js" async></script>
</div>

So from the [graph above](https://plot.ly/~rsjudka/6/) you can see that most of the curse words were used in the more recent years towards the right.  Not only did the frequency of previous curse words go up, but new ones that had not been used before also recieved an increase in use.   

This [next graph](https://plot.ly/~rsjudka/2/) shows the total count of curse words used each year, an even better visual of the increase in curse words. The only caveat of our data is that the lyrics used for the larger range is only the first part of each song so it's not as accurate as it can be.

<div>
    <a href="https://plot.ly/~rsjudka/2/" target="_blank" title="" style="display: block; text-align: center;"><img src="https://plot.ly/~rsjudka/2.png" alt="" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="rsjudka:2"  src="https://plot.ly/embed.js" async></script>
</div>
*The words we considered as 'banned words' were compiled from 3 lists provided by Google, Facebook, and Flickr. We did this for two reasons. The first was to remove any bias we had towards specific words. The second was to expand on the various spellings of our vulgar words and include any words from the past that we may not have been familiar with. To see each list, [click here](https://github.com/rsjudka/countVulgar/blob/master/banned.txt), or [here](https://github.com/rsjudka/countVulgar/blob/master/banned2.txt), or even [here](https://github.com/rsjudka/countVulgar/blob/master/banned3.txt). 

### History of swearing
Curse words are as old as the english language, and so have become, although controversial, a large part of American culture.  Many believe that profanity is the worst kind of language that can be used, due to it’s aggressive meaning and negative connotations.  The crutch of the inarticulate, the weapon of the uneducated, are just some of the descriptions given to swearing.  The way in which we use language gives other people a look into what kind of person we are and what is our character. In other words if a person uses explicit language, his peers look at him as a person that has lazy speech due to the fact that he can not come up with anything more creative.  Even the bible has various quotes stating not to use foul language. 

On the opposite side of the argument are those that believe that there is absolutely nothing wrong with cursing and it’s a very useful part of the English language.  Their thinking is that curse words have a use in giving a sentence or thought an extra punch that makes whatever point that is trying to be explained more emphasized.  A publication in March of this year from [BBC](http://www.bbc.com/future/story/20160303-the-surprising-benefits-of-swearing), described some of the benefits of swearing and why it's not too bad.  

I personally believe there to be an actual benefit to curse.  It helps relieve pain and stress when, for example, a heavy box falls on my foot and I in turn drop a F-bomb, it allows you to release your frustration in the form of a word.  In the same article from BBC, a study in which two participants were told to place thier arm into a bucket of ice water, showed that swearing acted as a hypoalgesic, pain lesener.  One group was told to yell out with profanity while the other group was told to shout out with clean language.  Another aspect that was noticed was that the heart rate of someone that uses swear words goes up leading to believe that there is an emotional response to using banned words(that study can be found [here](https://www.ncbi.nlm.nih.gov/pubmed/22078790)

Whether or not swear words are an negative part of english language, one thing is for sure, curse words are becoming less and less of a taboo thing to say in music.  Plenty of chart topping singles, and albums as well, contain explicit language and content, and it seems like it's only going up.


### The extras
Also, if you're further interested or wanted to use some of our data for some other reason, we have compiled a huge-ish folder of as much data we ca pull and organized in a ton of different ways. You can find all that data [here](https://github.com/rsjudka/countVulgar/tree/master/data).
