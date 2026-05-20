import { getUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

// Fetch and display urgent requests for the logged-in user
export default async function MyRequestsPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  const requests = await prisma.urgentRequest.findMany({
    where: { userId: user.userId },
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Urgent Requests</h1>
        <Link href="/dashboard/requests/new" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium text-sm">
          Post New Request
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-gray-900 mb-2">No active requests</h2>
          <p className="text-gray-500 mb-6">You haven't posted any urgent part requests yet.</p>
          <Link href="/dashboard/requests/new" className="text-red-600 hover:text-red-700 font-medium">
            Create your first request &rarr;
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((req) => (
                <tr key={req.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{req.title}</div>
                    <div className="text-sm text-gray-500">{req.partName} - {req.quantity} pcs</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${req.urgencyLevel === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                        req.urgencyLevel === 'URGENT' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'}`}>
                      {req.urgencyLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {req.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center text-sm text-green-600">
                        <Clock className="w-4 h-4 mr-1" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Closed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
