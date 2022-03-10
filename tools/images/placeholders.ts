import { readFileSync, readJsonSync, writeJsonSync } from 'fs-extra'
import md5 from 'md5'
import miniSvgDataUri from 'mini-svg-data-uri'
import path from 'path'
import { sqip, SqipResult } from 'sqip'
import { optimize } from 'svgo'

import { fetchImage } from './fetch-image'

class Placeholders {
  private needsSort = false
  private jsonFile = 'tools/images/placeholders.data.json'
  private data: Record<string, string>

  constructor() {
    this.data = readJsonSync(this.jsonFile)
  }

  clear() {
    this.data = {}
  }

  has(hash: string) {
    return hash in this.data
  }

  get(hash: string) {
    return this.data[hash]
  }

  getAll() {
    return { ...this.data }
  }

  set(hash: string, placeholder: string) {
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

  async make(image: string) {
    const isRemote = image.includes('//')

    const imageSrc =
      isRemote || image.startsWith('public/')
        ? image
        : path.join('public', image)

    if (isRemote) {
      console.warn(`Using a remote image--consider downloading it: ${imageSrc}`)
    }

    const hash = isRemote
      ? md5(await fetchImage(imageSrc))
      : md5(readFileSync(imageSrc))

    const existing = this.get(hash)
    if (existing) return existing

    const result = await generatePlaceholder(imageSrc)

    if (hash) {
      this.set(hash, result)
      this.save()
    }

    return result
  }

  private sort() {
    this.data = Object.keys(this.data)
      .sort()
      .reduce<typeof this.data>((sorted, key) => {
        sorted[key] = this.data[key]
        return sorted
      }, {})
  }
}

export const placeholders = new Placeholders()

async function generatePlaceholder(image: string) {
  const isRemote = image.includes('//')
  let src = isRemote ? await fetchImage(image) : image

  console.time(`Generated Placeholder for ${image} in`)
  const result = (await sqip({
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
  })) as SqipResult

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
