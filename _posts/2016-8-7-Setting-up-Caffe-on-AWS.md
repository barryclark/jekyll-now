---
layout: post
title: Setting Up Caffe On AWS For Dummies
---

This is short tutorial on setting up Caffe to run on Amazon Web Services (AWS).  If you're hacker who lives on the command line, this is not for you.  If instead, you are a recovering pure mathematician who is uncomfortable with the messy innards of your laptop, and even more uncomfortable with the cloud, this might be for you.  You can find other tutorials with similar content, for example in [Stanford's CS231 course on Neural Networks](http://cs231n.github.io/aws-tutorial/).  This might be more of a meta-tutorial, in that, for some cases, I plan to point you to resources and say "do this".

![Image to brighten up the place](/images/Caffe_AWS_header_image.jpg)

If this tutorial proves to be useful, then I'll add to it as needed.  If you see a gap, or run into a thorny problem I haven't documented, email me or comment and I'll address it here.

Caffe is one of the top frameworks for Deep Learning.  It abstracts away the details of implementing systems of neural network layers in a very nice way, and it's well supported.  The [steps for installing and running Caffe are routine](http://caffe.berkeleyvision.org/installation.html) and well documented.

If you really want to train neural networks with any speed, you'll want a GPU, and this is where it gets complicated.  Many people, me included, are using a laptop without a GPU.  My 2015 Macbook Pro has an Intel Iris Graphics card that can't work with Caffe's GPU mode.  In the AWS instance we're going to stand up, Caffe training runs about 30 times faster in GPU mode vs CPU mode.  In other words, you want to run in GPU mode.  Imagine running some back propagation on your laptop for 8 hours, seeing no results, and your laptop is on fire the whole time.  Not great.

So you can go out and spend a week's paycheck on a GPU, or you can try to setup something remotely.  We're just trying this out, so wouldn't it be great if we could make small incremental investments.  Since familiarity with AWS is increasingly a gateway to bigger and better things, it's not a bad diversion to stand up a GPU instance on AWS.  You earn passing familiarity with AWS, and access to a crazy amount of computing power on short notice.  Fortunately AWS provides specific GPU instance types just for this situation, and for this tutorial we'll be using one known as `g2.2xlarge`.  It'll cost you $0.65 per hour, no big deal if you can shut it on and off at will, which you can.

I'll show you how to stand this up, how to setup Jupyter Notebook to run remotely, and then you'll be all set to start a tutorial on Caffe such as [Christopher Bourez' tutorial.](http://christopher5106.github.io/deep/learning/2015/09/04/Deep-learning-tutorial-on-Caffe-Technology.html)

# Step 1: set up your AWS Account

We'll create a free account.  This is super straightforward:

1. Head over the [Amazon Web Services](https://aws.amazon.com/) and choose the *Create Free Account* option.
2. Choose personal account, and 
3. Go through the phone verification
4. and provide billing details.

# Step 2: set up billing alerts

The free tier gives you access to certain levels of compute without it costing you a dime.  However, even with a free account you can deploy substantial computing power that costs a lot of money and you can be billed for it.  Hence:

1. you have to provide billing details,
2. you should set up billing alerts to notify you when your bill exceeds a pain threshold and
3. get in good habits of stopping your instance when you're done with your work.  

In our case, we're going to deploy an instance that bills at $0.65 an hour.  That's not a lot, but if you leave it running all month, you'll end up paying nearly $500.  So getting in those good habits is really important.

I've been through one billing cycle now and it seemed as if my bill was automatically deducted from my debit card, which is convenient.  I think my first bill was $3.25 ;) 

1. **Enable Billing Alerts**: go to the [free tier alarms docs on AWS](http://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-alarms.html) and follow directions to enable billing alerts, then
2. **Create a Billing Alarm**: from the same page, follow the directions to create an alarm.  I created just one, at $20, because I'm a frugal dude.

From CloudWatch you can also check in on billing in (near) real time, and a number of other things, so it can be a cool feature to explore.

# Step 3: Spinning up an instance with Caffe pre-installed

There are tutorials out there on [how to install Caffe from scratch](https://github.com/BVLC/caffe/wiki/Install-Caffe-on-EC2-from-scratch-(Ubuntu,-CUDA-7,-cuDNN-3)) on an AWS instance.  However, one of the huge advantages of AWS is that you can spin up an instance from someone else's image of their instance, and skip all the gnarly setup.  The Berkeley Vision and Learning Center built an Amazon Machine Image (AMI) - `ami-763a311e` - that is specifically designed for using `g2.2xlarge` and `g2.8xlarge` (even greater GPU speed) with Caffe.  They also provide [instructions on how to build the image yourself](https://github.com/BVLC/caffe/wiki/Caffe-on-EC2-Ubuntu-14.04-Cuda-7), but it is easier to simply spin up an instance with this AMI.  Here's how:

0. Because the image we want to use is in a specific region, we have to switch our location to that region.  From the header controls on the right, switch your location to N. Virginia, aka `us-east-1d`:  
  ![Change location](/images/Caffe_AWS_change_location.png)  
1. From the AWS Console, hover your pointer over Services, and choose the EC2 (Elastic Compute 2) service:  
  ![Location of EC2 in Services Dropdown](/images/Caffe_AWS_EC2_location.png)
2. Click on *Launch Instance*:  
  ![Launch Instance Screenshot](/images/Caffe_AWS_Launch_Instance_button.png)
3. Here you have the choice of what AMI to use.  AMIs can come with all sorts of pre-configuration.  In this case, we want to use an AMI that the Berkeley Vision and Learning Center set up with just about everything we need.  So click *Community AMIs* on the left:
  ![Community AMIs on left](/images/Caffe_AWS_community_AMIs.png)
4. Now search for AMI number `ami-763a311e`, and select the result that comes up:
  ![Select ami-73a311e](/images/Caffe_AWS_select_ami.png)
5. Select the `g2.2xlarge` option from the list of instance types, and choose *Review and Launch*:
  ![Select instance type g2.xlarge](/images/Caffe_AWS_select_instance_type.png)
6. AWS will now warn you that your security settings are insecure.  This is not an area of expertise for me, and in my case, I adopted the attitude of 'security by obscurity' and continued.  If you know better config settings, I'd love to hear from you.
7. We will come back and add a new access rule for the security group, but for now continue.
8. You'll be asked to create a key pair.  Create a new key pair, download the key pair, and launch the instance.
  ![Create new key pair and launch](/images/Caffe_AWS_create_new_key_pair.png)
9. You should see a message that says your instance is now launching.  At this point, you're being billed for that instance, so be aware.  To stop being billed, stop the instance.

## How to stop your instance

The convenient thing about this instance is that you can stop and start the instance and, although processes will shut down, your stored files and settings will persist, with some exceptions.  To stop the instance, and thus stop billing:

1. Choose *EC2* from the Services dropdown:  
  ![Location of EC2 in Services Dropdown](/images/Caffe_AWS_EC2_location.png)
2. Choose *Instances* from the sidebar:  
  ![Instances option in sidebar](/images/Caffe_AWS_instances_in_sidebar.png)
3. By clicking the box, select the instance in question from your list of instances (note that the status is *Running*):
  ![Select the instance you want to stop](/images/Caffe_AWS_select_instance_to_stop.png)
4. Then, using the *Actions* button, choose `Actions > Instance State > Stop`:
  ![Actions > Instance State > Stop](/images/Caffe_AWS_stop_instance.png)
5. Confirm that you want to stop the instance.
6. The instance state will move to *stopping* and eventually to *stopped*.

## What persists between stop and the next start

When you stopped your instance, you may have noticed a warning that indicates that data in your ephemeral storage will be lost.  There's essentially two types of storage here - ephemeral storage and storage that is backed by EBS.

- If you terminate your instance, you lose anything in ephemeral storage and EBS.
- But if you just stop your instance, EBS is preserved, while ephemeral is lost.  So in general, we will make changes in EBS storage, so that our changes will persist between stop and restart.
- You can also leave the instance running all the time and both EBS and ephemeral storage will be preserved, but it costs $$.

The ephemeral storage is mounted in `/mnt` and, as I understand it, everything else is EBS backed.

This is not something I know that much about, but if you want to know more, there's plenty about this, for example [this Stack Overflow question](http://stackoverflow.com/questions/11566223/what-data-is-stored-in-ephemeral-storage-of-amazon-ec2-instance).

*Edit:* this Stack Overflow answer notes that EBS instances do fail and that it is good to have an AMI with your basic setup requirements included.  Figuring that out, and adding that to this tutorial is a potential future edit.

# Step 4: SSH into your instance

SSH is easy for most of you but for me it is black magic, and I find that I engage in [cargo cult programming](https://en.wikipedia.org/wiki/Cargo_cult_programming) anytime I work with it.  To SSH into your new instance:

1. (For OSX) take the key pair you downloaded when you set up your instance and stick it in `~/.ssh`.
2. From `AWS > EC2 > Instances` select the instance you spun up  
  ![Select instance](/images/Caffe_AWS_select_instance_to_stop.png)
  and view the *Description* section.  There you will find the instance's Public DNS.  Grab this.  This changes whenever you stop and restart an instance, so you will to do this step each time you spin up an instance.  
  ![Public DNS](/images/Caffe_AWS_Pubic_DNS.png)
3. SSH in via:  
  `ssh -X -i [full path to key pair file] ubuntu@[Public DNS]`

and you're in.  The `-X` is so that, when using Jupyter Notebook, you can open up XWindows in your local browser.  You don't need it otherwise.

# Step 5: Setting up Jupyter Notebook to run remotely

Caffe comes with some nice introductory material in the form of Jupyter Notebooks, and generally I like to prototype in Jupyter anyway, so I'll show you how to set that up.  Essentially, we'll follow the process from the [Jupyter Notebook documentation](http://jupyter-notebook.readthedocs.io/en/latest/public_server.html).

Once SSHed into your instance:

1. Run `sudo pip install jupyter` to make sure that Jupyter is installed.
2. Run `jupyter notebook --generate-config` to generate a configuration file for Jupyter.
3. If you like, run the steps from to [prepare a hashed password](http://jupyter-notebook.readthedocs.io/en/latest/public_server.html#preparing-a-hashed-password).
4. Now, open `~/.jupyter/jupyter_notebook_config.py` in your favorite text editor, and add the following lines:

   ```
   c = get_config()
   c.NotebookApp.ip = '*'
   c.NotebookApp.password = u'[hashed password from step 3]'
   c.NotebookApp.open_browser = False
   c.NotebookApp.port = 8888
   c.NotebookApp.certfile = u'/home/ubuntu/.ssh/mycert.pem'
   c.NotebookApp.keyfile = u'/home/ubuntu/.ssh/mykey.key'
   ```

Last, we need to modify your security settings so that your instance can accept HTTPS requests.  You can run through AWS documentation on this (which is excellent), or do this:

0. From `AWS > EC2 > Instances` view your instance and, in the description, note which security group it belongs to:
  ![Instance Security Groups](/images/Caffe_AWS_instance_security_groups.png)
1. From the EC2 dashboard where you go to find your instances, select *Security Groups* from the sidebar menu:  
  ![Security Groups selection](/images/Caffe_AWS_security_groups_sidebar.png)  
  and select the security group you need to edit.
2. In the description box, choose the *Inbound* tab, then click *Edit* to edit the inbound options:
  ![Edit inbound options](/images/Caffe_AWS_edit_inbound_security.png)
3. Add a custom TCP rule on Port 8888 so you can hit that port for Jupyter Notebook:
  ![Custom TCP rule](/images/Caffe_AWS_custom_TCP_port.png)

Now, to run Jupyter Notebook, run `jupyter notebook` from your instance, and then point your browser to:

`https://[Public DNS]:8888/`

# Step 6: Setting up PyCaffe

If you jump into Python and try `import caffe`, you'll run into an error.  You need to add your Caffe path to `$PYTHONPATH`, which you can do by adding:

```
export PYTHONPATH=/path/to/caffe/python:$PYTHONPATH
```

to your `~/.profile`.  Make sure to reload with `source ~/.profile`.  Another option is to do the following whenever you import Caffe, but I see no reason why this is better:


```python
caffe_root = '../'  # this file is expected to be in {caffe_root}/examples
import sys
sys.path.insert(0, caffe_root + 'python')

import caffe
```

# Extra Credit

Some extra credit options that you may want to try:

- Learn and use the AWS command line tools.  This is probably a fabulous way to start and stop instances, etc.  Haven't tried it yet.
- Set up remote access for your favorite local text editor.  I like Sublime Text 3, and I usually set up [remote access using Sublime SFTP](https://wbond.net/sublime_packages/sftp/usage) when I start to get heavy into engineering.  For now, since I'm putzing around with tutorials, I'm not there yet.
  + One difficulty here is that each time you stop and restart the instance, you are changing the Public DNS and IP, so you will have to update any such values in your remote setup for your text editor.
- Boot up Git; it's always good to version control running.
- Persist Jupyter Notebook even if your connection goes down by running Jupyter Notebook in a tmux session.