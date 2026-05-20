import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prismaClient: PrismaClient

if (process.env.NODE_ENV === 'production') {
  // On Vercel (production serverless environment), SQLite needs to run from a writable directory.
  // We copy the database file from the read-only deployment bundle to /tmp which is writable.
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
  const tempDbPath = path.join('/tmp', 'dev.db')
  
  if (!fs.existsSync(tempDbPath)) {
    try {
      const tempDir = path.dirname(tempDbPath)
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true })
      }
      fs.copyFileSync(dbPath, tempDbPath)
      console.log('Database successfully copied to /tmp')
    } catch (error) {
      console.error('Failed to copy SQLite database to /tmp:', error)
    }
  }

  prismaClient = new PrismaClient({
    datasources: {
      db: {
        url: `file:${tempDbPath}`,
      },
    },
  })
} else {
  prismaClient = globalForPrisma.prisma ?? new PrismaClient()
}

export const prisma = prismaClient

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
