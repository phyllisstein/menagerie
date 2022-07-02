const path = require('path')

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    browsersListForSwc: true,
    images: {
      allowFutureImage: true,
    },
    legacyBrowsers: false,
    reactMode: 'concurrent',
    serverComponents: true,
  },
  compiler: {
    emotion: {
      labelFormat: '[local]--[dirname]--[filename]',
    },
  },
  jsConfig: {
    compilerOptions: {
      jsxImportSource: '@emotion/react',
    },
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, { dev }) {
    config.resolve.enforceExtension = false
    config.resolve.modules = [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'vendor'),
      'node_modules',
      ...config.resolve.modules,
    ]

    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { ref: true, svgo: true } }],
    })

    return config
  },
}
