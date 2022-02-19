import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import ArrowRight from '@/assets/icons/filled/arrow-right.svg'
import { HeaderNav } from '@/components/HeaderNav'
import { Monster } from '@/components/Monster'
import colors from '@/theme/colors'
import { PageMainContainer } from '@/components/PageMainContainer'

const headerGradient = {
  baseColor: colors.yellow[300],
  lightColor: colors.yellow[200],
}

const Home: NextPage = () => {
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
        <Monster className="mx-auto w-36 max-w-full drop-shadow-lg md:w-40 tall:lg:w-[200px]" />
      </HeaderNav>

      <PageMainContainer
        title="Learning should be fun"
        className="prose-site mx-auto max-w-3xl lg:max-w-4xl"
      >
        <div className="mt-8 xs:mt-10 lg:mt-14 xl:mt-16">
          <p>
            <b className="text-gray-900">
              No one wants another boring “online course.”
            </b>
          </p>

          <p>
            But, everyone loves a fascinating{' '}
            <b className="text-gray-900">story</b>, a compelling{' '}
            <b className="text-gray-900">game</b>, or a unique{' '}
            <b className="text-gray-900">adventure</b>.
          </p>

          <p>
            I’m Merott, and I’m on a mission to{' '}
            <b className="text-gray-900">
              make online courses worthy of people’s undivided attention.{' '}
            </b>
            Beyond the Boring is a digital garden 🌱 feeding my curiosity while
            helping you{' '}
            <b className="text-gray-900">build powerful, thrilling courses.</b>
          </p>

          <p>
            You’ll find ideas around{' '}
            <b className="text-gray-900">
              learning experience design, storytelling, gamification,
            </b>{' '}
            and how you might{' '}
            <b className="text-gray-900">apply them to your own courses.</b>
          </p>
        </div>

        <h2 className="mt-8 text-xl font-bold text-gray-900 xs:mt-12 xs:text-2xl lg:mt-20 lg:text-3xl">
          The Garden 🌱
        </h2>

        <p>Imagine a blog, but a living and breathing one.</p>

        <p>
          Ideas start as tiny seeds, cultivated over time until they grow into
          solid, reliable trees.
        </p>

        <p>
          Not every seed survives, and the work is never complete. Even the
          trees need regular grooming to keep them healthy and fruitful.
        </p>

        <div className="mt-6 text-center xs:mt-8 lg:mt-10">
          <Link href="/garden">
            <a className="btn btn-dark inline-flex items-center rounded-full py-2.5 px-6 text-sm xs:py-3 xs:px-7 xs:text-base lg:py-4 lg:px-9 lg:text-lg">
              <span>Visit the Garden</span>
              <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
            </a>
          </Link>
        </div>
      </PageMainContainer>
    </>
  )
}

export default Home
