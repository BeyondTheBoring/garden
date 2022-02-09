import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/BrixSans-Bold.woff2"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/BrixSans-Regular.woff2"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/MerottFuzzy-Bold.woff2"
            as="font"
            crossOrigin="anonymous"
          />
        </Head>

        <body className="bg-gray-50 text-base font-normal tracking-tight antialiased selection:bg-yellow-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
