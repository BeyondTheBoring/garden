import { usePlausible } from 'next-plausible'
import { FormEventHandler, useEffect, useRef, useState } from 'react'

import Confetti from '@/assets/icons/color/confetti.svg'
import PaperPlane from '@/assets/icons/color/paper-plane.svg'
import { PopupPanel } from '@/components/PopupPanel'
import { Via } from '@/lib/enums/Via'
import colors from '@/theme/colors'
import { XCircleIcon } from '@heroicons/react/outline'
import { SpinnerButton } from '@/components/SpinnerButton'

type Status =
  | 'idle'
  | 'subscribing'
  | 'pending_confirm'
  | 'subscribed'
  | 'error'
const genericError = 'Something went wrong. Please try again.'

export interface SubscribePanelProps {
  open: boolean
  onClose: () => void
}

export default function SubscribePanel({ open, onClose }: SubscribePanelProps) {
  const plausible = usePlausible()
  const nameInputRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const done = status === 'pending_confirm' || status === 'subscribed'

  useEffect(() => {
    // reset when opening the panel
    if (open) {
      setName('')
      setEmail('')
      setStatus('idle')

      plausible('view subscription panel')
    }
  }, [open, plausible])

  const subscribe: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    setStatus('subscribing')

    try {
      const response = await fetch('/api/subscribe', {
        body: JSON.stringify({
          email,
          name,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          via: Via.btb,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })

      if (response.status !== 200) {
        throw new Error(genericError)
      }

      plausible('subscribe')

      const { requiresConfirmation } = await response.json()
      setStatus(requiresConfirmation ? 'pending_confirm' : 'subscribed')
    } catch (error) {
      setStatus('error')
      setError(error instanceof Error ? error.message : genericError)
    }
  }

  const subscriptionForm = !done && (
    <form className="flex flex-col" onSubmit={subscribe}>
      <div className="text-base md:text-lg">
        <label className="flex flex-col">
          <span className="flex items-center justify-between">
            <span>Your first name</span>
            <span className="font-hand text-xxs font-bold text-gray-500 xxs:text-xs">
              What do friends call you?
            </span>
          </span>
          <input
            className="mt-1.5 rounded-xl border border-gray-200 px-4 py-1.5 shadow-sm transition duration-200 hover:border-gray-300 focus:border-yellow-300 focus:shadow-yellow-300 focus:outline-none md:rounded-2xl md:px-5 md:py-2.5"
            type="name"
            placeholder="Mario"
            ref={nameInputRef}
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>

        <label className="mt-4 flex flex-col">
          <span className="flex items-center justify-between">
            <span>Your email address</span>
            <span className="font-hand text-xxs font-bold text-gray-500 xxs:text-xs">
              No spam, ever.
            </span>
          </span>
          <input
            className="mt-1.5 rounded-xl border border-gray-200 px-4 py-1.5 shadow-sm transition duration-200 hover:border-gray-300 focus:border-yellow-300 focus:shadow-yellow-300 focus:outline-none md:rounded-2xl md:px-5 md:py-2.5"
            type="email"
            placeholder="mario@nintendo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
      </div>

      {status === 'error' && error && (
        <div
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm shadow-red-200 md:rounded-2xl"
          role="alert"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 text-sm font-medium text-red-800">{error}</div>
          </div>
        </div>
      )}

      <div className="ml-auto mt-5 flex space-x-2 md:space-x-3">
        <button
          type="button"
          className="btn btn-plain rounded-xl px-5 py-1.5 text-sm md:rounded-2xl md:py-2 md:px-6 md:text-base"
          onClick={() => onClose()}
          disabled={status === 'subscribing'}
        >
          Cancel
        </button>

        <SpinnerButton
          className="btn btn-primary rounded-xl px-5 py-1.5 text-sm md:rounded-2xl md:py-2 md:px-6 md:text-base"
          type="submit"
          spin={status === 'subscribing'}
          spinnerClassName="w-4 h-4 md:w-5 md:h-5 text-yellow-500"
        >
          Subscribe
        </SpinnerButton>
      </div>
    </form>
  )

  return (
    <PopupPanel
      open={open}
      onClose={onClose}
      title={
        done && name
          ? `You're awesome, ${name.replace(/^./, c => c.toUpperCase())}! 😍`
          : 'Subscribe to BTB, the newsletter 📮'
      }
      initialFocus={nameInputRef}
      headerConfig={{
        baseColor: colors.yellow[100],
        lightColor: colors.yellow[50],
        headerShadow: 'drop-shadow-[0px_1px_2px_#fde28a]',
      }}
    >
      {done ? (
        <div className="mt-8 text-center md:mt-12">
          {status === 'pending_confirm' ? (
            <PaperPlane
              className="mx-auto w-36 md:w-40"
              role="img"
              aria-label="paper plane"
            />
          ) : (
            <Confetti
              className="mx-auto w-36 md:w-40"
              role="img"
              aria-label="confetti"
            />
          )}

          <div className="mt-12 text-gray-900">
            {status === 'pending_confirm' ? (
              <>
                <p className="text-2xl font-bold">
                  Please check your{' '}
                  {email.endsWith('@hey.com') ? 'Imbox' : 'inbox'}…
                </p>
                <p className="mt-2 leading-relaxed md:mt-3">
                  Please click the confirmation link I just sent you… otherwise
                  <br className="hidden sm:block" aria-hidden="true" /> you
                  won't be getting my emails! 😬
                </p>
                <button
                  type="button"
                  className="btn btn-primary mt-6 rounded-xl px-5 py-1.5 text-sm md:mt-10 md:rounded-2xl md:py-2.5 md:px-7 md:text-base"
                  onClick={() => onClose()}
                >
                  Got it, will do now!
                </button>
              </>
            ) : (
              <>
                <p className="leading-relaxed">
                  You're on the list, nothing else to do!
                </p>
                <button
                  type="button"
                  className="btn btn-primary mt-6 rounded-xl px-5 py-1.5 text-sm md:mt-10 md:rounded-2xl md:py-2.5 md:px-7 md:text-base"
                  onClick={() => onClose()}
                >
                  OK, sweet!
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="prose-site">
            <p className="font-medium text-gray-900">
              Exploring ways to build engaging and effective online courses,
              with powerful storytelling, simple gamification, and more! 💡
            </p>

            <p>
              The format of the newsletter and its frequency will evolve over
              time, but I expect to send you no more than one email per week.
            </p>
          </div>
          <div className="mt-8 md:mt-10">{subscriptionForm}</div>
        </>
      )}
    </PopupPanel>
  )
}
