---
layout: post
title: Using rustfmt in spacemacs on mac
---

I had some issues getting rustfmt to work in spacemacs on my mac. Here's roughly how I got it working.

These two github issues helped a lot: [1](https://github.com/rust-lang-nursery/rustfmt/issues/1707)
, [2](https://github.com/rust-lang/rust-mode/issues/215).

In particular, these are the most important steps:

1. Confirm you're using rustfmt-nightly 
2. Export LD_LIBRARY_PATH
3. Use exec-path-from-shell in your spacemacs config

### Confirm you're using rustfmt-nightly
You can use rustup show to see whether you're using the nightly version. 
You can install rustfmt-nightly with ~~~~cargo install rustfmt-nightly --force~~~~
Run ~~~~rustup run nightly rustfmt --help~~~~ to confirm that your nightly version of rustfmt works. 

### Export LD_LIBRARY_PATH
For whatever reason, macs don't like linking the LD_LIBRARY_PATH stuff by default. This causes problems for rustfmt.
Run ~~~~export LD_LIBRARY_PATH=$(rustc --print sysroot)/lib:$LD_LIBRARY_PATH~~~~, and then try running ~~~~rustfmt --help~~~~ to see if it worked. 
If it doesn't, then try also using ~~~~export DYLD_LIBRARY_PATH=$(rustc --print sysroot)/lib~~~~ and running rustfmt again.
If that doesn't work, then I'm sorry as I didn't have issues after that.
Assuming it does work, you now want to put those exports into your .bash_profile so they get loaded every time you start a shell. 
Source your .bash_profile, and then confirm it works by running rustfmt in a new shell.

### Use exec-path-from-shell in your spacemacs
Spacemacs won't know how to load those exports by default. So we need to tell it to get those paths somehow. 
You can use exec-path-from-shell to do just this. Put the following into your .spacemacs in the user-config section:

```
(require 'exec-path-from-shell)
(exec-path-from-shell-initialize)
;; This is used for rustfmt
(exec-path-from-shell-copy-env "LD_LIBRARY_PATH")
```

You might also need to add the DYLD_LIBRARY_PATH as well (I didn't)

Now if you restart spacemacs, you should be able to use rustfmt in it. 
