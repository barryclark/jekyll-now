---
layout: post
title: Recidivism and Algorithmic Bias
author: Nathaniel Joselson
tags: Decolonization Statistics Science Colonization University Recidivism Modelling
---

![Decolonization]({{ site.baseurl }}/images/158571033.jpeg)

In the [previous post]({{ site.baseurl }}/Philosophy-and-Recidivism/) I said that the problematic-ness of current recidivism models (ie algorithms which predict the risk of a person who committed a crime re-offending) cannot be conceptualized using only statistical knowledge. 
In this post I will try to quickly explain the background of this issue, show algorithmically how these biases occur and why I think these models fundamentally fail to help the problem of mass incarceration in the United States.
(Sorry that the post is long...)

The most widely used recidivism risk assessment algorithm in the US is the [COMPAS]({{ site.baseurl }}/pdfs/FieldGuide2_081412.pdf) (Correctional Offender Management Profiling for Alternative Sanctions) model developed by the Northpointe company, a for-profit statistical/criminological modelling organization. 
It relies on a 150-question [questionnaire]({{ site.baseurl }}/pdfs/Sample-Risk-Assessment-COMPAS-CORE.pdf) which is filled in after a person has been arrested. 
The results of this questionnaire are then fed through a Cox proportional hazards model to give a prediction of the relative risk that this person will commit another crime on a scale from 1-10.
This model is both used to set bail amounts and to aid judges in sentencing (after a jury has already convicted the individual of a crime).

About 6 months ago, [ProPublica]( https://www.propublica.org/), a data journalism non-profit, published “[Machine Bias](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing)” where they [showed](https://www.propublica.org/article/how-we-analyzed-the-compas-recidivism-algorithm) that the model systematically overestimated the risk score of defendants of colour and underestimated the risk score of white defendants. 
They demonstrated this by showing that black defendants who didn't commit any new crimes (ie didn't recidivate) where mislabelled as high risk 45% of the time (compared to 23% for white defendants).
Conversely, white defendants who *did* recidivate were mislabelled as low risk 48% of the time (compared to 28% for black defendants).
This represents a deep rooted systemic bias in the model since it is not fair that defendants of colour are consistently misclassified to their disadvantage while white defendants are misclassified in a way that benefits them.

Northpointe [responded](http://blog.northpointeinc.com/northpointes-response-to-propublica/) that this analysis was incorrect and published their reanalysis in a (purposefully?) dense, new, academic [report]({{ site.baseurl }}/pdfs/ProPublica_Commentary_Final_070616.pdf).
In this report they re-drew the cut-offs of the "High Risk" versus "Low Risk" classifications (ProPublica used a cutoff risk level of 4 while Northpointe's reanalysis used a cutoff level of 7 for "High Risk") and claimed that this completely reversed the ProPublica findings, attempting to demonstrate that the bias was merely a function of the analysis. 
Also, they stated that the model is internally consistent in that a score of 7 represents the same probability of recidivism for an individual regardless of their race.
The result of internal consistency was [confirmed]({{ site.baseurl }}/pdfs/rejoinder7.11.pdf) by researchers at the Crime and Justice Institute in Boston, and again [here](https://medium.com/@AbeGong/ethics-for-powerful-algorithms-1-of-3-a060054efd84#.pk7odgzau) and by researchers at Stanford [here](https://www.washingtonpost.com/news/monkey-cage/wp/2016/10/17/can-an-algorithm-be-racist-our-analysis-is-more-cautious-than-propublicas/?utm_term=.70c4c9c77bb4). 
These analyses make the point that internal consistency seems to be a non-negotiable prerequisite for a model to be considered fair. 
After all, if the score meant different things for different racial or gender groups, then what is the point of comparing risk scores at all?

The problem is complicated however, by the results of [Kleinberg et al.]({{ site.baseurl }}/pdfs/1609.05807v2.pdf) and [Chouldechova]({{ site.baseurl }}/pdfs/1610.07524v1.pdf) who concurrently proved that risk assessments of this nature cannot simultaneously satisfy mathematical conditions of internal consistency and conditions of fairly distributed misclassification errors.
Furthermore, Chouldechova proved that in cases where one group has a higher base risk (in this case, people of colour have a higher rate of recidivism) the algorithm will usually discriminate against that group when it comes to misclassification error.
This is another demonstration that algorithms [can't judge fairness or morality](https://mathbabe.org/2016/12/20/how-do-you-quantify-morality/) so it is up to humans to set ethical norms and to program algorithms to follow them.
This means manually deciding which is worse: being misclassified as high risk when you are black and so already in a vulnerable position or classifying a white person as low risk when they really will go on to commit new crimes.
(These are two distinct results mathematically, so you would need to specify an order of desirability of these outcomes for all four types of misclassifications.)

At this point in my research I was demotivated; both confused and unconvinced.
Confused because despite the clear mathematical and ethical controversies, these models are [being adopted](https://www.governor.ny.gov/news/governor-cuomo-presents-12th-proposal-2017-state-state-agenda-launching-new-york-promise-agenda) at an increasing rate, and unconvinced because amid the pages of proofs, graphs and back and forth rebuttals, I felt these authors had missed some key points with clear decolonial importance. 

Firstly, despite the fact that most people agree that internal consistency is a necessary aspect of designing a fair model (so that a score of 7 means a 7 regardless of race), there is no reason to believe that police, judges or juries will view all individuals who score similarly as equally risky.
We all bear individual biases which society has taught us and this is one of the reasons the criminal justice system is so unequal currently.
We see that not all individuals who commit the same crime are treated the same way (think of white college athletes in rape trials) so why should a low risk score mean anything to a judge that implicitly believes all black and brown people are criminals?
On that note as well, one writer brought up that many judges say that they [don't use](https://points.datasociety.net/models-in-practice-19e68b18c340#.86m2yg1u6) risk assessment models to aid their decision making even if they are available to them.
This to me indicates the possibility of amplifying inherent racial or gender biases as users judge whether or not to trust and use the risk score generated by the model.
In my opinion, the use of these models (even if they could be made unbiased) will not be able to combat subjective preference and oppression in the criminal justice system unless a concerted effort is made concurrently inside the system.

Secondly, I strongly problematize the [criminological reasoning]({{ site.baseurl }}/pdfs/Criminal-Justice-Behavior-COMPAS.pdf) used by Northpointe in developing the COMPAS score as well as the [previous]({{ site.baseurl }}/pdfs/psych_assessment_Olver_S&W_LS_meta_2014.pdf) recidivism modelling work it is based on.
Looking at the [questionnaire]({{ site.baseurl }}/pdfs/Sample-Risk-Assessment-COMPAS-CORE.pdf) developed for the COMPAS test it is not difficult to see how anti-poor and anti-black the field is. 
Questions are organized based on 15 predictors for criminality including "Financial Problems," "Vocation/Education," "Family Criminality" and "Antisocial Attitudes." 
[Starr]({{ site.baseurl }}/pdfs/SSRN-id2318940.pdf) notes that no separation is made between characteristics which are relevant or irrelevant to blameworthiness. 
This is the same for [static versus changeable]({{ site.baseurl }}/pdfs/SSRN-id2687339.pdf) characteristics.
This means that since higher risk scores lead to more harsh punishments, factors like unstable family history (which can't be changed), low level of educational achievement (which is irrelevant to blameworthiness), or drug or alcohol abuse problems (which can be treated with professional help) all increase your chances of being locked up now because they increase your probability of recidivism in the future.
I would argue that this is ethically problematic because these factors are legally irrelevant to the current crime.
In fact, Harcourt wrote a [great paper]({{ site.baseurl }}/pdfs/SSRN-id1677654.pdf) which argues that the inclusion of these variables means that the model can also predict race with nearly 100% accuracy so that even if race is not an explicit variable, the models can use combinations as a proxy for race. 
This is just as problematic as using race or nationality directly in the risk assessment process, it is just masked better and even hearkens back to the days when criminology and eugenics were [explicitly linked](http://www.eugenicsarchive.org/eugenics/image_header.pl?id=2221&printable=1&detailed=0).

A third and incredibly important problem I have with risk assessment models is that the [data they use is biased](https://mathbabe.org/2017/01/05/how-to-fix-recidivism-risk-models/) against black and brown people because the criminal justice system is historically biased.
Algorithms are only as good as the [data they are trained on](https://mathbabe.org/2017/01/04/recidivism-risk-algorithms-are-inherently-discriminatory/) and unless data shortcomings are explicitly dealt with (like in [this paper]({{ site.baseurl }}/pdfs/art%3A10.1007%2Fs10115-011-0463-8.pdf)), any injustices present in the dataset will be repeated over and over in model predictions.
Police [patrol black communities differently]({{ site.baseurl }}/pdfs/SSRN-id2550032.pdf) and prey on minority groups to [increase policing statistics](https://weeklysift.com/2016/08/15/its-not-just-freddie-gray/) or to [get revenue from fines](http://harvardlawreview.org/2015/04/policing-and-profit/) like in Ferguson.
Black defendants face [worse legal representation]({{ site.baseurl }}/pdfs/SSRN-id1985377.pdf), more [bias from juries](http://www.crf-usa.org/brown-v-board-50th-anniversary/the-color-of-justice.html) and are disproportionately affected by [mandatory minimums](https://thinkprogress.org/federal-appeals-court-drug-sentencing-disparity-is-intentional-racial-subjugation-8e50a8549f50#.qclmfzlvr) for many non-violent offences.
Overall this contributes to a criminal records dataset in the US which is incredibly biased against black and brown defendants.
How could anyone expect to use this data to train an algorithm to predict crime without it being biased?
The prospect is almost laughable.
Until the bias which is due to differential policing and sentencing policies has been accounted for and removed from training datasets, there is no hope of creating unbiased recidivism models.

Lastly, and most importantly, a question which no one I encountered during my research was asking is: would accurately predicting an individual's risk of recidivism (if it were possible) give any important, objective information about how to help this person?
Obviously many people feel that this is an important outcome, but I would argue no.
Predicting recidivism risk to me seems to actually wastes the richness of the information in the questions on the one simplistic outcome they measure.
Looking at the questions, they are biased in numerous ways when attempting to predict recidivism but many of them could give valuable information on how to best help the defendant to not commit any future crimes.
Measurements of social vulnerability such as poverty, education level, substance use and feelings of boredom or hopelessness, etc. could be used to develop new data driven treatment plans to dynamically help vulnerable individuals from turning to criminality.
Such algorithms, based on principles of social justice as opposed to criminal punishment, could improve objective consistent sentencing and hopefully help problems of mass incarceration and preferential treatment of whites.

However, such an algorithm could only work if there was a massive re-prioritizing of the values that drive criminal justice, policing and incarceration.
Harcourt writes that this could start in the short term with doing away with mandatory minimum sentences for non-violent drug offences.
The incredible sociologist Robert Staples goes much deeper and [writes]({{ site.baseurl }}/pdfs/274841.pdf) that in the US legal system victims of mass incarceration should be conceptualized as political prisoners because of the colonial systems of oppression and disenfranchisement which resulted in their imprisonment.
To me, this is the only place to start from when thinking critically about criminal justice and how deep the problems go. 
Even the constitution was a tool to justify slavery, the 3/5ths compromise and then segregation. 
Where is the incentive to follow laws that were explicitly designed to perpetuate a system of oppression which is still present today and allows for white collar criminals to steal millions and serve no jail time?

For this reason and all the reasons above, I think that decolonization of recidivism risk assessment models is, at this stage, not possible.
The problems within the criminal justice system are too deep.
I would argue that statisticians should stop trying to tinker with the algorithmic mechanisms of the models to decrease their racial bias and rather focus on advising politicians and judges to stop using these models in sentencing and bail setting because at this stage, their use can only serve to increase disparities in justice between whites and blacks and make already vulnerable individuals even more desperate.

I will try to keep on top of this issue as I read and write more.
I am attempting to compile a list of which recidivism risk prediction models are used where in the US and for what.
Please leave any thoughts or questions in the comments, or get in contact with me directly via email or facebook.
