## Serverless with AWS at DevTalks

On Wednesday this week I presented about serverless at [DevTalks](http://www.devtalks.ro/). You can find the slides on [SlideShare](https://www.slideshare.net/melaniadanciu/new-serverless-world-cloud-native-apps). 
It was a 30 minutes presentations about the opportunities offered by Serverless Architecture, What are the offers from the big Cloud Providers and how you can build a 3-tier architecture app having no servers.

### A different mindset

The main idea is that you need to change your mindset from being always in control of everything being it you servers, your updated, memory and how much and when you scale and focus more on what you application is delivering and live all the other responsibility to your Cloud Provider.

Of course there are also trade-offs like you being locked-in with a certain cloud provider once you choose to use a particular service but to be honest, there is so much competition between all of them and they evolve so rapidly that you will not have the problem that you need a functionality and you do not have it with the chosen service.

And in the end they are services, if you build you app in a way it can abstract the use of a service or another then you should be safe.

Another thing is that you need to think in terms of functions and how you can build them as small as possible and to have them orchestrated properly. Amazon offers Lambda Functions and API Gateway as a solution for this. In case you want to create a state machine with this functions you can have this done with Step Functions for example. 

The use of all these services comes with a cost and you will be surprised of how small the cost is. For 1000 active users having 20 requests per day to your API and 10 MB of storage you will pay like for a Starbucks coffee. Here is a list of services used in my project and [the Cost](https://www.slideshare.net/melaniadanciu/clipboards/aws-costs?rftp=top_clipboards)

### Challences 

There are different challenges like How do you do development , Authentication, Authorisation, have Different Levels of Security. Do you have proper Logging, Monitoring and also how do you store your data and do this with now servers to manage? For sure these are just a couple of questions that I had for my Project and the good thin is that Amazon answered to all of them till now. 

#### How do you do development:

- You can install you db as service offline, and my DB of choice was [Dynamo DB](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)
- You can have you server offline and I choose to implement my server component using [Serverless Framework](https://serverless.com/) and for this I have [serverless offline](https://github.com/dherault/serverless-offline)

Now at Build Microsoft announced that they have full support for Azure Cloud Functions from development, debugging in deployment using Visual Studio, most probably we will see a complete solution also from Amazon. 

#### Authorization&Authentication
When it comes to Authentication I used [AWS Cognito](https://aws.amazon.com/cognito/), just have a look and you will love it, it offers the possibility to create a new user pool ore use an existing one, you have different email templates, a workflow for register and also 2 factor authentication. 
For Authorisation you can user AWS Cognito together with IAM which offers super granular roles and wrights management. 

#### Security

When it comes to others levels of security you can have a look at the [AWS Cloud Security](https://aws.amazon.com/security/) where you can find solutions for [Firewall](https://aws.amazon.com/waf/?sc_channel=PS&sc_campaign=acquisition_RO&sc_publisher=google&sc_medium=waf_b&sc_content=firewall_security_e&sc_detail=aws%20firewall%20security&sc_category=waf&sc_segment=164612484381&sc_matchtype=e&sc_country=RO&s_kwcid=AL!4422!3!164612484381!e!!g!!aws%20firewall%20security&ef_id=WNjNWAAAASqfzVGQ:20170519091054:s) , Distributed Denial of Service Mitigation and  a lot more. 

#### Logging and Monitoring 

For Logging you just need to be a good citizen and write your logs with date, module names, and identifier and some info tags to be able to make proper filtering and get notified based on them using services like Cloud Watch Events. And for monitoring you can use CloudTail and AWS X-Ray to see what is happening in with your app and get notified when something goes wrong.

#### SQL & NoSQL

And now the last on my list, the storage. Here is more or less another mindset change because you might switch from SQL to NoSQL. Coming from the OOP world and SQL you think all the time in terms of objects and the relation between them, sometimes you thing to not have so many joins and that’s it. With No SQL you need to think in terms of queries and how to can deliver all the data that you need for that particular request without having joins. You need to denormalise your data, be comfortable with data duplications and manage properly your transactions if you have them. I used DynamoDB as my storage and with it you can have all the scalability that you need, you can be consistent or have eventual consistency, you can manage [transactions in Java](https://aws.amazon.com/blogs/aws/dynamodb-transaction-library/) or do a bulk update or you can get familiar with saving your data once you have a change and you will just not have bulk updates at all.

### More to read

I hope I made you curious to dig more into this topic and for this here is a list of resources:

[Serverless Architecture](https://www.youtube.com/watch?v=OI_V6OZZkZM)

[AWS Lambda vs. Azure Cloud Functions](https://serifandsemaphore.io/azure-cloud-functions-vs-aws-lambda-caf8a90605dd)

[Immutable Infrastructure](https://www.oreilly.com/ideas/an-introduction-to-immutable-infrastructure)

[Azure BlobStorage vs. Amazon S3](http://gauravmantri.com/2012/05/09/comparing-windows-azure-blob-storage-and-amazon-simple-storage-service-s3part-i/)

[From Monolith to Microservices](https://www.youtube.com/watch?v=oRIYtOsAlzk)

[Serverless Architectural Patterns](https://www.youtube.com/watch?v=b7UMoc1iUYw&t=1452s)

      
