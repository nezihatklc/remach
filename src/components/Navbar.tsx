import Link from 'next/link'
import { Wrench, User, Search, LogOut } from 'lucide-react'
import { getUser } from '@/lib/auth'
import { getDictionary, getLocale } from '@/lib/i18n'
import { LanguageSwitcher } from './LanguageSwitcher'

export async function Navbar() {
  const user = await getUser()
  const d = await getDictionary()
  const locale = await getLocale()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Wrench className="h-7 w-7 text-yellow-600" />
              <span className="font-bold text-2xl text-gray-900 tracking-tight">ReMach</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/listings" className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-semibold transition-colors">
                {d.nav.marketplace}
              </Link>
              <Link href="/requests" className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-semibold transition-colors">
                {d.nav.requests}
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <LanguageSwitcher currentLocale={locale} />
            <Link href="/search" className="text-gray-600 hover:text-gray-900 p-2">
              <Search className="h-5 w-5" />
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-semibold transition-colors">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{d.nav.dashboard}</span>
                </Link>
                <form action="/api/auth/logout" method="POST">
                  <button type="submit" className="flex items-center gap-2 text-gray-700 hover:text-red-600 px-3 py-2 text-base font-semibold transition-colors">
                    <LogOut className="h-5 w-5" />
                    <span className="hidden md:inline">{d.nav.logout}</span>
                  </button>
                </form>
              </>
            ) : (
              <Link href="/login" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-semibold transition-colors">
                <User className="h-5 w-5" />
                <span className="hidden md:inline">{d.nav.signIn}</span>
              </Link>
            )}
            <Link href="/dashboard/listings/new" className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-md text-base font-bold shadow-sm transition-colors">
              {d.nav.postListing}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
