---
layout: culture
title: Evil User Stories
---

User Stories are an awesome part of XP (eXtreme Programming) and a really big achievement in leverage user centric thinking.
If you think of regular user story template you surely have found one like this:

> As a [role], I can [capability], so that receive [benefit]

This is probably the most common template. Be aware that the “so that” clause is optional. Next to the template a good user story requires acceptance criteria to satisfy the persona which is associated with the`<role>`.

A User Story itself can have unintended functionality and abnormal behavior that must be anticipated. **Vulnerabilities are often in areas, of too much functionality**.

This can be used to change the perspective and craft an Evil User Story. But what to do with Evil User Stories?

* Unlike normal Stories, Evil User Stories do not end up on the product backlog
* Instead
  * Use these stories to describe threats that can be applied to your application
  * Brainstorm how to `mitigate`them and document it with the security concept and documentation
  * The Acceptance Criteria of a Evil User Story can be inverted to derive valid one for a regular Story to help to include Security in a very early stage

#### Example

**Evil user story**:
> “As a hacker, I want to break into another user's account, so I can steal their credit card number.”

**Possible mitigation**:
> Obscure the last 4 digits of all credit card numbers to users who look at their billing information.

## Misuse vs. Abuse

An Evil User Story can have two points of view: Misuse and Abuse.You should always define misuse and abuse evil user stories.

On a high flight level it can be abstracted like written [here](https://security.stackexchange.com/a/57072)

> “Running while carrying a powered chainsaw is misuse doing so on
purpose in a crowded mall is abuse"

**Misuse**

* is unintentional
* still security-related (crime of opportunity)

#### Example

<p align="center">
<img width="600" src="/images/misuse-story.png">
</p>

**Abuse**

* is intentional
* implies the actor is actively seeking vulnerabilities

#### Example

Since these one can be also related to a User Story we first start with the real story ...
<p align="center">
<img width="600" src="/images/user-story.png">
</p>

this could be the result based on a Evil User Story like this:

<p align="center">
<img width="600" src="/images/evil-user-story.png">
</p>

## Tips for Defining Evil User Stories

1. Best done with the experience of many years and people of different disciplines
     * Involve domain experts of your application
     * Involve people from the security guild (e.g., other Security Champions)
     * Involve network security people
2. Get inspired by evil user stories of other projects
3. Already one good evil user story is important
   * Easier to think beyond one story
   * Starts a discussion
   * Gets stakeholders and developers into a balanced mindset early on
   * Motivates good design decisions
4. Key Points
   * Always focus on the domain don’t focus on bad coding and vulnerabilities
   * Malicious actors are creative and have lots of time to think about an attack so take your time as well
   * Question the assumptions of the system: are they correct? Are they sufficient? Are they too weak or strong?
   * First focus on what the actor can do rather than whether they will do it (think about this later)
5. Assume your team members are the hackers
   * Think of the best engineers on your team
   * Imagine that they are fired today and humiliated publicly
   * Now challenge them to break your system
   * What would they go after?
   * What knowledge could they leverage the most?
6. Define your assets and adversaries before the evil user stories
   * Brainstorm evil user stories for different purposes of adversaries
   * Brainstorm evil user stories for each asset
7. Start with general non technical evil user stories and then refine them step by step

    Example:
    > As a black hat, I want to retrieve a users credit card data, so that I can sell them on the black market.

    * `As a black hat, I can attack your database, so that I can sell credit card data on the black market.`
    * `As a black hat, I can hack into a users account , so that I can sell ist credit card data on the black market.`
8. Answer the following Questions
   * What are the other non malicious users expecting in this domain?
     * How could these users use our application wrong? This may help to define new misuse cases.  ask your
   domain expert
   * What are the ramifications of violating access restrictions?
   * Can an attacker “sit in the middle”?

## Conclusion

Evil User Stories help to get into the mindset of an attacker and discover Security requirements. It's crucial to not only define abuse but also misuse stories. This will help to get a better 360° view. Remember to define mitigations by turning the acceptance criteria from the Evil User Story into a User Story by simply inverting them. To get started - stick to non-technical Evil User Stories to train. Complex things will follow on their own.
