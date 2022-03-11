const { email, first_name, REVUE_API_KEY } = inputData

const response = await fetch('https://www.getrevue.co/api/v2/subscribers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${REVUE_API_KEY}`,
  },
  body: JSON.stringify({
    email,
    first_name,
    double_opt_in: false,
  }),
})

if (response.status >= 500) {
  throw new Error(`Revue returned ${response.status} ${response.statusText}`)
}

console.log('->', { response })

const data = await response.json()
const { error } = data

console.log('->', { data })

if (error) {
  const okError =
    Object.keys(error).length === 1 &&
    Array.isArray(error.email) &&
    error.email.length === 1 &&
    error.email[0].includes('already')

  if (!okError) {
    throw new Error(JSON.stringify(error))
  }
}

output = data
