import { MDXProvider } from '@mdx-js/react'
import Image from 'next/image'
import classnames from 'classnames'

export interface MdxProviderProps {
  children: React.ReactNode
}

const LazyImage = ({
  src,
  alt,
  className,
  ...props
}: React.ComponentProps<'img'>) => (
  <Image
    src={src || ''}
    alt={alt || ''}
    className={classnames('!filter-none', className)}
    layout="responsive"
    loading="lazy"
    {...props}
    placeholder="blur"
  />
)

const mdComponents = {
  img: LazyImage,
}

export default function MdxProvider({ children }: MdxProviderProps) {
  return <MDXProvider components={mdComponents}>{children}</MDXProvider>
}
