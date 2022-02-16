import { GrowthStage } from '@/enums/GrowthStage'

export interface PostMetadata {
  aliases: string[]
  slug: string
  title: string

  image: {
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
}

export interface PostMetadataWithContent extends PostMetadata {
  content: string
}