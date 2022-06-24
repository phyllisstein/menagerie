import { Global, ThemeProvider } from '@emotion/react'
import '@spectrum-css/page/dist/index-vars.css'
import '@spectrum-css/typography/dist/index-vars.css'
import '@spectrum-css/vars/dist/spectrum-dark.css'
import '@spectrum-css/vars/dist/spectrum-global.css'
import '@spectrum-css/vars/dist/spectrum-large.css'
import emotionTailwindPreflight from 'emotion-tailwind-preflight'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { AdobeClean } from 'assets/adobe-clean'
import { Body } from 'styles/global'
import { theme } from 'styles/theme'

function SandboxApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={ emotionTailwindPreflight } />
      <AdobeClean />
      <Head>
        <html className='spectrum spectrum--large spectrum--dark spectrum-Body spectrum-Body--sizeM' />
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
