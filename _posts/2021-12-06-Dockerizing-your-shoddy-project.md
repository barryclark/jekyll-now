## Purpose of this post

I've written a few apps that run either all the time or are supposed to run a few times a day.
They live on my laptop until I get sick of the unreliability, and put them on a remote box. 
Unfortunately, I take some liberties and shortcuts with my personal projects that end up making the deployment more annoying than it should be.
Absolute filepaths, relative imports, local db, etc. So dockerizing and deploying isn't a mindless, trivial exercise for me.
I'm hoping to basically make this a checklist/cheatsheet for myself to make the process faster in the future.

## Dockerfile

Build basic python image. Install necessary things like sqlite if you're using it. Setup base directory (change the name). Install pipenv. Install requirements from the existing piplock file. Export env vars and run the app's entry point. 
```
FROM python:3.8.5

RUN apt-get update
RUN apt-get install -y sqlite3 libsqlite3-dev
ADD . /usr/local/MY_BASE_DIRECTORY
WORKDIR /usr/local/MY_BASE_DIRECTORY
RUN pip install pipenv
RUN pipenv install --deploy --system

CMD export $(cat env | xargs) && python /usr/local/MY_BASE_DIRECTORY/main.py
```

## Absolute paths
You can configure an env var to specify the absolute path of the project and prepend that to relative paths. 
One difficulty is that this value will need to be different locally vs docker. 
You can have your app do some configuration loading determined by the environment. You can accomplish this with 
an arg, or if you want, you can follow the answer on this [SO post](https://stackoverflow.com/a/25518345/733687).

## Relative imports
If you're importing from places that won't live in the docker container, then this obviously won't work.
In some cases, I've copied the library directories into the app project directory and use `sys` relative imports.
More reliable though is to publish the libraries to pypi and do a normal pip install.

## Upload docker image to remote box
```shell
$ docker build -t . my-docker-image
$ docker save -o /absolute/path/to/save/tar/file.tar my-docker-image
$ rsync -avze 'ssh -i ~/.ssh/my-ssh-key' my-docker-image.tar myuser@my.remote.box.ip:/my/home/dir/
$ (on the remote box) docker load < my-docker-image.tar
```

## Setup cronjob
If the code needs to run on some schedule, I believe it's easier to write the cronjob on the host to run the docker image, 
instead of running the image always and having the cronjob inside of it. 

