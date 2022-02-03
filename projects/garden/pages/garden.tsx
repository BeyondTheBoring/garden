import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import BeanSeedling from '@/assets/icons/color/bean-seedling.svg'
import Almond from '@/assets/icons/outline/almond.svg'
import Water from '@/assets/icons/outline/water.svg'
import { DigitalGardenExplainer } from '@/components/DigitalGardenExplainer'
import { HeaderNav } from '@/components/HeaderNav'
import { PageMainContainer } from '@/components/PageMainContainer'
import colors from '@/theme/colors'
import { useState } from 'react'

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
  const [showGardenExplainer, setShowGardenExplainer] = useState(true)

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

      <PageMainContainer
        title="The Garden"
        className="flex flex-col mt-4 xs:mt-6 lg:mt-10"
      >
        <p className="max-w-2xl mx-auto text-center">
          Ideas around learning experience design, storytelling, and
          gamification, growing over time from tiny seeds to solid trees.
          <button
            className="btn btn-dark inline-block ml-2 px-2 text-xs rounded-full pt-px"
            onClick={() => setShowGardenExplainer(true)}
          >
            WTF?
          </button>
        </p>

        <ul className="mt-8 mx-auto grid gap-6 sm:gap-8 md:mt-10 md:grid-cols-2 lg:mt-12 xl:mt-14 xl:grid-cols-3 xl:gap-10">
          {posts.map(({ id, title, description, image }) => (
            <li
              key={id}
              className="relative max-w-md bg-white overflow-hidden rounded-3xl shadow transition-all duration-150 ease-out hover:-translate-y-1 hover:-translate-x-px hover:shadow-md focus-within:-translate-y-1 focus-within:-translate-x-px focus-within:ring ring-offset-2 ring-offset-white ring-gray-900"
            >
              <Link href="#">
                <a className="flex flex-col w-full h-full" aria-label={title}>
                  <div className="flex-1 flex flex-col m-4 xs:m-7">
                    <h2 className="text-base font-bold xs:text-lg sm">
                      {title}
                    </h2>

                    <p className="mt-2 text-sm line-clamp-3 xs:mt-3 xs:text-base">
                      {description}
                    </p>

                    <div className="mt-auto">
                      <div className="mt-5 flex space-x-6 text-xxs font-medium uppercase text-gray-500 xs:text-xs">
                        <div className="flex">
                          <Almond
                            className="w-4 h-4 xs:w-5 xs:h-5"
                            role="img"
                            aria-label="Growth stage"
                          />
                          <div className="ml-1">Seed</div>
                        </div>

                        <div className="flex">
                          <Water
                            className="w-4 h-4 xs:w-5 xs:h-5"
                            role="img"
                            aria-label="Last tended"
                          />
                          <div className="ml-1">2 months ago</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="-order-1 aspect-w-7 aspect-h-4 bg-gray-200 shadow select-none">
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
