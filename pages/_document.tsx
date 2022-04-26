import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/yli4hko.css" />
        </Head>

        <body className="bg-gray-50 text-base font-normal tracking-tight text-gray-700 antialiased selection:bg-yellow-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
