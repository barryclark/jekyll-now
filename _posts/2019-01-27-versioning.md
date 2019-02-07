---
layout: post
title: What's in a version?
author: jake_hall
---

Building distributed systems in using a microservice pattern is hard. We're always looking for ways to automate any manual processes, or anything that is difficult. Computers don't make mistakes, and humans aren't infallible. The more we can rely on a machine-led process, the more reliable a release process can be. This is the journey of versioning and releasing for one of our projects.

# In the beginning...

We're using Kubernetes, with Helm to manage our deployments. We started by using the SHA1 Git hash as the version number, it's pretty unique and means there's no manual intervention required by a developer to "bump" a version number. It's automatically "bumped" by git every time we squash and merge a pull request to master!

Each of those merges to master, triggers an automatic build and push the code to both the dev and preprod environments, it then waits for approval before pushing to production.

This was great and served us well for a long time, there were a few minor issues with this process. We were interchangeably using `helm` and `kubectl` to do our deployment then rollback automatically if there was a problem with the healthcheck/deployment. This meant that the tiller state (the server component of helm) would think a specific version was already deployed if we tried to rerun the deployment after a rollback.

Not good.

# New approach

We overhauled our deployment mechanism, this time fully relying on helm for deployments and rollbacks. We use a single base helm chart for all of our images, as we want uniformity. There's a `helm.yaml` file in the root of every repo specifying variables for the chart (such as the image name), and we specify the tag to use as part of deployment pipeline:

```
helm upgrade --install $NAME --version $CHART_VER --wait \
    -f helm.yaml --set image.tag=$VERSION,environment=$ENV \
    base-service
```

This same command will also let us deploy a brand new service for the first time too with the `--install` flag.

We check the output of the above command for a non-zero exit code, if we get one, then we know something went wrong and we rollback to the previous version:

```
helm rollback $NAME 0
```

Specifying the version number as zero is a special value that actually means "-1" or previous version in helm. You [can find the code here](https://github.com/helm/helm/blob/master/pkg/tiller/release_rollback.go#L79-L82) it's not in the official docs so... your mileage may vary.

----

These changes now allow us to deploy the same change repeatedly until we get a success, without having to do any manual faffing about. This massively speeds up the engineering teams, but we still have that small issue of version numbers looking like this `c9b8132ef905721c0a1a2a342c5f321c636001ce` and `b576368621a067c5b9380b3da8cf7e27dabaa916`. Which one is the older just by looking at them? Who knows. We have to ask, rather than just knowing by looking at it. We also have no idea how big the change was! Back to the drawing board.

# Semantic Versioning to the rescue

[SemVer or Semantic Versioning](https://semver.org/) is not a new concept, it has been around for years. Most engineers will have come across the triplet pattern of numbers (1.4.0) at one point or another as most major software uses this pattern. The idea is to communicate to both humans and computers the size and severity of a change through categories - major/minor or patch. Each of the numbers represents one of these categories <MAJOR>.<MINOR>.<PATCH> e.g. 1.4.0

Each number can be incremented individually but resets each following number to zero (e.g. 1.4.0, with a major increment, would change to 2.0.0. 1.4.0 with a minor increment, would change to 1.5.0).

We decided to move over to this type of versioning, which then presents a new problem. How do we automatically "bump" the version number? We consider something a new release everytime we merge to master. We need input from the developer to tell us what category of change this is, we also now need to decide what these categories mean, and how to implement this automated system.

# Automated SemVer

We use GitHub and exclusively use Pull Requests to merge to the master branch (once reviewed, built/tested on CI, linted, passed code coverage checks and approved of course). Pull Requests on GitHub have labels, which is a way we can communicate to our build environment (CircleCI in our case) to tell it what kind of change is.

It was possible to leverage GitHub webhooks, and status checks to enforce at exactly one label of the following "major", "minor" or "patch" on every GitHub PRs. This meant we had input, then we just had to get CircleCI to read from the GitHub APIs and bump the version as required. We also took the time to create a GitHub release and tag the commit properly now we have this new version.

This is great and we rolled out the change so every PR now required a tag, next some valid questions. Is this change a `minor` or a `patch` change? Should it be `major` as I've changed X thing?

# What do the categories mean?

We published the below internally as a living document, the idea being that if we come up against a scenario that isn't covered, we can discuss as a team, categorise then add to the list.

## Major change
Increased when the change is an incompatible API change.

Examples:
* Dropping a field,
* adding a required parameter,
* breaking change to a public facing domain/library model object,
* or renaming a REST resource or field,
* breaking business logic changes,
* any change requiring a update/addition to Vault

Are all exmaples of breaking changes.

## Minor change
Increased when the change is feature addition that is backwards-compatible.

Examples:
* Adding a new feature,
* REST endpoint,
* adding non-required parameter,
* adding a new domain/library model object,
* changing the POM/dependencies/settings/application config
* changing the CI pipeline.

Are all examples of new features, that are non breaking, backwards compatible changes.

## Patch change
Increased only when it's a backwards-compatible bug fix.

Examples:
* Changing a comparison in an if statement for a bug fix,
* fixing a typo / adding to a README,
* adding/improving logging,
* general one line changes, small bug fixes that don't feature any of the characteristics above.

Are all examples of a PATCH change, which are small, self contained changes, consisting of only backwards compatible bug or small improvements (but not feature additions)

# Wrap up

Allowing us to deploy, rollback automatically and use human readable versioning has allowed the team to move faster. Classifying every change also allows us to have visibility of the risk of each change, and we can begin to make better decisions around API versioning and such in the coming weeks.