'use client'

import { useRouter } from 'next/navigation'

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter()

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'tr' : 'en'
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`
    router.refresh()
  }

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center justify-center px-3 py-1.5 rounded-md border-2 border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 text-gray-800 font-bold text-sm transition-all"
    >
      {currentLocale === 'en' ? '🇹🇷 TR' : '🇬🇧 EN'}
    </button>
  )
}
