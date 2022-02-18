import * as path from 'path'

import miniSvgDataUri from 'mini-svg-data-uri'
import { sqip, SqipResult } from 'sqip'
import { optimize } from 'svgo'

import { fetchImage } from './fetch-image'

const cache: Record<string, string> = {}

export async function getPlaceholder(image: string) {
  if (cache[image]) return cache[image]

  let src = image.startsWith('http')
    ? await fetchImage(image)
    : path.join('public', image)

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

  const sizeKB = placeholder.length / 1024
  if (sizeKB > 5) {
    console.warn(`SVG placeholder too big at ${sizeKB} KB: ${image}`)
  }

  cache[image] = placeholder
  return placeholder
}
