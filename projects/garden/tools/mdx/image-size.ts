import * as path from 'path'

import { Element } from 'hast'
import sizeOf from 'image-size'
import { Plugin } from 'unified'
import visit from 'unist-util-visit'

import { fetchImage } from '../fetch-image'

type ImageSizeOptions = {
  publicDir?: string
}

export const imageSize: Plugin<[ImageSizeOptions?]> = ({
  publicDir = 'public',
} = {}) => {
  return async tree => {
    let images: Element[] = []

    visit<Element>(tree, 'element', node => {
      if (node.tagName === 'img') {
        images.push(node)
      }
    })

    for (let image of images) {
      if (!image.properties) return

      let src: string | Buffer = image.properties?.src as string
      if (!src || typeof src !== 'string') {
        return
      }

      if (src.startsWith('/')) {
        src = path.join(publicDir, src)
      }

      if (src.startsWith('http')) {
        src = await fetchImage(src)
      }

      const dimensions = sizeOf(src)
      image.properties.width = dimensions.width
      image.properties.height = dimensions.height
    }
  }
}
