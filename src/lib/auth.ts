import { LOGOUT_API } from "@/constants/endpoints"

export async function logoutUser() {
  const res = await fetch(LOGOUT_API, {
    method: 'POST',
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Logout failed')
  }
  window.location.href ='/login'
  return data
}
