import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const cwd = process.cwd()
    const prismaDir = path.join(cwd, 'prisma')
    const tempDbPath = path.join('/tmp', 'dev.db')
    
    // Execute a test query to trigger the prisma client initialization and copy logic
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true }
    })
    
    const filesInTemp = fs.existsSync('/tmp') ? fs.readdirSync('/tmp') : []

    return NextResponse.json({
      success: true,
      cwd,
      tempDbPathExists: fs.existsSync(tempDbPath),
      tempDbSize: fs.existsSync(tempDbPath) ? fs.statSync(tempDbPath).size : null,
      filesInTemp,
      usersCount: users.length,
      users,
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
      tempDbPathExists: fs.existsSync('/tmp/dev.db'),
      filesInTemp: fs.existsSync('/tmp') ? fs.readdirSync('/tmp') : [],
    }, { status: 500 })
  }
}
