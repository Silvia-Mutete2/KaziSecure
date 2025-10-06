import { describe, it, expect } from 'vitest'
import { computeAllocations } from '../lib/budget'

describe('computeAllocations', () => {
  it('computes sensible allocations for high confidence', () => {
    const pred = { amount: 10000, confidence: 95 }
    const allocs = computeAllocations(pred as any)

    // high confidence -> small buffer
    expect(allocs.buffer.pct).toBeLessThanOrEqual(10)
    expect(allocs.savings.pct).toBe(20)
    expect(allocs.essentials.pct).toBe(50)
    expect(allocs.buffer.amt + allocs.savings.amt + allocs.essentials.amt + allocs.discretionary.amt).toBeGreaterThanOrEqual(10000 - 1)
  })

  it('increases buffer for low confidence', () => {
    const pred = { amount: 5000, confidence: 40 }
    const low = computeAllocations(pred as any)
    const pred2 = { amount: 5000, confidence: 90 }
    const high = computeAllocations(pred2 as any)

    expect(low.buffer.pct).toBeGreaterThan(high.buffer.pct)
  })

  it('respects user overrides', () => {
    const pred = { amount: 20000, confidence: 80 }
    const overrides = { savings: 10, essentials: 40 }
    const allocs = computeAllocations(pred as any, overrides)

    expect(allocs.savings.pct).toBe(10)
    expect(allocs.essentials.pct).toBe(40)
  })

  it('handles zero amount gracefully', () => {
    const pred = { amount: 0, confidence: 80 }
    const allocs = computeAllocations(pred as any)

    expect(allocs.buffer.amt).toBe(0)
    expect(allocs.savings.amt).toBe(0)
    expect(allocs.essentials.amt).toBe(0)
    expect(allocs.discretionary.amt).toBe(0)
  })

  it('handles extreme confidences', () => {
    const low = computeAllocations({ amount: 1000, confidence: 0 } as any)
    const high = computeAllocations({ amount: 1000, confidence: 100 } as any)

    // low confidence should yield a larger buffer than high confidence
    expect(low.buffer.pct).toBeGreaterThanOrEqual(high.buffer.pct)
    expect(low.buffer.pct).toBeGreaterThan(0)
    expect(high.buffer.pct).toBeGreaterThanOrEqual(0)
  })
})
