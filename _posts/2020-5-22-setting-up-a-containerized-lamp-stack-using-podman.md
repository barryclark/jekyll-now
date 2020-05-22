---
layout: post
title: Build a containerized LAMP stack using Podman
---

*Disclaimer: I am not going to going into detail about what is Podman or why use it as an alternative container engine. I will link references below so you can learn more about Podman in detail.*

### References
- [Podman: A more secure way to run containers](https://opensource.com/article/18/10/podman-more-secure-way-run-containers)
- [Dockerless Series](https://mkdev.me/en/posts/dockerless-part-1-which-tools-to-replace-docker-with-and-why)
- [Podman Docs](http://docs.podman.io/en/latest)

# Introduction
**According to [podman.io](https://podman.io):**

*Podman is a daemonless, open source, Linux native tool designed to make it easy to find, run, build, share and deploy applications using Open Containers Initiative (OCI) Containers and Container Images.*

In contrast to Docker, you can run `podman` without running the `sudo` command and isolate control over your pods/containers using your logged in user in Linux.

Let's see how we can use podman in action...

### Requirements
- Podman container manager *(see installation instructions below)*
- PHP and MySQL knowledge

### Installation
* Windows / MacOS / Linux: <a href="https://podman.io/getting-started/installation" target="_blank">https://podman.io/getting-started/installation</a>

### STEP 1: Create work directory
- Open your terminal/cmd and run the commands below:

```bash
# create a folder called 'podman-lamp'
mkdir podman-lamp

# navigate to directory
cd podman-lamp

# create an index.php file
touch index.php

# paste phpinfo() function
echo "<?php phpinfo();" >>> index.php
```

***Note: you can change 'podman-lamp' to whatever name you wish, this will be used as your project folder.***

### STEP 2: Create a Pod
Before running your container, we need to create a pod. 'Pods' in podman are similar to <a href="https://kubernetes.io/docs/concepts/workloads/pods/pod" target="_blank">Kubernetes Pods</a>. Pods can store multiple containers that run on the same network. This makes container network setup much easier.

Learn more about pods here:
- <a href="https://developers.redhat.com/blog/2019/01/15/podman-managing-containers-pods/" target="_blank">https://developers.redhat.com/blog/2019/01/15/podman-managing-containers-pods/</a>
- <a href="https://www.redhat.com/sysadmin/container-networking-podman" target="_blank">https://www.redhat.com/sysadmin/container-networking-podman</a>

**Creating a pod:**

```bash
podman pod create --name my-pod
```

**To check if your pod is running:**

```bash
podman pod ps
```

**It should show something like:**

```bash
POD ID         NAME     STATUS    CREATED          # OF CONTAINERS   INFRA ID
563a00a2e142   my-pod   Created   1 second ago     1                 7c96c7ab326f
```

That great! Now we need to create our containers.

### STEP 3: Running PHP 7 and Apache 

1. Create a Dockerfile in your project folder
```dockerfile
FROM php:7.3-apache
RUN docker-php-ext-install mysqli
```

2. Build and run Dockerfile
```bash
podman build -t php-apache .
podman run -d --pod my-pod -p 8080:80 --name php-apache -v "$PWD":/var/www/html php-apache
```

Notice we are adding `--pod` when running the container above. That simply instructs podman to create `php-apache` to your recently created pod (`my-pod`).

Now try visiting `http://localhost:8080` and you should see something like this:

![screenshot-01](/images/2020-5-22/screenshot-01.jpg)

### STEP 3: Running MySQL 8

Enter the following command to run MySQL 8:
```bash
podman run -d --pod my-pod --name mysql -e MYSQL_ROOT_PASSWORD=my-secret-password mysql:8 mysqld --default-authentication-plugin=mysql_native_password
```

*Take note of the password we set above (my-secret-password). We will use this when connecting to our MySQL database.*


### STEP 4: Modify `index.php` file

Now we need to modify the `index.php` file we created before to test our MySQL database connection:

```php
$connection = mysql_connect('127.0.0.1', 'root', 'my-secret-password');

if (!$connection) {
  die('Unable to connect ' . mysql_error());
}

echo 'Connected to the database successfully';
```

So far, so good. Now navigate to `http://localhost:8080` and you should see this:

![screenshot-02](/images/2020-5-22/screenshot-02.jpg)

Great job! Now you've just created a LAMP stack container without using Docker.

*If you have further questions or concerns, please contact <a href="mailto:thepinoyprogrammer@protonmail.com">thepinoyprogrammer@protonmail.com</a>*

*...or use the social links below.*
