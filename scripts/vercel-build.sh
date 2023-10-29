#!/usr/bin/env bash

set -Eeuxo pipefail

echo "$YARNRC_BASE64" | base64 -d > .yarnrc.yml
yarn build
