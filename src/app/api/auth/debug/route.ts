import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const cwd = process.cwd()
    const filesInCwd = fs.existsSync(cwd) ? fs.readdirSync(cwd) : []
    
    const prismaDir = path.join(cwd, 'prisma')
    const filesInPrisma = fs.existsSync(prismaDir) ? fs.readdirSync(prismaDir) : []
    
    const tempDir = '/tmp'
    const filesInTemp = fs.existsSync(tempDir) ? fs.readdirSync(tempDir) : []
    
    // Check if we can find dev.db anywhere in the traced files
    const parentDir = path.resolve(cwd, '..')
    const filesInParent = fs.existsSync(parentDir) ? fs.readdirSync(parentDir) : []

    return NextResponse.json({
      cwd,
      filesInCwd,
      prismaDir,
      filesInPrisma,
      tempDir,
      filesInTemp,
      parentDir,
      filesInParent,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 })
  }
}
