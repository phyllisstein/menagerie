import { Global, ThemeProvider } from '@emotion/react'
import '@spectrum-css/page/dist/index-vars.css'
import '@spectrum-css/typography/dist/index-vars.css'
import '@spectrum-css/vars/dist/spectrum-dark.css'
import '@spectrum-css/vars/dist/spectrum-global.css'
import '@spectrum-css/vars/dist/spectrum-large.css'
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
    }
  }
}

function SandboxApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={ emotionTailwindPreflight } />

      <AdobeClean />

      <Script
        src='/hyphenopoly/Hyphenopoly_Loader.js'
        strategy='lazyOnload'
        onLoad={ () => {
          window.Hyphenopoly.config({
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
        <html
          className='spectrum spectrum--large spectrum--dark spectrum-Body spectrum-Body--sizeM'
          lang='en-us' />
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
