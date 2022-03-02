import { Footer } from '@/components/Footer'
import { MdxProvider } from '@/components/MdxProvider'
import '@/theme/styles/main.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  )
}

export default MyApp
