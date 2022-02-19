const path = require('path')

const sizeOf = require('image-size')
const visit = require('unist-util-visit')

const { fetchImage } = require('../images/fetch-image')

const imageSize = ({ publicDir = 'public' } = {}) => {
  return async tree => {
    let images = []

    visit(tree, 'element', node => {
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

module.exports = { imageSize }
