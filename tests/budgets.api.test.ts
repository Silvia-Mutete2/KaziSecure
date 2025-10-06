import { describe, it, expect, beforeEach } from 'vitest'
import fs from 'fs'
import path from 'path'

const DB_DIR = path.resolve(process.cwd(), '.data')
const DB_FILE = path.join(DB_DIR, 'budgets.json')

function cleanup() {
  if (fs.existsSync(DB_FILE)) fs.unlinkSync(DB_FILE)
  if (fs.existsSync(DB_DIR)) fs.rmdirSync(DB_DIR)
}

beforeEach(() => {
  cleanup()
})

describe('budgets API', () => {
  it('rejects unauthorized POST', async () => {
    const { POST } = await import('@/app/api/budgets/route')
    const req = new Request('http://localhost/api/budgets', { method: 'POST', body: JSON.stringify({ userId: 'u1', overrides: { savings: 10 } }) })
    const res = await POST(req as any)
    const json = await res.json()
    expect(res.status).toBe(401)
    expect(json.ok).toBe(false)
  })

  it('allows authorized POST and GET', async () => {
    const { POST, GET } = await import('@/app/api/budgets/route')
    const body = { userId: 'u2', overrides: { savings: 15 } }
    const req = new Request('http://localhost/api/budgets', { method: 'POST', headers: { Authorization: 'Bearer token-u2' }, body: JSON.stringify(body) })
    const postRes = await POST(req as any)
    const postJson = await postRes.json()
    expect(postRes.status).toBe(200)
    expect(postJson.ok).toBe(true)

    const getReq = new Request('http://localhost/api/budgets?userId=u2', { method: 'GET', headers: { Authorization: 'Bearer token-u2' } })
    const getRes = await GET(getReq as any)
    const getJson = await getRes.json()
    expect(getRes.status).toBe(200)
    expect(getJson.ok).toBe(true)
    expect(getJson.data.overrides.savings).toBe(15)
  })
})
