import colors from '@/theme/colors'

export type WavyHeaderProps = React.ComponentProps<'div'> & {
  baseColor: string
  lightColor: string
}

export default function WavyHeader({
  baseColor,
  lightColor,
  ...props
}: WavyHeaderProps) {
  return (
    <div className="relative">
      <div
        className="absolute w-full h-full pointer-events-none"
        style={{
          background: `radial-gradient(50% 50% at 50% 50%, ${lightColor} 0%, ${baseColor} 100%)`,
        }}
      ></div>

      <svg
        viewBox="0 0 800 160"
        preserveAspectRatio="none"
        className="absolute w-full h-full top-px pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M375.123 141.316C225.913 134.487 76.488 127.648 0 159.676h800V58c-.131 102.755-212.285 93.045-424.877 83.316Z"
          fill={colors.white}
        />
      </svg>

      <div className="relative">
        <div {...props}></div>
      </div>
    </div>
  )
}
