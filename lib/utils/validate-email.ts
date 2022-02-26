export function looksLikeEmail(input: string) {
  return /^\S+@\S{2,}\.\S{2,}$/.test(input)
}
