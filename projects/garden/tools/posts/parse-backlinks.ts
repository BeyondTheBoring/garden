/*
Adapted from Maggie Appleton's digital garden:
https://github.com/MaggieAppleton/maggieappleton.com-V2
*/

import { fetchAllPostsMetadataWithContentForStaticUsageOnly } from './fetch-posts'

interface Backlink {
  slug: string
}

interface BacklinksInfo {
  ids: string[]
  slug: string
  outboundLinks: Backlink[]
  inboundLinks: Backlink[]
}

// Extract all instances of substrings between double brackets [[]]
const extractLinks = (str: string) => {
  if (!str) return []
  const matcher = /((?!\])(?!\[).)+/gs
  return str.match(matcher) || []
}

let cached: BacklinksInfo[]

export async function parseBacklinks() {
  if (cached) {
    return cached
  }

  // Get content and frontmatter for each post
  const posts = await fetchAllPostsMetadataWithContentForStaticUsageOnly()

  // Create initial objects. Identify each by a combined title and
  // aliases identifier Initialise empty outbound and inbound link arrays
  const postsWithBacklinks: BacklinksInfo[] = posts.map(
    ({ slug, title, aliases }) => ({
      slug,
      ids: [title, ...aliases],
      outboundLinks: [],
      inboundLinks: [],
    }),
  )

  const findLinkedPost = (bracketText: string) => {
    return postsWithBacklinks.find(post => {
      // If an alias was found between JSX tags in the markdown string,
      // it may contain undesirable substrings
      const normalisedBracketText = bracketText
        .replace(/\n/g, '')
        .replace(/\s+/g, ' ')
        .replace(`{' '}`, ' ')
        .replace(`{" "}`, ' ')

      return post.ids.includes(normalisedBracketText)
    })
  }

  // Get all outbound links
  posts.forEach((postData, index) => {
    const { content } = postData
    const bracketTexts = extractLinks(content)

    bracketTexts.forEach(bracketText => {
      const match = findLinkedPost(bracketText)

      if (match) {
        // Add it to the outbound links
        postsWithBacklinks[index].outboundLinks.push({
          slug: match.slug,
        })
      }
    })
  })

  // Get inbound links for all posts.
  // For each post (first loop), compare with all other posts (second loop)
  for (const outerPost of postsWithBacklinks) {
    for (const innerPost of postsWithBacklinks) {
      // If inner post's outboundLinks contains a reference to the outer post,
      // then the outer post must have the inner post as an inbound link
      if (innerPost.outboundLinks.some(link => link.slug === outerPost.slug)) {
        outerPost.inboundLinks.push({
          slug: innerPost.slug,
        })
      }
    }
  }

  cached = postsWithBacklinks
  return postsWithBacklinks
}

export async function getInboundLinks(slug: string) {
  const backlinks = await parseBacklinks()
  return backlinks.find(b => b.slug === slug)?.inboundLinks || []
}
