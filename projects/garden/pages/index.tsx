import { Popover, Transition } from '@headlessui/react'
import { MenuAlt3Icon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'

import { Container } from '@/components/Container'
import { Monster } from '@/components/Monster'
import { MonsterEye } from '@/components/MonsterEye'
import { SlopedRadial } from '@/components/SlopedRadial'

const navLinks: Array<{ title: string; href: string }> = [
  { title: 'The Garden', href: '#' },
  { title: 'Work Together', href: '#' },
  { title: 'About', href: '#' },
]

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Beyond the Boring | Learning should be fun</title>
        <meta
          name="description"
          content="I'm Merott, and I'm on a mission to make online courses worthy of people's undivided attention."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="relative h-[240px] tall:lg:h-[320px]">
        <SlopedRadial color="yellow" />
        <Container>
          <nav className="flex pt-5 justify-between items-center md:pt-6 lg:pt-7">
            <Link href="/">
              <a className="flex space-x-3 items-center font-hand tracking-[-0.08em] text-lg lg:text-[22px] lg:space-x-5">
                <MonsterEye className="h-6 lg:h-8" />
                <span className="leading-tight mt-[.2em]">
                  Beyond the Boring
                </span>
              </a>
            </Link>

            <Popover className="flex items-center relative sm:hidden z-10">
              <Popover.Button className="rounded-lg p-1 -m-1 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700">
                <MenuAlt3Icon className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">Open navigation menu</span>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel className="absolute top-2 right-5 bg-white py-2 shadow-md rounded-2xl ring-1 ring-gray-900 ring-opacity-5 overflow-hidden">
                  <ul className="flex flex-col">
                    {navLinks.map(link => (
                      <li key={link.title}>
                        <Link href={link.href}>
                          <a className="block py-2 px-6 whitespace-nowrap font-medium focus:outline-none hover:bg-yellow-200 focus:bg-yellow-200">
                            {link.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Popover.Panel>
              </Transition>
            </Popover>

            <ul className="hidden sm:flex space-x-5 items-center text-sm md:space-x-8 lg:space-x-10 xl:space-x-12 md:text-base">
              {navLinks.map(link => (
                <li key={link.title}>
                  <Link href={link.href}>
                    <a className="text-gray-800 hover:text-gray-900 focus:text-gray-900">
                      {link.title}
                    </a>
                  </Link>
                </li>
              ))}
              <li>
                <button className="btn btn-dark rounded-full px-3 py-1 md:px-5 md:py-1.5 text-xs lg:text-sm">
                  Subscribe
                </button>
              </li>
            </ul>
          </nav>
        </Container>

        <div className="absolute w-full -bottom-5">
          <Monster className="w-36 md:w-40 tall:lg:w-[200px] max-w-full mx-auto drop-shadow-lg" />
        </div>
      </header>

      <Container>
        <main className="my-14 max-w-3xl mx-auto text-gray-700 xs:my-16 xs:text-lg lg:my-20 lg:max-w-4xl lg:text-xl xl:my-24">
          <h1 className="text-2xl font-bold tracking-tighter text-center text-gray-900 xs:text-3xl lg:text-4xl xl:text-5xl">
            Learning should be fun
          </h1>

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
              Beyond the Boring is a digital garden 🌱 feeding my curiosity
              while helping you{' '}
              <b className="text-gray-900">
                build powerful, thrilling courses.
              </b>
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
            <Link href="#">
              <a className="btn btn-dark rounded-full py-2.5 px-6 text-sm xs:py-3 xs:px-7 xs:text-base lg:py-4 lg:px-9 lg:text-lg">
                Visit the Garden
              </a>
            </Link>
          </div>
        </main>
      </Container>
    </div>
  )
}

export default Home
