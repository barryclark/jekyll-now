---
layout: post
title: "Development with ERPNext - Part 1: Setup using Vagrant box"
image: /images/erpnext-logo-copy.png
---

One thing that was quite impressive when I first started working with ERPNext was the underlying **Frappe** Framework. It is highly extensible multi-tenant platform. In a way, Frappe acts as a host for all other apps to run on top, including ERPNext itself.

For reference, here is the official [User Manual](http://frappe.github.io/erpnext/user/manual/en/) from ERPNext. 

Following this though, I still found it hard to have everything set up nicely for development. There are 2 approaches I took:

  1. Install `bench` directly on my Macbook. Problem with this arrives if we wanna have different version of *ERPNext/Frappe*. There is no way to make it clean
  2. Install using **VirtualBox/Vagrant**. It solves the first problem but then there is no actual documentation on how to set it up for development.

Therefore i will try to show how I set up mine using Vagrant Box in this post. It turns out to be pretty simple and convenient. 

### Setup
##### 1. Download Vagrant box
For simplicity, I will skip the step on how to install Vagrant/Virtual Box. Just make sure you have those installed. The official vagrant box is here: https://erpnext.com/download

##### 2. Add vagrant box and start the vm
Usually i will put the box in my project folder as follow:  

{% highlight ruby %}
project_a/
---- code/
---- ERPNext-Vagrant.box
{% endhighlight %}

Open a Command Terminal on the downloaded location, and add the vagrant box

{% highlight ruby %}
vagrant box add ERPNext-Vagrant.box --name=ERPNextTest
{% endhighlight %}

To see if it is actually added: 
{% highlight ruby %}
vagrant box list
-----
ERPNextTest   (virtualbox, 0)
{% endhighlight %}

Next add the following simple `Vagrantfile` in the same folder as the box with the following content:

{% highlight ruby %}
Vagrant.configure("2") do |config|
  config.vm.box = "ERPNextTest"
  config.vm.network "private_network", ip: "192.168.50.5"
end
{% endhighlight %}

[Vagrantfile](https://www.vagrantup.com/docs/vagrantfile/) is used to inform Vagrant on how to provision the vm. I have chosen Static IP instead of DHCP to avoid the need to find IP later. More on Vagrant network configuration [here](https://www.vagrantup.com/docs/networking/private_network.html).

Next let's just start up the box with:
{% highlight ruby %}
vagrant up
{% endhighlight %}

#### 3. Copy the bench folder out 
After the box finishes setting up, we can take a look by ssh in `vagrant ssh`. It will look something like this when we do a list out.

{% highlight ruby %}
To update, login as
username: frappe
password: frappe
....
Last login: Wed Dec  7 04:42:10 2016 from 10.0.2.2
frappe@erpnext:~$ ls
bench-repo  frappe-bench  tmp
frappe@erpnext:~$ ll frappe-bench/
total 20
drwxrwxr-x 1 frappe frappe  374 Dec  6 10:22 ./
drwxr-xr-x 9 frappe frappe 4096 Dec  6 10:09 ../
drwxrwxr-x 1 frappe frappe  170 Dec  6 10:15 apps/
drwxrwxr-x 1 frappe frappe  204 Dec  6 10:15 config/
-rw-r--r-- 1 frappe frappe 6148 Dec  6 10:15 .DS_Store
drwxrwxr-x 1 frappe frappe  340 Dec  6 10:17 env/
drwxrwxr-x 1 frappe frappe  170 Dec  7 09:55 logs/
drwxrwxr-x 1 frappe frappe  238 Dec  6 10:15 node_modules/
-rw-r--r-- 1 frappe frappe  128 Dec  6 10:14 patches.txt
-rw-r--r-- 1 frappe frappe  405 Dec  6 10:15 Procfile
drwxrwxr-x 1 frappe frappe  238 Dec  6 10:16 sites/
frappe@erpnext:~$ 
{% endhighlight %}

Now the main problem now is how to access these files as local files. Vagrant has a configuration called `synced_folders`. This, however, will prioritize syncing from host machine to guest. So if you have an empty host folder, it will screw up the initial setting from ERPNext. *My solution is simple: wait for the `frappe-bench` folder to finish setting up, then copy it out and sync.*

Remember the static ip above, it will be useful here, we use scp to copy the whole folder out. This will take sometimes because we will copy the `.git` folders as well. Probably can make the copying faster using `tar` but i ignore it for the moment. 

Anyway, as long as the copying's done, it will be much better because we can continue use git on these local files and still have it synced to the VM.
{% highlight ruby %}
scp -r frappe@192.168.50.5:~/frappe-bench code
{% endhighlight %}
#### 4. Last step is to enable synced_folder
Add a line to your `Vagrantfile` so that it looks like below:
{% highlight ruby %}
Vagrant.configure("2") do |config|
  config.vm.box = "ERPNextTest"
  config.vm.network "private_network", ip: "192.168.50.5"
  config.vm.synced_folder "code/", "/home/frappe/frappe-bench"
end
{% endhighlight %}

Next, `vagrant reload`. 
After this you will have a local folder that automatically synced to the Vagrant Box. Any changes made to the apps will be updated. At the same time, since those files are local, you can still make use of the git versioning as usual. So there you have it, my one simple trick to set up ERPNext development environment using Vagrant Box. 

This is much cleaner than directly install on Host machine, be it Mac or Windows (because of multi-versions conflict) and also quite convenient compare to keep updating a file from editor and upload the vagrant box.
