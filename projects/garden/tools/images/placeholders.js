const { readFileSync, readJsonSync, writeJsonSync } = require('fs-extra')
const md5 = require('md5')
const miniSvgDataUri = require('mini-svg-data-uri')
const path = require('path')
const { sqip } = require('sqip')
const { optimize } = require('svgo')
const { fetchImage } = require('./fetch-image')

class Placeholders {
  constructor() {
    this.needsSort = false
    this.jsonFile = 'tools/images/placeholders.data.json'
    this.data = readJsonSync(this.jsonFile)
  }

  clear() {
    this.data = {}
  }

  get(hash) {
    return this.data[hash]
  }

  getAll() {
    return Object.assign({}, this.data)
  }

  set(hash, placeholder) {
    if (!hash.match(/^[a-f0-9]{32}$/)) {
      throw new Error(`hash must be an MD5 string. Received: ${hash}`)
    }

    this.needsSort = this.needsSort || !this.data[hash]
    this.data[hash] = placeholder
  }

  save() {
    if (this.needsSort) this.sort()
    writeJsonSync(this.jsonFile, this.data, { spaces: 2 })
  }

  async make(image) {
    const isRemote = image.includes('//')
    let hash

    const imageSrc =
      isRemote || image.startsWith('public/')
        ? image
        : path.join('public', image)

    if (!isRemote) {
      hash = md5(readFileSync(imageSrc))
      const existing = this.get(hash)
      if (existing) return existing
    }

    const result = await generatePlaceholder(imageSrc)

    if (hash) {
      this.set(hash, result)
      this.save()
    }

    return result
  }

  sort() {
    this.data = Object.keys(this.data)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = this.data[key]
        return sorted
      }, {})
  }
}

module.exports = {
  placeholders: new Placeholders(),
}

async function generatePlaceholder(image) {
  const isRemote = image.includes('//')
  let src = isRemote ? await fetchImage(image) : image

  console.time(`Generated Placeholder for ${image} in`)
  const result = await sqip({
    input: src,
    outputFileName: src instanceof Buffer ? '__image__' : undefined,
    plugins: [
      {
        name: 'sqip-plugin-primitive',
        options: {
          mode: 1,
          numberOfPrimitives: 40, // lower to decrease output size
        },
      },
    ],
  })

  const optimized = optimize(result.content, {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: { overrides: { removeViewBox: false } },
      },
      { name: 'removeDimensions' },
    ],
  })

  if (optimized.modernError) {
    throw optimized.modernError
  }

  const placeholder = miniSvgDataUri(optimized.data)
  console.timeEnd(`Generated Placeholder for ${image} in`)

  const sizeKB = placeholder.length / 1024
  if (sizeKB > 5) {
    console.warn(`SVG placeholder too big at ${sizeKB} KB: ${image}`)
  }

  return placeholder
}
