---
layout: post
title: Week 11T - Environment Setup and PHP Primer
categories: cpnt200
---

## Homework
1. XAMPP (the classic way to install Apache, PHP and MySQL/MariaDB)
    - [Install XAMPP](https://www.apachefriends.org/index.html)
    - Watch: [PHP Tutorial #2: Installing PHP (XAMPP)](https://www.youtube.com/watch?v=3B-CnezwEeo) by Net Ninja 
2. PHP Tutorials
    - Read: [Getting Started with PHP](https://www.codecademy.com/learn/learn-php/modules/getting-started-with-php/cheatsheet) on Code Academy
    - Watch: [PHP Tutorial #3: Your First PHP File](https://www.youtube.com/watch?v=ABcXbZLm5G8) by Net Ninja
        - Optional: Browse the [Net Ninja PHP Tutorial Playlist](https://www.youtube.com/watch?v=pWG7ajC_OVo&list=PL4cUxeGkcC9gksOX3Kd9KPo-O68ncT05o)
    - Search: "[php tutorials](https://www.google.com/search?q=php+tutorial)" to find a turorial that's right for you

## Terminology
<dl>
  <dt>Single Threaded</dt>
  <dd>One process handles all requests, one command at a time. The Jacascript run-time environment is single threaded. In other languages, such as PHP, the server is multi-threaded: a new process is created for each individual server request.</dd>
  <dt>Multi Threaded</dt>
  <dd>A process is created for each request and is ended when the response has been sent (or not sent). The PHP run-time environment is multi threaded. There is no event queue (the way we think of it. The server will handle multiple requests at a time, although they are handled synchronously.</dd>
  <dt>Synchronous</dt>
  <dd>One at a time (and in order).</dd>
</dl>

---

## 1. Install XAMPP

[Install XAMPP](https://www.apachefriends.org/index.html)

PHP is part of the classic LAMP stack:
- **Linux**: The traditional server operating system.
- **Apache**: The web server. This is a loose analog to Node.
- **MySQL**: The database server. MariaDB is open used in instead, which we can consider identical to MySQL for the purposes of this course.
- **PHP**: The run-time environment that executes code. This is equivalent to the Javascript run-time environment, although there are differences in the way it is implemented.

### Setting up a local development environment
There are multiple ways to create a local development environment for PHP/MySQL. 
1. Installing directly on your machine and manually configuring your servers. This is a pain. Talk to Tony about how he used to walk uphill both ways to school.
2. Use a package like XAMPP that runs everything for us. We will be using this for the first half of this course. 
3. Use a virtual machine like Local. This is a specific implementation used for Wordpress developement that we'll use in the second half of this course.

**Note**: You can skip XAMPP installation if you already have PHP/MySQL set up on your machine.

---

## 2. PHP Primer
Once we have PHP/MySQL installed and running:

1. Navigate to XAMPP's `/htdocs` directory on the command line. This might be tricky.
    - Location on Mac OS:

        ```shell
        $ cd ~/.bitnami/stackman/machines/xampp/volumes/root/htdocs
        ```

    - Location on PC

        ```shell
        $ cd /c/xampp/htdocs
        ```
        
2. Clone the [PHP Sample Code](https://github.com/sait-wbdv/php-sample-code) repository into this directory.
3. Create your own `in-class` in this directory so you can store your own code.
3. Browse to the [`localhost:8080`](http://localhost:8080) (or whichever domain your system is configured to use).

---

## 3. Template Partials with `include()` and `require()`

**Activity**: [Brochureware website partials](https://github.com/sait-wbdv/php-sample-code/tree/main/examples/brochureware)

---

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-11-18-relational-databases.md %})