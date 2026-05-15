import { getUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminListingsPage() {
  const user = await getUser()
  if (!user || user.role !== 'ADMIN') redirect('/dashboard')

  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: 'desc' },
    include: { seller: true }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Listings</h1>
          <Link href="/admin" className="text-yellow-600 hover:text-yellow-800 text-sm font-medium">
            &larr; Back to Admin Dashboard
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
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
            {listings.map(listing => (
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
