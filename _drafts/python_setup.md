# Installing Python on Max OS X

This article goes through installing the latest Python version on Max OS X. It will then help you install a tool to create isolated Python environments.

Separating your python environements frow each other is important, as from the start (on Mac OS X at least) there's an "older" (2.7) version of Python installed and you don't want to play with it in your day to day development process. Furthermore while developing you'll end up with several projects with different dependencies or even different versions of python itself, so it's a good idea to keep environments separated.

## Installing python and pip on Mac OS X with Homebrew

If you don't have Homebrew, start by installing it. It's a package manager for OS X, which will help you install software.

Head [there](https://brew.sh/).

Once the installation completed, install Python with:

```
$ brew install python
```

Check the path to your Homebrew's python with

```
$ brew info python3
```

and there should be a line like:

```

Python has been installed as
/usr/local/bin/python3

```

Export this path to your PATH by adding this line to your `.bash_profile`:

```

export PATH="/usr/local/bin/python3:\$PATH"

```

Remember to source your bash profile with `source .bash_profile` or reloading your terminal.

Check everything is right with

```

$ which python3
/usr/local/bin/python3

```

Now you can use it by typing `python3` in your terminal.

Homebrew installs alongside ptyhon 3 `pip`, a [package manager](https://pypi.org/project/pip/) for python.

It will help you install tools like [VirtualEnv](https://virtualenv.pypa.io/en/latest/) which will help working with different version of Python without mixing everything :)

## Install VirtualEnv & VirtualEnvWrapper

Go to your home, and create a hidden directory to hold your virtual environments for Python:

```

$ cd ~
$ mkdir .virtualenvs
$ pip3 install virtualenv
$ pip3 install virtualenvwrapper

```

and add these lines in your `.bashprofile`:

```

export WORKON_HOME=~/.virtualenvs # the directory that will hold your virtual environments, and that you just created
source /usr/local/bin/virtualenvwrapper.sh # the path to the shell script that powers virtualenvironmentwrapper

```

If you ever need to find where you host your virtual environments, the path to the virtual env is in the environment variable VIRTUAL_ENV

```
$ echo $VIRTUAL_ENV
```

### Create a virtual environment for your Python version

```

$ mkvirtualenv your_env_name

```

Your prompt will be preceded by `(your_env_name)`, and you'll just have to type `python` to invoke python3.

You can use `deactivate` to get out of this environment, and then `workon your_env_name` to get back in.

Once your environment activated you can just type `python` to use python 3.

### How to use

It's best to use one environment per project, ideally named after the project.

```

mkvirtualenv project
mkdir project && cd project
setvirtualenvproject ~/.virtualenvs/project/ ~/path/to/project/

```

### Going further

To have virtualenvwrapper auto activate an environment when you `cd` in your project directory, instead of having to activate / deactivate, plus not forgetting to switch environment between project 🤦‍♂️ you can put the following script in your `.bashrc` (and remember to source it or reload your bash aterwards).
It will auto-switch environment if either:

- There's an environment named after the directory, and there is a git project in it
- There's a `.venv` file at the root of the project with the environment name in it

```

# Automatically activate Git projects' virtual environments based on the

# directory name of the project. Virtual environment name can be overridden

# by placing a .venv file in the project root with a virtualenv name in it

function workon_cwd { # Check that this is a Git repo
GIT_DIR=`git rev-parse --git-dir 2> /dev/null`
if [ $? == 0 ]; then # Find the repo root and check for virtualenv name override
GIT_DIR=`\cd $GIT_DIR; pwd`
PROJECT_ROOT=`dirname "$GIT_DIR"`
ENV_NAME=`basename "$PROJECT_ROOT"`
if [ -f "$PROJECT_ROOT/.venv" ]; then
ENV_NAME=`cat "$PROJECT_ROOT/.venv"`
fi # Activate the environment only if it is not already active
if [ "$VIRTUAL_ENV" != "$WORKON_HOME/$ENV_NAME" ]; then
if [ -e "$WORKON_HOME/$ENV_NAME/bin/activate" ]; then
workon "$ENV_NAME" && export CD_VIRTUAL_ENV="$ENV_NAME"
fi
fi
elif [ $CD_VIRTUAL_ENV ]; then # We've just left the repo, deactivate the environment # Note: this only happens if the virtualenv was activated automatically
deactivate && unset CD_VIRTUAL_ENV
fi
}

# New cd function that does the virtualenv magic

function venv_cd {
cd "\$@" && workon_cwd
}

alias cd="venv_cd"

```

Source: [Harry Mar](https://hmarr.com/2010/jan/19/making-virtualenv-play-nice-with-git/)

To delete a virtual environment you have to deactivate it first (or just `cd` out of it if you are using the script above). You can then use

```

rmvirtualenv createdenv

```

## Get to work

You can then start to install python librairies using `pip`. Head over there to learn how to install Django, and build a small application with it.

Sources: [Ugochukwu Mazi](https://medium.com/the-andela-way/configuring-python-environment-with-virtualenvwrapper-8745c2895745)
