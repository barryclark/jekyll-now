---
layout: post
title: Pihole Sidecar
---
### Summary
I wanted to use a sidecar to send my pihole logs to Humio.
Unfortunately... I have no idea what I'm doing, and LightHTTPD didn't have permissions to write to the directory I was logging to....

Added the sidecar to [02-deployment.yaml](https://github.com/hashtagcyber/hashtagcyber.github.io/blob/master/_posts/sidecar.yaml)
    - This is when I got the following error:
```
Starting lighttpd
2021-03-21 18:18:35: (server.c.750) opening errorlog '/var/log/lighttpd/error.log' failed: No such file or directory
2021-03-21 18:18:35: (server.c.1461) Opening errorlog failed. Going down.
```

### The Quick Fix
***Note***: K8s probably has a better native solution to ensure containers have write access to mountpaths... but this was easy.
1. Create the directories on the host
```
mkdir /containers/pihole/logs/lighttpd
mkdir /containers/pihole/logs/pihole
touch /containers/pihole/logs/lighttpd/error.log
```
2. Give the world access
```
sudo chmod 777 /containers/pihole/logs
```
3. Check who should actually own these files
```
stat /containers/pihole/logs/pihole
stat /containers/pihole/logs/lighttpd/error.log
```
4. Chown and Chmod
```
sudo chown -R 999:999 /containers/pihole/logs
sudo chown -R 33:33 /container/pihole/logs/lighttpd
sudo chmod 755 /container/pihole/logs
```
5. Profit
