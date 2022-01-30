import classnames from 'classnames'
export type ContainerProps = React.ComponentProps<'div'>

export default function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={classnames(
        'max-w-8xl px-4 mx-auto xs:px-6 sm:px-8 md:px-10 lg:px-12',
        className,
      )}
      {...props}
    />
  )
}
