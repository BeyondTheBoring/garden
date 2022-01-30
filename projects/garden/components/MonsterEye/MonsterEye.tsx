import colors from '@/theme/colors'

export type MonsterEyeProps = {
  className?: string
}

export default function MonsterEye({ className = '' }: MonsterEyeProps) {
  return (
    <svg
      role="img"
      aria-label="Monster"
      viewBox="0 0 33 32"
      className={className}
    >
      <g clipPath="url(#a)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.056 32c-8.823 0-16-7.177-16-16s7.177-16 16-16c8.822 0 16 7.177 16 16s-7.178 16-16 16Zm0-29.414C8.66 2.586 2.64 8.604 2.64 16S8.66 29.414 16.056 29.414c7.396 0 13.414-6.018 13.414-13.414S23.453 2.586 16.056 2.586Z"
          fill={colors.gray['900']}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.056 32c-8.823 0-16-7.177-16-16s7.177-16 16-16c8.822 0 16 7.177 16 16s-7.178 16-16 16Zm0-29.414C8.66 2.586 2.64 8.604 2.64 16S8.66 29.414 16.056 29.414c7.396 0 13.414-6.018 13.414-13.414S23.453 2.586 16.056 2.586Z"
          fill={colors.gray['900']}
        />
        <path
          d="M16.08 29.48c7.432 0 13.456-6.024 13.456-13.455 0-7.432-6.024-13.456-13.456-13.456-7.43 0-13.455 6.024-13.455 13.456 0 7.431 6.024 13.455 13.455 13.455Z"
          fill="#fff"
        />
        <path
          d="M16.151 24.323a8.295 8.295 0 1 0 0-16.59 8.295 8.295 0 0 0 0 16.59Z"
          fill={colors.blue['500']}
        />
        <path
          d="M16.151 20.175a4.148 4.148 0 1 0 0-8.295 4.148 4.148 0 0 0 0 8.295Z"
          fill={colors.gray['900']}
        />
        <path
          d="M13.04 14.99a2.074 2.074 0 1 0 0-4.147 2.074 2.074 0 0 0 0 4.148Z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" transform="translate(.056)" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
