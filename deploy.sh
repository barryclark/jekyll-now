#!/usr/bin/env bash
set -e # halt script on error

echo 'Testing travis...'
bundle exec travis-lint

echo 'Jekyll build...'
bundle exec jekyll build

echo 'Testing htmlproof...'
bundle exec htmlproof ./_site --href-ignore "#","/simplest/" --disable-external

cd ${HTML_FOLDER}

# config
git config --global user.email "nandomoreira.me@gmail.com"
git config --global user.name "Fernando Moreira"

# deploy
git init
git add --all
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@github.com/${GH_REF}" master:gh-pages
