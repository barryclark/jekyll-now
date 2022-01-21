---
layout: post
title: Configure TrueNas Scale 🖥 for classic Docker 🐳
---

By default, TrueNas Scale ships Docker 🐳 with Kubernetes ([link](https://www.truenas.com/docs/scale/apps/docker/)).
However, networking and a few other things are a bit different with Kubernetes.
Sadly, I don't know Kubernetes (yet 😉).
So the quickest solution to migrate my existing stack (see my [dockerfiles](https://github.com/patzm/dockerfiles) repo) was to simply use vanilla Docker 🐳.

To achieve this, I basically followed [this guide](https://xtremeownage.com/2021/12/15/truenas-scale-use-vanilla-docker/).
In this blog post, I don't only want to rehash the other guide, but also to include screenshots on how to make this change persistent.

Generally, this is what I did:
1. add a script that:
  1. stops the docker daemon
  2. replaces the docker daemon configuration file
  3. restarts it
2. launch this script after startup

Writing a new docker daemon file allows us to configure networking differently.
This specifically allowed my docker 🐳 containers to find the DNS on my local network.

Assumptions:
1. My Kubernetes based docker daemon has no containers running, nor are any configured for auto-starting.
   One way to achieve this is to call `docker-compose down -v` for all your stacks.
   Additionally, pruning the entire daemon with `docker system prune -a` can recover 🗑 you some disk 💾 space 😉.
1. My dataset for docker stuff is located at `/mnt/ssd-1tb/docker`.
1. My dataset for the new docker's data is located at `/mnt/ssd-1tb/docker-standalone`.
1. My local DNS server's IP address is `192.168.178.1`.

By default, docker stores it's daemon configuration file as `/etc/docker/daemon.json`.
This file originally contains:
```json
{
  "data-root": "/mnt/ssd-1tb/ix-applications/docker",
  "exec-opts": ["native.cgroupdriver=cgroupfs"],
  "iptables": false,
  "bridge": "none"
}                                                 
```

_Note:_ I pretty-formatted the `daemon.json` file.

The problem with this configuration is that `iptables` is disabled and no `bridge` is configured.
Hence, my new `daemon.json` file contains this content:
```json
{
    "data-root": "/mnt/ssd-1tb/docker-standalone",
    "exec-opts": ["native.cgroupdriver=cgroupfs"],
    "iptables": true,
    "bridge": "",
    "dns": ["192.168.178.1"]
}
```

I store it at `/mnt/ssd-1tb/docker/daemon.json`.
The script I want to run during startup is stored as `/mnt/ssd-1tb/docker/init.sh` and contains:
```bash
#! /usr/bin/env bash

# stop docker
systemctl stop docker

# Replace the docker daemon configuration
rm /etc/docker/daemon.json
cp /mnt/ssd-1tb/docker/daemon.json /etc/docker/daemon.json

# start docker again
systemctl start docker
```

You can test this script by simply running
```bash
sudo /mnt/ssd-1tb/docker/daemon.json
```

If you can confirm this to be working, persist this state across reboots by automatically running that script during boot.

For that, navigate to `https://<your-server>/ui/system/initshutdown` and _Add_ a new item.
Fill the following values:
* _Description_: can be anything, something to help you identify later.
* _Type_: drop-down and change it to `Script`.
* _Script_: navigate to or type the path to your `init.sh` script. In my case: `/mnt/ssd-1tb/docker/init.sh`.
* _When_: drop-down and change it to `Post Init`.
* _Enabled_: keep this checkbox checked ✅.
* _Timeout_: defaults to `10`, maybe increase it to `20`.
  If you properly cleaned the Kubernetes docker daemon, this won't probably be necessary though.

Hit _Save_ and you are done.
Time to reboot and verify that the new daemon is running.
If the output of
```bash
docker info | grep -i "docker root dir"
```

shows the path you configured in your custom `daemon.json`, your mission succeeded.

For further reference, check the [official docs page](https://www.truenas.com/docs/core/tasks/initshutdownscripts/).

_Note:_ a few things that didn't work
* Simply copying the file once: apparently, TrueNas Scale replaces this file after every reboot, and maybe even periodically.
* Changing startup tasks' execution time (i.e. in _When_): does not work for any of the two options `Pre Init` or `Post Init`.
  It seems that none of those two points in time is just between the default `daemon.json` being copied to the default location and the daemon actually starting.
  In other words: restarting the daemon seems to be unavoidable.
* Checking `daemon.json`'s content after reboot: this file, at least after some time, reverts to the default version.
  However, the currently running daemon is still the one using our custom `daemon.json` file.
  Hence, if nothing restarts the daemon, everything will just work as expected.
  If that might happen, consider using a `cron` job to execute `init.sh` regularly.
