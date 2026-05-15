import { cookies } from 'next/headers'

export type Locale = 'en' | 'tr';

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value;
  if (locale === 'tr') return 'tr';
  return 'en';
}

export const dict = {
  en: {
    nav: {
      marketplace: 'Marketplace',
      requests: 'Urgent Requests',
      about: 'About',
      signIn: 'Sign In',
      postListing: 'Post Listing',
      dashboard: 'Dashboard',
      logout: 'Logout'
    },
    home: {
      heroTitle: 'Find and sell industrial spare parts',
      heroHighlight: 'faster',
      heroSubtitle: 'A trusted B2B marketplace for unused machines, spare parts, and urgent industrial needs. Turn idle equipment into value.',
      searchPlaceholder: 'Search by part number, machine brand, or category...',
      searchBtn: 'Search',
      browseListings: 'Browse Listings',
      postRequest: 'Post a Part Request',
      browseCategories: 'Browse Categories',
      latestListings: 'Latest Listings',
      viewDetails: 'View Details'
    },
    common: {
      condition: 'Condition',
      price: 'Price',
      city: 'Location',
      status: 'Status',
      available: 'Available',
    }
  },
  tr: {
    nav: {
      marketplace: 'İlanlar',
      requests: 'Acil Talepler',
      about: 'Hakkımızda',
      signIn: 'Giriş Yap',
      postListing: 'İlan Ver',
      dashboard: 'Panelim',
      logout: 'Çıkış Yap'
    },
    home: {
      heroTitle: 'Endüstriyel yedek parçaları bulun ve',
      heroHighlight: 'daha hızlı satın',
      heroSubtitle: 'Kullanılmayan makineler, yedek parçalar ve acil ihtiyaçlar için güvenilir B2B pazar yeri. Atıl ekipmanlarınızı değere dönüştürün.',
      searchPlaceholder: 'Parça numarası, makine markası veya kategori ara...',
      searchBtn: 'Ara',
      browseListings: 'İlanları İncele',
      postRequest: 'Acil İhtiyaç Bildir',
      browseCategories: 'Kategoriler',
      latestListings: 'Son Eklenen İlanlar',
      viewDetails: 'Detayları Gör'
    },
    common: {
      condition: 'Durum',
      price: 'Fiyat',
      city: 'Konum',
      status: 'Durum',
      available: 'Mevcut',
    }
  }
}

export async function getDictionary() {
  const locale = await getLocale();
  return dict[locale];
}
