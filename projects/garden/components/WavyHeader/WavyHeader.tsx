export type WavyHeaderProps = React.ComponentProps<'div'> & {
  baseColor: string
  lightColor: string
  headerShadow?: string
}

export default function WavyHeader({
  baseColor,
  lightColor,
  headerShadow = 'drop-shadow-sm',
  ...props
}: WavyHeaderProps) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute z-10 h-full w-full overflow-hidden rounded-t-3xl">
        <svg
          viewBox="0 0 800 160"
          preserveAspectRatio="none"
          className={`h-full w-full ${headerShadow}`}
        >
          <path
            d="M0 160c185.5-77.675 800 73.253 800-101.772V0H0v160Z"
            fill="url(#wavy-gradient)"
          />
          <defs>
            <radialGradient
              id="wavy-gradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(400 80) rotate(90) scale(80 400)"
            >
              <stop offset="0.21875" stopColor={lightColor} />
              <stop offset="1" stopColor={baseColor} />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-20">
        <div {...props}></div>
      </div>
    </div>
  )
}
