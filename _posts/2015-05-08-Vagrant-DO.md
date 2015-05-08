# 通过Vagrant快速创建DO的Droplet

在墙内这边生活的小伙伴，为了编译几行代码，经常需要去墙外面搭建VM。其中DO算是比较简单好用的一个基础服务提供商，各种编译依赖基本都秒级搞定。

但是比较惆怅，在墙内通过界面来创建Droplet，经常会遇到下面这种情况，CSS无法加载，从而无法完成创建流程。同时作为程序员，每次都去界面上点击创建，感觉有点low，我们的最爱还是命令行，这就必须提到今天要介绍的Vagrant工具。

![](http://ww2.sinaimg.cn/mw690/71d33bcfjw1erwzte32xzj21z013igt9.jpg)

## Vagrant

Vagrant的目标就是：“Development environments made easy”。它可以通过Vagrant文件描述虚拟环境的配置信息，通过它你可以快速搭建一致的开发环境、测试环境、生成环境。而且他支持Linux, Mac OS X, or Windows，这样也免去了你为了开发Linux程序，重装Windows系统的烦恼。感兴趣的同学可以看看[Vagrant的官方文档](https://docs.vagrantup.com/v2/)，基本可以满足日常使用需求了。

下面重点介绍如何在Mac OS X下通过Vagrant来创建DO的Droplet。

### 按照DO插件

因为Vagrant本身不支持DO，所以需要下载插件来支持创建Droplet

```
vagrant plugin install vagrant-digitalocean
```

如果你在墙内的话，很不幸，你可能会遇到下面的错误。

```
Installing the 'vagrant-digitalocean' plugin. This can take a few minutes...
Bundler, the underlying system Vagrant uses to install plugins,
reported an error. The error is shown below. These errors are usually
j
 11   # https://docs.vagrantup.com.
 12
 11   # https://docs.vagrantup.com.
caused by misconfigured plugin installations or transient network
issues. The error from Bundler is:

An error occurred while installing ffi (1.9.8), and Bundler cannot continue.
 11   # https://docs.vagrantup.com.
 12
  6 # backwards compatibility). Please don't change it unless you know what
Make sure that `gem install ffi -v '1.9.8'` succeeds before bundling.

Gem::RemoteFetcher::FetchError: Errno::ECONNRESET: Connection reset by peer - SSL_connect (https://rubygems.org/gems/ffi-1.9.8.gem)
```

如果插件没有安装成功的话，后面运行```vagrant up```的时候将会看到下面的错误：

```
The provider 'digital_ocean' could not be found, but was requested to
back the machine 'default'. Please use a provider that exists.
```

解决办法呢，当然首先你得有一把梯子。如果你手里只有ss，因为其仅支持socks5代理，所以很多命令行都不支持的，这时候你需要用上```proxychains4```这个小软件，它可以让你的命令运行在socks5代理环境下：

```
# proxychains4 vagrant plugin install vagrant-digitalocean
[proxychains] config file found: /Users/chenfei/.proxychains/proxychains.conf
[proxychains] preloading /usr/local/Cellar/proxychains-ng/4.7/lib/libproxychains4.dylib
Installing the 'vagrant-digitalocean' plugin. This can take a few minutes...
Installed the plugin 'vagrant-digitalocean (0.7.3)'!
```

接下来安装DO的box，命令如下：

```
vagrant box add digital_ocean https://github.com/smdahlen/vagrant-digitalocean/raw/master/box/digital_ocean.box
```

### Vagrant配置文件

接下来通过```vagrant init```来初始化一个目录为Vagrant工作区，然后配置如下：

```
Vagrant.configure('2') do |config|

    config.ssh.private_key_path = "~/.ssh/id_rsa"
    config.vm.provider :digital_ocean do |provider|
      provider.token = "xxxxxxxxxxxxxxxxxxxxxxx"
      provider.image = "ubuntu-14-04-x64"
      provider.region = "sgp1"
      provider.size = "512mb"
      provider.ssh_key_name = "XXXX"
  end
end
```

这需要注意一下，[DO官网](https://www.digitalocean.com/community/tutorials/how-to-use-digitalocean-as-your-provider-in-vagrant-on-an-ubuntu-12-10-vps)的配置方式是错误的，里面提到的

```
    provider.client_id = "YOUR CLIENT ID"
    provider.api_key = "YOUR API KEY"
```

是老版本接口的配置方式了，现在应该配置```provider.token```，所以还是[插件实现的GitHub](https://github.com/smdahlen/vagrant-digitalocean)比较靠谱。

配置中的```image```，```region```，```size```可以通过下面的命令查询：

```
vagrant digitalocean-list images $DIGITAL_OCEAN_TOKEN
vagrant digitalocean-list regions $DIGITAL_OCEAN_TOKEN
vagrant digitalocean-list sizes $DIGITAL_OCEAN_TOKEN
```

```provider.ssh_key_name```是配置Droplet后的登录ssh通道公钥，默认值是Vagrant。但是这里有一个坑，第一次创建通过自己的ssh_key后，再通过默认的Vagrant ssh_key创建会报错，目前还没找到什么解决办法

```
Response: {"id"=>"unprocessable_entity", "message"=>"SSH Key is already in use on your account"}
```

### 运行

配置完成后，运行就很简单了，```vagrant up --provider=digital_ocean```就可以完成Droplet的创建了：

```
Bringing machine 'default' up with 'digital_ocean' provider...
==> default: Using existing SSH key: XXXX
==> default: Creating a new droplet...
==> default: Assigned IP address: XXX.XXX.XXX.XXX
==> default: Rsyncing folder: /Users/chenfei/Workspace/git/vagrant-do/ => /vagrant...
```

然后就可以通过```vagrant ssh```直接登录Droplet，超级方便：

```
# vagrant ssh
Welcome to Ubuntu 14.04.1 LTS (GNU/Linux 3.13.0-43-generic x86_64)

 * Documentation:  https://help.ubuntu.com/

  System information as of Fri May  8 03:57:59 EDT 2015

  System load:  0.85               Processes:           72
  Usage of /:   11.2% of 19.56GB   Users logged in:     0
  Memory usage: 11%                IP address for eth0: 128.199.205.179
  Swap usage:   0%

  Graph this data and manage this system at:
    https://landscape.canonical.com/

0 packages can be updated.
0 updates are security updates.

root@default:~# ls
```

这里简单提一下，如果你希望把这台Droplet共享给其他的同事，可以修改root密码，就可登录了。

```
root@default:~# passwd
Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully
```
