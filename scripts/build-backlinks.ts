import fs from 'fs'
import { parseBacklinks } from '../tools/posts/parse-backlinks'

parseBacklinks().then(posts => {
  fs.writeFile('links.json', JSON.stringify(posts, null, 2), () =>
    console.log(`Built ${posts.length} links`),
  )
})
