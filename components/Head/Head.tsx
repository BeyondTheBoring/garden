// eslint-disable-next-line no-restricted-imports
import NextHead from 'next/head'
import { useRouter } from 'next/router'

export interface HeadProps {
  title?: string
  description?: string
  image?: string
  children?: React.ReactNode
}

export default function Head({
  title,
  description,
  image = 'img/social-image-monster.png',
  children,
}: HeadProps) {
  const router = useRouter()

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://beyondtheboring.com'
  ).replace(/\/$/, '')

  const siteName = 'Beyond the Boring'
  const currentUrl = `${siteUrl}${router.asPath}`
  const pageTitle = title ? `${title} | ${siteName}` : siteName

  const imageUrl = image.startsWith('http')
    ? image
    : `${siteUrl}/${image.replace(/^\//, '')}`

  return (
    <NextHead>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:url" content={currentUrl} key="ogurl" />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      {image && <meta property="og:image" content={imageUrl} key="ogimage" />}

      {children}
    </NextHead>
  )
}
