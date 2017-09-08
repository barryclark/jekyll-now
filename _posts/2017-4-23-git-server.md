---
layout: post
title: GIT服务器安装
comments: true
---

在vps上搭建git服务器的主要目的是为了能够持续部署我的博客,再熟悉git原理以及协议,因为git是去中心化的结构,我记得有人说过,去中心化的设计在现实发展过程中会促使出现超级中心,比如github以及将来比特币未来的局势

相比svn等集中式版本控制,git分布式更为优越,符合互联网的定义,只是搭建过程略显复杂,我们将使用git协议,下面优缺点引自git官网:

>Git 协议。这是一个包含在 Git 软件包中的特殊守护进程； 它会监听一个提供类似于 SSH 服务的特定端口（9418），而无需任何授权。打算支持 Git 协议的仓库，需要先创建 git-daemon-export-ok 文件 — 它是协议进程提供仓库服务的必要条件 — 但除此之外该服务没有什么安全措施。要么所有人都能克隆 Git 仓库，要么谁也不能。这也意味着该协议通常不能用来进行推送。你可以允许推送操作；然而由于没有授权机制，一旦允许该操作，网络上任何一个知道项目 URL 的人将都有推送权限。不用说，这是十分罕见的情况。

>#####优点
Git 协议是现存最快的传输协议。如果你在提供一个有很大访问量的公共项目，或者一个不需要对读操作进行授权的庞大项目，架设一个 Git 守护进程来供应仓库是个不错的选择。它使用与 SSH 协议相同的数据传输机制，但省去了加密和授权的开销。

>#####缺点
Git 协议消极的一面是缺少授权机制。用 Git 协议作为访问项目的唯一方法通常是不可取的。一般的做法是，同时提供 SSH 接口，让几个开发者拥有推送（写）权限，其他人通过 git:// 拥有只读权限。 Git 协议可能也是最难架设的协议。它要求有单独的守护进程，需要定制 — 我们将在本章的 “Gitosis” 一节详细介绍它的架设 — 需要设定 xinetd 或类似的程序，而这些工作就没那么轻松了。该协议还要求防火墙开放 9418 端口，而企业级防火墙一般不允许对这个非标准端口的访问。大型企业级防火墙通常会封锁这个少见的端口。

####在服务器上部署git
我们需要创建裸仓库,可以克隆事加`--bare`即可,想这样:
`$ git clone --bare you_project you_project.git`
这个操作与`git init`+`git fetch`类似.

我们打算把git仓库放在`/opt/git`目录下,在服务器上执行克隆
`git clone user@:YouDomain/opt/git/you_project.git`

####生成 SSH 公钥
大多数 Git 服务器都会选择使用 SSH 公钥来进行授权。系统中的每个用户都必须提供一个公钥用于授权，没有的话就要生成一个。生成公钥的过程在所有操作系统上都差不多。 首先先确认一下是否已经有一个公钥了。SSH 公钥默认储存在账户的主目录下的 `~/.ssh` 目录。进去看看：

    $ cd ~/.ssh
    $ ls
    authorized_keys2  id_dsa   known_hosts
    configid_dsa.pub
关键是看有没有用 `something` 和 `something.pub` 来命名的一对文件，这个 `something` 通常就是 `id_dsa` 或 `id_rsa`。有 `.pub` 后缀的文件就是公钥，另一个文件则是密钥。假如没有这些文件，或者干脆连 `.ssh` 目录都没有，可以用 `ssh-keygen` 来创建。该程序在 Linux/Mac 系统上由 SSH 包提供，而在 Windows 上则包含在 MSysGit 包里：

    $ ssh-keygen
    Generating public/private rsa key pair.
    Enter file in which to save the key (/Users/schacon/.ssh/id_rsa):
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in /Users/schacon/.ssh/id_rsa.
    Your public key has been saved in /Users/schacon/.ssh/id_rsa.pub.
    The key fingerprint is:
    43:c5:5b:5f:b1:f1:50:43:ad:20:a6:92:6a:1f:9a:3a schacon@agadorlaptop.local
它先要求你确认保存公钥的位置（`.ssh/id_rsa`），然后它会让你重复一个密码两次，如果不想在使用公钥的时候输入密码，可以留空。

现在，所有做过这一步的用户都得把它们的公钥给你或者 Git 服务器的管理员（假设 SSH 服务被设定为使用公钥机制）。他们只需要复制 `.pub` 文件的内容然后发邮件给管理员。公钥的样子大致如下：

    $ cat ~/.ssh/id_rsa.pub
    ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSU
    GPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3
    Pbv7kOdJ/MTyBlWXFCR+HAo3FXRitBqxiX1nKhXpHAZsMciLq8V6RjsNAQwdsdMFvSlVK/7XA
    t3FaoJoAsncM1Q9x5+3V0Ww68/eIFmb1zuUFljQJKprrX88XypNDvjYNby6vw/Pb0rwert/En
    mZ+AW4OZPnTPI89ZPmVMLuayrD2cE86Z/il8b+gw3r3+1nKatmIkjn2so1d01QraTlMqVSsbx
    NrRFi9wrf+M7Q== schacon@agadorlaptop.local
关于在多个操作系统上设立相同 SSH 公钥的教程，可以查阅 GitHub 上有关 SSH 公钥的向导：`http://github.com/guides/providing-your-ssh-key`。

<div><h2>架设服务器</h2>

<p>现在我们过一边服务器端架设 SSH 访问的流程。本例将使用 <code>authorized_keys</code> 方法来给用户授权。我们还将假定使用类似 Ubuntu 这样的标准 Linux 发行版。首先，创建一个名为 'git' 的用户，并为其创建一个 <code>.ssh</code> 目录。</p>

<pre><code>$ sudo adduser git
$ su git
$ cd
$ mkdir .ssh
</code></pre>

<p>接下来，把开发者的 SSH 公钥添加到这个用户的 <code>authorized_keys</code> 文件中。假设你通过电邮收到了几个公钥并存到了临时文件里。重复一下，公钥大致看起来是这个样子：</p>

<pre><code>$ cat /tmp/id_rsa.john.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCB007n/ww+ouN4gSLKssMxXnBOvf9LGt4L
ojG6rs6hPB09j9R/T17/x4lhJA0F3FR1rP6kYBRsWj2aThGw6HXLm9/5zytK6Ztg3RPKK+4k
Yjh6541NYsnEAZuXz0jTTyAUfrtU3Z5E003C4oxOj6H0rfIF1kKI9MAQLMdpGW1GYEIgS9Ez
Sdfd8AcCIicTDWbqLAcU4UpkaX8KyGlLwsNuuGztobF8m72ALC/nLF6JLtPofwFBlgc+myiv
O7TCUSBdLQlgMVOFq1I2uPWQOkOWQAHukEOmfjy2jctxSDBQ220ymjaNsHT4kgtZg2AYYgPq
dAv8JggJICUvax2T9va5 gsg-keypair
</code></pre>

<p>只要把它们逐个追加到 <code>authorized_keys</code> 文件尾部即可：</p>

<pre><code>$ cat /tmp/id_rsa.john.pub &gt;&gt; ~/.ssh/authorized_keys
$ cat /tmp/id_rsa.josie.pub &gt;&gt; ~/.ssh/authorized_keys
$ cat /tmp/id_rsa.jessica.pub &gt;&gt; ~/.ssh/authorized_keys
</code></pre>

<p>现在可以用 <code>--bare</code> 选项运行 <code>git init</code> 来建立一个裸仓库，这会初始化一个不包含工作目录的仓库。</p>

<pre><code>$ cd /opt/git
$ mkdir project.git
$ cd project.git
$ git --bare init
</code></pre>

<p>这时，Join，Josie 或者 Jessica 就可以把它加为远程仓库，推送一个分支，从而把第一个版本的项目文件上传到仓库里了。值得注意的是，每次添加一个新项目都需要通过 shell 登入主机并创建一个裸仓库目录。我们不妨以 <code>gitserver</code> 作为 <code>git</code> 用户及项目仓库所在的主机名。如果在网络内部运行该主机，并在 DNS 中设定 <code>gitserver</code> 指向该主机，那么以下这些命令都是可用的：</p>

<pre><code># 在 John 的电脑上
$ cd myproject
$ git init
$ git add .
$ git commit -m 'initial commit'
$ git remote add origin git@gitserver:/opt/git/project.git
$ git push origin master
</code></pre>

<p>这样，其他人的克隆和推送也一样变得很简单：</p>

<pre><code>$ git clone git@gitserver:/opt/git/project.git
$ cd project
$ vim README
$ git commit -am 'fix for the README file'
$ git push origin master
</code></pre>

<p>用这个方法可以很快捷地为少数几个开发者架设一个可读写的 Git 服务。</p>

<p>作为一个额外的防范措施，你可以用 Git 自带的 <code>git-shell</code> 工具限制 <code>git</code> 用户的活动范围。只要把它设为 <code>git</code> 用户登入的 shell，那么该用户就无法使用普通的 bash 或者 csh 什么的 shell 程序。编辑 <code>/etc/passwd</code> 文件：</p>

<pre><code>$ sudo vim /etc/passwd
</code></pre>

<p>在文件末尾，你应该能找到类似这样的行：</p>

<pre><code>git:x:1000:1000::/home/git:/bin/sh
</code></pre>

<p>把 <code>bin/sh</code> 改为 <code>/usr/bin/git-shell</code> （或者用 <code>which git-shell</code> 查看它的实际安装路径）。该行修改后的样子如下：</p>

<pre><code>git:x:1000:1000::/home/git:/usr/bin/git-shell
</code></pre>

<p>现在 <code>git</code> 用户只能用 SSH 连接来推送和获取 Git 仓库，而不能直接使用主机 shell。尝试普通 SSH 登录的话，会看到下面这样的拒绝信息：</p>

<pre><code>$ ssh git@gitserver
fatal: What do you think I am? A shell?
Connection to gitserver closed.
</code></pre>

>文章整合自git官方文档