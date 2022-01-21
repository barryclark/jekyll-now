---
layout: post
title: Reducing thrash and increasing throughput by focusing on elegant releases
author_avatar: https://avatars.githubusercontent.com/u/8116516?v=4
author_name: Xavier Hocquet
author_github_username: xhocquet
---

Continuous integration and deployment is fundamental to a high-performing technology business as set forth by Kim et al. Deploying frequently results in smaller releases, more frequent updates for your users, quicker feedback from real users, and a tighter feedback loop between business decisions and shipped products.

The worst enemy of continuous deployment is a broken build. The larger the engineering team, the worse it is. If a bad data migration goes out, all releases may have to be paused until a resolution is shipped. Paused releases mean that code branches pile up and inevitably time will be spent fixing issues or rebasing pull requests.

While there are many tools at our disposal to solve some of these problems, I believe a solid understanding of the basics helps us reason about releases and avoid the biggest problems in the first place.

Below I will outline the release cycle for many modern apps (with a focus on Heroku/AWS and Ruby/Javascript), as well as some guidelines to plan graceful releases and migrations.

![Typical release cycle](/images/posts/2022-01-21-safe-releases/release-process.png)

## Release Cycle Steps 1 & 2

Many modern apps follow this 4-step deploy cycle (of course, your setup may vary).

Steps one and two are pretty safe for most apps. You click a deploy button or execute a CLI command (perhaps from your CI tool) which kicks off the build process for your new release. In our apps, that executes a `rails assets:precompile` run which ends up compiling our Javascript assets with webpacker.

## Danger Zone 1 - Executing Release Commands

These are oftentimes data setup steps that need to be in place before new code is running. Things like:
Database migrations
Uploading build assets to external sources
Preparing new environment configurations

This is a danger zone because your data changes need to be backwards-compatible with both versions of code which may be running against your environment. Before the next step, your old code is still being run. After the deployment, your new code will be active.

## Danger Zone 2 - Code Deploy Phase

Finally, your new code is pushed to servers. This can happen in one go or it can be controlled with architectures like blue-green deployments. This is also a danger zone because the new code will fail if your release commands did not prepare the environment properly.


## Additional Considerations

Besides these two hot-spots, there are a few other things you should consider before kicking off any production deployments:

### Is your release affecting a distributed system?

Releasing changes to a single application is one thing, but if your system interacts with others and your changes could affect those interactions, you'll want to take special care.

Below I outline a general process which can also be applied to multi-system releases, while noting that there will generally be many more releases involved in order to gracefully transition each system safely while it is still interacting with other apps.

### Does your release contain long-running data migrations?

One common request in a software business is to release a feature and prefill a bunch of data. Since Rails migrations support full Ruby and Rails code, it's tempting to just write a loop in there and populate a bunch of records.

This is dangerous! Without knowing exactly how long a migration can take, you run the risk of timing out your release commands and failing the build. Depending on your configuration and whether you moved this outside of a transaction, this could leave you with an inconsistent DB state.

### Does your release add indices, locks, or perform other heavy table operations?

It's also important to be aware of expensive database operations like adding locks or indices, changing column types, etc.

There are great resources available [1] to learn whether a particular action is safe or not, and as you learn more about them you will also learn strategies to release these changes without any downtime or user-facing side-effects.

## 1-2-3: A slow, safe release process

For the next piece, we'll take a simple scenario and describe the releases necessary for a safe migration. The request is: move the `email` column from the `user` table to the `user_details` table. Keep in mind that there are existing emails in the original table.

My rule of thumb is: The more explicit, smaller steps, the safer the release (to a point!). The more you break things down into parts, the less likely any release will result in a broken build or put your application into a messy state that requires manual intervention.

Using that rule, here's a well-organized plan to release this change:

### Release 1 - Prepare your new column, begin data synchronization, and asynchronously prepare all data

First and foremost, you'll want to create your new `email` column on the `user_details` table. If you were to run only this, you would have no data in the new column and therefore would not be able to use it yet with your application code.

To ensure data is fully synched by the time the second release comes along, you'll want two things:
Modify any code that previously set `email` on the `user` table to also update the `user_details` table. By updating both, you will make sure that any updates after your population scripts are reflected in the second table.
An asynchronous task to backpopulate emails in the new table. Based on our additional considerations, we should not be populating large amounts of data in the migration itself. So a typical approach here would be to ship a rake task or other script that can be run on the server once the release goes out.

Once this release is deployed, you can execute your data population task/script. Since it lives outside of a migration, you can handle any long-running tasks by splitting work up or putting it in a background queue. Once the data population is done, you are done with the first release and you DB is in a state where it is ready to receive calls from new code

### Release 2 - Updates to the application code

Next, you make the code changes. Anywhere that was previously calling `user.email`, you can now change to `user.user_details.email`. All users should have their emails populated in the new column, and any updates that happened after your data population script should have been duplicated from your code changes.

At this point, you can also remove your glue code which was updating both `user.email` and `user_details.email`. It only needs to update the new column since your new code will only be using the new column.

### Release 3 - Dropping old columns, code, and cleanup

At this point, your application should be running in the way you want it to. You added a new column and populated it (via 2 mechanisms), and then released code changes to use your new column.

It is now safe to drop the old `user.email` column since code is no longer using it.

## Fin

The first time people see all these steps, a common reaction is "dang, that's a lot of steps"! And I agree. However there is a real tradeoff between the complexity caused by splitting up releases vs. the risk associated with all-in-one releases.

Greenfield projects and smaller startups have a higher risk tolerance and may find it acceptable to ship quick and break releases every once in a while. As you scale, quality requirements will increase and downtime will result in more and more headaches for you and your customers. Simple strategies like how to plan clean releases with multiple people releasing code to production puts some guardrails around development and helps avoid common issues.
