---
layout: post
title: 'This Week in Cybersecurity: April 24-30, 2022'
author_avatar: https://avatars.githubusercontent.com/u/2421172?v=4
author_name: Alex Smith
author_github_username: tradesmanhelix
excerpt: A look back at the top cybersecurity stories from the week.
---

##  Major News Stories
* Here's an update on the recent Heroku/Github security incident.
  * On April 27, Github [posted an update that](https://github.blog/2022-04-15-security-alert-stolen-oauth-user-tokens/) sheds more light on the attacker's activities once they had gained access to Github via compromised Heroku OAuth tokens:
    > 1. The attacker authenticated to the GitHub API using the stolen OAuth tokens issued to Heroku and Travis CI.
    > 2. For most people who had the affected Heroku or Travis CI OAuth apps authorized in their GitHub accounts, the attacker listed all the user’s organizations.
    > 3. The attacker then selectively chose targets based on the listed organizations.
    > 4. The attacker listed the private repositories for user accounts of interest.
    > 5. The attacker then proceeded to clone some of those private repositories.

    Github said they have notified all affected customers.
  * In the past week, Heroku hasn't released any substantive updates on the cause of the security incident or any indication of if or when its Github connection will be restored. The latest entry on the [incident status page](https://status.heroku.com/incidents/2413) begins, "Thank you for your patience as we continue to work through this issue. Our investigation is ongoing."

* NPM is in the cybersecurity spotlight again, and not in a good way. A clever loophole for social engineering via typo squatting was recently fixed.
  * Previously, maintainers could be added to NPM packages without the maintainer's approval.
  * Malicious actors were abusing this feature by adding well-known/reputable maintainers to typo-squatted NPM packages, thus either making these packages look legitimate or causing distrust in these maintainers.
  * NPM has addressed this issue and maintainers must now approve any packages that they are added to.

## Other Software with Critical Patches Available
* Jira: Auth vulnerability that can grant unauthorized access to Jira products. Rated critical by Atlassian.

## Learning -- SQL Injection

Ruby on Rails does a great job of protecting us developers from ourselves. Well, most of the time. It's actually surprising to note that not all ActiveRecord methods are created equal when it comes to protecting from SQL injection.

In Rails 6, one method that does not automatically sanitize inputs is `find_by` [1]:

```ruby
# Uh oh - an attacker is trying to list all admin users!
params[:id] = "admin = '1'"

# Vulnerable to SQL injection
User.find_by(params[:id])

# Resulting Query
# SELECT "users".* FROM "users" WHERE (admin = '1') LIMIT ?
# Result
# [#<User id: 30, name: "Admin", password: [FILTERED], admin: true,...>]
```

As we discussed last week, to avoid writing code that's vulnerable to SQL injection in ActiveRecord it's best to rely on [bind parameters](https://blog.saeloun.com/2019/10/28/bind-parameters-in-activerecord-sql-queries.html) when passing values to SQL:

```ruby
# Safe from SQL injection
User.find_by(id: params[:id])
User.find_by("id = ?", params[:id])
```

Check out [https://rails-sqli.org](https://rails-sqli.org/) for gotchas for specific Rails versions.

[1] [https://rails-sqli.org/rails6](https://rails-sqli.org/rails6)

## Sources & Resources
The following were used or referenced when preparing this debrief.
* [https://isc.sans.edu/podcast.html](https://isc.sans.edu/podcast.html)
* [https://confluence.atlassian.com/jira/jira-security-advisory-2022-04-20-1115127899.html](https://confluence.atlassian.com/jira/jira-security-advisory-2022-04-20-1115127899.html)
* [https://blog.aquasec.com/npm-package-planting](https://blog.aquasec.com/npm-package-planting)
* [https://github.blog/2022-04-15-security-alert-stolen-oauth-user-tokens/](https://github.blog/2022-04-15-security-alert-stolen-oauth-user-tokens/)

----

Thanks for reading, stay safe out there, and have a great weekend! 👩🏻‍💻 🌐 ‍👨🏿‍💻
