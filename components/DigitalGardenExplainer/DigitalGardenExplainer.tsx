import Image from 'next/image'

import { PopupPanel } from '@/components/PopupPanel'
import digitalGardenImg from './digital-garden.png'
import colors from '@/theme/colors'
import { useEffect, useRef } from 'react'
import { usePlausible } from '@/components/Plausible'

export type DigitalGardenExplainerProps = {
  open: boolean
  onClose: () => void
}

export default function DigitalGardenExplainer({
  open,
  onClose,
}: DigitalGardenExplainerProps) {
  const plausible = usePlausible()
  const contentRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      plausible('view garden explainer')
    }
  }, [open, plausible])

  return (
    <PopupPanel
      open={open}
      onClose={onClose}
      title="A Digital Garden"
      initialFocus={contentRef}
      headerConfig={{
        baseColor: colors.green[100],
        lightColor: colors.green[50],
        headerShadow: 'drop-shadow-[0px_1px_2px_#bef264]',
      }}
    >
      <div className="prose-site" ref={contentRef}>
        <p>
          Imagine a blog, but a <em>living and breathing</em> one! 🌱
        </p>
        <p>
          A collection of notes, ideas and explorations starting as tiny seeds,
          and cultivated over time until they grow into solid, reliable trees.
        </p>
        <p>
          Not every seed survives, not every tree produces fruit, and the work
          is never complete. It's always in progress.
        </p>
      </div>

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

      <div className="prose-site">
        <p>Here are the different stages of growth and what they mean:</p>

        <ul className="mt-3 ml-5 list-disc">
          <li className="mt-1 md:mt-2">
            <strong className="text-gray-900">Seed:</strong> the spark of an
            idea / prone to dying
          </li>
          <li className="mt-1 md:mt-2">
            <strong className="text-gray-900">Seedling:</strong> a promising
            idea / worth exploring
          </li>
          <li className="mt-1 md:mt-2">
            <strong className="text-gray-900">Sapling:</strong> a growing idea /
            starting to take shape
          </li>
          <li className="mt-1 md:mt-2">
            <strong className="text-gray-900">Tree:</strong> a fully-grown idea
            / shaped and clarified
          </li>
          <li className="mt-1 md:mt-2">
            <strong className="text-gray-900">Fruit:</strong> a product to sell
            / rich in value
          </li>
        </ul>

        <p>
          Every post on Beyond the Boring will display its growth status, the
          date on which it was ‘planted’, and most importantly, when it was last
          ‘tended to.’
        </p>

        {/* todo: [ADD SCREENSHOT INDICATING GROWTH STAGE + DATES] */}
        <p>
          If you’re curious to learn more, check out{' '}
          <a
            className="link"
            href="https://maggieappleton.com/garden-history"
            target="_blank"
            rel="noreferrer"
          >
            A Brief History & Ethos of the Digital Garden by Maggie Appleton
          </a>
          .
        </p>
      </div>
    </PopupPanel>
  )
}
