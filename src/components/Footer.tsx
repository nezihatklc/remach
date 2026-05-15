import Link from 'next/link'
import { Wrench } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-yellow-500" />
            <span className="font-bold text-xl text-white tracking-tight">Remach</span>
          </div>
          <p className="text-sm text-gray-400">
            A trusted B2B marketplace for unused machines, spare parts, and urgent industrial needs.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/listings" className="hover:text-yellow-500 transition-colors">Browse Parts</Link></li>
            <li><Link href="/requests" className="hover:text-yellow-500 transition-colors">Urgent Requests</Link></li>
            <li><Link href="/dashboard/listings/new" className="hover:text-yellow-500 transition-colors">Sell Equipment</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-yellow-500 transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-500 transition-colors">Contact</Link></li>
            <li><Link href="/trust" className="hover:text-yellow-500 transition-colors">Trust & Safety</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms" className="hover:text-yellow-500 transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-yellow-500 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Remach. All rights reserved.</p>
      </div>
    </footer>
  )
}
