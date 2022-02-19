import type { NextPage } from 'next'
import Head from 'next/head'

import FistBump from '@/assets/icons/color/fist-bump.svg'
import { HeaderNav } from '@/components/HeaderNav'
import colors from '@/theme/colors'
import { PageMainContainer } from '@/components/PageMainContainer'

interface WorkTogetherProps {}

const headerGradient = {
  baseColor: colors.cyan[200],
  lightColor: colors.cyan[100],
}

const WorkTogether: NextPage<WorkTogetherProps> = () => {
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
        <FistBump className="mx-auto w-36 max-w-full drop-shadow-lg md:w-40 tall:lg:w-[200px]" />
      </HeaderNav>

      <PageMainContainer
        title="Let’s work together!"
        className="prose-site mx-auto mt-6 flex max-w-3xl flex-col xs:mt-8 lg:mt-16 lg:max-w-4xl"
      >
        <p>
          If you want to build a course that’s worthy of people’s attention, and
          you enjoy the ideas I share on Beyond the Boring, I’d love to chat
          with you!
        </p>
        <p>
          <strong>No obligations and completely risk-free</strong>—it’s
          Pay-What-You-Want! 💸
        </p>
        <p>
          Pick a time, book that call, and I look forward to chatting with you!
        </p>

        <div className="mx-auto mt-8 h-[750px] w-full max-w-md overflow-hidden rounded-3xl shadow xxs:h-[790px] xs:mt-10 lg:mt-16">
          <iframe
            className="h-full w-full"
            src="https://savvycal.com/merott/virtual-coffee"
          />
        </div>
      </PageMainContainer>
    </>
  )
}

export default WorkTogether
