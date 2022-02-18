import { LazyImageData } from '@/components/LazyImage'
import { serialize } from 'next-mdx-remote/serialize'

import { imagePlaceholder } from '../mdx/image-placeholder'
import { imageSize } from '../mdx/image-size'

export async function makeLazyImage(
  src: string,
  alt?: string,
): Promise<LazyImageData> {
  return serialize(`![${alt || ''}](${src})`, {
    mdxOptions: {
      rehypePlugins: [
        [imageSize, {}],
        [imagePlaceholder, {}],
      ],
    },
  })
}
