import { GrowthStage } from '@/enums/GrowthStage'

export interface PostMetadata {
  aliases: string[]
  slug: string
  title: string

  image: {
    src: string
    alt: string
    placeholder?: string | null
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
