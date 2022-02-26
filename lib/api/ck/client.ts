import { Via } from '@/lib/enums/Via'
import { BTB_FORM_ID, CK_SECRET } from '@/lib/env'

const ckApiUrl = 'https://api.convertkit.com/v3'

class ConvertKit {
  async subscribe(data: {
    email: string
    via: Via
    name: string
    timezone: string
  }) {
    const response = await fetch(`${ckApiUrl}/forms/${BTB_FORM_ID}/subscribe`, {
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
      name: string
      interestedIn: string
    },
  ) {
    const response = await fetch(`${ckApiUrl}/subscribers/${subscriberId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_secret: CK_SECRET,
        first_name: data.name,
        fields: {
          x_btb_interested_in: data.interestedIn,
        },
      }),
    })

    return response
  }
}

export const ck = new ConvertKit()
export const convertkit = ck
