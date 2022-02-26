function requireVar(variable: string | undefined, name: string) {
  if (!variable) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return variable
}

export const CK_SECRET = requireVar(process.env.CK_SECRET, 'CK_SECRET')

export const BTB_FORM_ID = requireVar(process.env.BTB_FORM_ID, 'BTB_FORM_ID')

export const TALLY_WELCOME_FORM_ID = requireVar(
  process.env.TALLY_WELCOME_FORM_ID,
  'TALLY_WELCOME_FORM_ID',
)

export const ZAP_INTEREST_WEBHOOK = requireVar(
  process.env.ZAP_INTEREST_WEBHOOK,
  'ZAP_INTEREST_WEBHOOK',
)

console.log('ENV.CK_SECRET ->', (CK_SECRET || '').substring(0, 5))
console.log('ENV.BTB_FORM_ID ->', BTB_FORM_ID)
console.log('ENV.TALLY_WELCOME_FORM_ID ->', TALLY_WELCOME_FORM_ID)
console.log('ENV.ZAP_INTEREST_WEBHOOK ->', ZAP_INTEREST_WEBHOOK)
