import { Popover, Transition } from '@headlessui/react'
import MenuAlt3Icon from '@heroicons/react/outline/MenuAlt3Icon'
import classnames from 'classnames'
import Link from 'next/link'
import { Fragment, ReactElement, useState } from 'react'

import Fingerprint from '@/assets/icons/outline/fingerprint.svg'
import Leaf from '@/assets/icons/outline/leaf.svg'
import PaperPlane from '@/assets/icons/outline/paper-plane.svg'
import TriangleCircle from '@/assets/icons/outline/triangle-circle.svg'
import { SlopedRadial, SlopedRadialProps } from '@/components/SlopedRadial'
import { Container } from '@/components/Container'
import { MonsterEye } from '@/components/MonsterEye'
import { SubscribePanel } from '@/components/SubscribePanel'

const navLinks: Array<{
  title: string
  href: string
  icon: ReactElement
}> = [
  {
    title: 'The Garden',
    href: '/garden',
    icon: <Leaf className="h-6 w-6" />,
  },
  {
    title: 'Work Together',
    href: '/work-together',
    icon: <TriangleCircle className="h-6 w-6" />,
  },
  {
    title: 'About',
    href: '/about',
    icon: <Fingerprint className="h-6 w-6" />,
  },
]

export type HeaderNavProps = {
  children?: React.ReactNode
  gradient?: SlopedRadialProps
}

export default function HeaderNav({ children, gradient }: HeaderNavProps) {
  const [showSubscriptionPanel, setShowSubscriptionPanel] = useState(false)

  return (
    <header
      className={classnames('relative', {
        'h-[240px] tall:lg:h-[320px]': gradient,
        'border-b border-gray-200': !gradient,
      })}
    >
      {gradient && <SlopedRadial {...gradient} />}

      <Container>
        <nav
          className={classnames(
            { 'pb-5 md:pb-6 lg:pb-7': !gradient },
            'flex items-center justify-between pt-5 md:pt-6 lg:pt-7',
          )}
        >
          <Link href="/">
            <a className="flex items-center space-x-3 font-hand text-lg font-bold tracking-tight text-gray-900 lg:space-x-5 lg:text-[22px]">
              <MonsterEye className="h-6 lg:h-8" />
              <span className="mt-[.2em] leading-tight tracking-tight">
                Beyond the Boring
              </span>
            </a>
          </Link>

          <Popover className="relative z-10 flex items-center sm:hidden">
            <Popover.Button className="btn-icon">
              <MenuAlt3Icon className="h-5 w-5" aria-hidden="true" />
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
              <Popover.Panel className="absolute top-2 right-5 overflow-hidden rounded-2xl bg-white py-2 shadow-md ring-1 ring-gray-900 ring-opacity-5">
                <ul className="flex flex-col">
                  {navLinks.map(link => (
                    <li key={link.title}>
                      <Link href={link.href} passHref>
                        <Popover.Button
                          as="a"
                          className="flex w-full items-center space-x-4 whitespace-nowrap py-2 pl-6 pr-10 font-medium text-gray-800 hover:bg-yellow-200 focus:bg-yellow-200 focus:outline-none"
                        >
                          <span className="inline-block">{link.icon}</span>
                          <span>{link.title}</span>
                        </Popover.Button>
                      </Link>
                    </li>
                  ))}
                  <hr className="my-2 border-gray-200" />
                  <li>
                    <button
                      className="flex w-full items-center space-x-4 whitespace-nowrap py-2 pl-6 pr-10 font-medium text-cyan-800 hover:bg-yellow-200 focus:bg-yellow-200 focus:outline-none"
                      onClick={() => {
                        console.log('->', 'hey there')
                        setShowSubscriptionPanel(true)
                      }}
                    >
                      <span className="inline-block">
                        <PaperPlane className="h-6 w-6" />
                      </span>
                      <span>Subscribe</span>
                    </button>
                  </li>
                </ul>
              </Popover.Panel>
            </Transition>
          </Popover>

          <ul className="hidden items-center space-x-3 text-sm sm:flex md:space-x-6 md:text-base lg:space-x-10 xl:space-x-12">
            {navLinks.map(link => (
              <li key={link.title}>
                <Link href={link.href}>
                  <a className="flex items-center space-x-2 text-gray-800 subpixel-antialiased hover:text-gray-900 focus:text-gray-900">
                    <span className="hidden lg:inline-block">{link.icon}</span>
                    <span>{link.title}</span>
                  </a>
                </Link>
              </li>
            ))}
            <li className="text-xxs md:text-xs lg:text-sm">
              <button
                type="button"
                className="btn btn-dark ml-2 rounded-full px-3 py-1.5 leading-none md:px-4 md:py-2 lg:px-5 lg:py-2.5"
                onClick={() => setShowSubscriptionPanel(true)}
              >
                Subscribe
              </button>
            </li>
          </ul>
        </nav>
      </Container>

      {children && <div className="absolute -bottom-5 w-full">{children}</div>}

      <SubscribePanel
        onClose={() => setShowSubscriptionPanel(false)}
        open={showSubscriptionPanel}
      />
    </header>
  )
}
