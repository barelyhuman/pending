export function ResponseError({ code, message, err }) {
  return {
    code,
    message: message || err,
    error: err,
  };
}
