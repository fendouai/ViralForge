#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
VERSION="$(node -p "require('./package.json').version")"
PREFIX="viralforge-${VERSION}"
mkdir -p release
git archive --format=tar.gz --prefix="${PREFIX}/" -o "release/${PREFIX}.tar.gz" HEAD
node -e "
const fs=require('fs'),crypto=require('crypto');
const file='release/${PREFIX}.tar.gz';
const hash=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
fs.writeFileSync(file+'.sha256', hash+'  '+file+'\\n');
console.log(hash+'  '+file);
"
echo "archive: release/${PREFIX}.tar.gz"
