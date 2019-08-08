---
layout: post
title: Git challenge experienced!
---

When working with any tool, it is expected that we have a learning curve and, even after it, we take some bad decisions.
The difference is that the more we work with it, the more we will learn to resolve problems and keep the engine working.

Once, I had a challenge in the version control of a project.

My team and I were working on a feature branch and, before merging it to master, we needed to work on another feature. Both of them required quite a bit amount of work (and commits), and guess what we did? Both of the workloads on the same branch.

"Don't worry, we will merge both of them in the end of the Sprint".

Narrator: "They wouldn't merge it all just at the end of the Sprint".

What happened was: we would not be able to finish the second feature at the end of the week and the first workload should be on the master as soon as possible.

![it-is-fine](https://media0.giphy.com/media/Z1BTGhofioRxK/giphy.gif)

Here is the scenario that we faced:

![git-initial-post](https://user-images.githubusercontent.com/15313802/62713400-0e42af00-b9d3-11e9-8226-824cd0915b6a.png)

I had done several trials to get it done.

First try:
Cherry-pick, cherry-pick it all

The first thing I remembered was: when I need a specific change from a branch to another, I use cherry pick. Alright.
Usually in a real world scenario we do not have the happy path. In my case, some conditions did not help it to work well:
- We had dozens of developers committing to the master (and some others on the feature branch).
- I needed to get not only 1-2 commits from the branch, but like 15 of them. Some on sequence, and some intercalated with the other workload.

So, when I tried to cherry pick each of the commits, I got A LOT of conflicts even from modules that did not had any contact with the commit files. I decided to abort it to preserve the integrity of the master.

Here in the limbo is a huge mess of trials and errors that I did not documented and my sanity barrier do not even allow me to remember.
What I could record was some lessons:
- cherry pick is great for getting bugfixes from branches.
- cherry pick is not the best tool to get a range of commits from another branch. Git has specialized tools (merge and rebase) for that.


Nineth try:
Using a "support branch" to help merge it.
 One of the parameters of git branch is the commit that will originate it.
As most of the feature workload was on a range of commits, I did the following steps:
- Created a branch on the last commit of the initial range.
- Cherry picked the other commits that were separated.
- Merged the master to the support one (you know, just to resolve conflicts on a safer place). Here I had conflicts, but those due to the time the branch was not updated, expected.
- merged everything to the master.

![git-merge-post](https://user-images.githubusercontent.com/15313802/62713458-274b6000-b9d3-11e9-9a16-5a98770442db.png)

Hell yeah, it worked.

As an extra step, before pushing everything, I merged the master to the feature branch. And NO CONFLICTS WITH THE FEATURE WERE FOUND. Just some conflicts with the commits not included on the bundle. Again, EXPECTED.

I then pushed everything to the remote branch, gave a high five to my coworker and relaxed for some minutes. I deserved.

We made some mistakes, like using a branch for multiple and huge workloads, having an outdated branch for much time, etc.

But you know, we fixed it, in a reasonable time. That was more important. My PO was happy and I learned lots of new things.
