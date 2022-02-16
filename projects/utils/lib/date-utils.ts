export function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate))
}

export function relativeTime(isoDate: string) {
  const today = new Date(new Date().toISOString().slice(0, 10)).getTime()
  const targetTime = new Date(isoDate).getTime()

  if (!isoDate || !targetTime) {
    return 'unknown'
  }

  const deltaDays = (targetTime - today) / (1000 * 3600 * 24)
  const deltaMonths = Math.round(deltaDays / (365 / 12))

  const isToday = -deltaDays <= 0.75
  const isYesterday = -deltaDays <= 1.75 // 18 hours
  const countDays = -deltaDays < 7
  const countWeeks = -deltaDays < 29
  const countMonths = -deltaMonths <= 18 && -deltaMonths !== 12
  const countYear = -deltaMonths === 12 || -deltaMonths > 18

  if (isToday) {
    return 'today'
  }

  if (isYesterday) {
    return 'yesterday'
  }

  const formatter = new Intl.RelativeTimeFormat('en-US')

  if (countDays) {
    return formatter.format(Math.round(deltaDays), 'days')
  }

  if (countWeeks) {
    return formatter.format(Math.round(deltaDays / 7), 'weeks')
  }

  if (countMonths) {
    return formatter.format(deltaMonths, 'months')
  }

  if (countYear) {
    return formatter.format(Math.round(deltaDays / 365), 'years')
  }

  return formatter.format(Math.round(deltaDays), 'days')
}
