import { Wrench } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
      <Wrench className="h-12 w-12 text-yellow-500 animate-pulse mb-4" />
      <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
      <p className="text-gray-500 mt-2">Please wait while we prepare the industrial marketplace.</p>
    </div>
  )
}
