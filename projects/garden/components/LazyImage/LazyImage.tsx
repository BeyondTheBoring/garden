import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image, { ImageProps } from 'next/image'
import classnames from 'classnames'

export type LazyImageData = MDXRemoteSerializeResult

export interface LazyImageProps extends Omit<ImageProps, 'src'> {
  image: LazyImageData
}

export default function LazyImage({
  image: mdx,
  className,
  ...userProps
}: LazyImageProps) {
  return (
    <MDXRemote
      {...mdx}
      components={{
        img: ({ alt, ...props }: ImageProps) => (
          <Image
            {...props}
            alt={alt}
            className={classnames('!filter-none', className)}
            {...userProps}
          />
        ),
      }}
    />
  )
}
