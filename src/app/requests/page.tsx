import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { AlertCircle, MapPin, Box, Calendar } from 'lucide-react'

export default async function RequestsPage() {
  const requests = await prisma.urgentRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true, user: true },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            Urgent Requests
          </h1>
          <p className="text-gray-600 mt-2">Help businesses resume production by providing these urgently needed parts.</p>
        </div>
        <Link href="/dashboard/requests/new" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap">
          Post Urgent Request
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Urgency</th>
                <th className="p-4 font-semibold">Part / Details</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Date Posted</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    {req.urgencyLevel === 'CRITICAL' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Critical / Stopped
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        Urgent
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900 mb-1">{req.title}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Box className="h-3 w-3" /> {req.partName} - {req.category.name}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {req.city}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {new Date(req.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <Link href={`/requests/${req.id}`} className="text-yellow-600 hover:text-yellow-800 font-medium text-sm">
                      View Details &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
              
              {requests.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No urgent requests at the moment.
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
