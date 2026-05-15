import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value

  if (!token) {
    return null
  }

  try {
    const secret = process.env.NEXTAUTH_SECRET || 'secret'
    const decoded = jwt.verify(token, secret) as { userId: string; email: string; role: string; accountType: string }
    return decoded
  } catch (error) {
    return null
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('auth_token')
}
