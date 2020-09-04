---
layout: post
title: Using pycreateuserpkg
---

`pycreateuserpkg` is a command line utility (CLI) tool created by Greg Neagle to easily create or update an existing user on macOS.

GitHub repo: [grepneagle/pycreateuserpkg](https://github.com/gregneagle/pycreateuserpkg)

Some organizations may have a requirement to rotate their local macOS admin account on a specific interval. I use `pycreateuserpkg` for that very scenario.

### To use this tool ...

#### Downloading

1. Download or clone the repo. [Download Link](https://github.com/gregneagle/pycreateuserpkg/archive/main.zip)
2. Launch a **Terminal** window.
3. Navigate to or drag the `pycreateuserpkg` folder into the **Terminal** window.

	![](../images/2020-9-2/pycreateuserpkg_01.gif)
	
4. Once in the `pycreateuserpkg` directory you will have access to the tool.

	Use the following command to show the usage information.
	
	`./createuserpkg --help`
	
	```
	./createuserpkg --help
	Usage: createuserpkg [options] /path/to/output.pkg
	
	Options:
	  -h, --help            show this help message and exit
	
	  Required User Options:
	    -n NAME, --name=NAME
	                        User shortname. REQUIRED.
	    -u UID, --uid=UID   User uid. REQUIRED.
	
	  Required Package Options:
	    -V VERSION, --version=VERSION
	                        Package version number. REQUIRED.
	    -I IDENTIFIER, --identifier=IDENTIFIER
	                        Package identifier. REQUIRED.
	
	  Optional User Options:
	    -p PASSWORD, --password=PASSWORD
	                        User password. If this is not provided, interactively
	                        prompt for password.
	    -f FULLNAME, --fullname=FULLNAME
	                        User full name. Optional.
	    -g GID, --gid=GID   User gid. Optional.
	    -G GENERATEDUID, --generateduid=GENERATEDUID
	                        GeneratedUID (UUID). Optional.
	    --hint=HINT         User password hint. Optional.
	    -H HOME, --home=HOME
	                        Path to user home directory. Optional.
	    -s SHELL, --shell=SHELL
	                        User shell path. Optional.
	    -a, --admin         User account should be added to admin group.
	    -A, --autologin     User account should automatically login.
	    --hidden            User account should be hidden.
	
	  Optional Package Options:
	    -d, --distribution  Creates a distribution-style package for use with
	                        startosinstall
	```

#### Build the User Account Package ...

1. Use the following command to create a new user account or update the credentials for a pre-existing user account.

	**NOTE**: 
	
	- For the `--uid`, if you updating a current user account make sure that the UID in the command matches the UID of the local user.
	- For the `--version`, this can be any number. I like to use that date for when the credentials need to be rotated.
	- For the `--identifier`, this can be whatever you want. It will be the bundle ID used when generating the package.

	```
	./createuserpkg --name=localadmin --uid=501 --version=20200901 --identifier=“com.github.captam3rica.localadmin-user-package” --admin --hidden /path/to/localadmin-user.pkg
	```
	
2. Once the command is entered you should see a prompt to enter the password for the account.

3. The package should then be created and dropped at the path specified in the command.

#### Deployment

1. Take the package and upload it to your MDM. (Jamf, WorkspaceONE, Addigy, etc)

2. Scope the deployment as needed.

3. Done! 😁 


