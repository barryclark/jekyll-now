I hear two main objections/concerns about refactoring: [safety](http://jay.bazuzi.com/Neither-Necessary-nor-Sufficient/) and cost.

Even if we agree that refactoring is valuable, our customers are eager for these features and we would really like to sell them. Let's focus on getting these features done, and we can refactor later. Or at least lets limit our refactoring to a suitable proportion of our time. Right?

The refactorings I do can be grouped by their cost in three buckets:

# Read-by-refactoring

Read-by-Refactoring is Arlo Belshee's technique for reading code faster and more accurately. It is not a refactoring technique, although it does leave the code easier to read as a happy side-effect. But the purpose is reading faster and more accurately.

We don't know how to teach it in text, so I won't try here. (Let Arlo know if you want to hire him to teach at your company.) I'll just assert that, net, it's cheaper to read code with RbR than the conventional way. (OK, summary: whenever you read code and have some insight about the code, record that insight with a Disciplined Refactoring.)

Closely related to RbR is Llewellyn Falco's and Woody Zuill's [Practical Refactoring](https://www.youtube.com/watch?v=aWiwDdx_rdo), which is safe and super-cheap. 

# Feature-oriented refactoring

I now approach most programming work from a refactoring perspective. Instead of asking myself "how can I implement this feature?" I ask "what design of this system would make it natural and easy to implement this feature", and then use [Disciplined Refactoring](http://jay.bazuzi.com/Disciplined-Refactoring/) to get from here to there.

I don't think about this kind of refactoring in terms of cost. My purpose isn't to clean up the code, it's to implement the feature. Refactoring is just the best way I know to get there. I can't measure the time it takes, but my sense is that it's close to or less than the time it would take to implement a feature conventionally.

I think anyone can learn this, but I've only seen a handful of developers actually pick it up. Maybe you're next?

# Paying down technical debt.

Sometimes we set aside time to focus only on refactoring some code that has been bothering us lately. This doesn't have the zero-ish cost profile of the kinds of refactoring listed above. It has a real cost, and we must consider the ROI. I usually do this in code that I need to work in anyway, or am afraid to work in, so I can get that return quickly.

# The right proportion?

I think aggressive refactoring is a smart business move, because the organizations that are able to deliver the most value are the ones that invest in their ability to deliver the most value. (Not the ones that just focus on delivering value. It's oblique.)

But if your organization is drowning and can't afford refactoring time, you can do RbR and Feature-oriented Refactoring all the time without hurting the business. Then, as pressure eases, you can squeeze in some small tech. debt payments. (It will take a little time to learn the skills do this. If you can't even afford time to learn new skills, well, I can't help you.) 
