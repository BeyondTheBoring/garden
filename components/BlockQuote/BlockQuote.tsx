import classnames from 'classnames'

export interface BlockQuoteProps extends React.ComponentProps<'blockquote'> {
  children: React.ReactNode
}

export default function BlockQuote({ className, ...props }: BlockQuoteProps) {
  return (
    <blockquote
      className={classnames(
        'mt-4 mb-8 rounded-r-lg border-l-2 border-cyan-400 bg-gray-50 p-5 leading-relaxed text-gray-600 md:mt-8 md:mb-12 md:border-l-4 md:p-8',
        className,
      )}
      {...props}
    />
  )
}
