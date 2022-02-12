import https from 'https'

export function fetchImage(src: string): Promise<Buffer> {
  const url = new URL(src)

  return new Promise((resolve, reject) => {
    https.get(url, function (response) {
      const chunks: any[] = []
      response
        .on('data', function (chunk) {
          chunks.push(chunk)
        })
        .on('end', function () {
          const buffer = Buffer.concat(chunks)
          resolve(buffer)
        })
        .on('error', reject)
    })
  })
}
