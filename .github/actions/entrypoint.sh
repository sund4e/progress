#!/bin/sh -l

cd "$GITHUB_WORKSPACE"

#write dummy aws-exports.js so that project can be compiles
echo "export default {};" > aws-exports.js

yarn install

# run argument passed to the srcipt
$1
exit
