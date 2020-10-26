export function ResponseError ({ code, message, err }) {
  return {
    code,
    message: message || String(err),
    error: String(err)
  }
}
