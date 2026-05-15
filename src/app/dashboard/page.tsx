import { getUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, ListOrdered, UserCircle, Settings, LogOut, ShieldAlert } from 'lucide-react'

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  const myListings = await prisma.listing.findMany({
    where: { sellerId: user.userId },
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  })

  const myRequests = await prisma.urgentRequest.findMany({
    where: { userId: user.userId },
    orderBy: { createdAt: 'desc' },
  })

  const myInquiries = await prisma.inquiry.findMany({
    where: { sellerId: user.userId },
    orderBy: { createdAt: 'desc' },
    include: { sender: true, listing: true }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sticky top-24">
          <div className="flex items-center gap-3 mb-6 p-2">
            <UserCircle className="h-10 w-10 text-gray-400" />
            <div>
              <div className="font-bold text-gray-900">{user.email.split('@')[0]}</div>
              <div className="text-xs text-gray-500 uppercase">{user.accountType}</div>
            </div>
          </div>
          <nav className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-700 font-medium rounded-md">
              <Package className="h-5 w-5" /> My Listings
            </Link>
            <Link href="/dashboard/requests" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 font-medium rounded-md">
              <ListOrdered className="h-5 w-5" /> My Requests
            </Link>
            <Link href="/dashboard/favorites" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 font-medium rounded-md">
              <Package className="h-5 w-5" /> My Favorites
            </Link>
            {user.role === 'ADMIN' && (
              <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 font-medium rounded-md">
                <ShieldAlert className="h-5 w-5" /> Admin Panel
              </Link>
            )}
            <Link href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 font-medium rounded-md">
              <Settings className="h-5 w-5" /> Settings
            </Link>
            <form action="/api/auth/logout" method="POST" className="mt-4 pt-4 border-t border-gray-100">
              <button type="submit" className="flex w-full items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 font-medium rounded-md transition-colors">
                <LogOut className="h-5 w-5" /> Sign Out
              </button>
            </form>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <Link href="/dashboard/listings/new" className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md font-medium transition-colors">
            Post New Listing
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {myListings.map((listing: any) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{listing.title}</div>
                    <div className="text-sm text-gray-500">{listing.category.name}</div>
                  </td>
                  <td className="p-4 font-medium">{listing.price} {listing.currency}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {listing.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{new Date(listing.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right space-x-3 flex justify-end items-center">
                    <Link href={`/listings/${listing.id}`} className="text-yellow-600 hover:text-yellow-900 font-medium text-sm">View</Link>
                    <Link href={`/dashboard/listings/${listing.id}/edit`} className="text-gray-600 hover:text-gray-900 font-medium text-sm ml-2">Edit</Link>
                    <form action={async () => {
                      'use server';
                      const { deleteListing } = await import('@/app/actions/listing');
                      await deleteListing(listing.id);
                    }}>
                      <button type="submit" className="text-red-600 hover:text-red-900 font-medium text-sm ml-2">Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
              {myListings.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    You haven't posted any listings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Inquiries Section */}
        <div className="flex justify-between items-center bg-white p-6 rounded-lg border border-gray-200 shadow-sm mt-8">
          <h2 className="text-2xl font-bold text-gray-900">Received Inquiries</h2>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">From</th>
                <th className="p-4 font-semibold">Listing</th>
                <th className="p-4 font-semibold">Message</th>
                <th className="p-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {myInquiries.map((inq: any) => (
                <tr key={inq.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{inq.sender.name}</div>
                    <div className="text-sm text-gray-500">{inq.contactEmail}</div>
                    {inq.contactPhone && <div className="text-sm text-gray-500">{inq.contactPhone}</div>}
                  </td>
                  <td className="p-4 font-medium text-sm">
                    <Link href={`/listings/${inq.listingId}`} className="text-yellow-600 hover:underline">
                      {inq.listing.title}
                    </Link>
                  </td>
                  <td className="p-4 text-sm text-gray-700 max-w-xs truncate">{inq.message}</td>
                  <td className="p-4 text-sm text-gray-500">{new Date(inq.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {myInquiries.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    You haven't received any inquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
