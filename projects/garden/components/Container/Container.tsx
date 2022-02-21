import classnames from 'classnames'
export type ContainerProps = React.ComponentProps<'div'>

export default function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={classnames(
        'mx-auto max-w-6xl px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 xl:max-w-8xl xl:px-16',
        className,
      )}
      {...props}
    />
  )
}
