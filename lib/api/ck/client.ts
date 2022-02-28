import { Via } from '@/lib/enums/Via'
import { CK_SECRET } from '@/lib/env'

const ckApiUrl = 'https://api.convertkit.com/v3'

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

  async findSubscriber(email: string) {
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
