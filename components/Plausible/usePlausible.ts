// eslint-disable-next-line no-restricted-imports
import { usePlausible as useNextPlausible } from 'next-plausible'

export function usePlausible() {
  return useNextPlausible<{
    'subscribe': never
    'view garden explainer': never
    'view subscription panel': never
  }>()
}
