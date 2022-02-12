import { Element } from 'hast'
import { Plugin } from 'unified'
import visit from 'unist-util-visit'
import { getPlaceholder } from '../get-placeholder'

export const imagePlaceholder: Plugin = options => {
  return async tree => {
    let images: Element[] = []

    visit<Element>(tree, 'element', node => {
      if (node.tagName === 'img') {
        images.push(node)
      }
    })

    for (let image of images) {
      if (!image.properties) return

      let src = image.properties?.src
      if (!src || typeof src !== 'string') {
        return
      }

      image.properties.placeholder = 'blur'
      image.properties.blurDataURL = await getPlaceholder(src)
    }
  }
}
