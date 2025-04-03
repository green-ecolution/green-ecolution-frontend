export function decodeJWT<T>(token: string): T {
  const payload = token.split('.')[1]
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')

  // Decode the Base64 string and create a Uint8Array to ensure UTF-8 interpretation
  const decodedPayload = decodeURIComponent(
    Array.prototype.map
      .call(atob(base64), (c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(decodedPayload)
}

export function roundTo(n: number, digits: number) {
  return Number(Math.round(Number(n + 'e' + digits)) + 'e-' + digits);
}
