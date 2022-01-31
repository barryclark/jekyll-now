---
layout: post
title: Running west in GitLab CI
---

As stated before, working with the Zephyr RTOS, the use of `west` isn't
essential, but it does make a lot of sense to have the mechanisms of building
abstracted away nicely by some pretty tooling.

Using `west` in a GitLab CI runner though poses some challenges, which were
recently brought up in the Zephyr Discord.  I had posted the solution there, but
figure it should be more broadly documented.

### Anatomy of a Manifest

Starting with a basic project, we create a manifest file that looks like:

```yaml
manifest:
  remotes:
    - name: github
      url-base: https://github.com
    - name: internal
      url-base: git@gitlab.com:CorporateGroup
#
# module-a/west.yml:
#
projects:
  - name: project_a
    remote: github
    repo-path: project_a
  - name: internal_1
    remote: internal
    repo-path: product/internal_1
  - name: internal_2
    remote: internal
    repo-path: product_internal_2

self:
  path: module-a
```

On your local system this works really well.  You can setup your `internal`
GitLab account to work with an ssh key, configure an ssh-agent, and never need
to type a password again.  The `github` remote is done through HTTP as you don't
plan to change any of that code and thus can be done anonymously.

When you move to enabling a GitLab CI runner to pull down the artifacts with
`west` you run into some challenges.  First, there is no SSH, and even if you
were to install it, you have no keys defined, no authentication setup for the
hosts, and no secure location to store any keys if you had them.

You could go through the hassle of trying to set all this up and configure `git`
to work around this, which is a hassle to maintain. Or...

### Use the Tools You Have

Looking at the problem, we know that a GitLab CI run has the ability to
authenticate itself to GitLab and pull down the code.  It has to, otherwise we
wouldn't be able to run any of the CI.  These values are available to you in the
`.gitlab-ci.yml` files as a user (`gitlab-ci-token`) and a unique access token
for the life of the stage (`${CI_JOB_TOKEN}`).

Okay now that we know we can authenticate, how can we have a `west init` work
with these values?

Using git's
[insteadof](https://git-scm.com/docs/git-config#Documentation/git-config.txt-urlltbasegtinsteadOf)
functionality does exactly what is being asked.  In short, you can tell the git
tooling that when it sees a request to `git@gitlab.com:SomePath` to replace it
with another access method, such at authenticated HTTPS.  On GitLab CI this
works because again you have the authentication pieces as mentioned above
already defined.

### Putting It All Together

What does this look like in practice?  Most of the CI I work with is in bash or
python scripts (not a fan of yaml-bash), and can be run by both the CI and end
user we make a check for the `$CI_JOB_TOKEN` and if it exists, we apply the
`insteadof` work-around like so:

```bash
    if [ -n "$CI_JOB_TOKEN" ]; then
        # This is a hack around the CI which cannot work via SSH but
        # can work via HTTPS.  So we are using git to replace the remote
        # line containing an ssh URL with an HTTPS URL.  This is not expected
        # to last beyond this brief moment in time at the west update.
        CI_URL="https://gitlab-ci-token:${CI_JOB_TOKEN}@gitlab.com/CorporateGroup"
        docker_cmd="git config --global url.\"$CI_URL\".insteadof git@gitlab.com:CorporateGroup && $docker_cmd"
    fi
```

Note this work-around will only last as long as the .git directory does.
Meaning if you move to another phase, you will likely need to restate this
configuration.
