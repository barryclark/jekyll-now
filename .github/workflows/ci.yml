name: Beautiful Jekyll CI
on: [push, pull_request]
jobs:
  build:
    name: Build Jekyll
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build the site in the jekyll/builder container
        run: |
          export JEKYLL_VERSION=3.8
          docker run \
          -v ${{ github.workspace }}:/srv/jekyll -v ${{ github.workspace }}/_site:/srv/jekyll/_site \
          -e PAGES_REPO_NWO=${{ github.repository }} \
          jekyll/builder:$JEKYLL_VERSION /bin/bash -c "chmod 777 /srv/jekyll && jekyll build --future"
