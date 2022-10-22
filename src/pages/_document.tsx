import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document () {
  return (
    <Html>
      <Head />
      <body className='spectrum spectrum--large spectrum--dark spectrum-Body spectrum-Body--sizeM'>
        <Main />
        <NextScript />
        <Script src='/hyphenopoly.js' strategy='lazyOnload' type='text/javascript' />
      </body>
    </Html>
  )
}
