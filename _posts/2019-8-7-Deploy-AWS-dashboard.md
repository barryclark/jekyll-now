---
layout: post
title: Deploying dashboard on Amazon Web service (without tear)
---

<br>

# Why Deploying?

Aftr working so hard to collect your data and did the analysis, it would be sad to let it sit in your laptop, never to see the light of day. I see the final stage of many Kaggle competition projects end up like this. So I want to learn the next important step which is to organize the data for the audiences to interact with. This post will be all about how to put your data out into the light, as an interactive dashboard hosted on a cloud. I hope it will be useful for beginners and enthusiases. All the codes I wrote for this project can be found [here](https://github.com/VincentK1991/Streeteasy_dashboard_aws). And here is the [final product](http://streeteasy-dashboard-aws-dev.us-west-2.elasticbeanstalk.com/).

![Figure 1]({{ site.baseurl }}/images/streeteasy_webapp.png "webapp")
<p align="center">
    <font size="2"><b>Figure 1.</b> my webapp breaking down the NYC rental cost.</font>
</p>

# What is AWS Elastic beanstalk?

AWS is a cloud computing platform, and AWS Elastic Beanstalk is an orchestration service that handles webapplication deployment. The reason I pick AWS Elastic Beanstalk is because I found it to be the easiest way to deploy a webapp for beginners. This work is done based on my experience in windows machine, but I think it will generally be true even for Mac users. AWS EB automatically takes care of and abstracting away a lot of complexities (such as the docker container or the kubernetes). Therefore it will allow you to spend more time thinking about content and visualization. All we need are the application.py file, and the requirements.txt file. That's it.


# How to host csv file

The "raw" data here is just a csv file of rental listing in NYC obtained from web scraping. There are many ways to host this dataset, but We will use the easiest way which is to upload the csv file to googlesheet. Read more [here](https://www.megalytic.com/knowledge/using-google-sheets-to-host-editable-csv-files). Make sure the google sheet is correctly formatted, then get the shareable link from the google sheet. We will read the csv file into Pandas dataframe format from this link.

# Local development

The global picture here is very simple. First we will start by creating virtual environment, develop the webapp locally, then deploy it on the AWS.
First, to control all the packages and versions, we will create a virtual environment. We will use "virtualenv" for this process.

1.1.1 To install virtualenv, type this command 

{% highlight python %}
pip install virtualenv 
{% endhighlight %}

1.1.2 Then we need to create a virtual environment called "virtual". Type this command:

{% highlight python %}
virtualenv virtual
{% endhighlight %}

After a virtual environment is created, you will see a folder called "virtual"

1.1.3 We need to activate the virtual environment. This is done by going to the folder "virtual", go to sub-folder "Scripts". And run the script called "activate" by simply type 

{% highlight python %}
virtual\Scripts\activate
{% endhighlight %}

You will see the cmd (or your Mac terminal) showing the virtual environment name "virtual", indicating that you're now in the virtual environment.

1.2 Install all the packages needed to run the application.py file 

If you have requirements.txt Simply type this command:

{% highlight python %}
pip install -r requirements.txt
{% endhighlight %}

All the packages and dependencies listed in requirements.txt file will be installed for you in the virtual environment.

If not, you can pip install individual packages. After that, you want to keep track of what packages of which versions you installed. This step is important because it might help you debug afterward. Early on when I started this work I have to deal with this version compatibility a lot because many package versions that are compatible with Mac don't work on Windows. To deal with this we will automatically generate the requirements.txt file of all packages you installed in your virtual environment. simply type:

{% highlight python %}
pip freeze > requirements.txt
{% endhighlight %}

So now if something doesn't work we can go back to this file and check the package version.

1.3 Test run your application.py file. There are a few quirks that might help you later on. For example, Elastic Beanstalk will look for the file name "application.py" so when I say run this file, I mean you should name your file "application.py". 


# Deployment

2.1 First let's set up EB CLI (Elastic Beanstalk Command Line Interface). 

This is s comman line client that you will use to manage Elastic Beanstalk environments. See this website for instruction how to install EB CLI. read [this](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html). 

This is how I installed it. First make sure you have git installed. Read more about git here https://en.wikipedia.org/wiki/Git

2.1.1 Clone the EB CLI repository from GitHub, type in your cmd (terminal):

{% highlight python %}
 git clone https://github.com/aws/aws-elastic-beanstalk-cli-setup.git
{% endhighlight %}

You will see a folder aws-elastic-beanstalk-cli-setup

 2.1.2 Run the bundled_installer by going to the folder aws-elastic-beanstalk-cli-setup, then go to scripts, then you will find bundled_installer inside. Run the bundled_installer

2.2 Make sure you have AWS account. If not sign up for one. Note on signing up; You have to find the AWS-access-key (This is the so-called public key), and AWS-secret-key. Noted that this is different from the account ID (12 digits number). The AWS-access-key and AWS-secret-key are hideously long, and you must keep it secret.

If you are here, you're very close.

2.3 Initiate EB and create a directory. In your cmd (terminal) type:

{% highlight python %}
eb init
{% endhighlight %}

then a new command window should show up asking you to set up an AWS EB directory.

set a default region, if they ask application name, give it a name. For the first time you set up it will ask for access-key and secret-key, these are what you have (the really long one you downloaded in .csv file when you signed up) in instruction 2.2.

2.4 Use python, 3.6 (which is default)

{% highlight python %}
2.5 Do not set up SSH
{% endhighlight %}

Now you have created a directory. To deploy an app

2.6 create a new environment by type:

{% highlight python %}
eb create
{% endhighlight %}

enter the environment name, and DNS NAME. select a load-balancer type (use 2 which is a default for application)

If the work is sucessfull, you will see the result in the updated webapp.

The URL will be:
{% highlight python %}
your-environment-name.us-west-2.elasticbeakstalk.com
{% endhighlight %}

That's it!

2.7 To make sure you can see the webapp. Any local changes can be uploaded to the eb by typing

{% highlight python %}
eb deploy
{% endhighlight %}

It will re-read in any change you make to the application.py and deploy the updated version for you. 

2.8 Termination
if you want to terminate the environment (to save yourself some money, because running AWS all the time can cost a lot!) you can delete the app from the cloud. Just type

{% highlight python %}
eb terminate 
{% endhighlight %}


# Work Cited
1. [AWS has a good resource on FLASK webapp](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-python-flask.html) I
2. [another good blog post very easy to read](https://medium.com/@korniichuk/dash-on-aws-44a0f50a030a)
3. [my code I used for making the webapp](https://github.com/VincentK1991/Streeteasy_dashboard_aws)
4. [how to upload and read your csv file from googlesheet](https://www.megalytic.com/knowledge/using-google-sheets-to-host-editable-csv-files)