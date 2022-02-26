// Adapted from https://codepen.io/supah/pen/BjYLdW

import classnames from 'classnames'

import styles from './Spinner.module.css'

export type SpinnerProps = {
  className?: string
  label: string
}

export default function Spinner({ className, label }: SpinnerProps) {
  return (
    <svg
      className={classnames(styles.spinner, className)}
      aria-label={label}
      viewBox="0 0 50 50"
    >
      <circle
        className={styles.circle}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="6"
      />
    </svg>
  )
}
