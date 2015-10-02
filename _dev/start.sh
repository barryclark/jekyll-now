#!/bin/bash

base_dir="`dirname "${BASH_SOURCE[0]}"`/.."
jobs &>/dev/null

jekyll build --watch --source $base_dir --destination "$base_dir/_site" &
job_build_started="$(jobs -n)"
pid_build=$!

if [ -n "$job_build_started" ];then
    echo "'jekyll build --watch' started with PID $pid_build"
fi

cd $base_dir
jekyll serve &> /dev/null &
job_serve_started="$(jobs -n)"
pid_serve=$!

if [ -n "$job_serve_started" ];then
    echo "'jekyll serve' started with PID $pid_serve"
fi

echo "NOTE: only the output of 'jekyll build --watch' will show up here"
echo "server-address is probably http://127.0.0.1:4000"

cleanup () {
  kill -9 $pid_build
  kill -9 $pid_serve
}

control_c () {
  echo "Shutting down jeykll development environment"
  cleanup
  exit $?
}

trap control_c SIGINT
while true; do read x; done
