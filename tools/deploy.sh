#!/bin/bash
# deploy.sh - Script for deploying blog

##### Functions
build() {
    echo "Building..."
    cp -r template public
    rm -r .cache
    npm run build
    mv public ../temp-blog
}

switch_branch() {
    echo "Switching branches..."
    git checkout gh-pages
    git pull origin gh-pages
}

copy_build() {
    echo "Copying build..."
    rsync -avh --progress ../temp-blog/* ../blog
    git add ./
    echo "Commiting..."
    git commit -m "$1"
    git push origin gh-pages
}

cleanup() {
    echo "Cleaning up..."
    git checkout master
    cd ..
    rm -r temp-blog
}

usage() {
    echo "usage: deploy [message]"
}

main() {
    cd ./blog
    build
    switch_branch
    copy_build "${1}"
    cleanup
    echo "Done!"
}

##### Main
if [ $# -eq 0 ]; then
    usage
    exit 1
fi

echo "$1"
main "${1}"
