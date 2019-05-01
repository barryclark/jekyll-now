---
layout: post
title: Make GitHub Your Code Repository
---

Downloading code from [GitHub](https://github.com/)® manually is straightforward: navigate to the repository website, download the ZIP file, and extract it to your working directory.
However, because this process is manual it needs to be repeated whenever the repository changes, such as when the developer applies bug fixes or incorporates new features.
SAS® and R provide users the tools to programmatically download and source repositories housed on GitHub.



SAS and R both have a base set of functionality, but they differ in that R provides access to user-created packages, code bundles that extend R’s functionality, hosted on services like the [Comprehensive R Archive Network](https://cran.r-project.org/) (CRAN) and GitHub.
CRAN hosts established, vetted packages while GitHub tends to host more developmental packages.
GitHub is not limited to R code, however, so the macro described in this paper extends to SAS access to remote code repositories so ingrained in R development.

SAS users typically store reusable SAS programs in directories known as AUTOCALL libraries.
These code repositories might reside on the programmer’s computer or on a network drive, and are generally developed in isolation, by a single programmer or within a single organization.
R users, meanwhile, pull reusable code down from CRAN.
Hosting services provide easy and universal access to codebases, and require only an internet connection.

GitHub is a programming language-agnostic hosting service that allows users to store and access code in the cloud.
It leverages Git, an open-source version control system, to track and control changes to the code.
Storing code remotely allows the programmer to access, modify, and run it from any workstation with an internet connection.
Additionally Git tracks every change to the code and makes available every version, tracked in a commit history.
If a newer version causes problems the user can easily revert to an earlier version.
