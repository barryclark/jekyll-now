I am always looking to make my life easier, quicker and typing less so I rely heavily on Keyboard Shortcuts and so the following Aliases really help me out.

I have actually decided to create this post mostly for my own benefit, but hopefully many of you may benefit from a lot of these aliases that I use day to day with git.

So here they are...

## Aliases

### History
****
**Synopsis:** This shows a one line log of commits with a graph, short commit hash, short date, Single Line Commit, and Author. This makes reading the logs at a glance very easy.

**Usage:** `git hist` OR `git hist -5`

**Config**
```git
hist = log --pretty=format:\"%C(auto)%h %ad | %s%d [%an]\" --graph --date=short #--color
```

### Directory Difference Comparison
****
**Synopsis:** This will launch your specified difftool (for me this is BeyondCompare4) with the `--dir-diff` option to allow you to do a folder/directory comparison between branches/commits/staged/unstaged changes.

**Usage:** `git dirdiff` OR `git dirdiff master` OR `git dirdiff master..somebranch` OR `git dirdiff --cached`

**Config**
```git
dirdiff = difftool -t bc4 --dir-diff
```

### Initial Push and Track Remote Branch
****
**Synopsis:** I use this for my initial pushes to the remote repository of a new local branch, which adds the option to Track the remote branch.

**Usage:** `git pushy`

**Config:** 
```git
pushy = push -u origin
```

### Launch Merge Tool
****
**Synopsis:** Shorthand to launch my configured merge tool.

**Usage:** `git mt`

**Config:** 
```git
mt = mergetool
```

### Add All Files
****
**Synopsis:** Shorthand to `A`dd `A`ll files, including untracked files, to the staging area.

**Usage:** `git aa`

**Config:** 
```git
aa = add -A
```

### Force Push Changes
****
**Synopsis:** Shorthand to force push all changes to the remote repository.

**Usage:** `git pf`

**Config:** 
```git
pf = push -f
```

### Rebase Master
****
**Synopsis:** Shorthand to `R`e`B`ase from the `M`aster branch.

**Usage:** `git rbm`

**Config:** 
```git
rbm = rebase master
```

### Interactively Rebase Master
****
**Synopsis:** Shorthand to intractively rebase from the master branch using the `-i` option.

**Usage:** `git rbm`

**Config:** 
```git
rbmi = rebase master -i
```

### Continue Rebase
****
**Synopsis:** Shorthand to continue with a rebase after a merge conflict has been resolved.

**Usage:** `git rbc`

**Config:** 
```git
rbc = rebase --continue
```

### Abort Rebase
****
**Synopsis:** Shorthand to abort a rebase during merge conflicts.

**Usage:** `git rba`

**Config:** 
```git
rba = rebase --abort
```

### Skip Rebase
****
**Synopsis:** Shorthand to skip a merge conflict during a rebase.

**Usage:** `git rbs`

**Config:** 
```git
rbs = rebase --skip
```

### Checkout a New Local Branch
****
**Synopsis:** Shorthand to `C`heck`O`ut a `N`ew 
local branch.

**Usage:** `git con mybranchname`

**Config:** 
```git
con = checkout -b
```

### Checkout Master Branch
****
**Synopsis:** Shorthand to `C`heck`O`ut then `M`aster branch.

**Usage:** `git com`

**Config:** 
```git
com = checkout master
```

### Commit with Message
****
**Synopsis:** Shorthand to `C`ommit with a `M`essage.

**Usage:** `git cm "My Short Commit Message"`

**Config:** 
```git
cm = commit -m
```

### Amend the last commit
****
**Synopsis:** Shorthand to ammend the last commit.

**Usage:** `git ca`

**Config:** 
```git
ca = commit --amend
```

### Delete Local Branch
****
**Synopsis:** Shorthand to `D`elete local `B`ranch.

**Usage:** `git db mybranchtodelete`

**Config:** 
```git
db = branch -d
```

### Force Delete Local Branch
****
**Synopsis:** Shorthand to `D`elete local `B`ranch with `F`orce.

**Usage:** `git dbf mybranchtodelete`

**Config:** 
```git
dbf = branch -D
```

### Delete Remote Branch
****
**Synopsis:** Shorthand to `D`elete `R`emote `B`ranch.

**Usage:** `git drb mybranchtodelete`

**Config:** 
```git
drb = push origin --delete
```

### Reset HEAD and Delete Changes
****
**Synopsis:** Shorthand to `R`eset `H`EAD `H`ard as with the `--hard` option which will reset your local branch back to the HEAD and remove all changes.

**Usage:** `git rhh`

**Config:** 
```git
rhh = reset HEAD --hard
```

### List Branches
****
**Synopsis:** Shorthand to `L`ist local `B`ranches.

**Usage:** `git lb`

**Config:** 
```git
lb = branch -vl
```

### List Branches including remote
****
**Synopsis:** Shorthand to `L`ist `B`ranches `A`ll which includes remote branches.

**Usage:** `git lba`

**Config:** 
```git
lb = branch -vla
```

### Force Clean Branch
****
**Synopsis:** Shorthand to `C`lean and `F`orce all Files and Untracked Files/Directories.

**Usage:** `git cf`

**Config:** 
```git
cf = clean -fd
```

### Push Tags
****
**Synopsis:** Shorthand to `P`ush `T`ags to the remote repository.

**Usage:** `git pt`

**Config:** 
```git
pt = push --tags
```

### Fetch All Changes
****
**Synopsis:** Shorthand to `F`etch `A`ll changes from the remote repository.

**Usage:** `git fa`

**Config:** 
```git
fa = fetch --all
```

### Edit the Global Git Config
****
**Synopsis:** Shorthand to `E`dit your `G`lobal git `C`onfig file.

**Usage:** `git egc`

**Config:** 
```git
egc = config --global -e
```

****

