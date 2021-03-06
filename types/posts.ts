import { GrowthStage } from '@/lib/enums/GrowthStage'

export interface PostMetadata {
  aliases: string[]
  slug: string
  title: string

  cover: {
    src: string
    alt: string
    placeholder?: string
  }

  date: {
    created: string
    updated: string
  }

  description: string
  readingTime: number
  stage: GrowthStage
  published: boolean
}

export interface PostMetadataWithContent extends PostMetadata {
  content: string
}
