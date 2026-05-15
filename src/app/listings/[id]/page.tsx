import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Building, Phone, Mail, ShieldCheck, Clock, FileText, Heart, CheckCircle2 } from 'lucide-react'
import { getUser } from '@/lib/auth'
import { toggleFavorite } from '@/app/actions/favorite'
import { sendInquiry } from '@/app/actions/inquiry'

interface ListingPageProps {
  params: Promise<{ id: string }>
}

export default async function ListingDetailPage({ params }: ListingPageProps) {
  const { id } = await params
  const user = await getUser()

  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      category: true,
      seller: true,
    },
  })

  if (!listing) {
    notFound()
  }

  let isFavorite = false
  if (user) {
    const fav = await prisma.favorite.findUnique({
      where: {
        userId_listingId: {
          userId: user.userId,
          listingId: listing.id
        }
      }
    })
    isFavorite = !!fav
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/listings" className="text-yellow-600 hover:text-yellow-700 font-medium">
          &larr; Back to Listings
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Images & Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 w-full h-96 flex items-center justify-center">
              <span className="text-gray-400">Image Gallery Placeholder</span>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm text-yellow-600 font-semibold uppercase tracking-wider">{listing.category.name}</span>
                  <h1 className="text-3xl font-bold text-gray-900 mt-1">{listing.title}</h1>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{listing.price} {listing.currency}</div>
                  <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium">{listing.status}</span>
                </div>
              </div>

              <div className="flex gap-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {listing.city}</div>
                <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {new Date(listing.createdAt).toLocaleDateString()}</div>
                <div className="flex items-center gap-1"><FileText className="h-4 w-4" /> Condition: {listing.condition}</div>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                    <span className="block text-sm text-gray-500">Brand</span>
                    <span className="font-medium text-gray-900">{listing.brand || 'N/A'}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                    <span className="block text-sm text-gray-500">Model</span>
                    <span className="font-medium text-gray-900">{listing.model || 'N/A'}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                    <span className="block text-sm text-gray-500">Part Number</span>
                    <span className="font-medium text-gray-900">{listing.partNumber || 'N/A'}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                    <span className="block text-sm text-gray-500">Quantity Available</span>
                    <span className="font-medium text-gray-900">{listing.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Seller Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Seller Information</h3>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700 font-bold text-xl">
                {listing.seller.companyName?.charAt(0) || listing.seller.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{listing.seller.companyName || listing.seller.name}</h4>
                {listing.seller.isVerified && (
                  <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                    <ShieldCheck className="h-4 w-4" /> Verified Seller
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600 mb-8 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-400" />
                <span>Sector: {listing.seller.sector || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{listing.seller.city}{listing.seller.industrialZone ? `, ${listing.seller.industrialZone}` : ''}</span>
              </div>
            </div>

            <div className="space-y-4">
              {user ? (
                <>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Mail className="h-4 w-4" /> Send Inquiry</h4>
                    <form action={sendInquiry} className="space-y-3">
                      <input type="hidden" name="listingId" value={listing.id} />
                      <input type="hidden" name="sellerId" value={listing.sellerId} />
                      <textarea name="message" required rows={3} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-yellow-500 focus:border-yellow-500" placeholder="Is this still available?"></textarea>
                      <input name="contactPhone" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-yellow-500 focus:border-yellow-500" placeholder="Your Phone (Optional)" />
                      <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition-colors text-sm">
                        Send Message
                      </button>
                    </form>
                  </div>

                  <form action={async () => {
                    'use server';
                    await toggleFavorite(listing.id);
                  }}>
                    <button type="submit" className={`w-full font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 border ${isFavorite ? 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} /> 
                      {isFavorite ? 'Saved to Favorites' : 'Save to Favorites'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-center">
                  <p className="text-sm text-gray-600 mb-3">Log in to contact the seller or save this listing.</p>
                  <Link href="/login" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
