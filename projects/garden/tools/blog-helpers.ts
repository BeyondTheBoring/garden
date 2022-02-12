import matter from 'gray-matter'
import fg from 'fast-glob'
import readingTime from 'reading-time'

import { GrowthStage } from '@/enums/GrowthStage'
import { getPlaceholder } from './get-placeholder'

export type PostMetadata = {
  slug: string
  title: string

  image: {
    src: string
    alt: string
    placeholder: string
  }

  date: {
    created: string
    updated: string
  }

  description: string
  readingTime: number
  stage: GrowthStage
}

const postInfos = new Map<string, { path: string; slug: string }>()

export async function getPostInfos() {
  postInfos.clear()

  const files = await fg('posts/*/*.mdx', { stats: true })

  for (let { path } of files) {
    const regexResult = path.match(/posts\/\d+\/(.+)\.mdx$/)

    if (!regexResult) throw new Error(`Invalid post path: ${path}`)
    const [_, slug] = regexResult

    const duplicate = postInfos.get(slug)
    if (duplicate) {
      throw new Error(
        `Identical slugs (${slug}):\n- ${path}\n- ${duplicate.path}\n`,
      )
    }

    postInfos.set(slug, { path, slug })
  }

  return postInfos
}

export async function getPost(slug: string) {
  const postInfo = postInfos.get(slug) || (await getPostInfos()).get(slug)

  if (!postInfo) {
    throw new Error(`Could not find post with slug: ${slug}`)
  }

  const { content, data } = matter.read(postInfo.path, {})

  const image = {
    ...data.image,
    placeholder: await getPlaceholder(data.image.src),
  }

  const post: PostMetadata = {
    slug,
    image,
    date: {
      created: data.date.created.toISOString().substr(0, 10),
      updated: data.date.updated.toISOString().substr(0, 10),
    },
    description: data.description,
    readingTime: Math.round(readingTime(content).minutes + 0.25),
    title: data.title,
    stage: data.stage,
  }

  return {
    content,
    post,
  }
}
