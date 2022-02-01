import Link from 'next/link'
import { Fragment, ReactElement } from 'react'

import Fingerprint from '@/assets/icons/outline/fingerprint.svg'
import Leaf from '@/assets/icons/outline/leaf.svg'
import TriangleCircle from '@/assets/icons/outline/triangle-circle.svg'
import { SlopedRadial, SlopedRadialProps } from '@/components/SlopedRadial'
import { Container } from '@/components/Container'
import { MonsterEye } from '@/components/MonsterEye'
import { Popover, Transition } from '@headlessui/react'
import MenuAlt3Icon from '@heroicons/react/outline/MenuAlt3Icon'
import classnames from 'classnames'

const navLinks: Array<{
  title: string
  href: string
  icon: ReactElement
}> = [
  {
    title: 'The Garden',
    href: '/garden',
    icon: <Leaf className="w-6 h-6" />,
  },
  {
    title: 'Work Together',
    href: '/work-together',
    icon: <TriangleCircle className="w-6 h-6" />,
  },
  {
    title: 'About',
    href: '/about',
    icon: <Fingerprint className="w-6 h-6" />,
  },
]

export type HeaderNavProps = {
  children?: React.ReactNode
  gradient?: SlopedRadialProps
}

export default function HeaderNav({ children, gradient }: HeaderNavProps) {
  return (
    <header
      className={classnames('relative', {
        'h-[240px] tall:lg:h-[320px]': gradient,
      })}
    >
      {gradient && <SlopedRadial {...gradient} />}

      <Container>
        <nav className="flex pt-5 justify-between items-center md:pt-6 lg:pt-7">
          <Link href="/">
            <a className="flex space-x-3 items-center font-hand tracking-[-0.08em] text-lg lg:text-[22px] lg:space-x-5">
              <MonsterEye className="h-6 lg:h-8" />
              <span className="leading-tight mt-[.2em]">Beyond the Boring</span>
            </a>
          </Link>

          <Popover className="flex items-center relative sm:hidden z-10">
            <Popover.Button className="rounded-lg p-1 -m-1 text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800">
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
                        <a className="flex items-center py-2 pl-6 pr-10 space-x-4 whitespace-nowrap font-medium text-gray-800 focus:outline-none hover:bg-yellow-200 focus:bg-yellow-200">
                          <span className="inline-block">{link.icon}</span>
                          <span>{link.title}</span>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Popover.Panel>
            </Transition>
          </Popover>

          <ul className="hidden sm:flex space-x-4 items-center text-sm md:space-x-8 lg:space-x-10 xl:space-x-12 md:text-base">
            {navLinks.map(link => (
              <li key={link.title}>
                <Link href={link.href}>
                  <a className="flex items-center space-x-2 text-gray-800 hover:text-gray-900 focus:text-gray-900 subpixel-antialiased">
                    <span className="hidden lg:inline-block">{link.icon}</span>
                    <span>{link.title}</span>
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

      {children && <div className="absolute w-full -bottom-5">{children}</div>}
    </header>
  )
}
