'use server'

import { prisma } from '@/lib/prisma'
import { getUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createListing(formData: FormData) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const categoryId = formData.get('categoryId') as string
  const condition = formData.get('condition') as string
  const brand = formData.get('brand') as string
  const model = formData.get('model') as string
  const partNumber = formData.get('partNumber') as string
  const compatibility = formData.get('compatibility') as string
  const technicalSpecs = formData.get('technicalSpecs') as string
  const quantity = parseInt(formData.get('quantity') as string) || 1
  const price = parseFloat(formData.get('price') as string) || 0
  const currency = formData.get('currency') as string || 'TRY'
  const city = formData.get('city') as string
  const industrialZone = formData.get('industrialZone') as string

  if (!title || !description || !categoryId || !condition || !city) {
    throw new Error('Required fields are missing')
  }

  await prisma.listing.create({
    data: {
      title,
      description,
      categoryId,
      sellerId: user.userId,
      condition,
      brand,
      model,
      partNumber,
      compatibility,
      technicalSpecs,
      quantity,
      price,
      currency,
      city,
      industrialZone,
      status: 'AVAILABLE',
    },
  })

  revalidatePath('/dashboard')
  revalidatePath('/listings')
  redirect('/dashboard')
}

export async function deleteListing(listingId: string) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { sellerId: true }
  })

  if (!listing) throw new Error('Listing not found')

  if (listing.sellerId !== user.userId && user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  await prisma.listing.delete({
    where: { id: listingId }
  })

  revalidatePath('/dashboard')
  revalidatePath('/listings')
  revalidatePath('/admin/listings')
}

export async function editListing(listingId: string, formData: FormData) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { sellerId: true }
  })

  if (!listing) throw new Error('Listing not found')

  if (listing.sellerId !== user.userId && user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const categoryId = formData.get('categoryId') as string
  const condition = formData.get('condition') as string
  const brand = formData.get('brand') as string
  const model = formData.get('model') as string
  const partNumber = formData.get('partNumber') as string
  const compatibility = formData.get('compatibility') as string
  const technicalSpecs = formData.get('technicalSpecs') as string
  const quantity = parseInt(formData.get('quantity') as string) || 1
  const price = parseFloat(formData.get('price') as string) || 0
  const currency = formData.get('currency') as string || 'TRY'
  const city = formData.get('city') as string
  const industrialZone = formData.get('industrialZone') as string

  if (!title || !description || !categoryId || !condition || !city) {
    throw new Error('Required fields are missing')
  }

  await prisma.listing.update({
    where: { id: listingId },
    data: {
      title,
      description,
      categoryId,
      condition,
      brand,
      model,
      partNumber,
      compatibility,
      technicalSpecs,
      quantity,
      price,
      currency,
      city,
      industrialZone,
    },
  })

  revalidatePath('/dashboard')
  revalidatePath('/listings')
  revalidatePath(`/listings/${listingId}`)
  redirect('/dashboard')
}
