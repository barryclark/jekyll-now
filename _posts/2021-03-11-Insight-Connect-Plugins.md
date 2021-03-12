---
layout: post
title: Insight Connect Plugins ; Part 1
---

## Intro
Insight Connect is a pretty cool piece of kit from Rapid7. Their biggest sales pitch is "No Code" development of workflows. That sounds neat, but sometimes it's easier just to peel back a few layers and write your own plugins instead. Luckily, they've done a great job at [documenting](https://docs.rapid7.com/insightconnect/create-custom-plugins/). That said, I'm more of a "Cheat Sheet" kinda person... hence this post

## Concepts
Before I jump into the copy/pastes, it's helpful to understand a few things:
- The forums are VERY ACTIVE... [check them out](https://discuss.rapid7.com/), I ask silly questions there all the time.
- Orchestrators
    - This is basically a docker host that executes plugins for you.
    - Polls R7 InsightPlatform regularly for jobs (No ingress needed)
    - Really easy way to trigger actions/collect data from networks you would need a VPN/jumphost to reach
    - TLDR; Provision a CentOS7 host, install their script, then enter an API key.
- Plugins
    - Basically a docker image containing code you wrote
    - Made of Connections, Triggers, and Actions
    - CANT BE DELETED (as of this writing) once it's uploaded
    - Has a built in versioning system (You can choose which version of a plugin to use within a workflow)
        - You MUST bump the version of a plugin EVERY time you want to upload it to InsightConnect
        - Connections are version specific (but you CAN use an older connection with a newer plugin)
        - To use a new version of a plugin in a workflow, you MUST update the workflow
- Workflows
    - GUI based "No Code" script. If plugins are Legos, workflows are that sweet Tie-Fighter you built out of random pieces
    - Start a workflow using a trigger. (API + ChatOps are easy ways to get started..)
        - API Triggers are hosted by R7, makes creating webhooks FAST!
    - Can be thought of as the business logic of the automation
    - Made of "steps"
        - Input/Output from steps can be re-used (DO THIS!!)
        - ChatOps steps make it REALLY easy to integrate with Slack/Teams/etc
        - Example: If you need to send 3 messages, reference the first steps slack room in all future steps. This makes it easier to update a workflow later to use a different room by only modifying ONE step
    - There's a checkbox on each step that lets you "Continue on Failure"
        - Very useful if you want a slack message to notify you of a broken step
- Warnings:
    - ChatOps triggers use a REGEX... meaning a trigger in room "ICON-Test" can be executed in room "ICON-Test-2"
    - There is no versioning system for Workflows past "Active", and "Draft". Export your workflow if you want to keep it safe.
    - SQS + Slack WILL cause you to hit API limits
    - This is a "scrappy automation" tool IMO... don't expect an enterprise grade HA tool with high verbosity logging.

## Copy Paste Time :)

1. Install the icon-plugin toolchain

```
brew tap rapid7/icon-plugin-homebrew https://github.com/rapid7/icon-plugin-homebrew
brew install icon-plugin
 ```


2. [Download](https://github.com/hashtagcyber/hashtagcyber.github.io/blob/master/_posts/sample-plugin.spec.yaml) a template plugin.spec.yaml file


3. Update the file as needed:
- ***Note***: the [plugin spec](https://docs.rapid7.com/insightconnect/plugin-spec/) has details about what each line does
    - Line 4: The plugin name. Mostly used in code/filepaths

    - Line 5: Will show up in UI

    - Line 6: Will show up in UI

    - Line 7: Must be incremented prior to executing "icon-plugin export" so that you can upload a new version of an existing plugin

    - Line 8: I use community, but make this your company name so you know which plugins were developed internally

    - Line 21: If you need to set hostname/credentials for the entire workflow, do it here

    - Line 25: Input types are available [here](https://docs.rapid7.com/insightconnect/plugin-spec/#base-types ). I stick with string, integer, and object (Dict)

    - Line 34: credential_username_password type allows you to store creds securely in InsightConnect and reuse them across workflows. In connection.py, you can access them as seen below:
```
def connect(self, params):
    user = params.get(Input.CREDENTIALS).get('username')
    pw = params.get(Input.CREDENTIALS).get('password')
    self.myservice = <connection object>
```
You can reference this connection from action.py like this:
```
def run(self, params):
    handle = self.connection.myservice
```

    - Line 46: Your run() function in action.py should return a dictionary with Output.MESSAGE as the key, and your data as the value. The value should match whatever datatype you set in plugin.spec.yaml
```
def run(self, params):
    <snip>
    return {Output.MESSAGE: 'my data here'}
```

4. Use icon-plugin to generate the project skeleton
```
icon-plugin generate python ./plugin.spec.yaml
```

5. Write your code:
    - icon_pluginname/connection/connection.py
    - icon_pluginname/actions/action_name/action.py

6. Build your project
```
make
```

7. If you need to update your plugin spec file, regenerate the skeleton:
```
icon-plugin generate --regenerate
```

8. You can generate sample data to test your plugin locally.
```
icon-plugin sample --sample=action_name
```
This will create files in the tests directory.

9. To execute the plugin locally with these files, use icon-plugin run
```
icon-plugin run -R tests/action.json -j
```

10. If everything worked out, export your plugin and uploaded (be sure to bump your version #s)
```
icon-plugin export
```
