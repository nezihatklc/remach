import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data
  await prisma.report.deleteMany()
  await prisma.inquiry.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.urgentRequest.deleteMany()
  await prisma.listingImage.deleteMany()
  await prisma.listing.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await bcrypt.hash('password123', 10)

  // Users
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash,
      role: 'ADMIN',
      accountType: 'BOTH',
      isVerified: true,
    },
  })

  const seller1 = await prisma.user.create({
    data: {
      name: 'ABC Makine A.Ş.',
      email: 'seller1@example.com',
      passwordHash,
      accountType: 'SELLER',
      city: 'Bursa',
      companyName: 'ABC Makine A.Ş.',
      isVerified: true,
      sector: 'Manufacturing',
    },
  })

  const seller2 = await prisma.user.create({
    data: {
      name: 'TechParts Endüstri',
      email: 'seller2@example.com',
      passwordHash,
      accountType: 'SELLER',
      city: 'Izmir',
      companyName: 'TechParts',
      isVerified: true,
      sector: 'Automation',
    },
  })

  const buyer1 = await prisma.user.create({
    data: {
      name: 'Factory Kocaeli',
      email: 'buyer1@example.com',
      passwordHash,
      accountType: 'BUYER',
      city: 'Kocaeli',
      companyName: 'Kocaeli Productions',
      isVerified: true,
      sector: 'Packaging',
    },
  })

  // Categories
  const categoriesData = [
    { name: 'Motor & Engine Parts', slug: 'motors' },
    { name: 'Gearbox & Transmission', slug: 'gearboxes' },
    { name: 'Hydraulic Components', slug: 'hydraulic' },
    { name: 'Electrical Components', slug: 'electrical' },
    { name: 'Pneumatic Components', slug: 'pneumatic' },
    { name: 'Bearings & Power Trans.', slug: 'bearings' },
    { name: 'Sensors & Automation', slug: 'automation' },
    { name: 'CNC & Machining Parts', slug: 'cnc' },
  ]

  const categories: Record<string, string> = {}
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat })
    categories[cat.slug] = created.id
  }

  // Listings with Images
  const listingsData = [
    {
      title: 'Siemens 7.5 kW Motor',
      description: '1500 RPM - IE3 high efficiency AC motor. Completely unused, sitting in stock.',
      categoryId: categories['motors'],
      sellerId: seller1.id,
      condition: 'New',
      brand: 'Siemens',
      price: 8500,
      currency: 'TRY',
      city: 'Bursa',
      status: 'AVAILABLE',
      images: ['/images/motor.png']
    },
    {
      title: 'Bonfiglioli Gearbox',
      description: 'i=40 - 140Nm. Lightly used, fully refurbished and tested. Ready to ship.',
      categoryId: categories['gearboxes'],
      sellerId: seller2.id,
      condition: 'Used',
      brand: 'Bonfiglioli',
      price: 6200,
      currency: 'TRY',
      city: 'Izmir',
      status: 'AVAILABLE',
      images: ['/images/gearbox.png']
    },
    {
      title: 'Bosch Rexroth Pump',
      description: '45 cc/rev variable displacement axial piston pump. Original German made.',
      categoryId: categories['hydraulic'],
      sellerId: seller1.id,
      condition: 'Used',
      brand: 'Bosch Rexroth',
      price: 7750,
      currency: 'TRY',
      city: 'Kocaeli',
      status: 'AVAILABLE',
      images: ['/images/pump.png']
    },
    {
      title: 'Schneider Inverter',
      description: '11 kW - 380V Altivar series frequency drive. Box opened but never installed.',
      categoryId: categories['electrical'],
      sellerId: seller2.id,
      condition: 'New',
      brand: 'Schneider',
      price: 9900,
      currency: 'TRY',
      city: 'Ankara',
      status: 'AVAILABLE',
      images: ['/images/inverter.png']
    },
    {
      title: 'SKF Bearing 6312',
      description: '60x130x31 mm deep groove ball bearing. Sealed in original SKF packaging.',
      categoryId: categories['bearings'],
      sellerId: seller1.id,
      condition: 'New',
      brand: 'SKF',
      price: 850,
      currency: 'TRY',
      city: 'Konya',
      status: 'AVAILABLE',
      images: ['/images/bearing.png']
    },
    {
      title: 'Festo Pneumatic Cylinder',
      description: 'DSBC series, 32mm bore, 100mm stroke. Surplus inventory.',
      categoryId: categories['pneumatic'],
      sellerId: seller2.id,
      condition: 'New',
      brand: 'Festo',
      price: 1200,
      currency: 'TRY',
      city: 'Istanbul',
      status: 'AVAILABLE',
      images: ['/images/pump.png']
    },
    {
      title: 'Omron Proximity Sensor',
      description: 'E2E series inductive sensor, M12 size, PNP. Pack of 5.',
      categoryId: categories['automation'],
      sellerId: seller1.id,
      condition: 'New',
      brand: 'Omron',
      price: 3000,
      currency: 'TRY',
      city: 'Bursa',
      status: 'AVAILABLE',
      images: ['/images/inverter.png']
    },
    {
      title: 'ABB Robot Controller Parts',
      description: 'IRC5 controller boards, tested and working.',
      categoryId: categories['electrical'],
      sellerId: seller2.id,
      condition: 'Used',
      brand: 'ABB',
      price: 15000,
      currency: 'TRY',
      city: 'Izmir',
      status: 'AVAILABLE',
      images: ['/images/gearbox.png']
    }
  ]

  for (const item of listingsData) {
    const { images, ...data } = item
    const listing = await prisma.listing.create({ data })
    for (const url of images) {
      await prisma.listingImage.create({
        data: {
          listingId: listing.id,
          imageUrl: url
        }
      })
    }
  }

  // Urgent Requests
  const urgentRequests = [
    {
      userId: buyer1.id,
      title: 'Electric Motor 7.5 kW',
      partName: 'B3 Flange - 1500 RPM',
      description: 'Need it urgently for a broken line. IE3 efficiency minimum.',
      categoryId: categories['motors'],
      city: 'Istanbul',
      urgencyLevel: 'CRITICAL',
    },
    {
      userId: buyer1.id,
      title: 'Gearbox Reductor',
      partName: 'i=40 - 140Nm',
      description: 'Our conveyor stopped. Need this exact spec gearbox immediately.',
      categoryId: categories['gearboxes'],
      city: 'Kocaeli',
      urgencyLevel: 'URGENT',
    },
    {
      userId: buyer1.id,
      title: 'Bearing 6312',
      partName: '60x130x31 mm',
      description: 'Main shaft bearing failed, need a high quality replacement ASAP.',
      categoryId: categories['bearings'],
      city: 'Bursa',
      urgencyLevel: 'HIGH',
    }
  ]

  for (const req of urgentRequests) {
    await prisma.urgentRequest.create({ data: req })
  }

  console.log('Seed completed with rich data.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
