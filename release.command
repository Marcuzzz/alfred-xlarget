#!/bin/bash

# Your GitHub repository owner and name
OWNER="marcuzzz"
REPO=$(git config --get remote.origin.url | sed 's/.*\/\([^/]*\)\.git/\1/')

#Patch version:
if [ "$1" != "pass-patch" ]; then
    # Increment the patch version
    /opt/homebrew/bin/oc
    npm version patch --force
    echo "patched..."
fi

# BUNDLEID=$(plutil -extract bundleid raw -o - ./info.plist)
NAME="xlargetype"
VERSION=$(jq -r .version package.json)
# plutil -replace version -string $VERSION info.plist
npm run package-mac
npm run create-installer-mac

#EXE=$(jq -r .name package.json)
DMGO=release-builds/xlargtype-darwin-x64.dmg
DMG=release-builds/xlargtype.v$VERSION.dmg

# Check if DMG exists and remove it
if [ -e "$DMG" ]; then
    rm "$DMG"
    echo "Removed existing file: $DMG"
else
    echo "File $DMG does not exist."
fi

# Rename DMG-ORG to DMG
if [ -e "$DMGO" ]; then
    mv "$DMGO" "$DMG"
    echo "Renamed $DMGO to $DMG"
else
    echo "File $DMGO does not exist."
fi


if [ "$1" != "pass-patch" ]; then
    # Create a new release...
    git tag -a "v$VERSION" -m "Released $NAME v$VERSION"
    git push origin "v$VERSION"
    gh release create "v$VERSION" "$DMG" --notes "Released $NAME v$VERSION"
    echo "..."
fi

echo "NAME: $NAME"
echo "NEW VERSION: v$VERSION"
echo "Released $NAME v$VERSION"