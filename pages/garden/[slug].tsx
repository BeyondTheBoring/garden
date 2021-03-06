import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image, { ImageProps } from 'next/image'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useState } from 'react'

import { relativeTime } from '@/lib/utils/date-utils'

import { Container } from '@/components/Container'
import { HeaderNav } from '@/components/HeaderNav'
import { imagePlaceholder } from '@/tools/mdx/image-placeholder'
import { imageSize } from '@/tools/mdx/image-size'
import GrowthStageIcon from '../../components/GrowthStageIcon/GrowthStageIcon'
import ClockIcon from '@heroicons/react/outline/ClockIcon'
import { backlinks } from '@/tools/mdx/backlinks'
import { getInboundLinks } from '@/tools/posts/parse-backlinks'
import {
  fetchPostMetadata,
  fetchPostMetadataWithContentForStaticUsageOnly,
  fetchPostPaths,
} from '@/tools/posts/fetch-posts'
import { PostMetadata } from '@/types/posts'
import Link from 'next/link'
import { ArticleCards } from '@/components/ArticleCards'
import { DigitalGardenExplainer } from '@/components/DigitalGardenExplainer'
import { Head } from '@/components/Head'
import { Question } from '@/components/Question'
import { BlockQuote, BlockQuoteProps } from '@/components/BlockQuote'

export type PostProps = {
  post: PostMetadata
  mentionedIn: Array<PostMetadata>
  mdx: MDXRemoteSerializeResult
}

const fullWidthMediaClassNames = `my-6 -mx-5 block border-t border-b border-gray-500 border-opacity-10 shadow-sm xs:-mx-8 sm:-mx-10 sm:my-8 md:-mx-12 xl:-mx-20 xl:my-12`

const mdxComponents = {
  Question,

  a: ({ href, ...props }: React.ComponentProps<'a'>) => (
    <Link href={href || ''}>
      <a
        className={typeof props.children === 'string' ? 'link' : ''}
        {...{
          ...props,
          ...(href?.includes('//')
            ? { target: '_blank', rel: 'noreferrer' }
            : {}),
        }}
      />
    </Link>
  ),

  blockquote: (props: BlockQuoteProps) => (
    <BlockQuote className="border-cyan-400" {...props} />
  ),

  img: (props: ImageProps) => (
    <span className={fullWidthMediaClassNames}>
      <Image
        {...props}
        alt={props.alt}
        className="!filter-none"
        layout="responsive"
        loading="lazy"
      />
    </span>
  ),

  h2: (props: React.ComponentProps<'p'>) => (
    <h2
      className="mt-8 text-xl font-bold text-gray-900 sm:mt-10 sm:text-2xl xl:mt-14 xl:text-3xl"
      {...props}
    />
  ),

  p: (props: React.ComponentProps<'p'>) => (
    <p className="mt-4 first:mt-0 sm:mt-5 xl:mt-6" {...props} />
  ),

  li: (props: React.ComponentProps<'li'>) => <li className="pl-2" {...props} />,

  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="ml-5 mt-2 list-disc sm:mt-3" {...props} />
  ),

  video: (props: React.ComponentProps<'video'>) => (
    <div className={fullWidthMediaClassNames}>
      <video {...props} />
    </div>
  ),
}

const PostPage: NextPage<PostProps> = ({ post, mentionedIn, mdx }) => {
  const [showGardenExplainer, setShowGardenExplainer] = useState(false)

  return (
    <>
      <Head
        description={post.description}
        title={post.title}
        image={post.cover?.src}
      />

      <HeaderNav />

      <Container className="mt-10 lg:mt-14 2xl:mt-20">
        <div className="mx-auto max-w-[75ch] text-base sm:text-lg xl:text-xl">
          <div className="flex flex-col">
            <div className="flex space-x-10 text-xs tracking-normal text-gray-500 sm:text-sm">
              <button
                type="button"
                aria-label={`Growth stage: ${post.stage}`}
                className="flex items-center space-x-1 text-inherit font-bold uppercase hover:text-gray-900 sm:space-x-1.5"
                onClick={() => setShowGardenExplainer(true)}
              >
                <GrowthStageIcon
                  stage={post.stage}
                  className="h-4 w-4 sm:h-5 sm:w-5"
                />
                <span>{post.stage}</span>
              </button>
              <div className="flex items-center space-x-1 font-bold uppercase sm:space-x-1.5">
                <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>
                  {post.readingTime === 0 ? '<1' : post.readingTime} min read
                </span>
              </div>
            </div>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:mt-3 sm:text-3xl xl:mt-4 xl:text-5xl xl:tracking-tighter 2xl:text-6xl">
              {post.title}
            </h1>

            <p className="mt-5 text-gray-700 sm:mt-6 sm:text-xl xl:mt-7 xl:text-2xl 2xl:mt-10">
              {post.description}
            </p>

            <ul
              className="ml-auto mt-8 flex space-x-10 uppercase sm:mt-10 lg:mt-12"
              aria-label="key dates"
            >
              <li className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 sm:text-sm">
                  Planted
                </span>
                <span className="text-xs font-bold text-gray-600 sm:text-sm">
                  {relativeTime(post.date.created)}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 sm:text-sm">
                  Last tended
                </span>
                <span className="text-xs font-bold text-gray-600 sm:text-sm">
                  {relativeTime(post.date.updated)}
                </span>
              </li>
            </ul>
          </div>

          <article className="relative mx-auto mt-6 overflow-hidden rounded-3xl bg-white text-gray-700 shadow sm:mt-8">
            {post.cover && (
              <div className="aspect-w-16 aspect-h-9 shadow-lg">
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt || post.title}
                  blurDataURL={post.cover.placeholder}
                  data-placeholder={post.cover.placeholder}
                  className="!filter-none"
                  objectFit="cover"
                  layout="fill"
                  loading="lazy"
                  placeholder="blur"
                />
              </div>
            )}

            {/* when adjusting margin, adjust negative margins on 'img'
                components too, so they remain full width */}
            <div className="m-5 xs:m-8 sm:m-10 md:m-12 xl:my-16 xl:mx-20">
              <MDXRemote {...mdx} components={mdxComponents} />
            </div>
          </article>

          {mentionedIn.length > 0 && (
            <div className="mt-12 flex flex-col sm:mt-16 xl:mt-24">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl xl:text-3xl 2xl:text-4xl">
                Mentioned in
              </h2>
              <ArticleCards
                posts={mentionedIn}
                className="mx-auto my-4 grid gap-6 sm:my-7 sm:gap-8 md:grid-cols-2 xl:my-10 xl:gap-10 2xl:my-12"
              />
            </div>
          )}
        </div>
      </Container>

      <DigitalGardenExplainer
        open={showGardenExplainer}
        onClose={() => setShowGardenExplainer(false)}
      />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.time(`[slug] fetchPostPaths`)
  const posts = await fetchPostPaths()
  console.timeEnd(`[slug] fetchPostPaths`)

  return {
    fallback: false,
    paths: Object.keys(posts).map(slug => ({ params: { slug } })),
  }
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const slug = params?.slug as string

  console.time(`[slug] getStaticProps TOTAL`)
  console.time(`[slug] fetchPostMetadataWithContentForStaticUsageOnly`)
  const { content, ...post } =
    await fetchPostMetadataWithContentForStaticUsageOnly(slug, true)
  console.timeEnd(`[slug] fetchPostMetadataWithContentForStaticUsageOnly`)

  console.time(`[slug] getInboundLinks`)
  const inboundLinks = (await getInboundLinks(slug)).map(link =>
    fetchPostMetadata(link.slug, true),
  )

  const mentionedIn = await Promise.all(inboundLinks)
  console.timeEnd(`[slug] getInboundLinks`)
  console.timeEnd(`[slug] getStaticProps TOTAL`)

  return {
    props: {
      mdx: await serialize(content, {
        mdxOptions: {
          rehypePlugins: [
            [backlinks, {}],
            [imageSize, {}],
            [imagePlaceholder, {}],
          ],
        },
      }),
      mentionedIn,
      post,
    },
  }
}

export default PostPage
