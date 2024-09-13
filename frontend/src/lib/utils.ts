import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decodeJWT<T>(token: string): T {
  const payload = token.split(".")[1]
  const decodedPayload = atob(payload)
  return JSON.parse(decodedPayload)
}
