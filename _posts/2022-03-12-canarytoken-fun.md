---
layout: post
title: Canarytokens fun
---

While crafting a new lab to learn more about sniffing through docker images, I had the idea to make things more realistic. Therefore the useage of [canarytokens](https://canarytokens.org/generate) helps to spice it a little up. Since these tokens causes no real harm - but look and behave realistic, they want straight into the public GitHub repository. In less then 5min, the first token was scanned and automatically tried to validate. This was somehow mindblowing (but also really expected - since I build a similar token scan service years ago for my ex-employer to protect secrets from unintended leakage). Well now let me show some of the things I learned and discuss it a little.

## Tokens meet incidents
<img height="200" align="left" src="/images/smurf.png" >
The AWS credentials gone wild - the k8s config, WireGuardVPN, M$ SQL Database and MySQL dump were ignored completely so far. In total the AWS Token got triggered 20 times in less then 24 hours by some scripts. 

To increase the fun - lets post the credentials again:

```dockerfile
FROM registry.access.redhat.com/ubi8/ubi-minimal

ENV AWS_ACCESS_KEY=AKIAYVP4CIPPOWONZTGT
ENV AWS_SECRET_ACCESS_KEY=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
```
<br><br>
Now let us take a look at the data and incidents we gathered:

<p align="center">
<img width="600" src="/images/cynary_token_list.png">
</p>

The incidents presented above, also have a nice presentation as [JSON](/assets/posts/canary_token.json). That will help to drill down and learn from the incidents. To work with the JSON-data I'll rely on jq.

### Useragents
It seems that Python and mostly python 2.27.1 were the favorite languague to create an automated token validation tool (well this language kicks ass). To avoid duplicates we will represent them as unique data:

```bash
$ jq '.[] | .useragent' canary_token.json | sort --unique
"aws-cli/1.22.25 Python/3.8.10 Linux/5.13.0-35-generic botocore/1.23.25"
"aws-cli/2.3.3 Python/3.8.8 Windows/10 exe/AMD64 prompt/off command/iam.list-users"
"aws-cli/2.4.21 Python/3.8.8 Linux/5.10.16.3-microsoft-standard-WSL2 exe/x86_64.ubuntu.20 prompt/off command/iam.list-users"
"aws-cli/2.4.23 Python/3.8.8 Windows/10 exe/AMD64 prompt/off command/iam.list-users"
"AWSPowerShell.Common/4.1.20.0 .NET_Core/6.0.0-rtm.21522.10 OS/Microsoft_Windows_10.0.17763 PowerShellCore/7.-1 ClientAsync"
"python-requests/2.27.1"
```

The AWSPowerShell Windows-Fanboy was a little wired in that list - but used a very interresting way to validate the tokens (more info below)

### Top IPs of the token validators
As shown on the world map above, the callers came from the US, Denmark and Indonesia. You can use the GeoIP Package (Python) to drill down on the IP addresses or use the provided geo data from the JSON.

```bash
$ jq '.[] | .geo_info.ip ' canary_token.json | sort --unique
"112.215.151.218"
"158.140.162.181"
"18.236.73.93"
"36.74.44.225"
"37.120.131.157"
"54.39.187.211"
"54.39.190.134"
```

If you look a little more careful you might recognize some of the IP ranges are belonging to Amazon and indeed - some of the checkers reside in an EC2 instance that keeps scanning multiple times a day. Let's pick out the top spammer:

```json
"1646988626.342688": {
    "src_ip": "18.236.73.93",
    "input_channel": "HTTP",
    "geo_info": {
        "loc": "45.8399,-119.7006",
        "city": "Boardman",
        "country": "US",
        "region": "Oregon",
        "hostname": "ec2-18-236-73-93.us-west-2.compute.amazonaws.com",
        "timezone": "America/Los_Angeles",
        "ip": "18.236.73.93",
        "org": "AS16509 Amazon.com, Inc.",
        "postal": "97818",
        "asn": {
            "route": "18.236.0.0/15",
            "type": "hosting",
            "asn": "AS16509",
            "domain": "amazon.com",
            "name": "Amazon.com, Inc."
        }
    },
    "is_tor_relay": false,
    "useragent": "python-requests/2.27.1",
    "additional_info": {
        "AWS Key Log Data": {
            "eventName": [
                "GetCallerIdentity"
            ]
        }
    }
}
```
The validator resides in an EC2 instance in us-west-1 and is using the most simple variant to validate. The script uses `sts:GetCallerIdentity` => take a look at one of my [previous posts](https://benjitrapp.github.io/AWS-AccountId-enumeration/). There you can find some of my thoughts about this method. Also the script is using Python 2.27.1 - which is really old fashioned and looks like it was written some years ago or the author is just lazy to upgrade to Python 3.X :)

### Learn from the events
Let's check if there are more fancy ways to validate the AWS credentials than using a simple `GetCallerIdentity` that might trigger an alarm:

```bash
$ jq '.[].additional_info."AWS Key Log Data"| .eventName[]' canary_token.json | sort --unique
"DescribeRegions"
"GetCallerIdentity"
"GetSendQuota"
"ListUsers"
```
That list quite rocks and hey, here's the M$ Windows Fanboy back again. This guy used `DescribeRegions` to validate the tokens which is quite tricky. Also the `GetSendQuota` attempts looks pretty sneaky to me. Since it either is a email spammer who salvages other accounts or another funky method to trick the AWS API like `sns:publish`. Will check this another day. The guy from Jakarta (Indionesia) used `ListUsers` - all or nothing right? 

I'll let the canarytoken be scanned for some more days and implement a monitoring alert for my [AWS LoginGuard](https://benjitrapp.github.io/AWS-LoginGuard/) to raise the bar on my alerting capabilities. Also I hope that one day someone will trigger one of the other credentials like the k8s config to let me learn fancy ways to validate k8s credentials.

### Upgrade 

After running the token for more then 24h, the Token was Triggered 33 times and some guys from Canada joined the Party. The data wasn't cleaned up from the previous requests to make it more comparable. Creating a diff felt wrong at the moment. Let's dive into the data, and watch out for inline comments. If you want to take a look at the data on your own: [Here's the JSON](/assets/posts/canary_token2.json)

```bash
$ jq '.[] | .useragent' canary_token2.json | sort --unique
"aws-cli/1.22.25 Python/3.8.10 Linux/5.13.0-35-generic botocore/1.23.25"
"aws-cli/2.3.3 Python/3.8.8 Windows/10 exe/AMD64 prompt/off command/iam.list-users"
"aws-cli/2.4.21 Python/3.8.8 Linux/5.10.16.3-microsoft-standard-WSL2 exe/x86_64.ubuntu.20 prompt/off command/iam.list-users"
"aws-cli/2.4.23 Python/3.8.8 Windows/10 exe/AMD64 prompt/off command/iam.list-users"
"[aws-cli/2.4.23 Python/3.8.8 Windows/10 exe/AMD64 prompt/off command/s3.ls]"   # <- Looks like the change of the user agent is broken [
"aws-cli/2.4.23 Python/3.8.8 Windows/10 exe/AMD64 prompt/off command/sesv2.get-account"
"AWSPowerShell.Common/4.1.20.0 .NET_Core/6.0.0-rtm.21522.10 OS/Microsoft_Windows_10.0.17763 PowerShellCore/7.-1 ClientAsync"
"ElasticWolf/5.1.6" # <- Nice - a manual test with a GUI. Never heard of this AWS Service before :) 
"python-requests/2.27.1"


$ jq '.[].additional_info."AWS Key Log Data"| .eventName[]' canary_token2.json | sort --unique
"DescribeAccountAttributes" # Nice way - didn't see this one coming! This one was triggered by the ElasticWolf guy
"DescribeRegions"
"GetAccount" # command/sesv2.get-account <- caused by the guy from Jakarta. He's searching for accounts to SPAM
"GetCallerIdentity"
"GetSendQuota"
"GetUser"
"ListBuckets" # S3 Buckets - why not use grayhat warfare dude? 
"ListUsers"


$ jq '.[] | .geo_info.ip ' canary_token2.json | sort --unique
"112.215.151.218"
"112.215.170.96"
"112.215.171.137"
"140.213.11.159"
"158.140.162.181"
"18.236.73.93"
"23.129.64.132"
"36.74.44.225"
"37.120.131.157" 
"54.245.37.156"
"54.39.187.211"
"54.39.190.134"

# 12 IPs => 33 times triggered the Canarytoken
```
After a lot of "trash" scripts that hunt for low hanging fruits (yes - I mean the `GetCalerIdentity` ones), it seems like some more mature folks are joining the party. The Indonesian guy runs a script that checks for SES and tries different things to validate. After some checks it seems this is guy is really searching for new machines to create a botnet for spamming emails. 

This time also we can watch the usage of Tor. There were four times a usage recognized

```json
$ jq '.[] | select(.is_tor_relay == true)' canary_token2.json

{
  "is_tor_relay": true,
  "input_channel": "HTTP",
  "geo_info": {
    "loc": "47.3223,-122.3126",
    "org": "AS396507 Emerald Onion",
    "city": "Federal Way",
    "ip": "23.129.64.132",
    "region": "Washington",
    "country": "US",
    "timezone": "America/Los_Angeles",
    "postal": "98003",
    "asn": {
      "route": "23.129.64.0/24",
      "type": "business",
      "asn": "AS396507",
      "domain": "emeraldonion.org",
      "name": "Emerald Onion"
    }
  },
  "src_ip": "23.129.64.132",
  "useragent": "ElasticWolf/5.1.6",
  "additional_info": {
    "AWS Key Log Data": {
      "eventName": [
        "DescribeAccountAttributes"
      ]
    }
  }
}
{
  "src_ip": "23.129.64.132",
  "input_channel": "HTTP",
  "geo_info": {
    "loc": "47.3223,-122.3126",
    "city": "Federal Way",
    "ip": "23.129.64.132",
    "region": "Washington",
    "timezone": "America/Los_Angeles",
    "country": "US",
    "org": "AS396507 Emerald Onion",
    "postal": "98003",
    "asn": {
      "route": "23.129.64.0/24",
      "type": "business",
      "asn": "AS396507",
      "domain": "emeraldonion.org",
      "name": "Emerald Onion"
    }
  },
  "is_tor_relay": true,
  "useragent": "ElasticWolf/5.1.6",
  "additional_info": {
    "AWS Key Log Data": {
      "eventName": [
        "GetUser"
      ]
    }
  }
}
{
  "is_tor_relay": true,
  "input_channel": "HTTP",
  "geo_info": {
    "loc": "47.3223,-122.3126",
    "org": "AS396507 Emerald Onion",
    "city": "Federal Way",
    "ip": "23.129.64.132",
    "region": "Washington",
    "country": "US",
    "timezone": "America/Los_Angeles",
    "postal": "98003",
    "asn": {
      "route": "23.129.64.0/24",
      "type": "business",
      "asn": "AS396507",
      "domain": "emeraldonion.org",
      "name": "Emerald Onion"
    }
  },
  "src_ip": "23.129.64.132",
  "useragent": "ElasticWolf/5.1.6",
  "additional_info": {
    "AWS Key Log Data": {
      "eventName": [
        "DescribeAccountAttributes"
      ]
    }
  }
}
{
  "src_ip": "23.129.64.132",
  "input_channel": "HTTP",
  "geo_info": {
    "loc": "47.3223,-122.3126",
    "city": "Federal Way",
    "ip": "23.129.64.132",
    "region": "Washington",
    "timezone": "America/Los_Angeles",
    "country": "US",
    "org": "AS396507 Emerald Onion",
    "postal": "98003",
    "asn": {
      "route": "23.129.64.0/24",
      "type": "business",
      "asn": "AS396507",
      "domain": "emeraldonion.org",
      "name": "Emerald Onion"
    }
  },
  "is_tor_relay": true,
  "useragent": "ElasticWolf/5.1.6",
  "additional_info": {
    "AWS Key Log Data": {
      "eventName": [
        "GetUser"
      ]
    }
  }
}
```
The interresting thing is, that the manual ElasticWolf checker used Tor to stay anonymous but didn't changed the Useragent and didn't care about the leakage of valuable info by [WebRTC](https://browserleaks.com/webrtc). Since ElasticWolf is a GUI - and the attacker didn't disgused completely I would assume that he's not a real pro hacker. The action this guy performed are still interresting - the good news are if we assume that we were using [GuardDuty](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html) this Poltergeist would have triggered an alarm. 


## Conclusion - Let's Wrap it up

Based on the incidents from above my key takeaways are: 
* Create a Pre-Receive-Hook for you Git Repositories to prevent that a token get'S commited! Use something mature like [Talisman](https://github.com/thoughtworks/talisman)
* Watch your GuardDuty Events and push crucial Alerts directly to your Smartphone/Slack- or Teams etc.
* If `GetCallerIdentiy` get's triggered by f.e. my LoginGuard your Tokens are leaked with a high confidence. Since this Event was used in less then 5mins after my intended "leakage" this is a great baseline
* Create a Incident Response Plan and rotate your Tokens regularly. Store them securely f.e. in a Password Manager
* If you have some real workloads running on AWS - better enable GuardDuty to protect yourself. Think of it as a condom - better have one and don't need it then vice versa
* No automation or Service like GuardDuty can beat the creativity of a human mind. As long as APIs and Software are made by humans - it will fail for sure! APIs are talking too much and even Amazon isn't free from such mistakes


<p align="center">
<img width=300 src="/images/jokey.gif">
</p>





