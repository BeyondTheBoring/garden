import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Fragment, MutableRefObject } from 'react'

import { WavyHeader, WavyHeaderProps } from '@/components/WavyHeader'
import colors from '@/theme/colors'

export interface PopupPanelProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  initialFocus?: MutableRefObject<HTMLElement | null>
  headerConfig?: WavyHeaderProps
}

export default function PopupPanel({
  title,
  children,
  open,
  onClose,
  initialFocus,
  headerConfig = {
    baseColor: colors.yellow[100],
    lightColor: colors.yellow[100],
  },
}: PopupPanelProps) {
  return (
    <Transition.Root as={Fragment} show={open}>
      <Dialog
        open={open}
        onClose={onClose}
        initialFocus={initialFocus}
        className="fixed inset-3 z-20 xs:inset-5"
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
          <div className="relative ml-auto flex h-full w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-gray-50 shadow-2xl">
            <WavyHeader
              {...headerConfig}
              className="px-8 pt-6 pb-10 md:pt-8 md:pb-14"
            >
              <div className="flex items-center">
                <Dialog.Title className="text-xl font-bold text-gray-900 md:text-2xl">
                  {title}
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
              className="relative -mt-4 flex-1 overflow-y-scroll px-8 py-10 md:-mt-8 md:px-10 md:py-14 md:text-lg"
            >
              {children}
            </Dialog.Description>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
