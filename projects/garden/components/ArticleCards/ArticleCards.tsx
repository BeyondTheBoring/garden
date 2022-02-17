import Link from 'next/link'
import { Fragment } from 'react'

import { PostMetadata } from '@/types/posts'
import { LinkedArticleCard } from '@/components/LinkedArticleCard'

export interface ArticleCardsProps extends React.ComponentProps<'ul'> {
  posts: PostMetadata[]
}

export default function ArticleCards({ posts, ...ulProps }: ArticleCardsProps) {
  const sortedPosts = [...posts].sort((a, b) =>
    a.date.updated > b.date.updated ? -1 : 1,
  )

  return (
    <ul {...ulProps}>
      {sortedPosts.map(post => (
        <Fragment key={post.slug}>
          {post.published ? (
            <LinkedArticleCard as="li" post={post} />
          ) : (
            <li className="hidden">
              <Link href={`/garden/${post.slug}`}>
                <a>${post.title}</a>
              </Link>
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  )
}
