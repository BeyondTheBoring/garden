import fg from 'fast-glob'
import { readFileSync } from 'fs'
import md5 from 'md5'
import { placeholders } from '../tools/images/placeholders'

const frozen = process.argv.slice(2).includes('--frozen')

const previousPlaceholders = placeholders.getAll()
placeholders.clear()
;(async () => {
  const images = await fg('public/**/*.(png|jpg)')

  for (let imagePath of images) {
    const hash = md5(readFileSync(imagePath))

    if (previousPlaceholders[hash]) {
      placeholders.set(hash, previousPlaceholders[hash])
      continue
    }

    if (frozen) {
      console.error(
        `\nMissing placeholder for image: ${imagePath}\n---> FIX: yarn build:placeholders <---\n`,
      )
      process.exit(1)
    }

    placeholders.set(hash, await placeholders.make(imagePath, true))
  }

  placeholders.save()
})()
