import '@spectrum-css/page/dist/index-vars.css'
import '@spectrum-css/typography/dist/index-vars.css'
import '@spectrum-css/vars/dist/spectrum-light.css'
import '@spectrum-css/vars/dist/spectrum-global.css'
import '@spectrum-css/vars/dist/spectrum-large.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import { AdobeClean } from 'assets/adobe-clean'
import { AdobeCleanSerif } from 'assets/adobe-clean-serif'
import { TailwindPreflight } from 'assets/tailwind-preflight'
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
            <Head>
                <title>Sandbox</title>
                <meta content='initial-scale=1.0, width=device-width' name='viewport' />
                <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
            </Head>

            <ThemeProvider theme={ theme }>
                <AdobeClean />
                <AdobeCleanSerif />
                <TailwindPreflight />
                <Body />
                <Component { ...pageProps } />
            </ThemeProvider>
        </>
    )
}

export default SandboxApp
