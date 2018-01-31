---

layout: post

title: Creeping People Out at Scale to Get a Job

---

![ghost](/images/ghost.jpg)

About 8 years ago (I know, writing this as the opening means I have to update it each year) there was this [story.](https://mashable.com/2010/05/13/job-google-ad-words/)

Distilled, it basically says a dude created an Adwords campaign specifically for executives that will Google themselves. It was clever and in the end got him a job.

I decided it might be fun to try and take that idea to a whole new level: being creepy at scale.

The original campaign the dude created was only for 6 people. Anyone who has ever been unemployed will tell you that you need to spread that search out WAY more.

The issue is that his system worked because of how personalized it was.

Is it possible, using only Adwords, to target 10,000 people and still have the ads be personalized while also not taking every waking second of your day to set up?

Let’s find out!

Step 1: Get a list of names
---------------------------

This is the part I can’t really automate or scale — mostly because it’s specific to your industry and what kind of job you are looking for. In general you need a list of people who would possibly Google themselves as well as be in a position to offer you a job.

Step 2: Setup Adwords
----------------------
When dude set up his 6 person experiment he probably created an adgroup for each person and wrote a personalized ad for each one. This would take a lot of time when ramped up to 10,000 so let’s use a much easier method.

First, we use a spreadsheet and Adwords Editor, the desktop application to get all the names into Adwords as a list of keywords. Creative use of append and replace can help turn all the names into broad match modified. You could also use exact if you want to be safe but I generally start more broad. This means if the person types: Kole McRae is Awesome (because I totally am), your ad will still show.

This is all in a single adgroup. Set the bid nice and low and make sure the location targeting makes sense to who you are going after.

From here you could go the easy route and use keyword insertion in the ad and call it a day. In the example of just the person’s name that will work fine. Since I am trying to teach a lesson on scalability though let’s pretend you want to use other keywords such as: “+name +awesome +jobs” or something weird like that along with a bunch of others.

That means your ads would say the whole keyword which is just dumb. We also want to be able to use parts of the name if we want. For example using just the first name in the headline but the full name in the description. Freedom and all that!

To do this we need to use business data.

Step 3: Setting up business data
---------------------------------

We are going to use the power of ad customizers! You can find more information on them by [clicking here.](https://support.google.com/adwords/answer/6072565?hl=en) In general they are a great way to make ads that scale. You can take a piece of data, such as a keyword, and then create attributes that can be used in the ad.

As a simple example my name could be the keyword as +Kole +McRae and the {firstname} attribute would be Kole and the {lastname} attribute would be McRae.

To do this you need to create a csv that includes all this information.

The easiest way to set this up is the have the first column be keywords and then use some simple excel formulas to take the first name in the next column and last name in the third.

For more specific details on setting up the file simply go [here.](https://support.google.com/adwords/answer/6093368)

That page also has information on how to add the data to your ads.

This way you can have a single adgroup with all the names you want to target and only a couple ads that you can set to rotate and hopefully find the best performing ones.

Step 4: Landing page
--------------------

You didn’t think I would let you off that easy did you? Let’s say you skipped most of the above and just used keyword insertion, that’s fine. The next step is making sure the landing page is personalized.

I found the easiest way to do this was by pushing a parameter into the url. This can be done at the keyword level. Meaning if I use +Kole +McRae I can have that link to a url with “?name=Kole” at the end. Another method is to push the keyword into the url using the keyword parameter. The second option isn’t as scaleable as the first, but takes way less time.

Once you have that in the url, putting it into the landing page can be done through several methods. If you use Unbounce or something similar I believe they have a tool that does it automatically.

If not, you can use a little javascript magic that basically says “If name= is in url, change H1 to include text of name” and make sure the formatting makes sense.

All done
--------

You now have a single campaign and adgroup that will target 10,000 people and use their name not only just in the ad itself but also on the landing page, making it seem hyper personalized. You can take any of the concepts above further to include things like business type, etc. You can also customize the landing page on stuff like that. Eg. If the person works in advertising have advertising in the ad and on the landing page along with their name.

Next idea: using their email address (if you can get it) to show them ads on Facebook that are customized to them. You could also use Gmail ads to show up in their inbox along with the search ads.

Creepy eh?
