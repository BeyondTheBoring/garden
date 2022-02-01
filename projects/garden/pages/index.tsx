import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import ArrowRight from '@/assets/icons/filled/arrow-right.svg'
import { Container } from '@/components/Container'
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
          content="I'm Merott, and I'm on a mission to make online courses worthy of people's undivided attention."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNav gradient={headerGradient}>
        <Monster className="w-36 md:w-40 tall:lg:w-[200px] max-w-full mx-auto drop-shadow-lg" />
      </HeaderNav>

      <PageMainContainer title="Learning should be fun">
        <div className="mt-8 xs:mt-10 lg:mt-14 xl:mt-16">
          <p>
            <b className="text-gray-900">
              No one wants another boring “online course.”
            </b>
          </p>

          <p className="mt-2 xs:mt-3 lg:mt-5">
            But, everyone loves a fascinating{' '}
            <b className="text-gray-900">story</b>, a compelling{' '}
            <b className="text-gray-900">game</b>, or a unique{' '}
            <b className="text-gray-900">adventure</b>.
          </p>

          <p className="mt-2 xs:mt-3 lg:mt-5">
            I'm Merott, and I'm on a mission to{' '}
            <b className="text-gray-900">
              make online courses worthy of people's undivided attention.{' '}
            </b>
            Beyond the Boring is a digital garden 🌱 feeding my curiosity while
            helping you{' '}
            <b className="text-gray-900">build powerful, thrilling courses.</b>
          </p>

          <p className="mt-2 xs:mt-3 lg:mt-5">
            You'll find ideas around{' '}
            <b className="text-gray-900">
              learning experience design, storytelling, gamification,
            </b>{' '}
            and how you might{' '}
            <b className="text-gray-900">apply them to your own courses.</b>
          </p>
        </div>

        <h2 className="mt-8 text-lg font-bold text-gray-900 xs:mt-12 xs:text-xl lg:mt-20 lg:text-2xl">
          The Garden 🌱
        </h2>

        <p className="mt-2 xs:mt-3 lg:mt-5">
          Imagine a blog, but a living and breathing one.
        </p>

        <p className="mt-2 xs:mt-3 lg:mt-5">
          Ideas start as tiny seeds, cultivated over time until they grow into
          solid, reliable trees.
        </p>

        <p className="mt-2 xs:mt-3 lg:mt-5">
          Not every seed survives, and the work is never complete. Even the
          trees need regular grooming to keep them healthy and fruitful.
        </p>

        <div className="text-center mt-5 xs:mt-8 lg:mt-10">
          <Link href="/garden">
            <a className="btn btn-dark inline-flex items-center rounded-full py-2.5 px-6 text-sm xs:py-3 xs:px-7 xs:text-base lg:py-4 lg:px-9 lg:text-lg">
              <span>Visit the Garden</span>
              <ArrowRight className="ml-2 w-5 h-5 lg:w-6 lg:h-6" />
            </a>
          </Link>
        </div>
      </PageMainContainer>
    </>
  )
}

export default Home
