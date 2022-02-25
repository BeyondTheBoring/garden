import { MdxProvider } from '@/components/MdxProvider'
import '@/theme/styles/main.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MdxProvider>
      <Component {...pageProps} />
    </MdxProvider>
  )
}

export default MyApp
