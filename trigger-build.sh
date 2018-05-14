#!/usr/bin/env bash
if [[ -z ${CIRCLE_TOKEN} ]]; then
  echo "Please provide the 'CIRCLE_TOKEN' in your shell as an ENV variable."
  exit 1
fi

if [[ -z ${COMMIT_HASH} ]]; then
  echo "Please provide the 'COMMIT_HASH' in your shell as an ENV variable."
  exit 1
fi

BRANCH=$(git branch | grep \* | awk '{ print $2}')

echo "Testing 'config.yml' with branch '${BRANCH}' using commit '${COMMIT_HASH}'"

curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=${COMMIT_HASH}\
    --form config=@.circleci/config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/infinityworks/engineering/tree/${BRANCH}
