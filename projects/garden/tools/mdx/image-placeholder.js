const visit = require('unist-util-visit')
const { placeholders } = require('../images/placeholders')

const imagePlaceholder = options => {
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

      image.properties.loading = 'lazy'
      image.properties.placeholder = 'blur'
      image.properties.blurDataURL = await placeholders.make(src)
      image.properties['data-placeholder'] = image.properties.blurDataURL
    }
  }
}

module.exports = { imagePlaceholder }
