#!/usr/bin/env bash

set -Eeuxo pipefail

args="$*"

restart_server() {
  echo "Starting development server..."
  pkill -f "yarn.js dev" || true

  [[ -e "/run/secrets/environment" ]] || { echo "Missing environment secrets." && exit 1; }
  source /run/secrets/environment && export TOWER_URL TOWER_AUTH_URL TOWER_CLIENT_ID TOWER_CLIENT_SECRET NEXT_PUBLIC_GOOGLE_MAPS_API_KEY NEXT_PUBLIC_MAPBOX_API_KEY
  yarn dev &
  disown
}

configure_watches() {
  echo "Configuring watches..."

  watchman watch-del-all || true
  watchman watch-project "$PWD"
  for j in scripts/watchman/*.json; do
    echo "Setting watch $j"
    watchman -j <"$j"
  done
}

watch_watchman() {
  pkill -f watchman || true
  watchman --logfile=- --log-level=debug --foreground watch-project "$PWD"
}

yarn_install() {
  echo "Running yarn install..."
  [[ -e "/run/secrets/environment" ]] || { echo "Missing environment secrets." && exit 1; }
  source /run/secrets/environment && export FONT_AWESOME_NPM_TOKEN GSAP_NPM_TOKEN GITHUB_TOKEN
  /usr/local/bin/yarn install
}

case $args in
serve)
  restart_server
  ;;

watch)
  yarn_install
  restart_server
  configure_watches
  watch_watchman
  ;;

watches)
  configure_watches
  watch_watchman
  ;;

yarn)
  yarn_install
  restart_server
  ;;

*)
  echo "Unknown command: $args"
  ;;
esac
