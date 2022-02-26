import type { NextApiRequest, NextApiResponse } from 'next'

import { Via } from '@/lib/enums/Via'
import { TALLY_WELCOME_FORM_ID } from '@/lib/env'
import { ck } from '@/lib/api/ck/client'

enum SubscriptionResult {
  Invalid,
  Success,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      console.log('/subscribe')
      const result = await subscribe(req.body)

      if (result === SubscriptionResult.Success) {
        return res.status(200).end()
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

async function subscribe(body: NextApiRequest['body']) {
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

  if (!email.match(/^merott\+.+@merott.com$/)) {
    console.error('ERROR: Signups only allowed with merott+<any>@merott.com.')
    return SubscriptionResult.Invalid
  }

  const response = await ck.subscribe({ email, name, timezone, via })
  console.log('-> Subscribed:', await response.json())

  return SubscriptionResult.Success
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
