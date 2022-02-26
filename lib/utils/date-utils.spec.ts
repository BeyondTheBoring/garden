import { formatDate, relativeTime } from './date-utils'

describe('date-utils', () => {
  describe('formatDate()', () => {
    it(`returns a friendly date string`, async () => {
      const friendly = formatDate('2022-01-12')
      expect(friendly).toBe('January 12, 2022')
    })
  })

  describe('relativeTime()', () => {
    beforeAll(() => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2021-12-31T14:00:00Z').getTime())
    })

    it(`returns 'today' if exactly now`, async () => {
      expect(relativeTime('2021-12-31')).toBe('today')
    })

    it(`returns 'today' if it's been less than a day`, async () => {
      expect(relativeTime('2021-12-30T23:59:59Z')).toBe('today')
    })

    it(`returns 'today' if it's been 18 hours`, async () => {
      expect(relativeTime('2021-12-30T06:00:00Z')).toBe('today')
    })

    it(`returns 'yesterday' if it's been just over 18 hours`, async () => {
      expect(relativeTime('2021-12-30T05:59:59Z')).toBe('yesterday')
    })

    it(`returns 'yesterday' if it been a day`, async () => {
      expect(relativeTime('2021-12-30')).toBe('yesterday')
    })

    it(`returns 'yesterday' if it's 1 day + 18 hours`, async () => {
      expect(relativeTime('2021-12-29T06:00:00Z')).toBe('yesterday')
    })

    it(`returns '2 days ago' if it's over 18 hours`, async () => {
      expect(relativeTime('2021-12-29T05:59:59Z')).toBe('2 days ago')
    })

    it(`returns '2 days ago`, async () => {
      expect(relativeTime('2021-12-29')).toBe('2 days ago')
    })

    it(`returns '6 days ago`, async () => {
      expect(relativeTime('2021-12-25')).toBe('6 days ago')
    })

    it(`returns '1 week ago' if it's 7 days`, async () => {
      expect(relativeTime('2021-12-24')).toBe('1 week ago')
    })

    it(`returns '1 week ago' if it's 10 days`, () => {
      expect(relativeTime('2021-12-21')).toBe('1 week ago')
    })

    it(`returns '3 week ago' if it's 20 days`, () => {
      expect(relativeTime('2021-12-11')).toBe('3 weeks ago')
    })

    it(`returns '4 weeks ago' if it's 28 days`, () => {
      expect(relativeTime('2021-12-03')).toBe('4 weeks ago')
    })

    it(`returns '1 month ago' if it's 29 days`, () => {
      expect(relativeTime('2021-12-02')).toBe('1 month ago')
    })

    it(`returns '1 month ago' if it's 45 days`, () => {
      expect(relativeTime('2021-11-16')).toBe('1 month ago')
    })

    it(`returns '2 month ago' if it's 46 days`, () => {
      expect(relativeTime('2021-11-15')).toBe('2 months ago')
    })

    it(`returns '11 months ago' if it's 349 days`, async () => {
      expect(relativeTime('2021-01-16')).toBe('11 months ago')
    })

    it(`returns '1 year ago' if it's 350 days`, async () => {
      expect(relativeTime('2021-01-15')).toBe('1 year ago')
    })

    it(`returns '1 year ago' if it's 380 days`, async () => {
      expect(relativeTime('2020-12-16')).toBe('1 year ago')
    })

    it(`returns '13 months ago' if it's 381 days`, async () => {
      expect(relativeTime('2020-12-15')).toBe('13 months ago')
    })

    it(`returns '18 months ago' if it's 1.5 years`, async () => {
      expect(relativeTime('2020-06-17')).toBe('18 months ago')
    })

    it(`returns '15 months ago' if it's 15 months`, async () => {
      expect(relativeTime('2020-09-17')).toBe('15 months ago')
    })

    it(`returns '2 years ago' if it's just over 1.5 years`, async () => {
      expect(relativeTime('2020-06-16')).toBe('2 years ago')
    })
  })
})
