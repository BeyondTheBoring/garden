import fs from 'fs'

import fg from 'fast-glob'
import matter from 'gray-matter'
import readingTime from 'reading-time'

import { getPlaceholder } from '../images/get-placeholder'
import { PostMetadata, PostMetadataWithContent } from '@/types/posts'

const postPaths: Record<string, { path: string; slug: string }> = {}

export async function fetchPostPaths() {
  const files = await fg('posts/**/*.mdx', { stats: true })

  for (let { name, path } of files) {
    const slug = name.replace(/\.mdx$/, '')

    const existingMatch = postPaths[slug]
    if (existingMatch && existingMatch.path !== path) {
      throw new Error(
        `Identical slugs (${slug}):\n- ${path}\n- ${existingMatch.path}\n`,
      )
    }

    postPaths[slug] = { path, slug }
  }

  return postPaths
}

async function fetchPostMatter(slug: string) {
  const postPath = postPaths[slug] || (await fetchPostPaths())[slug]

  if (!postPath) {
    throw new Error(`Could not find post with slug: ${slug}`)
  }

  const file = fs.readFileSync(postPath.path, 'utf8')
  return matter(file)
}

export async function fetchPostMetadataWithContentForStaticUsageOnly(
  slug: string,
  generateImagePlaceholders = false,
): Promise<PostMetadataWithContent> {
  const { content, data } = await fetchPostMatter(slug)
  const { title, aliases, stage, description, date, published } = data

  const image = (data.image as PostMetadata['image']) || null
  if (image && generateImagePlaceholders) {
    image.placeholder = await getPlaceholder(image.src)
  }

  return {
    content,
    slug,
    title: title || '',
    aliases: aliases || [],
    stage: stage || null,
    description: description || '',
    date: {
      created: date?.created?.toISOString().substr(0, 10) || null,
      updated: date?.updated?.toISOString().substr(0, 10) || null,
    },
    image,
    readingTime: Math.round(readingTime(content).minutes + 0.25),
    published: published || false,
  }
}

/**
 * Same as fetchPostMetadataWithContentForStaticUsageOnly but removes the
 * 'content' so that it's not included in the final client bundle.
 */
export async function fetchPostMetadata(
  slug: string,
  generateImagePlaceholders = false,
): Promise<PostMetadata> {
  const { content, ...postMetadata } =
    await fetchPostMetadataWithContentForStaticUsageOnly(
      slug,
      generateImagePlaceholders,
    )

  return postMetadata
}

export async function fetchAllPostsMetadataWithContentForStaticUsageOnly(
  generateImagePlaceholders = false,
) {
  const posts = await fetchPostPaths()

  return Promise.all(
    Object.keys(posts).map(async slug =>
      fetchPostMetadataWithContentForStaticUsageOnly(
        slug,
        generateImagePlaceholders,
      ),
    ),
  )
}

/**
 * Same as fetchAllPostsMetadataWithContentForStaticUsageOnly but removes the
 * 'content' so that it's not included in the final client bundle.
 */
export async function fetchAllPostsMetadata(
  generateImagePlaceholders = false,
): Promise<PostMetadata[]> {
  return (
    await fetchAllPostsMetadataWithContentForStaticUsageOnly(
      generateImagePlaceholders,
    )
  ).map(({ content, ...post }) => post)
}
