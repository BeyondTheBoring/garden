import { Via } from '@/lib/enums/Via'
import { CK_SECRET } from '@/lib/env'

const ckApiUrl = 'https://api.convertkit.com/v3'

interface Subscriber {
  id: number
  first_name: string | null // 'Merott'
  email_address: string // 'merott+test@merott.com'
  state: 'active' | 'cancelled' // 'active'
  created_at: string // '2022-03-02T09:40:10.000Z'
  fields: {
    last_name: string | null
    x_btb_interested_in: string | null // 'stuff'
    x_btb_status: string | null // 'active'
    x_btb_subscription_date: string | null // '2022-03-02T10:11:55.640+0000'
    x_btb_via: Via | null // 'beyondtheboring.com'
    x_ccw_subscription_date: string | null
    x_ccw_testimonial: string | null
    x_revue_email: string | null // 'merott+test@merott.com'
    x_revue_id: string | null // '423633062'
    x_shared_high_five_photo_src: string | null
    x_timezone: string | null // 'Europe/London'
    x_trigger: string | null
  }
}

class ConvertKit {
  async subscribe(
    formId: string,
    data: {
      email: string
      via: Via
      name: string
      timezone: string
    },
  ) {
    const response = await fetch(`${ckApiUrl}/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_secret: CK_SECRET,
        email: data.email,
        first_name: data.name,
        fields: {
          x_btb_via: data.via,
          x_timezone: data.timezone,
        },
      }),
    })

    return response
  }

  async updateSubscriber(
    subscriberId: string,
    data: {
      email?: string
      via?: Via
      name?: string
      timezone?: string
      interestedIn?: string
    },
  ) {
    const response = await fetch(`${ckApiUrl}/subscribers/${subscriberId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_secret: CK_SECRET,
        first_name: data.name,
        fields: {
          x_btb_via: data.via,
          x_timezone: data.timezone,
          x_btb_interested_in: data.interestedIn,
        },
      }),
    })

    return response
  }

  async findSubscriber(email: string): Promise<Subscriber | null> {
    const url = new URL(`${ckApiUrl}/subscribers`)
    url.searchParams.set('api_secret', CK_SECRET)
    url.searchParams.set('email_address', email)

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`)
    }

    const { subscribers } = await response.json()

    return subscribers.length === 1 ? subscribers[0] : null
  }
}

export const ck = new ConvertKit()
export const convertkit = ck
