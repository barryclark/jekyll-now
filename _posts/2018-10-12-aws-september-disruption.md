---
layout: post
title: AWS September 26th Disruption
author: steven_harper
---

On the 26th September 2018, one of AWS’ availability zones in the Ireland region (EU-WEST-1) suffered an incident that lead to _“increased error rates”_.
At Infinity Works we have multiple clients and systems we operate in the AWS Ireland region, during this event our teams observed various symptoms, resulting in some unplanned work. This post details what happened; what we saw and how we plan to mitigate the impact of a similar incident in the future.

### So first; what did AWS publish about this on the [AWS status page](https://status.aws.amazon.com/)


<iframe width="100%" height="400" src="https://time.graphics/embed?v=1&id=154644" frameborder="0" allowfullscreen></iframe>
<div><a  style="font-size: 12px; text-decoration: none;" title="Timeline generator" href="https://time.graphics">Timeline generator</a></div>


 - *1:06 AM PDT*
 
 _We are investigating increased error rates for new launches in the EU-WEST-1 Region._
 - 1:37 AM PDT 
 
 _We can confirm increased API error rates and connectivity issues for some instances in a single Availability Zone in the EU-WEST-1 Region._
 - 2:14 AM PDT 
 
_We continue to investigate connectivity issues from some instances to some AWS services in the EU-WEST-1 Region. We have identified the root cause and are taking steps to resolve the issue._
 - 3:03 AM PDT 
 
 _We have resolved the connectivity issues from EC2 instances to the affected AWS services in the EU-WEST-1 Region. We continue to see elevated error rates for the RunInstances EC2 API, which we are working to resolve. Internet connectivity and connectivity between EC2 instances remain unaffected._
 - 3:28 AM PDT 
 
 _Starting at 12:15 AM PDT we experienced increased API error rates for the EC2 API, and connectivity issues between EC2 instances and AWS services in the EU-WEST-1 Region. At 2:29 AM PDT, the connectivity issues between EC2 instances and AWS services were resolved. At 2:59 AM PDT, the increased API error rates for the EC2 APIs were fully resolved. Internet connectivity and connectivity between EC2 instances was not affected. The issue has been resolved and the service is operating normally._

### What did we see accross accounts and clients

Not all of our accounts and clients were in the affected availability zone; which zone was impacted? Well each customer gets a [random availability zone id for their account](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html), so you cannot just say _eu-west-1a_ was impacted, because every customer gets assigned one of the zones as having this label.  We suspect this is because customers mostly choose the first Zone, and would not evenly distribute usage across all three zones in Ireland if everyone had the same labels.

The UK (BST) time for the distruption was reported at 9:06am, it started at 8:15am and was resolved at  10:59am.  Major IT news sites; [The Verge](https://www.theverge.com/circuitbreaker/2018/9/26/17905158/amazon-alexa-outage-europe-down-service), [The Register](https://www.theregister.co.uk/2018/09/26/amazon_alexa_outage_down/), were only reporting that Amazon’s Alexa was down, while the Social IT sites such as [Reddit](https://www.reddit.com/r/aws/comments/9j0lfn/issues_in_euwest1_aws_aware/) had accounts of more specific issues.

Some of our teams were quickly aware of the issues, whilst others who were not impacted were unaware there was a disruption.  Some accounts had direct contact with their AWS TAM (Technical Account Manager), to understand the impact and help deal with the issues caused.  Here is a summary of the symptoms we encountered :

 - __Direct Connect__ - connections down
 - __EC2__ - Launching instances slow, API calls slow or failing intermittently
 - __EC2__ - Connectivity between availability zones impacted
 - __EC2__ - Unable to RDP into instances in impacted Availability Zone
 - __SQS__ - Requests not making it into SQS - could not establish tunnels
 - __APIGateway__ - Requests into ALB’s resulted in 5xx errors 

Once everything was back up and running, many teams tried to work out how they could have dealt with the issue better. AWS did not publish the root cause of the incident so the focus was on how to be more aware of similar events rather than how to avoid it altogether.

### From this the following suggestions arose;

 - Make use of the [AWS Health API](https://docs.aws.amazon.com/health/latest/ug/getting-started-api.html) - consider adding [cloudwatch events](https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html) to integrate into your current monitoring systems.
 - For Direct Connect or VPN connections into customer data centers, have them monitor the status of the connection from the DC side - as most connections only allow one way traffic out of the on-prem systems.
 - External monitoring outside or your operating region is important - if you use a third party, pick a region that is not the same as your production services.
 - Ensure that systems are multi AZ deployed if critical
 - Test deployment code with AWS API failures in mind.
 - Monitor other nearby AWS Regions, as customer may be moving to your Region during service affecting disruptions.
