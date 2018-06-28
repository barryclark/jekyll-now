---
layout: post
comments: true
---

Again, the goal for today is learn photometry and to perform some preliminary photometry on some of our own data. Essential in making that photometry as effective as possible is setting up Github properly for filesharing among the GRG collaborators.

# Github
This morning was again consumed with continuing to set up and learn Github. We were able to create an organization on Github called Gosnell Research Group that is owned by all of us (Rory, Marta, Dr. G, and me) that has a shared repository which contains all useful files. For instance, the [file](github.com/GosnellResearchGroupSummer2018/NGC6819) that I was using to learn photometry with photutils yesterday is in that repository.  What took longest was getting Rory and my computers to connect remotely to the Github repository so that we can edit our codes in atom on the desktop, which is convenient for testing code with the terminal. Marta has generally been doing her coding in a Jupyter notebook, but I am more comfortable using the terminal, and I believe Rory is too. I am now successfully able to upload, edit, and remove files in the Gosnell Research Group NGC6819 repository with the terminal and atom on my desktop, which allows me to. The next goal is make the GRG group its own blog we could possibly update once a week with progress across the group, but I haven't proposed this to my collaborators yet. Either way, I'm going to postpone setting that up in favor of getting some photometry practice in. 

# Photometry
While looking through the photometry code from the [photutils exercises](github.com/GosnellResearchGroupSummer2018/NGC6819) this morning, Marta was able to help me figure out something I didn't understand about the image code yesterday. I have figured out (mostly) where the data for the image came from that I got as the result for exercise one [yesterday](https://thom-ory.github.io/Day-Two/), which is talked about in the new [practice photometry text file](github.com/GosnellResearchGroupSummer2018/NGC6819) which will be continously updated as I work through the photometry exercises. 

### Exercise Two (cont.)
The next part of the exercise I have to do has to do with actually finding sources. After some fanagling I got the following two results, described in the .py [file](github.com/GosnellResearchGroupSummer2018/NGC6819). 

#### Exercise Two Results Pt.2 
<photutils.detection.findstars.DAOStarFinder object at 0xb1f937898>

The rest of this exercise would have, I believe, given me an image of the source mentioned above. Unfortunately, I never got the code to work.

# Conclusion
Photometry has proven to be frustrating so far. I think that going through this code and making it work is worth it, though, since I'll use this code to do all the photometry I can on our own data once I'm done with the exercises. Tomorrow, I'll start here.
