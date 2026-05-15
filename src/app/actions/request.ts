'use server'

import { prisma } from '@/lib/prisma'
import { getUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createUrgentRequest(formData: FormData) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const partName = formData.get('partName') as string
  const description = formData.get('description') as string
  const categoryId = formData.get('categoryId') as string
  const machineBrand = formData.get('machineBrand') as string
  const machineModel = formData.get('machineModel') as string
  const technicalDetails = formData.get('technicalDetails') as string
  const quantity = parseInt(formData.get('quantity') as string) || 1
  const city = formData.get('city') as string
  const urgencyLevel = formData.get('urgencyLevel') as string

  if (!title || !partName || !description || !categoryId || !city || !urgencyLevel) {
    throw new Error('Required fields are missing')
  }

  await prisma.urgentRequest.create({
    data: {
      userId: user.userId,
      title,
      partName,
      description,
      categoryId,
      machineBrand,
      machineModel,
      technicalDetails,
      quantity,
      city,
      urgencyLevel,
      status: 'ACTIVE',
    },
  })

  revalidatePath('/dashboard')
  revalidatePath('/requests')
  redirect('/dashboard')
}
