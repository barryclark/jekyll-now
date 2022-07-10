---
layout: post
title: chroot a short history of containerization
---

A short review on the history of Containers at a glance. If you take one step back from docker you'll probably read about `chroot` spelled as change root.
It's a Linux command that allows you to set the root directory of a new process. This is the very heart of the containerization approach and how the isolation works. In this way, we can just set the root directory to be where-ever the new container's new root directory should be. After that isolation the new container group of processes can't see anything outside of it. This isolation is eliminating common security issues, because the new process has no visibility outside of its new root.

Let's try it by playing some Inception and build a container inside a container.

```bash
# --privileges is just for the lulz
docker run -it --name docker-host --rm --privileged ubuntu
```

After spinning up the container, let's attempt to use chroot right now.

* Create a new folder in your home directory `mkdir /my-new-root`
* Inside that new folder, run `echo "super duper secret" >> /my-new-root/secret.txt`
* Try to run `chroot /my-new-root bash`

You should now see something about failing to run a shell or not being able to find bash. That's because bash is a program and your new root wouldn't have bash to run (because it can't reach outside of its new root.)

So let's fix that!

Run:

* `mkdir /my-new-root/bin`
* `cp /bin/bash /bin/cat /bin/ls /my-new-root/bin/`
* `chroot /my-new-root bash`

Damn - it's still not working! The problem is that the bash command rely on libraries to power it and we didn't bring those with us. So let's fix that with `ldd`.
`ldd`itself is a powerful command-line tool that allows users to view an executable file's shared object dependencies. A library refers to one or more pre-compiled resources such as functions, subroutines, classes, or values. Each of these resources is combined to create libraries.

Now run `ldd /bin/bash` - This print out something like this:

```bash
$ ldd /bin/bash
  linux-vdso.so.1 (0x00007fffa89d8000)
  libtinfo.so.5 => /lib/x86_64-linux-gnu/libtinfo.so.5 (0x00007f6fb8a07000)
  libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f6fb8803000)
  libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f6fb8412000)
  /lib64/ld-linux-x86-64.so.2 (0x00007f6fb8f4b000)
```

Gotcha - we now know the libraries that are required for running bash. Let's go ahead and copy those into our new environment.

```bash
mkdir /my-new-root/lib /my-new-root/lib64

# or the cool kids variant for fancy guys
 /my-new-root/lib{,64}
 ```

After accomplishing this we need to copy all those paths (ignore the lines that don't have paths) into our new directory. Make sure you get the right files in the right directory. In my case above (yours likely will be different) it'd be two commands:

* `cp /lib/x86_64-linux-gnu/libtinfo.so.5 /lib/x86_64-linux-gnu/libdl.so.2 /lib/x86_64-linux-gnu/libc.so.6 /my-new-root/lib`
* `cp /lib64/ld-linux-x86-64.so.2 /my-new-root/lib64`

Now repeat that for `cat` and run `ldd /bin/cat` and copy the into our my-new-root as well.

```bash
$ ldd /bin/cat
        linux-vdso.so.1 (0x00007ffcb67ea000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f67cd9f0000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f67cdbec000)
```

* `cp /lib/x86_64-linux-gnu/libc.so.6 /my-new-root/lib`
* `cp /lib64/ld-linux-x86-64.so.2  /my-new-root/lib64`

Now -  finally, run `chroot /my-new-root bash` and you should successfully see everything in the directory. Time for revealing the secret by calling `cat secret.txt`.

Nice! If you now try `pwd` to see your working directory. You should see a message like: `/. You can't get out of here!`.

Based on this message, containers were used to be called a jail for this reason. To escape the jail - you can hit `CTRL+D` or run `exit`. This will help to get out of your chrooted environment.

<p align="center">
<img src="/images/chroot.png">
</p>
