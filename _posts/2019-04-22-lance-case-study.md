---
layout: post
title: Lance Case Study
author: steven_harper
---

![Lance Case Study ]({{ "/images/2019-04-22-lance-logo.png"}})

### Executive Summary - [Lance](https://lanceplatform.com/)

Manchester-based Lance is a truly innovative start-up, which identifies tax risk for UK companies with off-shore structures. It calculates a risk score and also makes recommendations for tax compliance. The digital offering is both cheaper and quicker than using expensive tax consultants, due to customers paying a fixed payment for the report, rather than pay-by-the-hour consultancy.

Lance launched its product to the market in early 2018, but it became clear that it had a number of limitations, chiefly that the website tax calculation logic had been hard-coded by the web agency. It could not be edited by the Lance team so any changes required more developer time.

### Customer Challenge

The directors of Lance came to Infinity Works to find out if they could make the website more dynamic and flexible. However, we discovered what they actually needed was a platform which sat behind the website to give them a simple way to alter the logic controlling questions and the score calculation.

We took an unusual approach to a particularly challenging problem for a unique business model, and got the entire Manchester team to put their heads together and figure out the best way of solving the problem.

We held an internal hackathon one evening to generate ideas and decide on the best technology to solve the problem. This was a website with a very complex set of business rules and risk decisions applied to tax law. However, the platform behind it had to be able to create reports involving complex rules for risk evaluation without the user needing to know any code at all.

### Solution

The product allows for the client to write logic-based rules in the website&apos;s user interface, by which answers to taxation survey questions can be processed within a custom-built logic engine. This provides flexibility as taxation laws are often changing; the survey needs to reflect this. The customers of the client can then submit a variable number of surveys based on their usage plan.

![Lance Case Study ]({{ "/images/2019-04-22-lance-platform.png"}})

The website has a single interface that defines user levels with varying degrees of control. The front-end is a static vue.js application, which is hosted in S3 and uploaded/updated by the serverless framework. AWS Cognito is used for the login service. This allows us to shift our focus of hosting and user control into AWS itself.

The backend pipeline consists of AWS Lambda functions written in Golang and sits behind an API Gateway. This serves as a middle-man between the client and the data which is hosted in DynamoDB. Serverless allows us to also deploy to multiple environment with configuration settings applicable to each. This provides us with the ability to test locally, in a UAT environment and have production separated entirely.

We made use of AWS developer tools such as CodeCommit, CodeBuild, CodeDeploy and CodePipeline. This allowed us to host our entire infrastructure and code within the same environment, reducing the need to configure across different hosting platforms.

###Results and Benefits

The new platform was launched in March 2019 and gives Lance the flexibility to amend and update their new digital tax risk offering whenever required. We helped Lance build and scale their business and gave them limitless opportunities to grow with a dynamic new platform. Additionally, the serverless platform ensures that at small scale, the costs are very small for the client.