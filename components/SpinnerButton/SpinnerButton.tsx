import classnames from 'classnames'

import { Spinner } from '@/components/Spinner'

export interface SpinnerButtonProps extends React.ComponentProps<'button'> {
  spin?: boolean
  spinnerClassName?: string
  spinnerAriaLabel?: string
}

export default function SpinnerButton({
  className,
  children,
  disabled,
  spin,
  spinnerClassName,
  spinnerAriaLabel = 'loading…',
  ...props
}: SpinnerButtonProps) {
  return (
    <button
      type="button"
      className={classnames('relative', className)}
      disabled={disabled || spin}
      {...props}
    >
      <span className={classnames({ invisible: spin })}>{children}</span>

      {spin && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner className={spinnerClassName} label={spinnerAriaLabel} />
        </span>
      )}
    </button>
  )
}
