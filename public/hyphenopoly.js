const script = document.createElement('script')
script.type = 'text/javascript'
script.src = '/hyphenopoly/Hyphenopoly_Loader.js'

script.onload = () => {
  Hyphenopoly.config({
    paths: {
      maindir: '/hyphenopoly/',
      patterndir: '/hyphenopoly/',
    },
    require: {
      'en-us': 'FORCEHYPHENOPOLY',
    },
    setup: {
      defaultLanguage: 'en-us',
      hide: 'false',
      keepAlive: true,
      normalize: false,
      selectors: {
        '.__hyphenate': {
          compound: 'all',
          hyphen: '\u00AD',
          orphanControl: 3,
        },
      },
      timeout: 1000,
    },
  })
}

document.head.appendChild(script)
