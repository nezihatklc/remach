import { getUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, Package, AlertCircle } from 'lucide-react'

export default async function AdminPage() {
  const user = await getUser()

  if (!user || user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  const userCount = await prisma.user.count()
  const listingCount = await prisma.listing.count()
  const requestCount = await prisma.urgentRequest.count()

  const recentListings = await prisma.listing.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { seller: true }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link href="/admin/users" className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4 hover:border-yellow-500 hover:shadow-md transition-all">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{userCount}</div>
            <div className="text-sm text-gray-500 font-medium">Registered Users</div>
          </div>
        </Link>
        <Link href="/admin/listings" className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4 hover:border-yellow-500 hover:shadow-md transition-all">
          <div className="bg-green-100 p-4 rounded-full text-green-600">
            <Package className="h-8 w-8" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{listingCount}</div>
            <div className="text-sm text-gray-500 font-medium">Active Listings</div>
          </div>
        </Link>
        <Link href="/requests" className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4 hover:border-yellow-500 hover:shadow-md transition-all">
          <div className="bg-red-100 p-4 rounded-full text-red-600">
            <AlertCircle className="h-8 w-8" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{requestCount}</div>
            <div className="text-sm text-gray-500 font-medium">Urgent Requests</div>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Recent Listings</h2>
          <Link href="/admin/listings" className="text-yellow-600 hover:text-yellow-800 text-sm font-medium">
            View All
          </Link>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Seller</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentListings.map(listing => (
              <tr key={listing.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{listing.title}</td>
                <td className="p-4 text-sm text-gray-600">{listing.seller.email}</td>
                <td className="p-4 font-medium">{listing.price} {listing.currency}</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {listing.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-3 flex justify-end items-center">
                  <Link href={`/listings/${listing.id}`} className="text-yellow-600 hover:text-yellow-900 font-medium text-sm">View</Link>
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
          </tbody>
        </table>
      </div>
    </div>
  )
}
