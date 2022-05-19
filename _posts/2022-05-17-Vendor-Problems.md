## Another Rant: Qualities I Need from Security Vendors

***Disclaimer*** : I'm using vendors that I've worked with over the last few years as examples of times I think we made the right choice to partner with a vendor for capability. No one sponsored this post... I'm just really proud of the improvements that (I tell myself) I helped influence, and impressed by how quickly these companies matured.


I REALLY enjoy working with tech companies... like... REALLY REALLY REALLY enjoy it. Being surrounded by people with the mindset of "X doesn't support it, we'll just build it ourselves" means that even if the business is focused on selling tacos, you get to work on crazy projects like:

- "Reduce engineer ramp-up time by providing ephemeral development environments"
- "Improve contract labor cost tracking by providing missed-punch automation"
- "Save $5 million per year by optimizing log storage"
- "Protect our customers from credential stuffing and reduce chargeback rates by switching to passwordless login"
- "Modernize fraud analytics by providing a data analysis platform and ETL pipeline for business users"
    
The downside is, we're really just nerds looking for ways to justify building something cool. It's often cheaper (spelled, "the right decision") for the business to ignore potential savings until the feature we want is added by a vendor. Why then, do we still find ourselves building shiny things instead of waiting? Three things usually tip the scales for me:

- Is it an "advanced machine learning system driven by AI" that magically solves my problems? No thank you...
- Can I get the data out of the tool and abstract it to work with the rest of my environment?
- Does the vendor have engineering quality standards similar to ours?

### The Problem with ML/AI Magic
Walk around the exhibition floor at BlackHat or RSA and you'll be overloaded with people claiming to solve all your problems for you with a click of a button. Their deep web crawling AI uses advanced machine learning algorithms to simplify data analysis and reduce false positive rates. Three questions:

- WHAT DOES THAT EVEN MEAN?
- Soooo... how many data scientists/ml engineers do you have on staff?
- How do I know when you're giving me a fact vs an assumption/inference?

The first two questions are really just to push back on marketing hype... I'm not a fan of vendors that show up selling snake-oil to non-technical execs. Well, except [these folks](https://www.instagram.com/fakesecurity)... Francis Archibald can take my money any day.

The 3rd question is probably the most important... does the vendor explicitly tell me when they are making an assumption? Better yet, do they show me what data they used to make the assumption so I can clean it up? Gold Star Award: Is there a way for me to override the vendors decision?

Recently, Vendor-Who-Shall-Not-Be-Shamed pitched me on their feature that will parse Github and HRIS data to identify both the owner of a repository and their team/reporting chain. SUPER COOL! Now I can provide:

- Feedback directly to the developer when they have a security bug.
- Open a ticket in the right Jira queue for their team to track it.
- Provide a Director/VP level rollup of security metrics.
    
They infer the owner the same way I would:

1. Using a specific tag/label on the repo/branch.
2. Use CODEOWNERS file if that doesn't exist.
3. Fall back to "most frequent commit" if nothing else works.

Their problem:

- They can't tell me which option they used.
- I can't override their bad decisions.
- I can't "choose my own adventure". What if I was using a tool like Backstage already?
    
Consider this: It's common for engineering teams to automate certain types of commits (DNS, dependency version bumps, etc.)...  how useful is your tool when you assume that a bot is the correct owner for a security bug?

### My favorite vendors support REST/GraphQL

"We've invested thousands of hours refining our product to provide you with a single pane of glass for X". Cool story bro, but I have to support and monitor X, Y, Z, A, and B.... Now I have 5 single panes of glass....

I'll pick on my friends at [Orca](https://orca.security/platform/agentless-sidescanning-technology/) on this one... They're working REALLY hard to provide a DSL and web interface that makes digging through cloud vulnerabilities simple; it's a very approachable product for point-and-click security teams. But, I don't work on point-and-click teams, so when I read their solution brief, I wanted to walk away...

Fast forward 30 days, I stubbornly agreed to a demo, but only if they brought an engineer to talk about how it actually worked... I'm glad they obliged, because what I found out was basically, "Oh yea, the UI is just wrapper for our API... you can pull any of this data from us whenver you want".

***Mind Blown***

In the past, I'd worked mostly with Rapid7 products for vulnerability scanning, and their data export / API access was extremely limited... most of the time I found myself tinkering with Selenium or screaming at their Data Warehouse Export feature because of how closed off their data was. An API first product goes to the top of my list.


"But they worked hard on the UI, you're paying for it, you should use it."
While that is true, when it comes to integration with a vendor my focus is on two areas:

- Security should meet development teams in the tools they work in.
- Avoid vendor lock-in (make it easy to replace them in the future).


Security teams are often a significant source of interrupt work for other parts of engineering; the least we can do is inject our interrupt and tech-debt tasks into the same workflow you use every day. I NEVER want to make an engineering team responsible for logging into a security tool directly.

While nearly all vendors provide an integration for Jira/Slack/Pagerduty/etc. , it's very rare that it FULLY integrates with the businesses current process. Great for a PoC, but long term we need a custom integration.... but that triggers the second problem, "avoiding vendor lock-in". Choosing API first vendors allows me to abstract and normalize their data, prior to integrating. This way, when we change security vendors, we only have to update the abstraction code, and not the process/procedures/automations that were driven by it.

Example:

I want to send a slack message to a team room when a critical vulnerability is found. I also want to open a ticket in the correct JIRA queue for any moderate or higher vulnerability. The same process should be followed for Application Security, Cloud Configuration, or Operating system vulnerabilities.

1. I can build a pipeline that receives ["Service Name","Vuln Description","Details URL"] and does all the things
	
2. I can build an automation for each scanning tool (App, Cloud, Container, Host) that will trigger the above pipeline

	
The benefit here is that if I replace my App scanning tool, I only have to update the integration it uses to trigger the pipeline (#2)... The data is abstracted before being sent to the pipeline (#1). This also means that if the business switches from Jira to Trello, I only have to update the pipeline... All my scanning tools will continue to work.
	
Additionally, I can do REALLY neat things, like consider the sensitivity of the service or whether it is publicly exposed to adjust the severity of the findings before triggering the pipeline. Most vendor provided integrations (I'm looking at you InsightVM....) don't support complex workflows like that.
	
The folks at Orca have set the bar REALLY REALLY HIGH for me when it comes to providing data in a consumable way, that my team can integrate with everything we do. (Also, I really like the way they simplify prioritizing vulnerabilities...)
	
	
### The engineers I support have high standards, I do too.
	
One thing I picked up from my Runtime Engineering friends over the years is that "A project isn't complete until it has alarming and a wiki". Did we process 1 event instead of 1000? Trigger an alarm. Did we process 500k events instead of 1000? Trigger an alarm. When an alarm fires, how do I know what to do? A link to the triage runbook is part of the alarm text.

When it comes to security, we often give vendors a pass on engineering excellence because, "We need this to be secure". Fun Fact: We also need it to work, and to know when it stops working.
	
I'll pick on my friends at Cycode for this one... when we first met my primary interest was them was their ability to scan pull requests for secrets, then block the PR from being merged if a secret was found. SUPER COOL! 
	
However, what happens when your security tool fails closed? What happens when your security tool has too many false positives? Development grinds to a halt, and the tool might end up getting kicked out of the environment because of your negative impacts to the business.
	
An experience like that goes one of two ways: the vendor owns the mistake and takes visible steps to improve their monitoring and (customer) alerting capability, or they explain to you how it wasn't their fault because X,Y,Z. For clarity, I don't expect five nines of uptime from my vendors, but I do expect them to tell me when they're having an outage, and to perform a root cause analysis once it's resolved... just like our engineering teams do.
	
Again, that's one of my favorite things about partnering with vendors who care about engineering excellence, I got to watch Cycode mature from ... "We'll have to look into why all your developers are upset." to "We have a slack integration that will notify you of any platform stability issues". Fast forward 6 months, I'm receiving automated notifications from them because MY platform is having issues, and they noticed that the integration we had with them was failing... 
	 
Finding solid partners is hard, but when you do, you challenge each other in ways you'd never think of alone. (Hat tip to the folks at Cycode, you've done a great job at building a blameless culture within your engineering teams, and I sincerely appreciate how seriously you take customer feedback.)
	
	
### Summary
If you're a vendor and want to sell me your product:

- Stop with the NASCAR slides and hiding behind AI magic
- Focus on the value of the data you collect, and how easy it is for me to extract it
- Own the quality of your engineering, and be up front with me on where your weak spots are.