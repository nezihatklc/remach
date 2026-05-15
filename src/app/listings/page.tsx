import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface ListingsPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    condition?: string
    minPrice?: string
    maxPrice?: string
    city?: string
  }>
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const { q, category, condition, minPrice, maxPrice, city } = await searchParams

  const where: any = {
    status: 'AVAILABLE' // By default only show available
  }

  if (q) {
    where.OR = [
      { title: { contains: q } },
      { description: { contains: q } },
      { brand: { contains: q } },
      { partNumber: { contains: q } }
    ]
  }

  if (category) {
    // find category by slug
    const cat = await prisma.category.findUnique({ where: { slug: category }})
    if (cat) where.categoryId = cat.id
  }

  if (condition) {
    where.condition = condition
  }

  if (city) {
    where.city = { contains: city }
  }

  if (minPrice || maxPrice) {
    where.price = {}
    if (minPrice) where.price.gte = parseFloat(minPrice)
    if (maxPrice) where.price.lte = parseFloat(maxPrice)
  }

  const listings = await prisma.listing.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { category: true, images: true },
  })

  const categories = await prisma.category.findMany()

  async function applyFilters(formData: FormData) {
    'use server'
    const params = new URLSearchParams()
    const q = formData.get('q') as string
    const categoryId = formData.get('categoryId') as string
    const condition = formData.get('condition') as string
    const city = formData.get('city') as string
    const minPrice = formData.get('minPrice') as string
    const maxPrice = formData.get('maxPrice') as string

    if (q) params.set('q', q)
    if (categoryId) {
      const cat = await prisma.category.findUnique({ where: { id: categoryId }})
      if (cat) params.set('category', cat.slug)
    }
    if (condition) params.set('condition', condition)
    if (city) params.set('city', city)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)

    redirect(`/listings?${params.toString()}`)
  }

  // Find category id from slug for default value
  const currentCategory = category ? categories.find(c => c.slug === category) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Marketplace</h1>
        <Link href="/dashboard/listings/new" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2.5 rounded-md font-bold text-lg shadow-sm transition-colors">
          Post Listing
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <form action={applyFilters} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>
            
            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">Search</label>
              <input name="q" defaultValue={q || ''} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500" placeholder="Keywords..." />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select name="categoryId" defaultValue={currentCategory?.id || ''} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500">
                <option value="">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">Condition</label>
              <select name="condition" defaultValue={condition || ''} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500">
                <option value="">All Conditions</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Refurbished">Refurbished</option>
                <option value="For repair">For repair</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
              <input name="city" defaultValue={city || ''} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500" placeholder="e.g. Istanbul" />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Min Price</label>
                <input name="minPrice" type="number" defaultValue={minPrice || ''} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Max Price</label>
                <input name="maxPrice" type="number" defaultValue={maxPrice || ''} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500" placeholder="Any" />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-md font-bold text-base hover:bg-gray-800 transition-colors shadow-sm">
              Apply Filters
            </button>
            <div className="mt-4 text-center">
               <Link href="/listings" className="text-sm font-medium text-yellow-600 hover:text-yellow-700">Clear Filters</Link>
            </div>
          </form>
        </div>

        {/* Listings Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Link key={listing.id} href={`/listings/${listing.id}`} className="group flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-w-4 aspect-h-3 bg-gray-100 w-full h-48 flex items-center justify-center overflow-hidden">
                  {listing.images && listing.images.length > 0 ? (
                    <img src={listing.images[0].imageUrl} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <span className="text-gray-400 font-medium text-sm">No Image</span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs text-yellow-600 font-bold mb-2 uppercase tracking-wider">{listing.category.name}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">{listing.title}</h3>
                  <p className="text-gray-600 text-sm mb-5 font-medium">{listing.city}</p>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="font-extrabold text-2xl text-gray-900">{listing.price} {listing.currency}</span>
                    <span className="text-xs font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded">{listing.condition}</span>
                  </div>
                </div>
              </Link>
            ))}
            
            {listings.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                <p className="text-lg font-medium text-gray-900 mb-2">No listings found</p>
                <p>Try adjusting your search filters or be the first to post a part.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
