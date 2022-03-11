import Script from 'next/script'

export interface ClarityProviderProps {
  enabled?: boolean
  projectId?: string
  children: React.ReactNode
}

export default function ClarityProvider({
  enabled,
  projectId,
  children,
}: ClarityProviderProps) {
  const doEnable =
    !!projectId && (enabled ?? process.env.NODE_ENV === 'production')

  return doEnable ? (
    <>
      {/* DO NOT SET id to 'clarity' (it will set window.clarity) */}
      <Script id="ms_clarity">
        {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${projectId}");`}
      </Script>
      {children}
    </>
  ) : (
    <>{children}</>
  )
}
