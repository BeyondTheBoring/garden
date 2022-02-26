import { Element } from 'hast'
import { Plugin } from 'unified'
import visit from 'unist-util-visit'

import { parseBacklinks } from '@/tools/posts/parse-backlinks'
import { routes } from '@/lib/utils/routes'

export const backlinks: Plugin = options => {
  return async tree => {
    const links = await parseBacklinks()

    visit<Element>(tree, 'element', node => {
      const backlinkIndexes: number[] = []
      node.children.forEach((c, index) => {
        if (c.type === 'text' && c.value.match(/^\[([^\[\]]+)\]$/)) {
          backlinkIndexes.push(index)
        }
      })

      for (let backlinkIndex of backlinkIndexes.filter(i => i > 0)) {
        // Found a node with text that looks like this [xyz]
        // Confirm the previous child ends with [ and the next starts with [

        const backlink = node.children[backlinkIndex]
        if (backlink.type !== 'text') return // impossible

        const prevChild = node.children[backlinkIndex - 1]
        const nextChild = node.children[backlinkIndex + 1]

        const prevOpensBracket =
          prevChild &&
          prevChild.type === 'text' &&
          prevChild.value.endsWith('[')

        const nextClosesBracket =
          nextChild &&
          nextChild.type === 'text' &&
          nextChild.value.startsWith(']')

        if (prevOpensBracket && nextClosesBracket) {
          prevChild.value = prevChild.value.replace(/\[$/, '')
          nextChild.value = nextChild.value.replace(/^\]/, '')
          backlink.value = backlink.value.replace(/^\[/, '').replace(/\]$/, '')

          const linkedPost = links.find(link =>
            link.ids.includes(backlink.value),
          )

          if (linkedPost) {
            if (linkedPost.published) {
              node.children[backlinkIndex] = {
                type: 'element',
                tagName: 'a',
                children: [backlink],
                properties: {
                  href: routes.post(linkedPost.slug),
                },
              }
            }
          } else {
            console.warn(
              `WARN: Cannot find post with title or alias: ${backlink.value}`,
            )
          }
        }
      }
    })
  }
}
