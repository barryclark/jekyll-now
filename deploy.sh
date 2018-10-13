#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"


# Add changes to git.
git add .

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master --force

# Come Back up to the Project Root
git pull origin master --force

git status
