import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { MdxProvider } from '@/components/MdxProvider'
import '@/theme/styles/main.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <MdxProvider>
          <div className="mb-5 flex-auto">
            <Component {...pageProps} />
          </div>

          <div className="mt-auto w-full">
            <Footer />
          </div>
        </MdxProvider>
      </div>
    </>
  )
}

export default MyApp
