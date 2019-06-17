---
layout: post
title: Make GitHub Your Code Repository
---

Downloading code from [GitHub](https://github.com/)® manually is straightforward: navigate to the repository website, download the ZIP file, and extract it to your working directory.
However, because this process is manual it needs to be repeated whenever the repository changes, such as when the developer applies bug fixes or incorporates new features.
SAS® and R provide users the tools to programmatically download and source repositories housed on GitHub.

SAS and R both have a base set of functionality, but they differ in that R provides access to user-created packages, code bundles that extend R's functionality, hosted on services like the [Comprehensive R Archive Network](https://cran.r-project.org/) (CRAN) and GitHub.
CRAN hosts established, vetted packages while GitHub tends to host more developmental packages.
GitHub is not limited to R code, however, so the macro described in this paper extends to SAS access to remote code repositories so ingrained in R development.

## Sourcing Code from GitHub

In R, the [devtools package](https://cran.r-project.org/web/packages/devtools/index.html) contains a function named `install_github` that allows users to automate the installation of packages directly from GitHub:

```R
# Install and source the devtools package.
install.packages("devtools") 
library(devtools) 

# Call install_github to download a repository directly from GitHub and then source it.
install_github("RhoInc/datadigest") 
library(datadigest)
```

SAS lacks built-in functionality to simultaneously download and install code from GitHub, which prompted the creation of the SAS macro `%install_github` (available at [RhoInc/sas-install-github](https://github.com/RhoInc/sas-install-github)).
This macro behaves much like the corresponding R package.
After a one-time manual download and install of the `%install_github` macro itself, SAS users are henceforth able to use the macro to automagically download and install other SAS code directly from GitHub.

```SAS
* Source the install_github program;
%include "my/utility/macros/install_github.sas";

* Call install_github to download and source a .sas file directly from GitHub;
%install_github(
    repo = RhoInc/violinPlot,
    file = src/violinPlot.sas
); 

* or to download and source a collection of .sas files stored in a single folder;
%install_github(
    repo = RhoInc/sas-codebook,
    folder = Macros
); 
```

## Examples!

For demonstration, let's generate graphical data codebooks in both R and SAS.
Rho developed an R package named [datadigest](https://github.com/RhoInc/datadigest) that produces an interactive summary of a tabular dataset by column:

```R
devtools::install_github(
    'RhoInc/datadigest'
)

datadigest::codebook(
    data = mtcars
)
```

<img style="margin:0 auto" src="{{ site.baseurl }}/images/2019-05-01-Make-GitHub-Your-Code-Repository-r-example.png" align="center" />

With the same idea in mind Rho also developed a SAS package that produces static summaries of SAS datasets by variable:

```SAS
%install_github(
    repo = RhoInc/sas-codebook,
    folder = Macros
);

%codebook_generic(
    data = sashelp.cars
);
```
<img style="margin:0 auto" src="{{ site.baseurl }}/images/2019-05-01-Make-GitHub-Your-Code-Repository-sas-example.png" align="center" />

To access R or SAS code directly from GitHub without the hassle of a manual download, use the `install_github` function from the R package devtools or the SAS macro `%install_github` to help automate the process.
With these functions, programmers can access and continue their work anywhere with an internet connection, effectively becoming workstation-agnostic.
GitHub’s API extends the advantage of remote code repositories to SAS users, a capability R users have enjoyed for years.
