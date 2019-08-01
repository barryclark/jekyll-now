
# Motivation behind this blog?

Plenty of diverse topics/incidents we encounter everyday, of which some are so useful and we use the knowledge learnt from them very often. At the same time we often re-learn the same things due to lack of our forsightness in documenting the previously learnt knowledges. I had this bad habit of re-learning the same thing again and again and that costed me valueable time, energy and resource which could be easily avoided had the knowledge learned over time was documented.

But better late than never! I have decide to document each of the new topic encountered for:

1) my future references.
2) to save the time and energy of others by saving them from going through the same roler-coaster ride (not the funny one) I had to avail while learning something.
3) to motivate other poor souls in documentating and sharing their knowledge in order to build a stronger, richer learner community.

I started my journey towards data science around 5 years back during my PhD. I still remember how this poor soul (yes, this author) started his lessons in programming with printing "Hello world", adding "1+1" and in statistics with "mean, meadian, mode, simple linear regression, cetral limit theorem" and how he struggled in each stage before reaching to the stage of solving problems involving huge data-sets, complex algorithms etc. It took time (days and nights) and lots of futile internet search efforts (resulted in headache, frustation, demotivation) to learn the topics from scratch. It will be my pleasure if this blog can reduce such pain and frustration of the beginners and motivate them to take up data science and statistics as their primary career choice.

This domain is not meant only for statisticians, mathematicians or computer scientists. So I would like to use this platform to invite people from each and every domanin (yes arts, commerce, biology all) to come into data science.

# Target Topics / Readers

Yes, you have rightly figured it out already from the title of my blog. The topics covered here will be the ones that a beginner encounters during his/her/its journey towards data science: bits of statistics, programming, maths and machine learning. The topics may not be in sequential order (apologies in advance), but I assure you that all the major jargons will be linked to proper resources. As I am from a biology domain, may be, the examples chosen will be biased towards biology, but I will try to make the posts comprehensive for all. 

Yes I know you have already figured it out too that the posts will be targeted towards the beginners, so I'll deliberately start with very simple note, go slow initially and build-up gradually to little bit of equations and jargons. Most of the posts will be modular( i.e. big topics will be divided into smaller contents) and simple in language, so those who are already experts in this field may find it annoying but they are also welcome to share/contribute their knowledge to build a richer resource for the begginers.

# Who am I?

I am Subhadeep Das from Kolkata, India; a fresh PhD (May 2019) in Computational Biology from CSIR-Indian Institute of Chemical Biology. I did my bachelors in biotechnology and masters in bioinformatics (both from West Bengal University of Technology, Kolkata, India). I mostly interested in multi-view data integration (don't worry about what it is, it is simpler than it sounds) and multi-omics studies to decipher complex biological phenomenon. 

I am also into little bit of music (beginner classical guitarist), comedy movies (I only watch), sports (cricket, football) and ...... and..... and... everything else. Confused?? well u r not alone, I will always be with you   :) .

All right enough of introduction, see you in the upcoming posts (yeah right, you have to like or comment to show your presence ;) ).Till then, bbyeee!!  :) :D :)


```python
from bokeh.plotting import figure 
from bokeh.io import output_notebook, show
```


```python
output_notebook()
```



    <div class="bk-root">
        <a href="https://bokeh.pydata.org" target="_blank" class="bk-logo bk-logo-small bk-logo-notebook"></a>
        <span id="1001">Loading BokehJS ...</span>
    </div>





```python
from numpy import cos, linspace
x = linspace(-6, 6, 100)
y = cos(x)
```


```python
p = figure(width=500, height=500)
p.circle(x, y, size=7, color="firebrick", alpha=0.5)
show(p)
```








  <div class="bk-root" id="2ea96246-a49a-435d-a95e-cbc92527abc9" data-root-id="1002"></div>






```python

```
