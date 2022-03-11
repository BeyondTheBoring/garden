import NextPlausibleProvider from 'next-plausible'

export interface PlausibleProviderProps {
  children: React.ReactNode
}

export default function PlausibleProvider({
  children,
}: PlausibleProviderProps) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  const domain = SITE_URL?.replace(/^https?:\/\//, '').replace(/\/$/, '') || ''
  const enableAnalytics = !!domain && process.env.NODE_ENV === 'production'

  return (
    <NextPlausibleProvider domain={domain} enabled={enableAnalytics}>
      {children}
    </NextPlausibleProvider>
  )
}
