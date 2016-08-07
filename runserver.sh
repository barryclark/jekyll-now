#!/bin/sh

docker run -v "$PWD":/usr/src/app -e JEKYLL_GITHUB_TOKEN=bdf50d5e094af6e444573b96a3cb4257ae0d87bb -p "4000:4000" starefossen/github-pages
