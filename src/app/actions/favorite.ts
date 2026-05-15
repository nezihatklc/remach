'use server'

import { prisma } from '@/lib/prisma'
import { getUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function toggleFavorite(listingId: string) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_listingId: {
        userId: user.userId,
        listingId
      }
    }
  })

  if (existing) {
    await prisma.favorite.delete({
      where: { id: existing.id }
    })
  } else {
    await prisma.favorite.create({
      data: {
        userId: user.userId,
        listingId
      }
    })
  }

  revalidatePath('/listings/[id]', 'page')
  revalidatePath('/dashboard/favorites')
}
