import { prisma } from '@/lib/prisma'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { createUrgentRequest } from '@/app/actions/request'

export default async function NewUrgentRequestPage() {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }

  const categories = await prisma.category.findMany()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Post Urgent Request</h1>
      
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-red-200">
        <form action={createUrgentRequest} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Request Title *</label>
              <input name="title" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="e.g. Need Yilmaz Reduktor Gearbox EN-123 ASAP" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea name="description" required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="Describe what you need, why it is urgent, and any specific requirements..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Part Name *</label>
              <input name="partName" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="e.g. Gearbox EN-123" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select name="categoryId" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 bg-white">
                <option value="">Select a category</option>
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Machine Brand</label>
              <input name="machineBrand" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="e.g. Yilmaz Reduktor" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Machine Model</label>
              <input name="machineModel" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Technical Details</label>
              <textarea name="technicalDetails" rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="Voltage, dimensions, specific configurations needed..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <input name="quantity" type="number" min="1" defaultValue="1" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input name="city" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level *</label>
              <select name="urgencyLevel" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 bg-white">
                <option value="NORMAL">Normal</option>
                <option value="URGENT">Urgent</option>
                <option value="CRITICAL">Critical / Production Stopped</option>
              </select>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-colors">
              Post Urgent Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
