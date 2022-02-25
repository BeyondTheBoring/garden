import Image from 'next/image'
import Link from 'next/link'
import { ElementType } from 'react'

import Water from '@/assets/icons/outline/water.svg'
import { GrowthStageIcon } from '@/components/GrowthStageIcon'
import { PostMetadata } from '@/types/posts'
import { routes } from '@/lib/utils/routes'
import { relativeTime } from '../../../utils/lib/date-utils'

export interface LinkedArticleCardProps {
  as?: ElementType
  post: PostMetadata
}

export default function LinkedArticleCard({
  as,
  post,
}: LinkedArticleCardProps) {
  const Element = as || 'div'

  return (
    <Element className="relative max-w-md overflow-hidden rounded-3xl bg-white shadow ring-gray-900 ring-offset-2 ring-offset-white transition-all duration-150 ease-out focus-within:-translate-y-1 focus-within:-translate-x-px focus-within:ring hover:-translate-y-1 hover:-translate-x-px hover:shadow-md">
      <Link href={routes.post(post.slug)}>
        <a className="flex h-full w-full flex-col" aria-label={post.title}>
          <div className="m-4 flex flex-1 flex-col xs:m-7">
            <h2 className="sm text-base font-bold xs:text-lg">{post.title}</h2>

            <p className="mt-2 text-sm line-clamp-3 xs:mt-3 xs:text-base">
              {post.description}
            </p>

            <div className="mt-auto">
              <div className="mt-5 flex space-x-6 text-xxs font-medium uppercase text-gray-500 xs:text-xs">
                <div className="flex items-center">
                  <GrowthStageIcon
                    stage={post.stage}
                    className="h-4 w-4 xs:h-5 xs:w-5"
                  />
                  <div className="ml-1">Seed</div>
                </div>

                <div className="flex items-center">
                  <Water
                    className="h-4 w-4 xs:h-5 xs:w-5"
                    role="img"
                    aria-label="Last tended"
                  />
                  <div className="ml-1">{relativeTime(post.date.updated)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="aspect-w-16 aspect-h-9 -order-1 select-none bg-gray-200 shadow">
            {post.cover && (
              <Image
                src={post.cover.src}
                alt={post.cover.alt || post.title}
                className="!filter-none"
                objectFit="cover"
                layout="fill"
                loading="lazy"
                placeholder="blur"
                blurDataURL={post.cover.placeholder}
                data-placeholder={post.cover.placeholder}
              />
            )}
          </div>
        </a>
      </Link>
    </Element>
  )
}
