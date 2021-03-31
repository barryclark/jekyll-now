---
layout: post
title: Neat ICON Plugin Patterns
toc: true
---

### You know what really grinds my gears?!?
Adding a new plugin action requires a ton of clicking:
- Edit plugin.spec.yaml to include the new action
    - Configure inputs
    - Configure outputs
    - Remember not to use '-' in attribute names
- icon-plugin generate --regenerate
- Write the action.py code, flipping back and forth:
    - What was my input called again?
    - How did I use the connection last time?
    - What was my output variable?
- make
- icon-plugin generate samples
- Edit the sample file to contain the right data (and connection inf)
- icon-plugin run -R ...
    - What was my action called again?
    - icon-plugin run -R tests/my_action.json


### My new workflow
I'm designing my plugins to share a core action, and using a dropdown box to select which one I want to execute.

1. Create a python library containing a class for each action you want to perform.
2. Each class should have a `get_data` method that can be called after init; it should return a list.
3. Configure your action in plugin.spec.yaml to use the `enum` attribute (creates a dropdown list).
    - Add an entry for each class to this enum
    - I'll call mine `datapoint`
4. In action.py, use `Input.DATAPOINT` to determine which class to instantiate.
5. Execute the `get_data` method and return
   ```
   {Output.DATA : {'data': results }}
   ```



### Example Use Case:
```
Design a plugin that will perform an inventory of AWS resources.
    - Retrieve a list of all Security Groups
    - Retrieve a list of all Elastic Network Interfaces
    - Retrieve a list of all S3 buckets

Bonus Points if:
    - You can assume a role in another account to do it
    - Double bonus, you assume a role prior to executing the assume role above
```

Combining the output of the actions listed above with a PSQL database (there's a plugin for that too) makes it REALLY EASY to track down resources across accounts when something bad happens.

Walking through the list above:

1. Create `icon_pluginname/util/collector.py`
2. Each class should have a `get_data` method
<details>
    <summary>
    Expand Code
    </summary>
```
#!/usr/bin/env python3
import boto3
import logging

def gen_base_session(akid, sak, region, base_role=None, ast=None):
    session = boto3.session.Session(
        aws_access_key_id=akid,
        aws_secret_access_key=sak,
        aws_session_token=ast,
        region_name=region,
    )
    if base_role is None:
        base_session = session
    else:
        client = session.client("sts")
        response = client.assume_role(RoleArn=base_role, RoleSessionName='ICON_AWSCollector')
        base_session = boto3.session.Session(
            aws_access_key_id=response["Credentials"]["AccessKeyId"],
            aws_secret_access_key=response["Credentials"]["SecretAccessKey"],
            aws_session_token=response["Credentials"]["SessionToken"],
            region_name=region,
        )
        logging.info("Successfully Assumed role: {}".format(base_role))
    return base_session


class base_collector:
    def __init__(self, base_session, region, role_arn=None, toolname='BaseCollector'):
        self.region = region
        self.role_arn = role_arn
        self.toolname = toolname
        self.base_session = base_session

    def gen_client(self, client_type, new=False):
        if self.role_arn:
            logging.info("Assuming role...")
            session = self.assume_role(self.role_arn, self.toolname)
        else:
            logging.info("No role set, using current creds...")
            session = self.base_session
        stsclient = session.client("sts")
        self.account_id = stsclient.get_caller_identity().get("Account")
        if new is False:
            self.client = session.client(client_type)
            self.resource = session.resource(client_type)
        else:
            logging.info("new was True, Returning new client")
            return session.client(client_type)

    def assume_role(self, arn, session_name):
        client = self.base_session.client("sts")
        response = client.assume_role(RoleArn=arn, RoleSessionName=session_name)
        session = boto3.session.Session(
            aws_access_key_id=response["Credentials"]["AccessKeyId"],
            aws_secret_access_key=response["Credentials"]["SecretAccessKey"],
            aws_session_token=response["Credentials"]["SessionToken"],
            region_name=self.region,
        )
        logging.info("Successfully Assumed role: {}".format(arn))
        return session

class eni_collector(base_collector):
    def __init__(self, base_session, region, role_arn=None, toolname='eni_collector'):
        super().__init__(base_session, region, role_arn, toolname)
        self.gen_client("ec2")

    def get_data(self):
        response = []
        pager = self.client.get_paginator('describe_network_interfaces')
        pages = pager.paginate()
        for page in pages:
            for iface in page.get('NetworkInterfaces',[{}]):
                entry = {'eni': iface.get('NetworkInterfaceId','') ,
                'public_ip': iface.get('Association',{}).get('PublicIp','N/A'),
                'private_ip': iface.get('PrivateIpAddress','N/A'),
                'attached': iface.get('Attachment',{}).get('InstanceId','N/A'),
                'account_id': self.account_id, 'region': self.region}
                response.append(entry)
        return response
```
</details>


3. Configure `plugin.spec.yaml`
<details>
<summary>
Expand Code
</summary>
```
actions:
  inventory_objects:
    title: InventoryObjects
    description: Get a list of [ENI's, SG's, Buckets]
    input:
      datapoint:
        type: string
        description: Type of inventory to perform
        required: true
        enum:
        - NetworkInterfaces
        - Buckets
        - SecurityGroups
      region:
        type: string
        description: AWS Region to scan
        required: true
      role:
        type: string
        description: Assume role prior to describing
        required: false

    output:
      data:
        title: Data
        type: object
        required: true
```
</details>

4. Use Input.DATAPOINT in action.py
5. Execute `get_data` and return results
<details>
<summary>
Expand Code
</summary>
```
<snip>
import icon_awscollector.util.awscollector as awscollector


class InventoryObjects(insightconnect_plugin_runtime.Action):
    def __init__(self):
        super(self.__class__, self).__init__(
            name="inventory_objects",
            description=Component.DESCRIPTION,
            input=InventoryObjectsInput(),
            output=InventoryObjectsOutput(),
        )

    def run(self, params={}):
        # Configure variables for session (all connections)
        akid = self.connection.aws["akid"]
        sak = self.connection.aws["sak"]
        base_role = self.connection.aws["base_role"]
        # Define role and region to execute this job in
        role = params.get(Input.ROLE)
        region = params.get(Input.REGION)
        # Generate a base boto3 session for collection
        base_session = awscollector.gen_base_session(akid, sak, region, base_role)

        # Pick which collector to run
        collect_action = self.choose_datapoint(params.get(Input.DATAPOINT))
        if collect_action is not None:
            collector = collect_action(base_session, region, role)
            results = collector.get_data()
        else:
            results = []
            logging.error("Collect action {} does not exist".format(Input.DATAPOINT))
        return {Output.DATA: {"data": results}}

    def choose_datapoint(self, datapoint):
        options = {
            "NetworkInterfaces": awscollector.eni_collector,
            "Buckets": awscollector.bucket_collector,
            "SecurityGroups": awscollector.sg_collector,
        }
        return options.get(datapoint)
```
</details>

### The TLDR;
The best thing about this pattern is, as I add collectors (maybe I want to get EC2 instances or IAM users as well), I just have to:
1. Extend the class (double bonus, I can use this code elsewhere)
2. Update the `plugin.spec.yaml` to include a new datapoint
3. Update the `choose_datapoint` method to include my new class
4. Profit.
