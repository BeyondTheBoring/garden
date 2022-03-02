import type { NextApiRequest, NextApiResponse } from 'next'

import { Via } from '@/lib/enums/Via'
import {
  BTB_FORM_ID,
  BTB_FORM_AUTO_CONFIRM_ID,
  TALLY_WELCOME_FORM_ID,
} from '@/lib/env'
import { ck } from '@/lib/api/ck/client'

enum SubscriptionResult {
  Cancelled,
  Invalid,
  RequireConfirm,
  Success,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      console.log('/subscribe')
      let result = await subscribe(req.body)

      if (result === SubscriptionResult.Cancelled) {
        console.log(
          'Existing, cancelled subscriber. Trying again with auto-confirm…',
        )

        result = await subscribe(req.body, true)
      }

      if (result === SubscriptionResult.RequireConfirm) {
        return res.status(200).json({ requiresConfirmation: true })
      }

      if (result === SubscriptionResult.Success) {
        return res.status(200).json({ requiresConfirmation: false })
      }
    } else if (req.method === 'GET') {
      const redirectUri = await confirmSubscriber(req.query)
      return res.redirect(302, redirectUri)
    } else {
      return res.status(404).end()
    }
  } catch (error) {
    console.error('ERROR:', error)
    return res.status(500).end()
  }

  return res.status(400).end()
}

async function subscribe(body: NextApiRequest['body'], autoConfirm?: boolean) {
  console.log('->', { body })
  const { name, email, timezone, via } = body

  const requireCompleteInfo = via !== Via.twitter
  const missingInfo = requireCompleteInfo && (!name || !timezone)

  if (!email || missingInfo) {
    console.error(
      `ERROR: Incomplete info: ${JSON.stringify({
        email,
        name,
        timezone,
        via,
      })}`,
    )

    return SubscriptionResult.Invalid
  }

  // if someone is already subscribed, but not explicitly to BTB (from CCW days)
  // they can be added to the BTB *auto-confirm* form (no confirmation email.)
  // if someone is already subscribed to BTB explicitly, they don't need a
  // confirmation, and I'm not going to add them to the BTB auto-confirm either,
  // since they're an active subscriber already.
  const existingSubscriber = await ck.findSubscriber(email)
  const isExistingSubscriberToAutoConfirm =
    existingSubscriber && !existingSubscriber.fields.x_btb_status

  const useAutoConfirm = autoConfirm || isExistingSubscriberToAutoConfirm
  const formId = useAutoConfirm ? BTB_FORM_AUTO_CONFIRM_ID : BTB_FORM_ID

  const response = await ck.subscribe(formId, {
    email,
    name,
    timezone,
    via,
  })

  const { subscription } = await response.json()

  console.log('-> Subscribed:', { subscription })

  if (subscription.state === 'cancelled') {
    // Cancelled subscribers of a form with a double opt-in can't be added back
    // via the CK API (it seems), but they can be added to a single opt-in form.
    // I'll use this as a sign to use auto-confirm.
    return SubscriptionResult.Cancelled
  }

  return useAutoConfirm || existingSubscriber
    ? SubscriptionResult.Success
    : SubscriptionResult.RequireConfirm
}

async function confirmSubscriber(query: NextApiRequest['query']) {
  // https://beyondtheboring.com/api/subscribe?ck_confirm_url={{ confirm_url }}&ck_id={{ subscriber.id }}&ck_name={{ subscriber.first_name | url_encode }}&ck_email={{ subscriber.email_address | url_encode }}

  const { ck_confirm_url, ck_id, ck_name, ck_email, ...otherQueryParams } =
    query

  if (
    typeof ck_confirm_url !== 'string' ||
    typeof ck_id !== 'string' ||
    typeof ck_name !== 'string'
  ) {
    throw new Error(
      `some query parameters are missing: ${JSON.stringify(query)}`,
    )
  }

  const confirmUrl = new URL(decodeURIComponent(ck_confirm_url))
  for (let param in otherQueryParams) {
    confirmUrl.searchParams.set(param, otherQueryParams[param] as string)
  }
  const parsedConfirmUrl = decodeURIComponent(confirmUrl.toString())

  console.log(`Confirming ${ck_email} via:`, parsedConfirmUrl)
  const confirmResult = await fetch(parsedConfirmUrl)
  if (confirmResult.status !== 200) {
    throw new Error(`${confirmResult.status}: ${confirmResult.statusText}`)
  }

  const tallyFormUrl = `https://tally.so/r/${TALLY_WELCOME_FORM_ID}`

  return `${tallyFormUrl}?ck_name=${encodeURIComponent(ck_name)}&ck_id=${ck_id}`
}
