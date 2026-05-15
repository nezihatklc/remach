import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ArrowRight, Box, ShieldCheck, Factory, Zap, MapPin } from 'lucide-react'
import { getDictionary } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const d = await getDictionary()
  const categories = await prisma.category.findMany({ take: 8 })
  const latestListings = await prisma.listing.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
    include: { seller: true, category: true, images: true },
  })
  const urgentRequests = await prisma.urgentRequest.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: { user: true, category: true },
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            {d.home.heroTitle} <span className="text-yellow-500">{d.home.heroHighlight}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
            {d.home.heroSubtitle}
          </p>
          <div className="w-full max-w-2xl bg-white rounded-lg p-2 flex items-center shadow-lg mb-8">
            <input 
              type="text" 
              placeholder={d.home.searchPlaceholder} 
              className="flex-1 px-4 py-3 text-gray-900 text-lg outline-none rounded-l-md"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md text-lg font-bold transition-colors">
              {d.home.searchBtn}
            </button>
          </div>
          <div className="flex gap-4">
            <Link href="/listings" className="bg-white text-gray-900 px-8 py-4 rounded-md text-lg font-bold hover:bg-gray-100 transition-colors shadow-sm">
              {d.home.browseListings}
            </Link>
            <Link href="/dashboard/requests/new" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md text-lg font-bold hover:bg-white hover:text-gray-900 transition-colors">
              {d.home.postRequest}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">{d.home.browseCategories}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category: any) => (
              <Link 
                key={category.id} 
                href={`/listings?category=${category.slug}`}
                className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200 hover:border-yellow-500 hover:shadow-md transition-all group"
              >
                <Box className="h-10 w-10 text-gray-500 group-hover:text-yellow-600 mb-4" />
                <span className="font-bold text-lg text-gray-900 text-center">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Sellers</h3>
              <p className="text-gray-600">Connect with real industrial businesses and trusted suppliers across regions.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Urgent Requests</h3>
              <p className="text-gray-600">Production stopped? Post an urgent request and let suppliers find you instantly.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <Factory className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Industrial Focus</h3>
              <p className="text-gray-600">Not a general marketplace. Designed purely for technical and industrial needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{d.home.latestListings}</h2>
              <p className="text-lg text-gray-700">Discover recently added machines and spare parts.</p>
            </div>
            <Link href="/listings" className="hidden sm:flex items-center text-yellow-600 font-bold hover:text-yellow-700 text-lg">
              {d.home.browseListings} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestListings.map((listing: any) => (
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
                  <p className="text-gray-600 text-sm mb-5 font-medium flex items-center gap-1"><MapPin className="h-4 w-4" /> {listing.city}</p>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="font-extrabold text-2xl text-gray-900">{listing.price} {listing.currency}</span>
                    <span className="text-xs font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded">{listing.condition}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Requests Preview */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Urgent Needs</h2>
              <p className="text-lg text-gray-700">Do you have these parts? Help businesses resume production.</p>
            </div>
            <Link href="/requests" className="hidden sm:flex items-center text-yellow-600 font-bold hover:text-yellow-700 text-lg">
              {d.nav.requests} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {urgentRequests.map((req: any) => (
              <div key={req.id} className="bg-white border border-red-100 rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow relative">
                {req.urgencyLevel === 'CRITICAL' && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-bl-lg rounded-tr-lg shadow-sm">
                    CRITICAL
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-2">{req.title}</h3>
                <p className="text-gray-700 text-base mb-6 line-clamp-2">{req.description}</p>
                <div className="flex flex-col gap-3 text-sm text-gray-600 mb-8 font-medium">
                  <div className="flex items-center gap-2"><Box className="h-5 w-5 text-gray-400" /> {req.partName}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-gray-400" /> {req.city}</div>
                </div>
                <Link href={`/requests/${req.id}`} className="block w-full text-center bg-gray-900 text-white px-4 py-3 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors shadow-sm">
                  I Have This Part
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
