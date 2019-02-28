---
layout: post
title: Exploring Data Version Control (DVC)
date: 2019-02-22
categories: [Tooling]
picture: /assets/images/foo.png
published: false
excerpt: Bladiebla
---

## ## Installation

There are a few ways to install DVC, which come down to either installing with `pip install dvc`, or using the package manager of your choice. Debians, Fedora/RHEL, and Mac OS are all covered here.

## Initialization

Your project directory first needs to be a git repository. Other VCSs are possible, but for this tutorial we'll stick to git.

```bash
$ mkdir dvc_proj && cd dvc_proj
$ git init
$ dvc init
```

Running `dvc init` creates `.dvc` folder for the relevant DVC stuff.

## Configuration: Remote Storage

Before we start adding files, we need to configure one very important thing, remote storage.

Although we could use DVC without remote storage, no one else could clone your project including data. The supported storage types can be found [here](https://dvc.org/doc/get-started/configure). 

```bash
$ dvc remote add -d mylocal /home/dorian/Downloads/
Setting 'mylocal' as a default remote.
```

