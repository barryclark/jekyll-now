---
layout: post
title: Hiring a Great Technical Team (Part 2/3)
excerpt_separator: <!--more-->
tags: [hiring, team creation, cv screening, candidate assessment]
---

## "Gathering" stage

### CV screening

So, you finally have CVs coming in! Woohoo!!

Either in a trickle or like a flood, you now need to start sorting them out.
But what do you look for?

Well, this is a little bit like "what is your favorite food". 
There is no right or wrong: 100 people will give 101 different answers, all of them valid! 

CV layout, recommended length, level of detail, keywords,... all differ per market and even IT industry.
There is already a wealth of information on what a good CV should [contain][2] in general.
Not to mention that you need to cross-check the technical content against the role's requirements. 

I am only going to highlight a few things, which I pay attention to (in addition to the purely technical content)  
     
* *Language and syntax*
   Handing over your CV, is like going out on a date: you need to polish the dirt off the diamond to shine. 
   So, has the candidate spent some time using some easy-to-understand and error-free language? 
   If not, why? How are the expressions, the sentences, the words used? 
   What do they show?   
   Ambition? Boredom? Haphazardness? Complex and convoluted thought process? Passion? Plain inability to express oneself?  
* *Past "gigs"*
   Again there is no right or wrong way to view how long the candidate has stayed in company X or Y.
   Some people like staying with an employer as long as possible, some others like changing often to face new challenges.
   However, you need to take into account how these tendencies may affect the team you are building: are you looking to add 
   elastic capacity through contractors or are you looking for people for the "long run"? 
   I would argue, though, that a long string of a few month tenures and frequent changes might warrant some questions, 
   even for a contractor.
   Is he/she bored easily? Character problems, perhaps? 
* *LinkedIn*
   I would personally expect a [LinkedIn][3] profile link at the top of the CV.
   In any case, I always look the candidate up. 
   Does the CV match the profile? If not, why? Is there some additional interesting info and activity?
   Are there connections and recommendations to back any bold claims? Are the recommendations reciprocate, by any chance? (indicating some form of kudos exchange)
* *Online code repos*
   I also very much like to see a link to a public code repo (GitHub, BitBucket).
   If it exists (and is actively used) it provides a great insight into the candidate's technical interests and coding skills. 
   Not everyone is a renowned open-source committer, but then again not everyone has a need for a renowned open-source committer. 
   We all need good developers, though. Some well-written code or some experimentation with the right technologies, indicate 
   a curious mind and give lots and lots of bonus points.  
* *Generalist vs. Specialist*
   What is the candidate's technical path so far?
   Deep specialization in one field (e.g. J2EE and Hibernate for the last N years)? Or changing technologies faster than shirts?
   Again there is no right or wrong, it always depends on the current role and the project. 
   What I am personally looking for is a nice balance of (and exposure to) different technologies, while taking some time to truly master them. 
   I believe that a team of [monoculturalists][4] is as bad as a team of [JOATMON][5]s.
<!--more-->
Some of the points above might sound like nit-picking. 
However, when faced with a stack of CVs and when a working day only has 8h (ok, I am joking, more like 10h), you need to 
make some decisions and prioritizations on "reasonable" grounds.
That piece of paper is the only peep-hole you have into the candidate's brain, so try to make the best out of it.

Last thing you want is to find out you have wasted your time with a candidate who is either not a right technical fit or 
has outright lied in her CV (yeap, they do exist...)  


If you see that you have a high number of "false positives" (i.e. candidates with nicely crafted CVs but eventually poor 
technical skills) and you spend a lot of time in them, then you can apply an... 

### Initial filter

I have seen some truly mesmerizing CVs, only to be completely gobsmacked when having a technical discussion with the candidate.
Even though every single article on CV writing out there strongly advises not to lie, some people just go ahead and do it.
I reckon in their books it falls under the category of "creative writing".
   
So how do you prevent this from affecting you?

One way would be to include a small technical question/assignment with the job description; "send us your CV along with the solution".
However, this can easily be defeated with the help of a friend. 
In addition, such an upfront investment of time might put people off. (unless you are a prestigious brand name like Google/Facebook/..., where people will flock to, regardless)

In my opinion a better way to apply an initial filter, is with a set of 10-20 basic, multiple choice or true/false questions.
They must not be very complex in nature, as you want to make sure they can be asked, understood and answered over the phone within 10'-15'. 
They should not require a lengthy explanation from the candidate, just a yes-no to cover the basics and separate the wheat from the chaff.  

They can be asked by any non-technical person, during the initial contact, after we have established that the candidate is indeed interested in the role. 
The caller just marks the grade and decides on the spot if the candidate passes the mark (e.g. 8/10, 17-18/20, to allow for some interview stress).
A nice opportunity for the recruiter to earn their bread and butter! :-)

Some examples 

```
- (Java) If 2 objects' hashCode returns the same value, these objects are always equal?
  1) true
  2) *false*

- (Linux) Which command allows us to find text patterns inside text files?
  1) df
  2) *grep*
  3) find

- (Hadoop) If you fire a map-reduce job over some data with the default settings, how many reducers will be invoked?
  1) None
  2) *One*
  3) Depends on the number of InputSplits
 
etc 
```

Getting past this initial filter, you have enough confidence that the CV landing on your inbox is not a complete wildcard.

## Candidate assessment

We have a short-list of candidates who passed the initial bar, which is good.
Now it is time to focus our full and undivided attention on them.

Below are some suggestions on what this assessment could be composed of.
These steps could be combined in pretty much any order, most of them over the phone. 

They could be done in stages, each one carrying the possibility of a red flag or they could all be carried out in one day.

Having a whole day of face-to-face interviews is great if you want to make a quick decision (remember, there is demand 
for talent). On the other hand, if not properly planned, it can be a painful experience for the candidate, resulting in 
unnecessary false negatives due to fatigue. So be careful.

### CV discussion 

This can initiate the whole assessment and can be done over the phone. It needs not take more than 30'.

We simply go over the recent projects and positions, asking the candidate to provide more information.

Some things we look out for 

* Does the verbal description match what is on paper?
* Is there a sense of ownership or does it sound like someone else's work?
* Is the candidate convincing of her technical description of the tasks?

A probing question here and there can help you drill down where needed \( *How did you use X* \).

Lots of times it is surprising how revealing such a simple discussion can be.

### Technical assignment

If a picture is worth a thousand words, then a nicely crafted piece of software should be roughly equivalent to the Iliad.

You could find something generic online, like the [eight queens puzzle][6], but what is this going to show you? 
That the candidate is good at generic algorithms? Or perhaps is good at googling solutions already available online?

Instead, it would be much better for you to craft a small problem spike, related to what the candidate will be doing day-to-day.
 
For example, for a server-side dev position you could have something like the following (not a detailed description)
 
```
Implement a REST service which, given a number, returns a JSON message with the Fibonacci sequence up to and including that number.
The service must be implemented in language XYZ, must contain tests and be able to run from the command-line.
Bonus points given for additional formats, caching, ability to choose algorithm etc etc
```

Here you will have a chance to gage a multitude of the candidate's skills.

* How much she has understood the requirements
* How she constructs her project according to best practices
* If and how allows for extensibility (e.g. programming against interfaces)
* Quality of comments and docs to the code
* Code testing  

Or for a data engineer position

```
Create a data transformation pipeline which will take the attached table data and
* calculate XYZ aggregates
* cluster data on data points foo, bar
etc etc
```

The candidate's submission will then be code-reviewed by more than one team members who can give their assessment.

If the result is positive and you decide to proceed further with the candidate, a discussion over the submission should 
be part of the discussion.

* How did she come up with the solution?
* How long did it take?
* Why did she choose X over Y?
* How would she implement W? etc

### Design question

This is a white-board exercise and is meant to gage on the candidate's seniority. 
Ideally it should be time-boxed to between 30' and no more than 60'. 

There are generally 2 types of design questions. 
In both types you looking for a candidate who is verbal on her thought process, who is asking the questions rather than 
expecting the answers.

#### Concrete 

Here the candidate is called to quickly design a system which addresses a "real-like" problem. This could be a narrow 
but deep slice of your current project. Or it could be something which looks realistic enough. 

One such example 

```
Assume we are Google/Yahoo/SomeTrulyGlobalCorp.
We want build an API to allow anyone on the planet to search and add information on XYZ.
For v.0.1 of the system we are going to keep information at a minimum, say fields W and Q. 

1. What would the API look like?
2. How would you design the system?
```

This exercise gives out some information but not all.
Its focus is on 3 things

* Get the candidate to ask probing questions \( *What device(s) is _anyone_ going to use*, 
 *How many instances of XYZ can we have*, *What about...* \)
* See if she is aware and can follow industry best practices (in this case REST/Avro/whatever design) 
* See how this information is used to make sound design decisions

When it comes to the architecture bit, there is really no right or wrong answer in this type of exercise; 
every technology has its pros and cons.
 If you are looking for the *right answer*, then what you are really looking for is for random person to validate your existing design 
 decisions. This is wasting everyone's time (not to mention of monoculturalism again...)!
 
What you should be looking for is someone who is well aware not only of the pros but also of the drawbacks of her choices 
 and can reasonably mitigate them.

Needless to say you as the interviewer should sit this interview prepared to answer any probing questions with reasonable
and/or realistic answers. You are supposed to assume the role of product owner.

#### Abstract 

Another approach is to come up with an abstract problem, i.e. something which will only require pseudo-code and/or class design. 

This is best suited for roles where a solid grasp of basic computing principles is essential. 
For example, roles where you are *creating* the distributed structures and complex algorithms rather than *using* them. 

Here are a couple of examples

```
Our latest landline phone model consists of a microphone, one speaker, one button and one light. 
Write some pseudo-code to program it to make a call.   
```

It may seem naive at first but it touches on resource utilization, interface design, codecs etc

Another one

```
You have a restaurant with a waiting area, seating area, kitchen, cooks and waiters.
How do you model that as a software program? How does it execute?
```

Focus here is not only on the class diagram but also on synchronization, resource allocation.

There is a thin line to walk with such abstract exercises between coming up with something good and something irrelevant.
However their main advantage is that there is no "hiding" behind a complex piece of software which "takes care of things".

What you are looking is not for a candidate with a photographic memory of "Data Structures 101" from university and 
all the fine details of red-black trees. But rather someone who can apply some basic principles on the problem. 
Needless to say, the interviewers themselves should have a solid grasp of the topic to be able to poke and nudge the 
candidate when stuck.

### Aspirations and non-tech skills

These are a set of questions which probe the candidate's aspirations.
There is no right or wrong answer to these, but they can be quite revealing in what is at "the back of her head". 

This is an indicative set of question I like to ask, feel free to mix-and-match or use your own.

* `If you had a magic wand and could change one thing in your current company, what would that be?` The "thing" could be 
  anything, from the coffee to a process to a person. This gives some insight into why the candidate is looking to change 
  and what makes her unhappy. If the answer is *not much really, all is well*, then a natural follow-up question is 
  *Then why do you want to leave and take a risk?*

* `I give you X million $$ and free reign. What would you work on? Any problem, any technology, any business?` 
 Are there any burning passions, an inquisitive mind or are we happily sailing towards retirement?
 If she comes back with something (e.g. big data), why would that be? Because she has encountered this problem before?
 Because that is what I expect to hear?

* `Which one project would you pick from your CV as your absolute best moment? Why?` 
 This will hopefully get the candidate talking about things which make her passionate. 
 What was it in that project that made her feel nice? Technologies? The fact she was in charge? She was working alone?
 However, saying that each and every project was special is not a real answer. 

* `Who is the smartest, most able person you have ever worked with? What was so special about them?`
 This could be a colleague, a manager, pretty much anyone. 
 It shows what skills the candidate values. To an extent it is an indication of the person she aspires to be.

### Candidate's questions

You can learn a *lot* for the candidate by her questions. Perhaps more than her answers. 

What is a good question? The one which you have to pause and think to answer.
A difficult-to-answer question shows insight, the ability to make logical assumptions and move to the next level. 
All from the limited information of the job description. 

What is even better than a good question? A list of good questions!
This shows that, if nothing else, the candidate is taking your role/company seriously. She has spent 5'-10' thinking and 
preparing beforehand and is trying to assess whether you are right for her.

Apart from the candidate's intellect, questions are also revealing of what is of interest to her.
What she is looking for and what she is "running away" from.
Is she interested in the technical backlog? Whether there is a production support rota? Where will she sit in the corporate 
pyramid? If she will work on weekends? Is she gaging you as a potential team-mate?

Even the absence of questions can be revealing.
Combined with the relevant body language, it almost unambiguously signals one of: `I am not interest anymore`, `OMG! Where do I sign?!` and 
`Duh! Wat??`  

### Follow-up call

This step is really great to put in place, if you have the luxury of working in partnership with a really competent in-house recruiter. 
I know this does not happen very often, but it is still worth considering.
  
The call to the candidate takes place soon after the face-to-face interview to get feedback.
Was it a pleasant process? How did she find the questions? Was the role interesting?

*Be careful!* I am not talking about the phone call the candidate will almost surely receive by the agent who referred her.
I am talking about some part of your organization/company (most probably HR), contacting the candidate as a quality assurance
step. Was any interviewer unpleasant or rude? Were the questions clear and chalenging? 

You need this feedback: if you want to attract the best, you have to have a frictionless process. 
Get it, iterate and improve. 
More than anything you want candidates leaving your building with the best impression, really liking your team/company.
This candidate may not have been a good fit, but a friend of hers might be. 

Word of mouth is invaluable!


*This is part 2 of a 3-part series of articles*

* *[Part 1][1]*
* *[Part 3][7]*


   [1]: http://sgerogia.github.io/Hiring-a-Great-Technical-Team-Part-1/
   [2]: https://www.google.co.uk/search?q=cv+writing+tips
   [3]: http://www.linkedin.com
   [4]: https://en.wikipedia.org/wiki/Monoculturalism
   [5]: http://acronyms.thefreedictionary.com/JOATMON
   [6]: https://en.wikipedia.org/wiki/Eight_queens_puzzle
   [7]: http://sgerogia.github.io/Hiring-a-Great-Technical-Team-Part-3/