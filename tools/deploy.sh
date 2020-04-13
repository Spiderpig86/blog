#!/bin/bash
# deploy.sh - Script for deploying blog

##### Functions
build() {
    echo "Building...\n"
    npm run build
    mv public ../temp-blog
}

switch_branch() {
    echo "Switching branches...\n"
    git checkout gh-pages
    #git pull origin gh-pages
}

copy_build() {
    echo "Copying build...\n"
    #mv ../temp-blog ./
    #git add .
    #git commit -m $1
    #git push
}

cleanup() {
    echo "Cleaning up...\n"
    rm -r ../temp-blog
}

usage() {
    echo "usage: deploy [message]"
}

main() {
    build
    switch_branch
    #copy_build "${1}"
    #cleanup
    echo "Done!\n"
}

##### Main
if [ $# -eq 0 ]; then
    usage
    exit 1
fi

echo "$1"
main "${1}"
