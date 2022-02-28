const { email, REVUE_API_KEY } = inputData

const response = await fetch(
  'https://www.getrevue.co/api/v2/subscribers/unsubscribe',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${REVUE_API_KEY}`,
    },
    body: JSON.stringify({
      email,
    }),
  },
)

const data = await response.json()
const { error } = data

if (error) {
  const okError =
    typeof error === 'string' && error.match(/email address not found/i)

  if (!okError) {
    throw new Error(JSON.stringify(error))
  }
}

output = data
