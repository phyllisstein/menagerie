#!/usr/bin/env bash

set -euxo pipefail

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

  /usr/local/bin/watchman -j <config/watchman/watch-project.json

  for j in config/watchman/*.json; do
    echo "Setting watch $j"
    watchman -j <"$j"
  done
}

spawn_watchman() {
  echo "Spawning watchman..."

  pkill -f "watchman" || true
  exec /usr/local/bin/watchman --foreground --log-level=1
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
  spawn_watchman
  ;;

watchman)
  configure_watches
  ;;

yarn)
  yarn_install
  restart_server
  ;;

*)
  echo "Unknown command: $args"
  ;;
esac
