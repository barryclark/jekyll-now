---
layout: post
title: BorgBackup utility
---

This is a small quick start guide for BorgBackup. The main goal of [Borg](https://borgbackup.readthedocs.io/en/stable/) is to provide an efficient and secure way to backup data.

## Installation

Full guide can be found [here](http://borgbackup.readthedocs.io/en/stable/installation.html)

**Package Installation**

- macOS - `brew install borgbackup`
- Arch Linux - `pacman -S borg`
- Debian & Ubuntu - `apt-get install borgbackup`

**Standalone Binary Package**  

[Binary Release page](https://github.com/borgbackup/borg/releases)

Add the binary to a folder in your `PATH`

    sudo cp borg-linux64 /usr/local/bin/borg
    sudo chown root:root /usr/local/bin/borg
    sudo chmod 755 /usr/local/bin/borg

If a new version of Borg is released, the binary will need to be downloaded
again and reinstalled.

**Using Git**  

```sh
# get borg from github
git clone https://github.com/borgbackup/borg.git
    
virtualenv --python=python3 borg-env
source borg-env/bin/activate   # always before using!
    
# install borg + dependencies into virtualenv
pip install sphinx  # optional, to build the docs
cd borg
pip install -r requirements.d/development.txt
pip install -r requirements.d/fuse.txt  # optional, for FUSE support
pip install -e .  # in-place editable mode
    
# optional: run all the tests, on all supported Python versions
# requires fakeroot, available through your package manager
fakeroot -u tox
```

## Quick Start guide

1. Initialize the backup repo: `borg init --encryption=repokey /path/to/repo`
1. Create the first archive: `borg create /path/to/repo::Monday ~/src ~/Documents`
1. Create another archive: `borg create --stats /path/to/repo::Tuesday ~/src ~/Documents`
1. List archives: `borg list /path/to/repo`
1. List contents of a specific archive: `borg list /path/to/repo::Monday`
1. Restore an archive: `borg extract /path/to/repo::Monday`
1. Delete archive: `borg delete /path/to/repo::Monday`
1. Recover disk space: `borg compact /path/to/repo`

[Full quick start guide](http://borgbackup.readthedocs.io/en/stable/quickstart.html)
