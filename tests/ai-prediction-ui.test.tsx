import React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { AIPredictionEngine } from '../components/ai-prediction-engine'

beforeEach(() => {
  localStorage.clear()
})

describe('AIPredictionEngine UI', () => {
  it('saves overrides to localStorage when sliders change', async () => {
    render(<AIPredictionEngine />)

    // find the Savings slider (label text exists)
    const savings = screen.getByLabelText(/Savings %/i) as HTMLInputElement
    fireEvent.change(savings, { target: { value: '15' } })

    // check localStorage
    const raw = localStorage.getItem('kazisecure_user_budget_overrides')
    expect(raw).not.toBeNull()
    const parsed = JSON.parse(raw as string)
    expect(parsed.savings).toBe(15)
  })
})
