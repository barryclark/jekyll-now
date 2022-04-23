---
layout: post
title: The Why of Arlo's Commit NOtation
---

Arlo's Commit Notation (ACN) is a way to tag each commit with a compact code that indicates two things: the intent of this change, e.g. bugfix or refactoring, and the level of risk of this change. Read the full description here: https://github.com/RefactoringCombos/ArlosCommitNotation. Arlo's Commit Notation is a tool which can be wielded to solve certain problems, but at the outset it can be really head to see those problems and how ACN addresses them. The risk attestation part is especially difficult to understand if you haven't already experienced these different risk levels. Let's see what happens if I try to describe it all in great detail in article format…

# The Why of the Why of ACN

This document is not a great idea. When I've tried to explain this topic before, people are often overwhelmed and unconvinced. It's too much at once while also being insufficient.

Ideally we'd be working together shoulder-to-shoulder in a pair or ensemble. I could introduce bits and pieces of these ideas incrementally as needed by the work. But since we can't do that, maybe this document is a good enough idea.

Adult humans tend to learn with a mix of abstract concepts and concrete details. Which one would we begin with? Our mature brains want to understand theory and context which are hard to absorb without concrete experience; concrete hands-on experience is frustrating and confusing without a rich understanding of the bigger picture. Whichever one we start with, we quickly find ourselves longing for the other.

I usually start with little bit of concrete detail, then a bit of the abstract concept, cycling back and forth between them. Give yourself the chance to do the same. 

Adopt a little bit of ACN in your work, try it out, see what feels good and what feels bad, then come back here and learn a little more. 

When you are just starting out on an ACN [Learning Path](https://github.com/RefactoringCombos/ArlosCommitNotation/blob/main/Learning%20Path.md) you won't be able to get all the values that I assert comes from ACN. Don't be too quick to judge ACN based on that initial experience - it will take time to understand deeply and wield effectively. For now I ask that you trust that this is real while you develop the skills.

Here's how to use this document:

	- If someone suggests your team adopt ACN, this document describes reasons you should consider doing so.

	- If you notice some aspect of the notation that isn't ideal for your context, you should modify the system to suit you better, without interfering with its ability to deliver value that you may not have experienced yet. ACN isn't the only way to solve these problems. My goal here is to give you a more complete list of those problems so that when you modify the system you don't inadvertently leave some points unaddressed.

	- When you first start using ACN you may not yet be able to effectively wield it for all of these problems. There are skills that take time to learn. That's fine. Over time you can look for opportunities to grow those skills and make ACN more useful to you.

	- If you want to check your progress adopting ACN, ask if you are getting all the value described here. When you see a gap that's an opportunity for a retrospective - what are we missing?

The Why of ACN will not make complete sense until you have had the chance to fully explore, learn, and apply those skills. Give it time.

# Scan for Risk

The use of spaces in the lower-risk tags (x  / X  ) makes the higher-risk tags (X!! / X**) stand out in a "oneline" history:

```
<example here>
``'

When scanning a commit history with a mix of risks the higher-risk items jump out. Looking for a bug? Start with the !! and ** entries.

This is only possible if most changes are lower risk (x/X). 

# Speed review

You can get your code reviews / pull requests completed faster if you work in small increments, separate changes by category (feature, bugfix, refactoring), and indicate risks.

Smaller changes are easier to review. Feedback on the smaller change will be less disruptive if I hear it before implementing the whole shebang.

If I split a 2-day feature task in to one day of refactoring and one day of behavior change, you can review and my refactoring first, get it checked in, and then move on to the behavior change. 

Safe/better/no worse refactorings are easier to accept than "cleaned up a bunch of stuff but there are still some problems".

Refactorings tend to have large diffs which make it hard to see small details. Separating refactorings from non-refactorings make that easier for a reviewer.



It's possible for refactorings to have much lower risk than features and bug fixes. By definition, refactorings should not change behavior but features and bugfixes must change behavior. Any behavior change might have unwanted business implications: if someone depends on that behavior you can break them. If that behavior is undocumented you might have no idea that you are breaking them. `r` refactorings (and all lower-case changes) require far less scrutiny than other changes. As a reviewer you can scale your attention to  match the risk


Refactorings tend to have different kinds of risk than feature and bugfix work. An important but non-obvious example is the way an organization reacts to mistakes. If we are working on a feature or bugfix and introduce a bug, everyone will sigh and be disappointed and ask engineers to be more careful.


This mostly only matters in a solo-work environment. If your team is mob/ensemble programming then all the changes were made in full view of the team and don't need the same kind of after-the-fact scrutiny.

# Nudge developers

That twinge of discomfort that shows up with ** is a nudge to think about ways to avoid **. It should carry a hint of shame. (Not too much - don't make a toxic culture around this.)

As a developer when I am committing a change and need to pick the tag to apply, if it's higher-risk, I will pause for a moment to think if I could have prepared the change a different way with lower risk.

	- Any X** change might have a fewer small refactorings that could be carved out as individual commits.
	- A F** or B** might become F!!/B!! with the help of some more tests.
	- Refactorings that I might do by hand could be (partially) replaced with provably-safe `r` refactoring by wielding a tool or recipe, possibly in new ways I haven't recognized before.

# Change the rules

You've probably worked on projects with a lightweight development process: you make a change, check it in, and moments later it's in production delivering value to customers or providing feedback to improve your next decision.

And you've probably worked on projects that felt the pain of production defects and have created layer after layer of heavyweight, bureaucratic paperwork for every change.

In an organization that understand ACN, and with a team that is able to wield ACN skillfully, it makes sense to change those rules. For example, if a director's sign-off is required for every deployment to production, you might say that lower-case-only changes executed by a pair or ensemble can be shipped with only a Senior engineer's sign-off.

This will increase productivity, improve latency, and reduce risk. It's win/win/win.

With a rule change like in place, developers who work in these lower-risk ways will get an "unfair advantage" over developers working conventionally. That's great - it aligns incentive/reward with benefit to the business. Managers should make a point of praising increased productivity and reduced risk outcomes when they see it, to help shift cultural norms and expectations. (If you are an I.C., ask your manager to do this. Give it your best shot. If they decline, IMO it's time to switch managers.)

# Roll back

In addition to separating changes by risk and intention, we can also reorder them to put lower-risk items first. Typically this means refactoring first.

(Hint: "refactor to clean up the mess that is already there" should come before "refactor in preparation for the new feature or bugfix", since the former are more likely to be worth keeping even if plans change.)

If we can collect a dozen lower-case changes today we can ship them to prod right away, followed by the rest of our changes tomorrow. If a serious defect shows up it's far more likely to be in the latter set, which is what we'll roll back. The roll-back is easier because it's smaller. We don't lose as much progress. Diagnosing and fixing the issue will be easier due to narrower scope.


![image](https://user-images.githubusercontent.com/1259628/164911087-c58290d9-1969-428f-98ef-366765ebcf80.png)
