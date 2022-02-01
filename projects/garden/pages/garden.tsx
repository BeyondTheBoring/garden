import { HeaderNav } from '@/components/HeaderNav'
import colors from '@/theme/colors'
import { NextPage } from 'next'

import BeanSeedling from '@/assets/icons/color/bean-seedling.svg'
import { PageMainContainer } from '@/components/PageMainContainer'

const Garden: NextPage = () => {
  return (
    <>
      <HeaderNav
        gradient={{
          baseColor: colors.green[300],
          lightColor: colors.green[200],
        }}
      >
        <BeanSeedling className="w-36 md:w-40 tall:lg:w-[200px] max-w-full mx-auto drop-shadow-lg" />
      </HeaderNav>

      <PageMainContainer title="The Garden" className="mt-4 xs:mt-6 lg:mt-10">
        <p className="max-w-2xl mx-auto text-center">
          Ideas around learning experience design, storytelling, and
          gamification, growing over time from tiny seeds to solid trees.
          <button className="btn btn-dark inline-block ml-2 px-2 text-xs rounded-full pt-px">
            WTF?
          </button>
        </p>

        {/* <div className="w-16 h-96 bg-white rounded-lg">It's coming</div> */}
      </PageContainer>
    </>
  )
}

export default Garden
