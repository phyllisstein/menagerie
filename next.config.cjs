const path = require('path')

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack (config, { dev }) {
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
