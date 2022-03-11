import type { AppProps } from 'next/app'

import { ClarityProvider } from '@/components/ClarityProvider'
import { Footer } from '@/components/Footer'
import { Head } from '@/components/Head'
import { MdxProvider } from '@/components/MdxProvider'
import { PlausibleProvider } from '@/components/Plausible'
import '@/theme/styles/main.css'

const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <PlausibleProvider>
          <ClarityProvider projectId={clarityProjectId}>
            <MdxProvider>
              <div className="mb-5 flex-auto">
                <Component {...pageProps} />
              </div>

              <div className="mt-auto w-full">
                <Footer />
              </div>
            </MdxProvider>
          </ClarityProvider>
        </PlausibleProvider>
      </div>
    </>
  )
}

export default MyApp
