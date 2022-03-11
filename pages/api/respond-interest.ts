import type { NextApiRequest, NextApiResponse } from 'next'

import { ck } from '@/lib/api/ck/client'
import { ZAP_INTEREST_WEBHOOK } from '@/lib/env'

type Data = {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  console.log('/respond-interest')

  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Invalid request' })
    return
  }

  try {
    const fields = req.body.data.fields as Array<{
      key: string
      label: string
      type: string
      value: string
    }>

    const id = fields.find(f => f.label === 'ck_id')?.value
    const name =
      fields.find(f => f.label === 'ck_name')?.value ||
      fields.find(f => f.key === 'question_mOa9lK')?.value
    const interestedIn = fields.find(f => f.key === 'question_meM2qo')?.value

    if (!name || !id || !interestedIn) {
      throw new Error(
        `Incomplete info: ${JSON.stringify({ id, interestedIn, name })}`,
      )
    }

    const updateResponse = await ck.updateSubscriber(id, {
      name,
      interestedIn,
    })

    const { subscriber } = await updateResponse.json()

    await fetch(ZAP_INTEREST_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        interestedIn,
        name,
        email: subscriber.email_address,
      }),
    })

    res.status(200).end()
  } catch (error) {
    console.error('Error:', error)
    res.status(500).end()
  }
}
