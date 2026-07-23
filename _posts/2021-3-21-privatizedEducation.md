---
layout: post
title: Privatized Free Education
---

Governments around the world often provide free education. Almost always, they not only provide but also organize it. 

A common complaint against government-operated organizations is that they're supposedly not effective at reaching their goal. How are our educational systems doing in that regard? Let's look at some data. Here's a poll to collect the opinions of you and your follow readers:

<iframe class="qp_iframe" src="https://www.poll-maker.com/frame3521929xF9DC897B-106" seamless="seamless" frameborder="no" style="border:0; background:transparent; width:100%; height:539px;"></iframe><div id='qp_foot3521929' style='width:100%; padding:5px; text-align:center;'>Created with <a href='https://www.poll-maker.com/'>Poll Maker</a></div><STYLE>@media (max-width:320px) {.qp_iframe{min-height:683px}}@media (max-width:375px) {.qp_iframe{min-height:611px}}@media (max-width:414px) {.qp_iframe{min-height:611px}}</STYLE>

The above poll shows that few of us think our education was optimal. Of course, it's easy to criticize, and maybe our education was actually better than we think.

In the media, we can find numerous articles describing issues with educational systems around the globe. In the Netherlands, there are primary school teacher shortages so vast that primary school classes can reach over 50 students. Sometimes schools let people teach that have not yet started their teacher's education, because they have no one else to teach.

Instead of looking at the problems in education, we can also approach it from the other side and think of what we want from it.

##### What do we want for teachers?
Teacher salaries that compete with similar jobs in the market, so we can attract enough teachers for our classrooms.

More choices for teachers, such as teaching for more specific age groups. Currently in the Netherlands, a primary school teacher's education prepares teachers for working with the age range of 4 to 12. There's a huge difference between teaching either end of this range, one group needs help going to the bathroom, while the other wants to learn about the world. Some teachers aren't interested in working with both groups, and then decide not to become a teacher altogether.

More differentiation in teacher salaries. Teachers teaching in more expensive cities should get paid more. Excellent teachers should get paid more.

##### What do we want for students?
More differentiation in student levels. In the Netherlands, it's common for fast learners to skip a year if they tend to go through their current year's material too quickly. However, it's entirely up to the student whether to work ahead or not and often there's no motivation for students to go faster than the average student in their class.

Support with choosing an educational path. Too many students get stuck deciding what to study, and have to try out several studies before finding one that matches them.

Practical career advice. How do you prepare for interviews? How do you find what companies to apply for? How do you negotiate your salary?

Education that never stops. What do you do if you get fired? What do you do if a crisis hits and your field collapses? The system should support people in changing their career if needed.

## Proposal
We hope to achieve the above goals by introducing a measurable goal for education, and moving the organization of education from the government to private industry. 

Privatizing free education can be done by letting the government sell an education contract once a child reaches an age where we want to start its education. The contract is tied to the child, who we will call the student in this context. Whomever owns the contract is given some payout each year that depends on the student's income. Initially that payout will be zero, since the student has no job yet, but it will start paying out once they reach an employable age and get a job. The contract owner is thus incentivized to help the student get a great career, which they can do by educating them.

The above approach raises a number of questions:
- How do we ensure students are educated equally?
<!-- - How do we provide broad education not just focused on future income? -->
- How do we balance the needs of government, parents and student?
- How do we handle an education provider that's not meeting expectations?
- How do we ensure education providers are paid fairly?

<!--
- How do we prevent education providers from making too much profit?
- How can we gradually move to this system?
-->



### How do we ensure students are educated equally?
It's important that students, after leaving the educational system, are at a similar level of capability. Educational equality improves income equality and reduces the need for social welfare.

When it comes to equality in education, we can consider three different extremes:
- Equal: we try to let each student reach the same level
- Fair: we put the same effort into educating each student
- Greedy: we teach students as long as the increased income outweighs the cost of teaching.

The Dutch educational system is a mix of equal, fair and greedy. It's mostly fair in the sense that most students will get a similar amount of education, with similar class sizes and their teachers receive similar salaries. However, it's also greedy since fast learners are taught slightly longer in the Dutch system. Fast learners generally end their high school at 18 years of age while slower learners end it at age 16. The system is equal in the sense that students who struggle a bit, but not too much, can stay in the same level they are, but simply take longer to finish it.

When using educational contracts to privatize education, we can set the payout in such a way to achieve different types of equality in our education. 
- A payout that's linearly coupled to the student's income leads to a greedy system.
- A flat payout that's given if the student's income is above a certain minimum leads to an equal system.

It's not possible to set the contract payout in such as way that it leads to a fair system. However, we believe that a fair system is not a desirable goal, only equal and greedy systems are. We suggest combining both the greedy and equal types of payout:

{% highlight haskell %}
payout income = greedy * greedyPart + (1 - greedy) * equalPart
where 
    greedyPart = profitFactor * income
    equalPart = if (income > threshold) flatPayout else 0
{% endhighlight %}

Choosing the right threshold is difficult. The threshold determines what income the educational system is optimized for. Both people with a higher and people with a lower income than the threshold are at risk of being undereducated. People with a higher income than the threshold are undereducated because the educator will notice the person is already good enough to meet the threshold, so stop educating them. People with a lower income than the threshold are undereducated because the educator will notice the person won't make the threshold, so stop investing in them.

We suggest placing the threshold at the height of the lowest earning jobs, to maximize the number of people that can find a job.

<!-- 
Section about why 'fair' education isn't good, that it leads to both overeducation of weak learning and undereducation of strong learners.

Why isn't it possible to set a payout that achieves fair education?
-->

<!--
How do we deal with inflation?
-->

<!--
# How do we provide broad education not just focused on future income?
We want much more from education than just providing our children with a high future income. We also want our children to be educated in things that might not relate to their income, things such as physical or cultural education. The government can decide to provide separate education for these things, or include them as conditions in the education contract.

We also want to provide our children with choice in life, the ability to choose a job that they like, not just a job that pays well.



Education providers may differ in factors that don't necessarily relate to improved income, factors such as:
- Physical, cultural and religious education
- Flexible education, the ability for students to choose what job they want to do.
- Student happiness, how much students enjoy their education

Such factors can be included as part of the educational contract. The contract can specify how much time the student much be educated in each of those topics, and possibly what the outcome should be. If a contract holder does not meet these criteria they can be considered in breach and be forced to sell the contract. We later establish a mechanism for forced sale of a contract.
-->

### How do we balance the needs of government, parents and student?
How do we decide to which education provider to sell a student's education contract? The government, the parents and the students themselves are all stakeholders.

We propose that the government first filters the offerings of education providers, after which, depending on the student being of a minimal age, either the parents or the student must select one from the remaining list. 
The government will likely filter out education providers that it does not trust to optimally use the contract, or that it fears might breach the contract.

Education providers may offer more or less money to buy a contract, and in the case of a student with a learning disability may even ask for money to 'buy' the contract. 

Expensive education providers are those that bid a relatively small amount for an educational contract. The government may ask parents or student to compensate for choosing an expensive education provider. We suggest considering providing parents and student with a fixed educational budget that they can use to spend on more expensive educational providers, so that poor parents also have a choice in what provider to pick.

### How do we handle an education provider that's not meeting expectations?
What if an education provider is under-educating the child, not educating them well enough to get the most out of the contract?

Educational contracts are periodically appraised. The government will estimate how much the student will earn throughout their lifetime, and together with its estimations of costs to educate, will determine how much it thinks the education contract the student is currently worth.

Education contracts have a cancellation clause which can be invoked if the government is unhappy with an education provider, which likely happens if they think the provider is under-educating the child. When the cancellation clause is invoked, the education provider is paid the amount the government thinks the contract is currently worth.

If parents are not happy with an education provider, they can ask another education provider to buy the contract from the current one, and offer some money for this. The money can be spent from the parent's educational budget.

### How do we ensure education providers are paid fairly?
Educating a person is an extremely risky and long term investment. It's possible that no private investors are willing to do this. Education contracts should be tradable, so that one provider can sell a contract to another provider. This way, an education contract holder can make a profit simply by increasing the expected income of the student, without actually getting any direct payout from the contract.

To jump-start the education contract trading market, the government should act as a buyer of education contracts, after which it will try to sell the contract again. To prevent abuse, the government will only buy a contract once every so often, for example only once a year.


<!--
payout(income) = greediness * greedy + (1 - greediness) * equal
where 
    greedy = factor * income
    equal = if (income > threshold) flatPayout else 0

average_lifetime_income

contract_value = lifetime_payout(person) - education_cost(person)

contract_value should be positive for people expected to meet the threshold, so
lifetime_payout(person) > education_cost(person)

lifetime_payout(person) = greediness * greedy + (1 - greediness) * equal
where 
    greedy = factor * lifetime_income
    equal = if (lifetime_income > lifetime_threshold) lifetime_flat else 0

lifetime_payout(person) = greediness * factor * lifetime_income + (1 - greediness) * lifetime_flat

greediness * factor * lifetime_income + (1 - greediness) * lifetime_flat > education_cost

-->
#### Emigration
What happens if a student decides to move to another country, where they won't pay taxes to the country where they were educated, and it may not be possible to track their income? Will the holder of the educational contract be left without a payout? 

In this case the government will make an estimate of what would have been paid out for that person per year, and pay that out on a yearly basis. If the person happens to immigrate back, the normal payment based on their income will continue.

<!--
Are there weird side-effects because contract holders might benefit from people leaving or staying in the country? Will they contact people and offer them money for saying or leaving?
-->

<!--
# How do we determine the payout of an education contract?

We previously established the following function for the contract payout:
{% highlight haskell %}
payout income = greedy * greedyPart + (1 - greedy) * equalPart
where 
    greedyPart = profitFactor * income
    equalPart = if (income > threshold) flatPayout else 0
{% endhighlight %}

This function however still contains many variables. Let's try to resolve them. We suggest settings `flatPayout` to `profitFactor * threshold`.

# How do we prevent fraud?
To prevent fraud, we must ensure that no money can be made by an education provider giving a student a fake job where the student doesn't need to work but returns part of their salary back to the education provider, who then also receives the flatPayout from the government who doesn't realise the job is fake. We can ensure that with the following invariant:

{% highlight haskell %}
tax(threshold) - tax(0) > payout(threshold)
{% endhighlight %}

Which we can rewrite to:
{% highlight haskell %}
tax(threshold) - tax(0) > profitFactor * threshold
{% endhighlight %}

Filling in the tax equation, we get a restriction that forces the threshold to be above a certain minimum.


We want to keep the `threshold` as low as possible, since education providers are likely only interested in educating people who can meet this threshold. Students who are unlikely able to meet this threshold will have eductional contracts with negative value, meaning the government will pay education providers to educate these people. 

The above invariant limits how low the threshold can be set. 

<!-- insert example income vs payout curve -->

<!-- 
y=x*(1-1/(1+0.01x^2))-5


-->