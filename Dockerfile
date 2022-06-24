# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Watchman Builder ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ #
FROM alpine:3.9 AS watchman

RUN apk add --no-cache \
  autoconf \
  automake \
  bash \
  build-base \
  libcrypto1.1 \
  libgcc \
  libstdc++ \
  libtool \
  linux-headers \
  openssl-dev \
  python2-dev \
  python3-dev

ENV WATCHMAN_VERSION=4.9.0 \
  WATCHMAN_SHA256=1f6402dc70b1d056fffc3748f2fdcecff730d8843bb6936de395b3443ce05322

RUN cd /tmp \
  && wget -O watchman.tar.gz "https://github.com/facebook/watchman/archive/v${WATCHMAN_VERSION}.tar.gz" \
  && echo "$WATCHMAN_SHA256 *watchman.tar.gz" | sha256sum -c - \
  && tar -xz -f watchman.tar.gz -C /tmp/ \
  && rm -rf watchman.tar.gz

RUN cd /tmp/watchman-${WATCHMAN_VERSION} \
  && ./autogen.sh \
  && ./configure --enable-lenient \
  && make \
  && make install \
  && cd $HOME \
  && rm -rf /tmp/*

RUN strip /usr/local/bin/watchman

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ App ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ #
FROM node:18-alpine AS app

COPY --from=watchman /usr/local/bin/watchman* /usr/local/bin/
COPY --from=watchman /usr/local/var/run/watchman /usr/local/var/run/watchman

RUN apk add --no-cache bash git

ENV YARN_CACHE_FOLDER=/var/cache/yarn \
  PATH="/app/node_modules/.bin:$PATH"
WORKDIR /app

COPY config/develop.sh ./config/develop.sh
COPY config/watchman ./config/watchman

RUN ./config/develop.sh watchman

CMD ["./config/develop.sh", "watch"]
