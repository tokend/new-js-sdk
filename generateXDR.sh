#!/bin/bash

# Print the usage message
function printHelp () {
  echo "Usage: "
  echo "  generateXDR.sh <branch_or_commit_hash>"
  echo
  echo "Example of using"
  echo
  echo "	generateXDR.sh master"
  echo "	generateXDR.sh 82bc102060187bb11cf9b111dc2d122429c58a1f"
  echo
}

if [ -z "$1" ]; then
    echo "please select branch or commit hash"
    printHelp
    exit 1
fi

docker pull registry.gitlab.com/tokend/xdrgen-docker
docker run --rm registry.gitlab.com/tokend/xdrgen-docker js $1 > src/base/generated/xdr_generated.js
