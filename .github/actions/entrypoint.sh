#!/bin/sh -l

echo "Running linters"
cd "$GITHUB_WORKSPACE"
yarn install
::command
exit
