import Script from 'next/script'
import { useEffect } from 'react'

export interface SavvyCalProps {
  link: string
  theme?: 'light' | 'dark'
}

export default function SavvyCal({ theme, link }: SavvyCalProps) {
  const config = {
    link,
    theme,
    selector: '#savvycal',
  }

  useEffect(() => {
    if ('SavvyCal' in window) {
      ;(window as any).SavvyCal('inline', config)
    }
  })

  return (
    <>
      <div
        id="savvycal"
        className="hack-rounded mx-auto w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow lg:max-w-none"
      />

      <Script id="savvycal-setup" strategy="lazyOnload">
        {`window.SavvyCal=window.SavvyCal||function(){(SavvyCal.q=SavvyCal.q||[]).push(arguments)};`}
      </Script>
      <Script
        async
        src="https://embed.savvycal.com/v1/embed.js"
        strategy="lazyOnload"
      />
      <Script id="savvycal-init" strategy="lazyOnload">
        {`SavvyCal('init');SavvyCal('inline', ${JSON.stringify(config)});`}
      </Script>
    </>
  )
}
