---
layout: post
title: The Why of Arlo's Commit Notation
---

[Arlo's Commit Notation](https://github.com/RefactoringCombos/ArlosCommitNotation) (ACN) is a tool which can be wielded to solve certain problems, but at the outset it can be really hard to see those problems and how ACN addresses them. Let's see what happens if I try to describe it all in great detail in article format.

But first, a summary of ACN. Prefix each commit message with a 3-character code. The first character is a letter indicating the intent for example:

| Prefix | Intention   |
|--------|-------------|
| F      | Feature     |
| B      | Bugfix      |
| R      | Refactoring |

And the risk levels (where `x` is one of the intention prefixes):

| Code   | Example                                    | Meaning                                      |
|--------|--------------------------------------------|----------------------------------------------|
| `x - ` | `r   Extract method Applesauce`            | Addresses all known and unknown risks.       |
| `x - ` | `R   Extract method Applesauce`            | Addresses all known risks.                   |
| `X!!`  | `R!! Extract method Applesauce`            | Reduced risk, incomplete verification.       |
| `X**`  | `R** Start extracting method with no name` | No risk attestation (normal way of working). |


# The Why of the Why of ACN

This document is maybe not a great idea.
When I've tried to explain this topic before, people are often overwhelmed and unconvinced.
It's too much detail at once while also being insufficient.

Ideally we'd be working together shoulder-to-shoulder in a pair or ensemble.
I could introduce bits and pieces of these ideas incrementally as needed by the work.
But if we can't do that (yet), maybe this document is a good enough idea.

<!-- Adult humans tend to learn with a mix of abstract concepts and concrete details.
Which one would we begin with? Our mature brains want to understand theory and context which are hard to absorb without concrete experience; concrete hands-on experience is frustrating and confusing without a rich understanding of the bigger picture.
Whichever one we start with, we quickly find ourselves longing for the other.

I usually start with little bit of concrete detail, then a bit of the abstract concept, cycling back and forth between them.
Give yourself the chance to do the same. -->

When you are just starting out on an ACN [Learning Path](https://github.com/RefactoringCombos/ArlosCommitNotation/blob/main/Learning%20Path.md) you won't be able to get all the values that I assert can come from ACN.
Don't be too quick to dismiss ACN based on that initial experience - it will take time to understand deeply and wield effectively.
For now I ask that you trust that this is real while you develop the skills. Adopt a little bit of ACN in your work, try it out, see what feels good and what feels bad, then come back here and learn a little more.

Here are some ways to use this document:

- If someone suggests your team adopt ACN, this document describes some benefits that you could gain from that adoption.

- If you notice some aspect of the notation that isn't ideal for your context, you should modify the system to suit you better, without interfering with its ability to deliver value that you may not have experienced yet.
ACN surely isn't the only way to solve these problems.
My goal here is to give you a more complete list of those problems so that when you modify the system you don't inadvertently leave some points unaddressed.

- When you first start using ACN you may not yet be able to effectively wield it for all of these problems.
There are skills that take time to learn.
That's fine.
Over time you can look for opportunities to grow those skills and make ACN more useful to you.

- If you want to check your progress adopting ACN, ask if you are getting all the value described here.
When you see a gap that's an opportunity for a retrospective - what are we missing?

The Why of ACN will not make complete sense until you have had the chance to fully explore, learn, and apply all these skills.
Give it time.

# Scan for Risk

The format of the lower-risk tags (`x - ` / `X - `) makes the higher-risk tags (`X!!` / `X**`) stand out in a "oneline"-type history. Consider this example:

```
> git log --oneline
d8f708d F** Send email on success
9934d95 r - extract variable
4658ae2 r - extract method.
6b19aaa R!! replace algorithm
b865312 r - introduce parameter.
ab5b785 r - make method static
203a1ad r - move method
af1a232 r - inline variable
e8aa838 r - inline variable
fe967d9 r - remove unused code
```

Notice that the `!!` and `**` entries are easy to pick out.

Suppose you want to search through commit history to find the change that introduced a defect.
With ACN it's clear that you should start with the `!!` and `**` entries.
These higher-risk commits will be smaller than conventional commits, because the `r` changes are separate.
This approach only as helpful as the extent to which lower risk (`x`/`X`) commits are used.

# Expedite review

You can get your code reviews / pull requests completed faster if you work in small increments, separate changes by category (feature, bugfix, refactoring), and indicate risks.

If I split a 2-day feature into one day of preparatory refactoring and one day of behavior change, you can review my refactoring first.
Obviously 1 day of changes is easier to review than 2 days of changes, just because of size.
Feedback on the smaller change will be less disruptive if I receive the feedback for it before implementing the whole shebang.

It's possible for refactorings to have much lower risk than features and bugfixes.
By definition, refactorings should *not* change behavior but features and bugfixes *must* change behavior.
Any behavior change might have unwanted business implications: if someone depends on that behavior you can break them.
(If that behavior is undocumented you might have no idea that you are breaking them. See [Hyrum's Law](https://www.hyrumslaw.com/).)
`r` refactorings (and all lower-case changes) require far less scrutiny than other changes, because even unknown and untested behaviors are preserved.
As a reviewer you can scale your attention to match the risk, instead of giving every line of change full scrutiny.

This mostly only matters in a solo-work environment.
If your team is mob/ensemble programming then all the changes were made in full view of the team and don't need the same kind of after-the-fact scrutiny.

# Nudge developers

That twinge of discomfort that shows up with `**` is a nudge to think about ways to avoid `**`.
It should carry a hint of shame.
(Not too much - don't make a toxic culture around this.)

As a developer when I am committing a change and need to pick the tag to apply, if it's higher-risk, I will pause for a moment to think if I could have prepared the change a different way with lower risk.

	- From any `X**` change I might carve out a few small refactorings.
	- A `F**` or `B**` might become F!!/B!! with the help of some more tests.
	- A `R**` or `R!!` (or even `R`) could be partially or fully replaced with one or more `r`. This may require learning a new technique.

This effort should be timeboxed. Shelve my changes, spend a little time looking for a lower-risk sequence, and stop at the end of the timebox. The goal is *better*, not *good*.

# Reduce business risk

Refactorings tend to have different kinds of organizational/social risk than feature and bugfix work.
If we are working on a feature or bugfix and introduce a bug, everyone will sigh and be disappointed and ask engineers to be more careful.
If we introduce a bug while refactoring, the business will only see downside with no upside, and will be inclined to discourage refactoring.
They'll never say "don't write any more features" but they might say "please stop refactoring."
Any reduction in refactoring means technical debt grows faster, which has serious business consequences over time.
The more of our refactoring that we can do towards the `r` end of the scale, the less likely we are to trigger this bad reaction from business.
As engineers we have the business responsibility of making refactoring safe so we can keep the code clean and continue to adapt to changing business needs.

# Change the rules

You've probably worked on projects with a lightweight development process, maybe as a hobby or for a class or a startup. You make a change, check it in, and moments later it's in production delivering value to customers or providing feedback to improve your next decision.

And you've probably worked on projects that, in response to the pain of production defects, have created layer after layer of heavyweight, bureaucratic paperwork every time you ship to prod.

In an organization that understands ACN, and with a team that is able to wield ACN skillfully, it makes sense to change those rules.
For example, if a Director's sign-off is required for every deployment to production, you might say that lower-case-only changes executed by a pair or ensemble can be shipped with only a Senior engineer's sign-off. You might consider doing the same for `X`-only changes (no `!!` or `**`).

It may take time to build trust and shift these rules. Make a small change to the rules, live with it for a little while, see how it plays out, then make another small change.

With a special case rule in place, developers who work in these lower-risk ways will get an "unfair advantage" over developers working conventionally.
That's great - it aligns incentive/reward with benefit to the business.
Managers should make a point of praising increased productivity and reduced risk outcomes when they see it, to help shift cultural norms and expectations.
(If you are an engineer, ask your manager to do this in front of the team.
Give them your best pitch.
If they decline, IMO it's time to switch managers.)

Changing the rules to smooth the path for lower-risk changes will increase productivity, improve latency, and reduce business risk.
It's win/win/win.

# Roll back

In addition to separating changes by risk and intention, we can also order them to put lower-risk items (especially refactorings) first.

Suppose you have broken up a large feature change in to a sequence like this:

```
8 F** Send email on success
7 r - extract method
6 R!! replace algorithm
5 r - introduce parameter.
4 r - make method static
3 r - move method
2 r - inline variable
1 r - inline variable
```

We might ship changes 1..5 to production first. Because they contain only lower-case changes, it's extremely unlikely they will break anything.

Then we might ship changes 6..8 together. If something blows up, we can roll back just these two changes with less churn than rolling back all of the changes. Or perhaps we ship 6, 7, and 8 separately, to further compartmentalize risk - it depends on how hard it is to ship in your context.

If a `!!` or `**` change does blow up in prod, this is a stronger nudge to look for ways to move further towards lower-case-only changes.

Hint: "refactoring to clean up the mess that is already there" should come before "refactoring in preparation for the new feature or bugfix", since the former are more likely to be worth keeping even if plans change.
