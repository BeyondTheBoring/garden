import { useEffect, useState } from 'react'

import btbColors from '@/theme/colors'
import { PatternedRadial } from '@/components/PatternedRadial'

export type SlopedRadialProps = {
  initialColor: string
  baseColor: string
}

let previousBaseColor: string | undefined

export default function SlopedRadial(props: SlopedRadialProps) {
  const [baseColor, setBaseColor] = useState(
    previousBaseColor || props.initialColor || props.baseColor,
  )

  const newBaseColor = props.baseColor

  useEffect(() => {
    // sometimes runs before paint, which breaks the transition
    // using setTimeout as a workaround for now
    const timeout = setTimeout(() => {
      if (baseColor !== newBaseColor) {
        setBaseColor(newBaseColor)
      }

      previousBaseColor = newBaseColor
    }, 100)

    return () => clearTimeout(timeout)
  }, [baseColor, newBaseColor])

  return (
    <div className="absolute -z-10 h-full w-full">
      <PatternedRadial baseColor={baseColor} />

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-px h-full w-full"
      >
        <path
          d="M1440 320V87.156C1440 214.284 510.104 320 0 320h1440Z"
          fill={btbColors.gray['50']}
        />
      </svg>
    </div>
  )
}
