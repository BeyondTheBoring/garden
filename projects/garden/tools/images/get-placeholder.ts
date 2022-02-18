import * as path from 'path'

import miniSvgDataUri from 'mini-svg-data-uri'
import { sqip, SqipResult } from 'sqip'
import { optimize } from 'svgo'

import { fetchImage } from './fetch-image'

const promise: Record<string, Promise<string> | undefined> = {}

export async function getPlaceholder(image: string) {
  if (promise[image]) {
    // for performance reasons, only get the placeholder for the same image once
    // must restart the build or edit this file to re-generate the placeholder
    return promise[image]
  }

  let src = image.startsWith('http')
    ? await fetchImage(image)
    : path.join('public', image)

  console.time(`getting placeholder ${image}`)
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
  console.timeEnd(`getting placeholder ${image}`)

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

  promise[image] = Promise.resolve(placeholder)
  return promise[image]
}
