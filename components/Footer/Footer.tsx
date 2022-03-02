import Link from 'next/link'
import { useState } from 'react'

import { Container } from '@/components/Container'
import { PatternedRadial } from '@/components/PatternedRadial'
import { SubscribePanel } from '@/components/SubscribePanel'
import colors from '@/theme/colors'
import PaperPlane from '@/assets/icons/outline/paper-plane.svg'

const navLinks: Array<{ title: string; href: string }> = [
  { title: 'The Garden', href: '/garden' },
  { title: 'Work Together', href: '/work-together' },
  { title: 'About', href: '/about' },
]

export interface FooterProps {}

export default function Footer({}: FooterProps) {
  const [showSubscriptionPanel, setShowSubscriptionPanel] = useState(false)

  return (
    <footer className="relative mt-10 text-white sm:mt-16 lg:mt-20 xl:mt-24">
      <PatternedRadial baseColor={colors.gray[900]} lightAlpha={0.025} />

      <Container className="relative mx-auto flex flex-col py-10 text-gray-100 sm:text-lg md:flex-row lg:py-12 -md:!px-0">
        <Container className="md:w-5/12 md:!px-0">
          <p className="text-center font-hand text-2xl font-bold text-white md:text-left">
            <span className="tracking-tight">Beyond the Boring</span>
          </p>

          <div className="mt-5 flex items-end justify-between">
            <nav>
              <ul className="flex flex-col space-y-3 leading-none sm:space-y-4">
                {navLinks.map(link => (
                  <li key={link.title}>
                    <Link href={link.href}>
                      <a>{link.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* <ul className="mt-6 flex space-x-4">
              <li>
                <Link href="https://twitter.com/merott">
                  <a
                    aria-label="Twitter"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                  >
                    <TwitterIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Link>
              </li>
            </ul> */}
          </div>
        </Container>

        <hr className="my-8 border-gray-200 opacity-5 md:hidden" />

        <Container className="md:w-7/12 md:!px-0">
          <p className="flex items-center text-lg font-bold leading-none sm:text-xl">
            Get the newsletter
            <PaperPlane
              className="ml-1 inline-block h-5 w-5"
              aria-hidden="true"
            />
          </p>

          <p className="sm:text-l mt-4">
            Follow along while I explore ideas in learning experience design,
            student engagement, gamification, storytelling and more to build
            powerful, engaging courses.
          </p>

          <button
            className="btn btn-primary btn-flat mt-6 ml-auto rounded-xl px-5 py-2.5 text-sm leading-none focus:bg-yellow-200 md:rounded-2xl md:px-7 md:text-base"
            type="button"
            onClick={() => setShowSubscriptionPanel(true)}
          >
            Subscribe
          </button>
        </Container>
      </Container>

      <SubscribePanel
        onClose={() => setShowSubscriptionPanel(false)}
        open={showSubscriptionPanel}
      />
    </footer>
  )
}
