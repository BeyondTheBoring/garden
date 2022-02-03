import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import { WavyHeader } from '@/components/WavyHeader'
import colors from '@/theme/colors'

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
        className="fixed z-10 inset-3 xs:inset-5"
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
          <div className="relative ml-auto w-full h-full max-w-2xl flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden">
            <WavyHeader
              baseColor={colors.green['200']}
              lightColor={colors.green[100]}
              className="p-8 pb-12 md:p-10 md:pb-16"
            >
              <div className="flex items-center">
                <Dialog.Title className="text-xl font-bold md:text-2xl">
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
              className="relative flex-1 -mt-4 px-8 py-6 overflow-y-scroll md:-mt-8 md:px-10 md:py-8 md:text-lg"
            >
              <p className="mt-5 md:mt-7">
                Imagine a blog, but a <em>living and breathing</em> one! 🌱
              </p>
              <p className="mt-5 md:mt-7">
                It's a collection of notes, ideas and explorations that start as
                tiny seeds, and are cultivated over time until they grow into
                solid, reliable trees.
              </p>
              <p className="mt-5 md:mt-7">
                Not every seed survives, and the work is never complete. Even
                the trees need regular grooming to keep them healthy and
                fruitful.
              </p>
              <p className="mt-5 md:mt-7">
                You'll find the growth status of each post where they're listed,
                and also on their individual pages.
              </p>
              <p className="mt-5 md:mt-7">
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
              </ul>
              <p className="mt-5 md:mt-7">
                You'll also find the date on which a post was 'planted', and
                more important than that, when it was last 'tended to.'
              </p>
              {/* todo: [ADD SCREENSHOT INDICATING GROWTH STAGE + DATES] */}
              <p className="mt-5 md:mt-7">
                If you're curious to learn more, check out{' '}
                <a
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
