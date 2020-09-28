---
layout: post
title: Learn Serverless 
---

1. API Gateway that accepts Get and Post (Express)
2. From API Call Lambda Rendering html site 


##### CloudFront
Steps that this tutorial talks about 
1. Creating custom domain using Route 53
2. Creating certificates for your domain using Route Resolver 
3. Pointing your s3 bucket invokation url to this domain using cloudfront 

Cloudfront over here acts more as dns routing which internally takes care 
of publishing your dns to all the edge servers across the globe. It registers
an internally generated cloudfront url and from custom domain its redirected
to this URL. Below Video makes it clear.  

https://www.youtube.com/watch?v=_otcYm8RVHA&list=PLIIjEI2fYC-DX8ozrwHkz81muM7kmbC3F&index=10

##### 11. Clear cloudFront distribution cache 
You have to clear cache to get changes in your index.html here. 

##### Cloudfront Resources:
2:35
https://advancedweb.hu/how-to-route-to-multiple-origins-with-cloudfront/
advancedweb.huadvancedweb.hu
How to route to multiple origins with CloudFront
Set up path-based routing with Terraform
2:36
https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-distribution-serve-content/


https://collab.schoologize.com/pages/viewpage.action?pageId=92414851
https://ci.schoologize.com/deploy/viewDeploymentResult.action?deploymentResultId=413075050


[Serverlesss Best Practices](https://medium.com/@PaulDJohnston/serverless-best-practices-b3c97d551535)