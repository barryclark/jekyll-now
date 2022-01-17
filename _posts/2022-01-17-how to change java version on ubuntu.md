---
layout: post
title: how to change java version on ubuntu
---

##### Check present java version
```
java -version
```

##### Check installed alternatives
```
update-alternative --list java
```

##### Change version
```
sudo update-alternatives --config java
sudo update-alternatives --config javac
```
