export interface Prediction {
  amount: number
  confidence: number
  factors?: string[]
}

export interface Allocation {
  pct: number
  amt: number
}

export interface Allocations {
  buffer: Allocation
  savings: Allocation
  essentials: Allocation
  discretionary: Allocation
}

/**
 * Compute allocations based on predicted amount, confidence, and user overrides.
 * - buffer increases when confidence is lower
 * - userOverrides can adjust default savings/essentials/discretionary percentages
 */
export function computeAllocations(pred: Prediction, userOverrides?: Partial<Record<'savings'|'essentials'|'discretionary', number>>): Allocations {
  const conf = Math.max(0, Math.min(100, pred.confidence))
  const bufferPct = Math.min(20, 8 + Math.round((100 - conf) / 6))

  // defaults
  let savingsPct = 20
  let essentialsPct = 50

  if (userOverrides?.savings !== undefined) savingsPct = userOverrides.savings
  if (userOverrides?.essentials !== undefined) essentialsPct = userOverrides.essentials

  // discretionary is what's left after buffer, savings and essentials unless overridden
  let discretionaryPct = Math.max(5, 100 - (bufferPct + savingsPct + essentialsPct))
  if (userOverrides?.discretionary !== undefined) discretionaryPct = userOverrides.discretionary

  const amount = pred.amount

  const alloc = (pct: number): Allocation => ({ pct, amt: Math.round((pct / 100) * amount) })

  return {
    buffer: alloc(bufferPct),
    savings: alloc(savingsPct),
    essentials: alloc(essentialsPct),
    discretionary: alloc(discretionaryPct),
  }
}

export const USER_BUDGET_KEY = 'kazisecure_user_budget_overrides'

export type UserBudgetOverrides = {
  savings?: number
  essentials?: number
  discretionary?: number
}

export function loadUserBudget(): UserBudgetOverrides | null {
  try {
    const raw = localStorage.getItem(USER_BUDGET_KEY)
    if (!raw) return null
    return JSON.parse(raw) as UserBudgetOverrides
  } catch (e) {
    return null
  }
}

export function saveUserBudget(overrides: UserBudgetOverrides) {
  try {
    localStorage.setItem(USER_BUDGET_KEY, JSON.stringify(overrides))
  } catch (e) {
    // ignore
  }
}
