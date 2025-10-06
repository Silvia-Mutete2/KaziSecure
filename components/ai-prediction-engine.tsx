"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Target } from "lucide-react"
import { computeAllocations, loadUserBudget, saveUserBudget, type UserBudgetOverrides } from "@/lib/budget"
import { toast } from 'sonner'

export function AIPredictionEngine() {
  const predictions = {
    today: { amount: 3200, confidence: 85, factors: ["Peak hours", "Good weather", "Weekend demand"] },
    week: { amount: 18500, confidence: 78, factors: ["Historical patterns", "Event calendar", "Seasonal trends"] },
    month: { amount: 72000, confidence: 72, factors: ["Market analysis", "Economic indicators", "Personal growth"] },
  }

  const optimizations = [
    {
      type: "route",
      title: "Optimal Route Planning",
      description: "AI suggests routes that increase earnings by 23% based on traffic and demand patterns",
      impact: "+KSh 4,200/month",
      confidence: 89,
    },
    {
      type: "timing",
      title: "Peak Hour Optimization",
      description: "Work 2 more hours during 7-9 PM window for maximum income potential",
      impact: "+KSh 3,800/month",
      confidence: 92,
    },
    {
      type: "service",
      title: "Service Mix Recommendation",
      description: "Balance ride-sharing (60%) and delivery (40%) for optimal earnings",
      impact: "+KSh 2,100/month",
      confidence: 76,
    },
  ]

  const [overrides, setOverrides] = useState<UserBudgetOverrides | null>(null)

  useEffect(() => {
    const saved = loadUserBudget()
    if (saved) setOverrides(saved)

    // If user is authenticated, try to load server-saved overrides
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null
    if (token && userId) {
      fetch(`/api/budgets?userId=${userId}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((data) => {
          if (data && data.ok && data.data) {
            setOverrides(data.data.overrides)
            setLastSynced(data.data.updatedAt)
            // also persist locally
            try {
              localStorage.setItem('kazisecure_user_budget_overrides', JSON.stringify(data.data.overrides))
            } catch (e) {}
          }
        })
        .catch(() => {})
    }
  }, [])

  const [lastSynced, setLastSynced] = useState<string | null>(null)

  function updateOverride<K extends keyof UserBudgetOverrides>(key: K, value: number) {
    const next = { ...(overrides || {}), [key]: value }
    setOverrides(next)
    saveUserBudget(next)
  }

  async function applyBudget() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null
    try {
      const res = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ overrides, userId: userId || 'anonymous' }),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        toast.success('Budget synced to server')
      } else if (data && data.error) {
        toast.error(`Failed: ${data.error}`)
      } else {
        toast.error('Failed to sync budget')
      }
    } catch (e) {
    toast.error('Network error while syncing')
    }
    finally {
    }
  }

  function resetDefaults() {
    setOverrides(null)
    try {
      localStorage.removeItem('kazisecure_user_budget_overrides')
    } catch (e) {
      // ignore
    }
    toast('Budget reset to defaults')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Income Predictions
          </CardTitle>
          <CardDescription>Machine learning powered earnings forecasts</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>

            {Object.entries(predictions).map(([period, data]) => (
              <TabsContent key={period} value={period} className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">KSh {data.amount.toLocaleString()}</div>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="secondary">{data.confidence}% confidence</Badge>
                    <Progress value={data.confidence} className="w-24" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Key Factors:</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.factors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            AI-Powered Dynamic Budgeting
          </CardTitle>
          <CardDescription>Flexible spending limits generated from predicted income</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lastSynced && (
              <div className="text-xs text-muted-foreground">Last synced: {new Date(lastSynced).toLocaleString()}</div>
            )}
            <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium flex flex-col">
                    <span>Savings %</span>
                    <input
                      type="range"
                      min={0}
                      max={50}
                      value={(overrides?.savings ?? 20).toString()}
                      onChange={(e) => updateOverride('savings', Number(e.target.value))}
                    />
                  </label>
                </div>
              <div className="w-16 text-right">{(overrides?.savings ?? 20)}%</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium flex flex-col">
                  <span>Essentials %</span>
                  <input
                    type="range"
                    min={30}
                    max={80}
                    value={(overrides?.essentials ?? 50).toString()}
                    onChange={(e) => updateOverride('essentials', Number(e.target.value))}
                  />
                </label>
              </div>
              <div className="w-16 text-right">{(overrides?.essentials ?? 50)}%</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium flex flex-col">
                  <span>Discretionary %</span>
                  <input
                    type="range"
                    min={5}
                    max={40}
                    value={(overrides?.discretionary ?? 25).toString()}
                    onChange={(e) => updateOverride('discretionary', Number(e.target.value))}
                  />
                </label>
              </div>
              <div className="w-16 text-right">{(overrides?.discretionary ?? 25)}%</div>
            </div>

            <Tabs defaultValue="week" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>

              {Object.entries(predictions).map(([period, data]) => {
                const allocs = computeAllocations(data as any, overrides || undefined)

                return (
                  <TabsContent key={period} value={period} className="space-y-4">
                    <div className="text-center space-y-2">
                      <div className="text-xl font-semibold">Recommended Budget — KSh {data.amount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Confidence: <Badge variant="secondary">{data.confidence}%</Badge></div>
                    </div>

                    <div className="space-y-3">
                      {Object.entries(allocs).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="capitalize font-medium">{key}</div>
                              <div className="text-sm text-muted-foreground">{val.pct}%</div>
                            </div>
                            <Progress value={Math.max(1, val.pct)} className="mt-2" />
                          </div>
                          <div className="w-36 text-right font-medium">KSh {val.amt.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Tip: Adjust percentages above to match your goals; changes are saved locally.</p>
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => applyBudget()}>Apply Budget</Button>
                        <Button size="sm" variant="outline" onClick={() => resetDefaults()}>Reset</Button>
                      </div>
                    </div>
                  </TabsContent>
                )
              })}
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            AI Optimization Recommendations
          </CardTitle>
          <CardDescription>Personalized strategies to maximize your earnings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {optimizations.map((opt, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">{opt.title}</h4>
                  <p className="text-sm text-muted-foreground text-pretty">{opt.description}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {opt.confidence}% sure
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-primary">{opt.impact}</div>
                <Button size="sm" variant="outline">
                  Apply Strategy
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
