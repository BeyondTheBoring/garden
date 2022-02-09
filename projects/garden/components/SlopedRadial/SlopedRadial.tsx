import btbColors from '@/theme/colors'

export type SlopedRadialProps = {
  baseColor: string
  lightColor: string
}

export default function SlopedRadial({
  baseColor,
  lightColor,
}: SlopedRadialProps) {
  const shapesFill = encodeURIComponent(baseColor)

  return (
    <div
      className="absolute -z-10 h-full w-full"
      style={{
        background: `radial-gradient(50% 50% at 50% 50%, ${lightColor} 0%, ${baseColor} 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute h-full w-full bg-[length:60px] md:bg-[length:80px]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 60 78' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M41.663 9.37c.724-.616 1.313-1.654 1.322-3.354.007-1.443-.518-2.404-1.224-3.021-.738-.644-1.777-1-2.887-.995-2.23.01-4.266 1.41-4.37 4.082-.095 2.435 1.865 4.044 4.208 4.179 1.136.065 2.195-.25 2.95-.892Zm2.822-3.346c-.044 8.312-11.753 6.98-11.48 0 .285-7.307 11.518-7.423 11.48 0ZM10.868 1.258a.75.75 0 0 1 .232.533l.027 1.8c.04 2.678.072 4.654-.027 6.969a.75.75 0 0 1-.753.718c-1.545-.007-2.812.002-4 .01-1.597.01-3.05.02-4.84-.01a.75.75 0 0 1-.737-.758c.007-.706.024-1.364.04-2.03.046-1.806.093-3.662-.04-6.656a.75.75 0 0 1 .766-.783c3.45.078 5.402.118 8.788 0a.75.75 0 0 1 .544.207ZM2.3 2.568c.094 2.597.05 4.338.008 5.993-.01.41-.02.816-.028 1.228 1.447.017 2.679.009 4.026 0 .999-.008 2.06-.015 3.32-.013.065-1.97.037-3.761 0-6.148L9.61 2.575c-2.722.08-4.576.054-7.31-.007Zm20.4 58.085a.75.75 0 0 1 .734.766c-.045 2.008-.063 3.58-.062 4.964 1.395.009 2.838.052 4.522.102l.985.029a.75.75 0 0 1-.044 1.499l-.988-.03c-1.68-.05-3.098-.09-4.466-.1.026 1.815.071 3.63.137 5.445a.749.749 0 1 1-1.5.047l-.013-.46c-.058-1.86-.105-3.363-.124-5.027a65.01 65.01 0 0 0-4.992.264.75.75 0 1 1-.133-1.494 66.461 66.461 0 0 1 5.116-.27c-.001-1.4.017-2.984.062-5.002a.75.75 0 0 1 .767-.733H22.7Zm29.769-5.143a.75.75 0 0 1 .654.34c1.907 2.935 3.189 5.08 5.328 8.996a.75.75 0 0 1-.638 1.11c-4.147.114-6.952.15-10.43-.001a.75.75 0 0 1-.642-1.077c.733-1.507 1.555-2.898 2.582-4.634.724-1.225 1.55-2.62 2.516-4.35a.75.75 0 0 1 .63-.384Zm.068 2.2c-.751 1.32-1.398 2.41-1.97 3.378-.755 1.275-1.382 2.333-1.952 3.413 2.579.083 4.898.063 7.928-.013-1.538-2.783-2.64-4.638-4.006-6.778Zm-11.67-17.452a.75.75 0 0 1 .233.533l.027 1.8c.04 2.678.072 4.654-.027 6.969a.75.75 0 0 1-.753.718c-1.545-.007-2.812.002-4 .01-1.597.01-3.05.02-4.84-.01a.75.75 0 0 1-.737-.758c.007-.706.024-1.364.04-2.03.046-1.806.093-3.662-.04-6.656a.748.748 0 0 1 .767-.783c3.449.078 5.4.118 8.787 0a.75.75 0 0 1 .544.207Zm-8.566 1.31c.094 2.597.05 4.338.008 5.993-.01.41-.02.816-.028 1.228 1.447.017 2.678.008 4.026 0 .999-.008 2.06-.015 3.32-.013.065-1.97.037-3.761 0-6.148l-.016-1.053c-2.722.08-4.576.054-7.31-.007ZM52.7 21.358a.75.75 0 0 1 .734.766c-.045 2.008-.063 3.58-.062 4.964 1.395.01 2.838.052 4.522.102l.985.029a.75.75 0 0 1-.044 1.5l-.988-.03c-1.68-.05-3.098-.092-4.466-.1.026 1.815.071 3.63.137 5.444a.749.749 0 1 1-1.5.047l-.013-.46c-.058-1.86-.105-3.363-.124-5.027a64.96 64.96 0 0 0-4.992.264.75.75 0 1 1-.133-1.494 66.461 66.461 0 0 1 5.116-.27c-.001-1.4.017-2.984.062-5.002a.75.75 0 0 1 .767-.733H52.7ZM22.469 17.25a.75.75 0 0 1 .654.34c1.906 2.935 3.188 5.082 5.328 8.996a.75.75 0 0 1-.638 1.11c-4.146.114-6.952.15-10.43 0a.75.75 0 0 1-.642-1.078c.733-1.507 1.555-2.898 2.582-4.634.724-1.224 1.55-2.62 2.516-4.35a.75.75 0 0 1 .63-.384Zm.068 2.2c-.751 1.32-1.397 2.41-1.97 3.378-.755 1.275-1.381 2.334-1.952 3.413 2.579.084 4.898.063 7.928-.012-1.538-2.784-2.64-4.64-4.006-6.78ZM11.662 48.37c.725-.616 1.314-1.654 1.322-3.354.008-1.443-.517-2.404-1.223-3.021-.738-.644-1.777-1-2.887-.995-2.23.01-4.266 1.41-4.37 4.082-.095 2.435 1.865 4.044 4.208 4.179 1.136.065 2.195-.25 2.95-.892Zm2.822-3.346c-.043 8.312-11.752 6.98-11.48 0 .286-7.307 11.52-7.423 11.48 0Z' fill='${shapesFill}'/%3E%3C/svg%3E")`,
        }}
      ></div>

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
