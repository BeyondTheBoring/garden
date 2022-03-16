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
      {/* HTML Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={pageTitle} key="g_name" />
      <meta itemProp="description" content={description} key="g_desc" />
      <meta itemProp="image" content={imageUrl} key="g_image" />

      {/* Facebook Meta Tags */}
      <meta property="og:type" content="website" key="og_type" />
      <meta property="og:url" content={currentUrl} key="og_url" />
      <meta property="og:site_name" content={siteName} key="og_site_name" />
      <meta property="og:title" content={pageTitle} key="og_title" />
      <meta property="og:description" content={description} key="og_desc" />
      {image && <meta property="og:image" content={imageUrl} key="og_image" />}

      <meta name="twitter:card" content="summary_large_image" key="tw_card" />
      <meta name="twitter:title" content={pageTitle} key="tw_title" />
      <meta name="twitter:description" content={description} key="tw_desc" />
      <meta name="twitter:creator" content="@merott" key="tw_creator" />
      <meta name="twitter:image" content={imageUrl} key="tw_image" />

      {children}
    </NextHead>
  )
}
