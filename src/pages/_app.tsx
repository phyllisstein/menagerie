import '@spectrum-css/page/dist/index-vars.css'
import '@spectrum-css/typography/dist/index-vars.css'
import '@spectrum-css/vars/dist/spectrum-light.css'
import '@spectrum-css/vars/dist/spectrum-global.css'
import '@spectrum-css/vars/dist/spectrum-large.css'
import { Global, ThemeProvider } from '@emotion/react'
import emotionTailwindPreflight from 'emotion-tailwind-preflight'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { AdobeClean } from 'assets/adobe-clean'
import { AdobeCleanSerif } from 'assets/adobe-clean-serif'
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
      <AdobeCleanSerif />

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
