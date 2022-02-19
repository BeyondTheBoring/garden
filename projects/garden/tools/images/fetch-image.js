const https = require('https')

function fetchImage(src) {
  const url = new URL(src)

  return new Promise((resolve, reject) => {
    https.get(url, function (response) {
      const chunks = []
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

module.exports = { fetchImage }
