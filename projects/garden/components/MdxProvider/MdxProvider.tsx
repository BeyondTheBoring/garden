import { MDXProvider } from '@mdx-js/react'
import Image from 'next/image'

export interface MdxProviderProps {
  children: React.ReactNode
}

const LazyImage = (props: React.ComponentProps<'img'>) => (
  <Image
    {...props}
    placeholder="blur"
    src={props.src || ''}
    alt={props.alt || ''}
    className="!filter-none"
    layout="responsive"
    loading="lazy"
  />
)

const mdComponents = {
  img: LazyImage,
}

export default function MdxProvider({ children }: MdxProviderProps) {
  return <MDXProvider components={mdComponents}>{children}</MDXProvider>
}
