---
layout: post
title: Git Workflow Explained Simply
permalink: /productivity/git-workflow-explained-simply
post_id: 1528
categories:
- Code
- Git
- Productivity
---

Git is a Code Versioning System (aka CVS) .

It lets multiple developers, programers and project managers all work on the source code for a project with minimal stepping on each others toes. The workflow we use is as follows.<!--more-->

We keep the a Git repository in the cloud, typically in [Bitbucket](https://bitbucket.org).

Each developer then keeps a local copy of the repository. The developer can then create a new feature branch to work on an issue. More than one developer can work on a project at a time, and multiple branches can co-exist at the same time. This allows for more concurrent effort to be deployed.

![Show git master branch, feature branch and merge](/images/git-branches-1.png) Show git master branch, feature branch and merge

(This image from the git-guide linked below)

Typically then the QA will pull that feature branch to a test server and test the new feature/issue for completeness/quality.

If they are happy with the quality of work, they can then merge that feature/issue branch into the master branch.

Then on the production server we can pull the master branch and deploy it in production.

We link the bitbucket repository with JIRA and Confluence so that features, issues and bugs can be more easily tracked and discussed.

For more information on how to use git, see the [git-guide](http://rogerdudler.github.io/git-guide/).
