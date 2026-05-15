'use server'

import { prisma } from '@/lib/prisma'
import { getUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function sendInquiry(formData: FormData) {
  const user = await getUser()
  if (!user) throw new Error('You must be logged in to send a message')

  const listingId = formData.get('listingId') as string
  const sellerId = formData.get('sellerId') as string
  const message = formData.get('message') as string
  const contactPhone = formData.get('contactPhone') as string
  const contactEmail = formData.get('contactEmail') as string

  if (!listingId || !sellerId || !message) {
    throw new Error('Required fields are missing')
  }

  await prisma.inquiry.create({
    data: {
      listingId,
      sellerId,
      senderId: user.userId,
      message,
      contactPhone,
      contactEmail: contactEmail || user.email,
    }
  })

  revalidatePath(`/listings/${listingId}`)
  // Redirecting or showing a success message can be handled on the client or via form state.
}
