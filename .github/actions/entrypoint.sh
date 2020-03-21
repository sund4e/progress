#!/bin/sh -l

echo "Running linters"
cd "$GITHUB_WORKSPACE"
yarn install
$1
exit
