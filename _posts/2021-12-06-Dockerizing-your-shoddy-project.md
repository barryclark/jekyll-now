## Purpose of this post

I've written a few apps that run 24/7 on my laptop. They'd be better off on a remote box.
Unfortunately, I've taken some liberties and shortcuts since these are personal projects.
Absolute filepaths, relative imports, local db, etc. So dockerizing isn't a mindless, trivial exercise for me.
I'm hoping to basically make this a checklist/cheatsheet for myself to make the process faster in the future.

## Dockerfile

Build basic python image. Install sqlite. Setup base directory (change the name). Install pipenv. Install requirements from the existing piplock file.
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

## Configure database

TODO 

## Paths

## Relative imports

## Upload docker image to remote box

## Setup cronjob
