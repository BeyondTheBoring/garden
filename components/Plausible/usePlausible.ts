// eslint-disable-next-line no-restricted-imports
import { usePlausible as useNextPlausible } from 'next-plausible'
import { useCallback } from 'react'

export function usePlausible() {
  const plausible = useNextPlausible()

  // disabling deps rule because the upstream implementation never changes
  // but it isn't set up with useCallback, so every time it's a new function

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(plausible, [])
}
