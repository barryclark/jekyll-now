---
layout: post
title: Summary of QCon New York, 2016
subtitle: Impressions, links and summaries of QCon New York
category: dev
tags: [conference, culture, devops, microservices]
author: Holger Reinhardt
author_email: holger.reinhardt@haufe-lexware.com 
header-img: "images/new/Exportiert_18.jpg"
---

Here is a quick summary of my highlights of QCon New York from June 13th to June 15th, 2016. The following are the notes from sessions I attended. To make it easy to pick the most interesting ones, I grouped them according to topics. Slides from other presentations can be downloaded directly from the [QCon Schedule](https://qconnewyork.com/ny2016/schedule/tabular) 

##### Culture
* [How to optimize your culture for learning](#how-to-optimize-your-culture-for-learning)
* [Learnings from a culture first startup](#learnings-from-a-culture-first-startup)

##### Devops
* [Implementing Infrastructure as Code](#implementing-infrastructure-as-code)
* [Think before you tool](#think-before-you-tool)
* [Container mgmt at Netflix](#container-mgmt-at-netflix)

##### Architecture
* [What they do not tell you about microservices](#what-they-do-not-tell-you-about-microservices)
* [Lessons learned on Ubers journey into microservices](#lessons-learned-on-ubers-journey-into-microservices)
* [The deadly sins of microservices](#the-deadly-sins-of-microservices)

##### Security
* [Security in cloud environments](#security-in-cloud-environments)
* [Cryptocurrency key storage](#cryptocurrency-key-storage)
 
---

### Implementing Infrastructure as Code
* [Description](https://qconnewyork.com/ny2016/presentation/implementing-infrastructure-code) and [slides](https://qconnewyork.com/system/files/presentation-slides/implementing_iac_-_qcon_nyc_2016.pdf)
* Website at <http://infrastructure-as-code.com>
* Motivations:
	* speed: get something to market fast, iterate, continuously improve it
		* heavy process to reduce danger vs everything goes
		* goal: be able to make changes rapidly, frequently and responsibly
	* challenges
		* server sprawl: config drift, automation fear cycle
* Infrastructure-as-Code: 
	* Applying software engineering tools to managing the infrastructure
	* Unattended automation (enforces discipline, discourages ‘out-of-band’ changes
	* Changes need to be tested as well, before doing a **DevOoops**
		* See <http://serverspec.org>
	* The process for applying changes is auditable (the responsible part)
		* Changes are tracked by commit
		* Automation enforces that processes are executed
		* See <http://47ron.in/blog/2015/01/16/terraform-dot-io-all-hail-infrastructure-as-code.html>
* Think about duplication
	* Re-use by forking: divergence vs decoupling
	* Sharing elements avoid monoliths - optimize to simplify changes
	
---
	
### Think before you tool
* [Description](https://qconnewyork.com/ny2016/presentation/think-before-you-tool-opinionated-journey)
* Centralized Log Analysis: <https://prometheus.io>
* Microservice dependency graphing and monitoring: <http://zipkin.io>

---

### Security in cloud environments
* [Description](https://qconnewyork.com/ny2016/presentation/access-secret-management-cloud-services) and [Slides](https://qconnewyork.com/system/files/presentation-slides/identity_access_and_secret_management_-_ryan_lane_-_qcon.pdf)
* Additional links for password and secret managers
	* <http://docs.ansible.com/ansible/playbooks_vault.html>
		* <https://gist.github.com/tristanfisher/e5a306144a637dc739e7>
		* <http://cheat.readthedocs.io/en/latest/ansible/secrets.html>
	* <https://github.com/DavidAnson/PassWeb>
	* <https://passwork.me/info/enterprise/>
	* <https://lyft.github.io/confidant/> 
* Detecting secrets in source code: <https://eng.lyft.com/finding-a-needle-in-a-haystack-b7e0627b01f6#.f0lazahyo>

---

### How to optimize your culture for learning
* [Description](https://qconnewyork.com/ny2016/presentation/optimize-your-culture-learning)
* About creating high learning environments in [Recurse](https://www.recurse.com)
* Company mantra 'You are doing your thing at your time, and we bring the place and the community'
* RC is partnering with companies: 
	* value for participants improve their software skills, 
	* value to companies: hiring access
* Motivation
	* Fear is an obstacle to learning
		* People don’t want to look stupid
		* Create a positive feel around ‘I do not know’
		* RC social rules to reduce fear
			* No feigning surprise (What, you don't know?)
			* No “well, actually” (do not correct details which are irrelevant for the conversation)
			* No backset driving (lobbying criticism over the wall without participating)
			* No subtle-isms (no racism, sexism, even in a subtle way: where do you really come from?)
* What works for us 
	* Being transparent about our beliefs re-enforces learning
	* Being vocal about our values
	* Treat people like adults
		* Don't need to check in on people every day
		* Choice to participate in activities, meetings, etc vs mandating participation
* Key message
	* Hire attitude over skill
	* You can learn any skill, but you can’t learn curiosity

---
	
### Learnings from a culture first startup
* [Description](https://qconnewyork.com/ny2016/presentation/learnings-culture-first-startup)
* About creating the right culture at [Buffer](http://buffer.com)
* How do we know how to build a good culture
* What is culture
	* In every team: the explicit and implicit behaviors which are valued by the team	
	* Evolves and changes with each hiring
	* Best teams carefully manage culture
* At buffer culture is as important as the product
	* The result are our [buffer values](https://open.buffer.com/buffer-values/)
	* Crafting culture is hard: you hire for culture, you should be firing for culture		
	* Build the core team which aligns on culture
		* Interviews/hiring around culture fit
		* Spend less time convincing people, more time finding people who are already convinced
	* In order to hire for cultural fit, the team has to be on the same page
	* Lessons learnt from experimenting with culture
		* Transparency breeds trust (for team and customers)
			* See <hhtps://buffer.com/transparency>
			* Buffer transparency salary calculator
				* See <https://buffer.com/salary?r=1&l=10&e=2&q=0>
			* Term sheet and valuation of round A are public
				* See <https://open.buffer.com/raising-3-5m-funding-valuation-term-sheet/>
			* It is even more important to be transparent when things don’t go well
			* Culture is truly tested and defined during hard times
		* Implementing culture for a globally distributed team
			* Can hire the best people in the world
			* Hard to brainstorm (teams need mini-retreats)
			* Harder to get on the same page
			* Hard to disengage from work when working through Timezones
		* Cultivate culture for remote work
			* Need to be self-motivated and genuinely passionate about your work
			* Need to be resourceful, can get through roadblocks
			* But hard time to hire juniors/interns
			* Written communication is our main medium
				- But can’t replace in-person interactions: We have retreats
		* Make mistakes, keep tight feedback loops, iterate fast
			* Growing a remote team without managers was a bad choice
			* Instead of hiding mistakes, we share them openly
			* There are no balanced people, only balanced teams
				* Culture fit -> culture contribution
				* Its the leaders job to hire for balance
				* Hiring for culture fit assumes that culture is perfect and static
				* See <http://diversity.buffer.com>
					* A/B testing to attract different demographics
					* Taking hiring risks consciously (instead of reducing it)
						* Everyone is hired for a 45 day work bootcamp (full-time contracting period)
		* Can’t copy other cultures
		* Culture as differentiator (from 300 to 4000 job applicants)

---
		
### Container mgmt at Netflix
* [Description](https://qconnewyork.com/ny2016/presentation/scheduling-fuller-house) and [Slides](https://qconnewyork.com/system/files/presentation-slides/schedulingfullerhouse_nflx.pdf)
* Running container on AWS results in loosing EC2 metadata and IAM control
* Lesson: making container act like VMs
	* Implemented EC2 Metadata Proxy to bridge EC2 metadata into container
	* Why?
		* Amazon service sdk’s work
		* Service discovery continues to work
* Lesson: Image Layering
	* Engineering tool team generates base images (blessed, secured) for app envs (i.e. node.js)
	* Application images are derived from base image

---

### Cryptocurrency key storage
* [Description](https://qconnewyork.com/ny2016/presentation/banking-future-cryptocurrency-key-storage)
* How cryptocurrency is stored at [Coinbase](https://www.coinbase.com)
* Sharding of crypto keys using [shamir secret sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing)
* Using cold and hot storage (consensus access)
	* Cold storage
		* Most of the crypto currency is stored in cold storage (disconnected)
		* Generated on hardware never connected to the internet
		* Stored on usb
		* Private key is being split into shards and encrypted independently 
		* Restoring private key requires majority of shards (individual parts can go rogue)
		* Example: Ethereum Cold Storage for smart contracts
			* 4 of 7 can retrieve the contract
			* 6 of 7 can change the contract
	- Hot storage
		* Fully insured
		* Ssingle server requiring a quorum of senior engineers to unlock/unscramble
* Multisig Vault
	* <https://www.coinbase.com/multisig>
	* Cold Storage as-a-Service (User Key, Shared Key, Coinbase Key)
		* User needs paper and passphrase
		* m-of-n sharding of key is possible

---

### What they do not tell you about microservices
* [Description](https://qconnewyork.com/ny2016/presentation/what-they-dont-tell-you-about-micro-services) and [Slides](https://qconnewyork.com/system/files/presentation-slides/qcon-microservices_talk_v7_for_web_upload.pdf)
* See also
	* <http://www.slideshare.net/DanielRolnick/microservices-and-devops-at-yodle>
    * <http://www.yodletechblog.com/2016/04/25/yodle-hackathon-april-2016-edition/>
* Good pragmatic steps for evolving from monolith to microservice architecture
	* After split Postgres started to break down with connection pooling, used an external connection pooler like <https://pgbouncer.github.io>
    * Choose mesos/marathon
    * Thrift-based macro services
    * Smart pipes vs context-aware apps
        * Decoupling application from service discovery
        	* (v1) curator framework from Netflix brought into Zookeeper
        	* (v2) hibachi by dotCloud (dedicated routing hosts)
        	* (v3) haproxy
        	* Marathon has built-in routing concept using haproxy (generates haproxy config)
        	* Started using qubit bamboo
        	* Can iterate routing and discovery independently from application, but run into scale problem around 300 service (square on every service needs to know every other service and health)
			* Moving back to topology of (v2) but with HAProxy
	* Continious Integration/ Continious Deployment CI/CD
		* Using Sentinel to manage services
		* Concept of [canary release](https://www.infoq.com/news/2013/03/canary-release-improve-quality)
	* Container make things more simple but leave mess behind
		* Need to clean up container images: [garbage collection in registry?](http://www.yodletechblog.com/2016/01/06/docker-registry-cleaner/)
	* Monitoring
		* Graphite and Grafana
			* Did not scale, since every team had to build own dashboard
			* Too much manual effort and no alerting
		* Switched to New Relic
			* Fully monitored if agent is present
			* Goal was 100 apps in 100 days
	* Source code management
		* Using [Hound](https://github.com/houndci/hound) to help with code searching
		* Using [GitRepo](https://code.google.com/p/git-repo/) to help keep repos up to date
	* Human service discovery
		* Using [Sentinel](http://www.yodletechblog.com/2015/12/14/yodles-continuous-improvement-of-continuous-delivery/) for developer finding services

---

### Lessons learned on Ubers journey into microservices
* [Description](https://qconnewyork.com/ny2016/presentation/project-darwin-uber-jourbey-microservices) and [Slides](https://qconnewyork.com/system/files/presentation-slides/uber-journey_to_microservices_public.pdf)
* See also <https://eng.uber.com/building-tincup/>
* Very good presentation on the motivators to break apart the monolith

---

### The deadly sins of microservices
* [Description](https://qconnewyork.com/ny2016/presentation/seven-deadly-sins-microservices) and [Slides](https://qconnewyork.com/system/files/presentation-slides/qcon_nyc_2016_-_seven_more_deadly_sins_final.pdf)
* See also
	* <https://speakerdeck.com/acolyer/making-sense-of-it-all>
	* <http://philcalcado.com/2015/09/08/how_we_ended_up_with_microservices.html>
	* <http://www.slideshare.net/dbryant_uk/craftconf-preview-empathy-the-hidden-ingredient-of-good-software-development>
	* <https://acaseyblog.wordpress.com/2015/11/18/guiding-principles-for-an-evolutionary-architecture/>
* Strategic goals <-> architecture principles <-> design and delivery practices
* Neal Ford: MSA as evolutionary architecture
	* Architecture is hard to change, so make architecture itself evolvable
* The spine model
	* Needs -> Values -> Principles -> Practices -> Tools
	* going up to the spine to break deadlock
* Cargo cutting
	* Understand the practices, principles, and values 
* But getting lazy with non-functional requirements
* Just Enough Software Architecture
	* Recommended book [Just enough software architecture](https://www.amazon.com/Just-Enough-Software-Architecture-Risk-Driven/dp/0984618104/)
	* Ebook format available through <http://georgefairbanks.com/e-book/>
* Embrace BDD-Security framework for BDD-style security testing
	* <https://www.continuumsecurity.net/bdd-intro.html>
* Devops
	* Topologies: <http://web.devopstopologies.com>
* Testing
	* Continues Delivery: <https://dzone.com/articles/continuously-delivering-soa>
	* Service virtualization: <https://github.com/SpectoLabs/hoverfly>
		* Hoverfly is a proxy written in Go. It can capture HTTP(s) traffic between an application under test and external services, and then replace the external services. It can also generate synthetic responses on the fly.
		

