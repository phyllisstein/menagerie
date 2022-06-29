import { Global, ThemeProvider } from '@emotion/react'
import emotionTailwindPreflight from 'emotion-tailwind-preflight'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

import { AdobeClean } from 'assets/adobe-clean'
import { Body } from 'styles/global'
import { theme } from 'styles/theme'

declare global {
  interface Window {
    Hyphenopoly: {
      config: (...args: unknown[]) => void
      hyphenators?: {
        HTML?: unknown
      }
    }
  }
}

function SandboxApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={ emotionTailwindPreflight } />

      <AdobeClean />

      <Script
        src='/assets/hyphenopoly/Hyphenopoly_Loader.js'
        strategy='lazyOnload'
        onLoad={ () => {
          window.Hyphenopoly.config({
            paths: {
              maindir: '/assets/hyphenopoly/',
              patterndir: '/assets/hyphenopoly/',
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
                body: {
                  compound: 'all',
                  hyphen: '\u00AD',
                  orphanControl: 3,
                },
              },
              timeout: 1000,
            },
          })
        } } />

      <Head>
        <title>Sandbox</title>
        <meta content='initial-scale=1.0, width=device-width' name='viewport' />
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
      </Head>

      <ThemeProvider theme={ theme }>
        <Body />
        <Component { ...pageProps } />
      </ThemeProvider>
    </>
  )
}

export default SandboxApp
