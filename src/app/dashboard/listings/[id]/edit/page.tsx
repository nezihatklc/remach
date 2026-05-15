import { prisma } from '@/lib/prisma'
import { getUser } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { editListing } from '@/app/actions/listing'

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }

  const listing = await prisma.listing.findUnique({
    where: { id }
  })

  if (!listing) notFound()

  if (listing.sellerId !== user.userId && user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  const categories = await prisma.category.findMany()

  const updateListingWithId = editListing.bind(null, id)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Listing</h1>
      
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        <form action={updateListingWithId} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input name="title" defaultValue={listing.title} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea name="description" defaultValue={listing.description} required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select name="categoryId" defaultValue={listing.categoryId} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white">
                <option value="">Select a category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition *</label>
              <select name="condition" defaultValue={listing.condition} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white">
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Refurbished">Refurbished</option>
                <option value="For repair">For repair</option>
                <option value="Scrap / parts only">Scrap / parts only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input name="brand" defaultValue={listing.brand || ''} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input name="model" defaultValue={listing.model || ''} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Part Number</label>
              <input name="partNumber" defaultValue={listing.partNumber || ''} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Compatibility</label>
              <input name="compatibility" defaultValue={listing.compatibility || ''} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Technical Specs</label>
              <textarea name="technicalSpecs" defaultValue={listing.technicalSpecs || ''} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <div className="flex gap-2">
                <input name="price" defaultValue={listing.price} type="number" step="0.01" required className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
                <select name="currency" defaultValue={listing.currency} className="w-24 px-4 py-2 border border-gray-300 rounded-md bg-white">
                  <option value="TRY">TRY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input name="quantity" defaultValue={listing.quantity} type="number" min="1" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input name="city" defaultValue={listing.city} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industrial Zone</label>
              <input name="industrialZone" defaultValue={listing.industrialZone || ''} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-md transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
