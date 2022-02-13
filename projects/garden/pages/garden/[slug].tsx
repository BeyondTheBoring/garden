import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image, { ImageProps } from 'next/image'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { relativeTime } from '@btb/utils'

import { Container } from '@/components/Container'
import { HeaderNav } from '@/components/HeaderNav'
import { PostMetadata, getPost, getPostInfos } from '@/tools/blog-helpers'
import { imagePlaceholder } from '@/tools/mdx/image-placeholder'
import { imageSize } from '@/tools/mdx/image-size'
import GrowthStageIcon from '../../components/GrowthStageIcon/GrowthStageIcon'
import ClockIcon from '@heroicons/react/outline/ClockIcon'

export type PostProps = {
  post: PostMetadata
  mdx: MDXRemoteSerializeResult
}

const mdxComponents = {
  img: (props: ImageProps) => (
    <span className="my-6 -mx-5 block shadow xs:-mx-8 sm:-mx-10 sm:my-8 md:-mx-12 xl:-mx-16 xl:my-12">
      <Image
        {...props}
        alt={props.alt}
        className="!filter-none"
        layout="responsive"
        loading="lazy"
      />
    </span>
  ),

  p: (props: React.ComponentProps<'p'>) => (
    <p className="my-4 sm:my-5 xl:my-7" {...props} />
  ),

  li: (props: React.ComponentProps<'li'>) => <li className="pl-2" {...props} />,

  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="ml-5 -mt-3 list-disc sm:-mt-4" {...props} />
  ),
}

const PostPage: NextPage<PostProps> = ({ post, mdx }) => {
  return (
    <>
      <Head>
        <title>Beyond the Boring | Engage your students</title>
        <meta name="description" content={post.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNav />

      <Container className="mt-10 lg:mt-14 2xl:mt-20">
        <div className="mx-auto max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
          <div className="flex flex-col">
            <div className="flex space-x-10 text-xs font-bold uppercase text-gray-500 sm:text-sm">
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                <GrowthStageIcon
                  stage={post.stage}
                  className="h-4 w-4 sm:h-5 sm:w-5"
                />
                <span>{post.stage}</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{post.readingTime} minutes</span>
              </div>
            </div>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:mt-3 sm:text-3xl xl:mt-4 xl:text-5xl xl:tracking-tighter 2xl:text-6xl">
              {post.title}
            </h1>

            <p className="mt-5 text-gray-700 sm:mt-6 sm:text-lg lg:text-xl xl:mt-7 2xl:mt-10 2xl:text-2xl">
              {post.description}
            </p>

            <ul
              className="ml-auto mt-8 flex space-x-10 uppercase sm:mt-10 lg:mt-12"
              aria-label="key dates"
            >
              <li className="flex flex-col">
                <span className="text-xxs font-medium text-gray-500 sm:text-xs">
                  Planted
                </span>
                <span className="text-xs font-bold text-gray-600 sm:text-sm">
                  {relativeTime(post.date.created)}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-xxs font-medium text-gray-500 sm:text-xs">
                  Last tended
                </span>
                <span className="text-xs font-bold text-gray-600 sm:text-sm">
                  {relativeTime(post.date.updated)}
                </span>
              </li>
            </ul>
          </div>

          <article className="relative my-6 mx-auto overflow-hidden rounded-3xl bg-white text-gray-700 shadow sm:my-8">
            <div className="aspect-w-16 aspect-h-9 shadow-lg md:shadow-xl">
              <Image
                src={post.image.src}
                alt={post.image.alt || post.title}
                blurDataURL={post.image.placeholder}
                className="!filter-none"
                objectFit="cover"
                layout="fill"
                loading="lazy"
                placeholder="blur"
              />
            </div>

            {/* when adjusting margin, adjust negative margins on 'img'
                components too, so they remain full width */}
            <div className="m-5 xs:m-8 sm:m-10 sm:text-lg md:m-12 xl:m-16 xl:text-xl 2xl:text-2xl">
              <MDXRemote {...mdx} components={mdxComponents} />
            </div>
          </article>
        </div>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = Array.from((await getPostInfos()).values())

  return {
    fallback: false,
    paths: posts.map(post => ({ params: { slug: post.slug } })),
  }
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const slug = params?.slug as string
  const { post, content } = await getPost(slug)

  return {
    props: {
      mdx: await serialize(content, {
        mdxOptions: {
          rehypePlugins: [
            [imageSize, {}],
            [imagePlaceholder, {}],
          ],
        },
      }),
      post,
    },
  }
}

export default PostPage
