import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

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

      <header className="relative h-[320px]">
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
            <ul className="hidden sm:flex space-x-6 items-center text-sm md:space-x-8 md:text-base">
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
                {/* <SubscribeButton
                  variant="dark"
                  className="px-4 py-1 rounded-full lg:px-5 lg:py-1.5"
                >
                  Subscribe
                </SubscribeButton> */}
                <button>Subscribe</button>
              </li>
            </ul>
          </nav>
        </Container>

        <div className="absolute w-full -bottom-5">
          <Monster className="w-4/12 xs:w-40 tall:lg:w-[200px] max-w-full mx-auto" />
        </div>
      </header>

      <main>
        <h1 className="text-gray-900">Learning should be fun</h1>

        <p>
          <b>No one wants another boring “online course.”</b>
        </p>
        <p>
          But, everyone loves a fascinating <b>story</b>, a compelling{' '}
          <b>game</b>, or a unique <b>adventure</b>.
        </p>
        <p>
          I'm Merott, and I'm on a mission to{' '}
          <b>make online courses worthy of people's undivided attention. </b>
          Beyond the Boring is a digital garden 🌱 feeding my curiosity while
          helping you build <b>powerful, thrilling courses.</b>
        </p>
        <p>
          You'll find ideas around{' '}
          <b>learning experience design, storytelling, gamification,</b> and how
          you might <b>apply them to your own courses.</b>
        </p>

        <h2>The Garden 🌱</h2>

        <p>Imagine a blog, but a living and breathing one.</p>
        <p>
          Ideas start as tiny seeds, cultivated over time until they grow into
          solid, reliable trees.
        </p>
        <p>
          Not every seed survives, and the work is never complete. Even the
          trees need regular grooming to keep them healthy and fruitful.
        </p>

        <a href="/garden">Visit the Garden</a>
      </main>
    </div>
  )
}

export default Home
