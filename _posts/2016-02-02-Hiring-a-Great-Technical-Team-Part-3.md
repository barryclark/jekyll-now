---
layout: post
title: Hiring a Great Technical Team (Part 3/3)
excerpt_separator: <!--more-->
tags: [hiring, team creation, job description, candidate search]
---

## Keeping track of candidates

So you have built a nice hiring pipeline: the job description is on point, recruiters are out there bringing in relevant, filtered CVs, you have the questions and 
checks to get a good assessment of incoming candidates. 

So you are there, right?

Well, actually no!
It is now that you need to be on top of the situation and keep track of things. 
It would be more than a pity, after getting into the trouble of sourcing the best in the market, to just be disorganized and take weeks to reply. 

From a candidate's point-of-view there is nothing worse than an employee which takes forever to go from one step of the process to the next. 

Hmm, coming to think of it, there is worse: actually showing up for the interview and finding the interviewers not knowing why you (or they) are there.

You should have 3 main goals to keep the pipeline running smoothly:

* All participants/interviewers are notified and prepared in advance.
* No dependency on the availability of any single team member (i.e. no single points of failure) 
* Easy access to the details of all candidates currently in the pipeline: their CVs, how they did in previous stages etc  

### Being prepared 

To be honest, I should not even be mentioning this, as it feels a little bit like stating the benefits of breathing. 

However, it has happened to me on a number of interviews (as an interviewee).
The interviewer shows up with a freshly printed CV and no separate notes. 
Or at times, without even that, just hands in the pockets, and trying to figure out the next question.

No!
Prepare, prepare, prepare!
<!--more-->

Being confident in your interviewing and "interrogation" skills is one thing; for sure you will have plenty of time to 
judge the candidate's character.   

But don't just walk into an interview without some notes on your notebook (or at least on the margins of the CV).
This means that you have actually spent some time going through the CV, at your own pace and preparing a set of topics 
you want to focus on.  

This also means that everyone assigned as an interviewer should have early and easy access to the candidate's CV.

### ...and Man created Git!

To keep track of candidates you could go for a dedicated piece of software or some expensive SaaS HR solution.
  
Or you could use what is readily available to you, like the humble Git.
 
Think about it:

* Each new candidate is a pull request (PR).
The PR contains the candidate's CV and possibly code submission.
* All team members (or even interviewers from other teams) are added as reviewers
* You keep track of the progress with PR comments
* Eventually the candidate either accepts the offer (merge) or declines (reject).

This way everyone keeps track of things and, as an added bonus, you have an easy-to-access repo of all candidate and team 
member CVs.  

#### Repo layout 

One possible layout of the repo could be as follows

```
candidates-repo (master)
   |-README.md
   |-delivery_team_1
       |-README.md
       |-john-doe
           |-john-doe-cv.doc
           |-john-doe-code-submission.zip
       |-james-bonaparte
           |-james-bonaparte_acme-recruitment-agency.doc
           |-james-bonaparte-code-submission.zip
   |-foo_team
   ...
   |-someother_team
   ...
```
So the master contains 

* At the top level there is a cross-team README, perhaps laying out some rules of play.
* Each team can have their own specific README.
* Each candidate (and eventually team member) ends up in their own sub-folder.
* CV files could potentially be renamed to indicate the source of them (i.e. recruiter or direct referral) 
 
Let's say that a new candidate, Jane Superdoe, comes in.

We then create a branch `jane-superdoe` to modify the repo as follows and create as PR on the back of that.

```
candidates-repo (jane-superdoe)
   |-README.md
   |-delivery_team_1
       |-README.md
       |-john-doe
           |-john-doe-cv.doc
           |-john-doe-code-submission.zip
       |-james-bonaparte
           |-james-bonaparte_acme-recruitment-agency.doc
           |-james-bonaparte-code-submission.zip
       |-jane-superdoe
           |-jane-superdoe_another-recruitment-agency.doc
   ...
```

If at a later stage Jane submits an exercise, the PR can be updated with a push to the branch.   

#### Initial impressions

Once the PR has been created and reviewers added, team members can start adding their initial comments from a quick read 
of the CV.
These can be anything (positive or negative) that they would want highlighted during the interview process.

These comments will work as a memento for anyone who will conduct the interview (phone or in person). 

For example

Team member 1

> * Why is he changing jobs every 1.5y on average?
> * He managed to become tech. lead 4y after graduation. Why change?
> * Looked him up and his GitHub account shows no activity (https://github.com/foo_bar)

Team member 2 

> * Technical experience looks OK, if a little 'old school'.
> * Agree with Team member 1 on the short length of his previous jobs - would be good to understand why they have been so short.
> * Difficult to tell whether his last two jobs delivered into production whilst he was working there. Has he ever got something into production? If so, what challenges did he face doing that? If not, why not?
> * What size are the organisations that he has worked at? Has he got experience of working at a large organisation?


#### Interview debriefing

After taking an interview, interviewers can write their debriefing notes for everyone to see.

If the process is multi-stage, these can help focus consequent interviews

For example

> ##### Phone interview debriefing
> 
> **Current role**
>
> * He started as a front-line engineer with a client and then moved to be the first person in his team.  
> * 75-25 between development and admin.
> * His current tasks include sitting with Scrum master and setting up next sprint goals for his team of 4 Java devs.
> Says he is also coordinating with front-end team of 4 devs.
> * Team is planned to grow to 6 people. 
> 
> **Personal**
>
> * He wants to change because he feels the role or company is too small for him, needs space for career growth.
> * He does not like the legacy aspects of the architecture, which were decided 3y ago.
> However he says that he has worked and designed it from day 1, he considers this position his biggest achievement to date; so there is some ambiguity in his CV as well as his intentions there.
> Asked how he would improve it from a clean slate, he described something similar but with slightly different technologies.
> * Asked what is his biggest frustration he mentioned shipping releases.
> However he could not offer some complete vision/idea on how this could be improved.
> * He would ideally want to work on a BigData project but not quite sure why, most probably because another team in his company are.
> 
> **Overall**
>
> * He appears to have become the de facto team lead in his team due to being there from day 1, rather than pure seniority or technical skills.
> * He also gave me the impression as someone who gets frustrated with (or complains about) stuff but does not have a clear idea or vision on how to solve the problem.
> * I would say **no** due to knowledge (or lack of) and implied character traits.
> He would probably be much better staying in his current role (where he is already above his level and established) and maturing, rather than take the plunge and be faced with disappointment.

#### Assignment review

In a similar fashion, if there is a code or assignment review involved, you can also keep notes in the PR.

These will feed back to the next step (e.g. face-to-face discussion of the assignment)

For example

> ##### Test notes
> 
> * Neat code. Couple of unused imports
> * Builds out of the box in maven inc tests passing
> * Single naive algorithm - at least it's easy to understand.
> * Caches results of a calculation, but no attempt to create a cache that could be reused for another calculation
> * Has thought about what the value bounds of the unit tests should be
> * Hasn't considered different return types, multithreading or multiple algorithms
> * What happens if you pass a really large value in. No Error handling


## Parting thoughts

As said before, hiring talented people is what can make or break your team or project. 

It should never be an afterthought!
 
Hopefully these articles will prompt you to see the whole hiring process under a new light, remove the pain points 
and use the tools readily available to you to improve it.

Happy hiring!

*This is the final part of a 3-part series of articles*

*[Part 1][1]*
*[Part 2][2]*



   [1]: http://sgerogia.github.io/Hiring-a-Great-Technical-Team-Part-1/
   [2]: http://sgerogia.github.io/Hiring-a-Great-Technical-Team-Part-2/