import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import BeanSeedling from '@/assets/icons/color/bean-seedling.svg'
import Water from '@/assets/icons/outline/water.svg'
import { DigitalGardenExplainer } from '@/components/DigitalGardenExplainer'
import { HeaderNav } from '@/components/HeaderNav'
import { PageMainContainer } from '@/components/PageMainContainer'
import colors from '@/theme/colors'
import { useState } from 'react'
import { GrowthStageIcon } from '@/components/GrowthStageIcon'
import { GrowthStage } from '@/enums/GrowthStage'

const posts = [
  {
    id: 1,
    title: 'The Thrill of Learning',
    description:
      'What would it take for learning to be as thrilling as a video game or a blockbuster movie?',
    image:
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
  },
  {
    id: 2,
    title: 'The Thrill of Learning',
    description:
      'What would it take for learning to be as thrilling as a video game or a blockbuster movie?',
    image:
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
  },
  {
    id: 3,
    title: 'The Thrill of Learning',
    description:
      'What would it take for learning to be as thrilling as a video game or a blockbuster movie or a blockbuster movie or a blockbuster movie or a blockbuster movie or a blockbuster movie?',
    image:
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
  },
  {
    id: 4,
    title: 'The Thrill of Learning',
    description:
      'What would it take for learning to be as thrilling as a video game or a blockbuster movie?',
    image:
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
  },
  {
    id: 5,
    title: 'The Thrill of Learning',
    description:
      'What would it take for learning to be as thrilling as a video game or a blockbuster movie or a blockbuster movie or a blockbuster movie or a blockbuster movie or a blockbuster movie?',
    image:
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80',
  },
]

const Garden: NextPage = () => {
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
            className="btn btn-dark ml-2 inline-block rounded-full px-2 pt-px text-xs"
            onClick={() => setShowGardenExplainer(true)}
          >
            WTF?
          </button>
        </p>

        <ul className="mx-auto mt-8 grid gap-6 sm:gap-8 md:mt-10 md:grid-cols-2 lg:mt-12 xl:mt-14 xl:grid-cols-3 xl:gap-10">
          {posts.map(({ id, title, description, image }) => (
            <li
              key={id}
              className="relative max-w-md overflow-hidden rounded-3xl bg-white shadow ring-gray-900 ring-offset-2 ring-offset-white transition-all duration-150 ease-out focus-within:-translate-y-1 focus-within:-translate-x-px focus-within:ring hover:-translate-y-1 hover:-translate-x-px hover:shadow-md"
            >
              <Link href="#">
                <a className="flex h-full w-full flex-col" aria-label={title}>
                  <div className="m-4 flex flex-1 flex-col xs:m-7">
                    <h2 className="sm text-base font-bold xs:text-lg">
                      {title}
                    </h2>

                    <p className="mt-2 text-sm line-clamp-3 xs:mt-3 xs:text-base">
                      {description}
                    </p>

                    <div className="mt-auto">
                      <div className="mt-5 flex space-x-6 text-xxs font-medium uppercase text-gray-500 xs:text-xs">
                        <div className="flex">
                          <GrowthStageIcon
                            stage={GrowthStage.Seed}
                            className="h-4 w-4 xs:h-5 xs:w-5"
                          />
                          <div className="ml-1">Seed</div>
                        </div>

                        <div className="flex">
                          <Water
                            className="h-4 w-4 xs:h-5 xs:w-5"
                            role="img"
                            aria-label="Last tended"
                          />
                          <div className="ml-1">2 months ago</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="aspect-w-16 aspect-h-9 -order-1 select-none bg-gray-200 shadow">
                    <Image
                      src={image}
                      alt={title}
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                </a>
              </Link>
            </li>
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

export default Garden
