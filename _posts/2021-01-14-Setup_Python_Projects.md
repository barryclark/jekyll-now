---
layout: post
title: Setup Python Projects
---

This is a procedure to setup Python projects on your local workstation.

### Create Directory

In your 'Documents' folder (or whatever it is called), create a directory and cd into it:

		mkdir cool-project-name
		cd <META>-.

or, for ZSH users:
		
		take cool-project-name

### Create Virtual Environment

The virtual environment ensures, that your global Python library installation will not get polluted with different versions of python libraries.

		python3 -m venv .venv
		source .venv/bin/activate

(On Windows(TM) installations, the directory is named 'Scripts'.)

Instead of activating, the app can be 

### Put Everything Under Version Control

Some of the artifacts should (or must) not be versioned, so get you an initial `.gitignore` file

		curl -ls -o .gitignore https://raw.githubusercontent.com/github/gitignore/master/Python.gitignore
		git init
		git add .
		git commit -am "Initial import"
		git remote add ...
		git push --upstream master
		
### Make a Proper Directory Structure

This depends on your current project, but you can find a good starter [here](https://github.com/navdeep-G/samplemod/blob/master/setup.py). The structure is explained in [Python Guide](https://docs.python-guide.org/writing/structure/).

### Keep Dependencies Versioned

After installing necessary modules and libraries, freeze them to a file and put it to :

		pip freeze > requirements.txt
		
Thus, environment can later be restored from scratch with

		pip install -r requirements.txt
		

### Write Some Tests

Before we actually start coding our app, write some tests.

		pip install nose
		pip install WebTest  # if appropriate
		
		vi tests/test_main.py
		nosetests

Provide some meaningful test data for your app using a service like [Mockaroo](https://docs.python-guide.org/writing/structure/).

### Start Coding Your App

1. Use [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).
2. Keep [refactoring](https://refactoring.com/) the code.
3. Look at the [Twelve Factors](https://12factor.net/) if you have not yet.
4. Read [The Pragmatic Programmer](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/).

