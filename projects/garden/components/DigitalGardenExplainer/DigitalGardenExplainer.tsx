import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { Fragment } from 'react'

import { WavyHeader } from '@/components/WavyHeader'
import colors from '@/theme/colors'
import digitalGardenImg from './digital-garden.png'

export type DigitalGardenExplainerProps = {
  open: boolean
  onClose: () => void
}
export default function DigitalGardenExplainer({
  open,
  onClose,
}: DigitalGardenExplainerProps) {
  return (
    <Transition.Root as={Fragment} show={open}>
      <Dialog
        open={open}
        onClose={onClose}
        className="fixed inset-3 z-10 xs:inset-5"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-200"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transform transition ease-out duration-300"
          enterFrom="scale-75 translate-x-[110%]"
          enterTo="scale-100 translate-x-0"
          leave="transform transition ease-out duration-300"
          leaveFrom="scale-100 translate-x-0"
          leaveTo="scale-75 translate-x-[110%]"
        >
          <div className="relative ml-auto flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <WavyHeader
              baseColor={colors.green['200']}
              lightColor={colors.green[100]}
              className="px-8 pt-8 pb-10 xl:pt-12 xl:pb-16"
            >
              <div className="flex items-center">
                <Dialog.Title className="text-xl font-bold md:text-2xl xl:text-3xl">
                  A Digital Garden
                </Dialog.Title>
                <button
                  type="button"
                  className="btn-icon ml-auto -mt-5"
                  onClick={onClose}
                >
                  <span className="sr-only">Close panel</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </WavyHeader>

            <Dialog.Description
              as="div"
              className="relative -mt-4 flex-1 overflow-y-scroll px-8 py-6 md:-mt-8 md:px-10 md:py-8 md:text-lg"
            >
              <p className="mt-3 md:mt-5">
                Imagine a blog, but a <em>living and breathing</em> one! 🌱
              </p>
              <p className="mt-3 md:mt-5">
                It’s a collection of notes, ideas and explorations starting as
                tiny seeds, and cultivated over time until they grow into solid,
                reliable trees.
              </p>
              <p className="mt-3 md:mt-5">
                Not every seed survives, and not every tree produces fruit, but
                the work is never complete. Everything is always a work in
                progress.
              </p>
              <div className="-mx-8 my-8 md:-mx-10 md:my-10">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src={digitalGardenImg}
                    alt="Visualization of a digital garden, with a seed growing into a seedling, a sapling, and eventually a solid tree producing products (an apple.)"
                    layout="fill"
                    className="object-cover"
                    placeholder="blur"
                  />
                </div>
              </div>
              <p className="mt-3 md:mt-5">
                Here are the different stages of growth and what they mean:
              </p>
              <ul className="mt-3 ml-5 list-disc">
                <li className="mt-1 md:mt-2">
                  <strong>Seed:</strong> the spark of an idea / prone to dying
                </li>
                <li className="mt-1 md:mt-2">
                  <strong>Seedling:</strong> a promising idea / worth exploring
                </li>
                <li className="mt-1 md:mt-2">
                  <strong>Sapling:</strong> a growing idea / starting to take
                  shape
                </li>
                <li className="mt-1 md:mt-2">
                  <strong>Tree:</strong> a fully-grown idea / shaped and
                  clarified
                </li>
                <li className="mt-1 md:mt-2">
                  <strong>Fruit:</strong> a product to sell / rich in value
                </li>
              </ul>
              <p className="mt-3 md:mt-5">
                Every post on Beyond the Boring will display its growth status,
                the date on which it was ‘planted’, and most importantly, when
                it was last ‘tended to.’
              </p>
              {/* todo: [ADD SCREENSHOT INDICATING GROWTH STAGE + DATES] */}
              <p className="mt-3 md:mt-5">
                If you’re curious to learn more, check out{' '}
                <a
                  className="link"
                  href="https://maggieappleton.com/garden-history"
                  target="_blank"
                  rel="noreferrer"
                >
                  A Brief History & Ethos of the Digital Garden by Maggie
                  Appleton
                </a>
                .
              </p>
            </Dialog.Description>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
