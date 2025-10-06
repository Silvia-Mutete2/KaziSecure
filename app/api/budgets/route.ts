import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DB_DIR = path.resolve(process.cwd(), '.data')
const DB_FILE = path.join(DB_DIR, 'budgets.json')

function ensureDb() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR)
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify({}), 'utf8')
}

export async function POST(request: Request) {
  try {
    ensureDb()
    const body = await request.json()
    // Simple auth validation: expect Authorization: Bearer token-<userId>
    const auth = request.headers.get('authorization') || ''
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '{}')
    const id = body.userId || 'anonymous'
    if (!auth || auth !== `Bearer token-${id}`) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

  const updatedAt = new Date().toISOString()
  data[id] = { overrides: body.overrides, updatedAt }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8')
  return NextResponse.json({ ok: true, updatedAt })
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    ensureDb()
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '{}')
    const url = new URL(request.url)
    const id = url.searchParams.get('userId') || 'anonymous'
    const auth = request.headers.get('authorization') || ''
    if (!auth || auth !== `Bearer token-${id}`) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ ok: true, data: data[id] || null })
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 })
  }
}
