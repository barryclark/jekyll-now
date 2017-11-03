---
layout: post
title: Planning ahead the agile way - a method for agile roadmapping
---

=== Agile is shortsighted ===

Agile is shortsighted! In SCRUM you are only interested in whats going on in the next sprint! Kanban focusses only on what's next! Long term planning is not agile! Sounds familiar? The gap between short term (sprint-)planning and long term roadmaps is an often discussed focus point in the world of agile and an often cited reason why "our company cannot do agile". 
And it is true. A lot of litarature advertieses only the fast reaction time and short iteration cycles that agile methods give us, especially if applied to software development. But it is also true, that a lot of business-areas are operating on longer cycles than single sprints. Yearly budget allocations, fixed amount projects and hard deadlines are real and existing challenges in the industry. Leaving aside if this is how it should be - or not - for the moment, those practices are still alive and kicking in a lot of industrial sectors such as the medical or machine industry. 

So how do we as software deliverers go about catering to these long and slow cycles? We who are working in software development are frequently asked about roadmaps, deadlines, milestones and so on. And often enough we are tempted to say, "we don't want to know, we're doing agile". The truth is often we really don't know in the sense of "we are not sure if it is going to work out in this fashion" but often enough we have tons of ideas and visions where a project could go. After all this is part of your experience and training and often this is essenatially why the customer picked us over any competition. Sometimes we can even predict things down to single features. But instead of making that information transparent and visible to the customer and ourself we hide it behind the "agile doesn't do long-term planning" credo. 

And that is wrong. Agile should do and advertise long term planning, it just should do it in the - well - agile way. Long term plans should be living documents that get adapted as we learn more about the project. They should also be coarser than our daily work. I usually pick a frequency for doing the roadmapping-sessions with the team that is at least twice the frequency of the time horizon of the roadmap, but for me this settles around four times a year. The goal of such roadmapping-sessions is not primarily to generate content - that should happen all the time - , but to provide a well defined snapshot of what at the time is seen as the most likely direction a piece of software could take. 

({{ site.baseurl }}/images/agile-roadmapping/roadmapping_session_timetable.jpg)

=== Building content for a roadmap ===

My preferred approach to building up or refining a roadmap is to first focus on content in a top down manner and do any estimation or sequenstial ordering later. Also a very important and often forgotten step is the throwing away of old and unimportant ideas and roadmap items.  
If ther is an existing roadmap to refine, I start with the team and the PO by throwing out everything from the backlog and the last roadmaps which we no longer see as important or as unfeasible at the moment. Really throw it away, make it invisible on the roadmap just moving it to a "to be done later" section will clutter up things very fast. If things are really is important they will pop up again. By completely throwing away unripe ideas we reward minimal planning ahead, because the less you invested in one of these items the easier it is to throw away. A sure sign of a mature team and a realistic roadmap is that there is no fuss about cutting away anything that is no longer worthwile. Of course with all the throwing away it is really helpful if you can archive the old snapshots of the roadmap.
After this pruning I have the team selecting a few overarching themes or visions on which the team wants to focus and work in the future. Experience shows that it is better here to focus on a broad understanding first than to work down indivudual topics. Once these topcis are selected and grouped have your team work downwards by splitting these issues into smaller and smaller packages until the team thinks that the majority of them fit inside the selected period.  This usually takes one or more session/meeting per topics, so this can become quite time consuming. Which is again why we reduce this by pruning to. My tool of choice is to do this with sticky notes on a whiteboard or paper and digitalize later. Usually being able to make a decision on one level of a tree needs you to know the next lower as well.  

({{ site.baseurl }}/images/agile-roadmapping/tree_without_estimation.jpg) 

The next step is to assign priorities to the leaves of the tree, as opposed to the backlog these should not be unique priorites but simplified ones like (high, medium, low) alternatively ask the PO to help assigning a value or impact to the items. Then have the developers do an relative t-shirt size estimate (S, M, L) of the leaves. This usually gives me a list of small, high-priorty issues to put on a roadmap. I usually pick one or two of the issues at most to put on a roadmap and then get the team to agree on how to proceeed if for some reason we should run out of small, urgent issues to fix. Either do thesmall, medium ones next or even better break down the urgent, medium-sized ones into new smaller chunks. 

({{ site.baseurl }}/images/agile-roadmapping/tree_including_estimation.jpg)

=== finializing your roadmap ===

Once your happy with the content of the tree, take the issues and order them so they can be converted and broken down into stories fit for your backlog. For me this often means taking them as they are and putting them at the bottom of the backlog and thus incorporate these items into the regular backlog refinement process. Also as soon as I start to break these items down into stories I make sure that I retain the traceability to the roadmap item, so I can trace the progress ôr deviation from the roadmap. This helps as well with pruning items that do not make the cut, As a rule of thump I try not to keep any issue that has not made it into the roadmap for longer than one roadmap cycle.  If they are urgent they usually make it to the roadmap or elase they are not that important. Usually the roadmap needs to be in a sequential form of execution to satisfy the predictability, but I often try to maintain the hierarchical split into the different layers as in the image below. 

({{ site.baseurl }}/images/agile-roadmapping/Flow_visualisation_of_roadmap.jpg)

=== From the roadmap to the backlog ===

The final step to be able to work with the roadmap we just created is to transfer this to the product backlog for refinement as we go. For this I append the roadmap-items 1:1 to the backlog so they can be split and refined in the regular backlog refinement process. 

({{ site.baseurl }}/images/agile-roadmapping/backlog-including-roadmap-items.jpg)

I like to print out  the roadmap and put it up next to the agile wall, so I can refer to it easily during the daily stand ups. Some teams even pinned done stories to the respective roadmap item it belonged to to se how closely we follow our plan and to facilitate discussions about deviations. Deviations are of course not bad at all, but it helps to visualize them and conscious of when, why and how they happen. This information then can also be taken to the sprint planning and after a few iterations serves as a good indicator for the next roadmapping period. 