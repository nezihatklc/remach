import { getUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function FavoritesPage() {
  const user = await getUser()
  if (!user) redirect('/login')

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.userId },
    include: {
      listing: {
        include: { category: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
        <Link href="/dashboard" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map((fav: any) => (
          <Link key={fav.id} href={`/listings/${fav.listing.id}`} className="group flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-4 aspect-h-3 bg-gray-200 w-full h-48 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="text-xs text-yellow-600 font-semibold mb-1 uppercase tracking-wider">{fav.listing.category.name}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-yellow-600 transition-colors">{fav.listing.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{fav.listing.city}</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="font-bold text-xl text-gray-900">{fav.listing.price} {fav.listing.currency}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{fav.listing.condition}</span>
              </div>
            </div>
          </Link>
        ))}
        
        {favorites.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
            <p className="text-lg font-medium text-gray-900 mb-2">No favorites yet</p>
            <p>Save listings to your favorites to easily find them later.</p>
          </div>
        )}
      </div>
    </div>
  )
}
