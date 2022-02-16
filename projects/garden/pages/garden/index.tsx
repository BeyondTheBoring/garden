import { GetStaticProps, NextPage } from 'next'
import { useState } from 'react'

import BeanSeedling from '@/assets/icons/color/bean-seedling.svg'
import { DigitalGardenExplainer } from '@/components/DigitalGardenExplainer'
import { HeaderNav } from '@/components/HeaderNav'
import { PageMainContainer } from '@/components/PageMainContainer'
import { LinkedArticleCard } from '@/components/LinkedArticleCard'
import colors from '@/theme/colors'
import { fetchAllPostsMetadata } from '@/tools/posts/fetch-posts'
import { PostMetadata } from '@/types/posts'

export type GardenIndexProps = {
  posts: PostMetadata[]
}

const Garden: NextPage<GardenIndexProps> = ({ posts }) => {
  const [showGardenExplainer, setShowGardenExplainer] = useState(false)

  return (
    <>
      <HeaderNav
        gradient={{
          baseColor: colors.green[300],
          lightColor: colors.green[200],
        }}
      >
        <BeanSeedling className="mx-auto w-36 max-w-full drop-shadow-lg md:w-40 tall:lg:w-[200px]" />
      </HeaderNav>

      <PageMainContainer
        title="The Garden"
        className="mt-4 flex flex-col xs:mt-6 lg:mt-10"
      >
        <p className="mx-auto max-w-2xl text-center">
          Ideas around learning experience design, storytelling, and
          gamification, growing over time from tiny seeds to solid trees.
          <button
            className="btn btn-dark ml-2 inline-block rounded-full px-2 pt-[2px] text-xs"
            onClick={() => setShowGardenExplainer(true)}
          >
            WTF?
          </button>
        </p>

        {/* todo: extract this to a component for reusability with "Mentioned In" sections */}
        <ul className="mx-auto mt-8 grid gap-6 sm:gap-8 md:mt-10 md:grid-cols-2 lg:mt-12 xl:mt-14 xl:grid-cols-3 xl:gap-10">
          {posts.map(post => (
            <LinkedArticleCard as="li" key={post.slug} post={post} />
          ))}
        </ul>
      </PageMainContainer>

      <DigitalGardenExplainer
        open={showGardenExplainer}
        onClose={() => setShowGardenExplainer(false)}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps<GardenIndexProps> = async () => {
  const allPosts = await fetchAllPostsMetadata(true)

  const posts = allPosts.sort((a, b) =>
    a.date.updated > b.date.updated ? -1 : 1,
  )

  return {
    props: {
      posts,
    },
  }
}

export default Garden
