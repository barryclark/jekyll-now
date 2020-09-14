---
title: "First Time Setup"
layout: page
---
## Prerequisites 
- Git installed

The following steps generally only need to be completed when you first install Git (e.g. when you buy a new machine), so they're easy to forget.

See: [First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)

## Setting your identity
Setting your name (optional, but recommended) and email is required for some Git and GitHub features to operate properly.

See: [How to show or change your Git username or email address](https://alvinalexander.com/git/git-show-change-username-email-address/)

1. Is your identity already set up? The following shell commands will print your settings for name and email address.

    ```shell
    $ git config user.name
    $ git config user.email
    ```

2. To set these values:

    ```shell
    $ git config --global user.name "Jenn Simmons"
    $ git config --global user.email johndoe@example.com
    ```

3. To list your global configuration settings:

    ```shell
    $ git config --list
    ```

    