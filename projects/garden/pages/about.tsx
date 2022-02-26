import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { HeaderNav } from '@/components/HeaderNav'
import colors from '@/theme/colors'
import { LazyImage, LazyImageData } from '@/components/LazyImage'
import { makeLazyImage } from '@/tools/images/make-lazy-image'
import { PageMainContainer } from '@/components/PageMainContainer'

interface AboutProps {
  avatar: LazyImageData
}

const headerGradient = { baseColor: colors.cyan[200] }

const About: NextPage<AboutProps> = ({ avatar }) => {
  return (
    <>
      <Head>
        <title>Beyond the Boring | Learning should be fun</title>
        <meta
          name="description"
          content="I’m Merott, and I’m on a mission to make online courses worthy of people’s undivided attention."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNav gradient={headerGradient}>
        <div className="relative mx-auto flex h-36 w-36 overflow-hidden rounded-full bg-cyan-300 md:h-40 md:w-40 tall:lg:h-[200px] tall:lg:w-[200px]">
          <LazyImage image={avatar} />
        </div>
      </HeaderNav>

      <PageMainContainer
        title="Hey there! 👋🏻"
        className="prose-site mx-auto mt-8 flex max-w-3xl flex-col xs:mt-10 lg:mt-16 lg:max-w-4xl"
      >
        <p>
          <strong>I'm Merott</strong>
          <span className="text-sm text-gray-600 xs:text-base md:text-lg lg:text-xl">
            —pronounced like “Merit” and “Scott” mingled.
          </span>
        </p>

        <p>
          I used to write a{' '}
          <Link href="https://coursecreatorsweekly.com">
            <a className="link" rel="noreferrer" target="_blank">
              curated newsletter
            </a>
          </Link>{' '}
          for course creators, sharing hours of insights from over 200 articles,
          podcasts and videos in a concise, digestible format. From
          audience-building and idea validation, to content design, pricing,
          marketing, and way more! 💰
        </p>

        <p>
          But, of everything I wrote about, I found myself most excited and
          drawn to ideas around learning design, student engagement,
          gamification and storytelling in online courses.
        </p>

        <p>
          I decided to double down on the thing that excited me the most. That’s
          what this website is about—feeding my curiosity while helping you
          build powerful, engaging courses.
        </p>

        <p>
          I’m on Twitter{' '}
          <Link href="https://twitter.com/merott">
            <a className="link" rel="noreferrer" target="_blank">
              @merott
            </a>
          </Link>
          . Say hello—my DMs are open!
        </p>
      </PageMainContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  return {
    props: {
      avatar: await makeLazyImage('/img/merott.jpg', 'Merott'),
    },
  }
}

export default About
