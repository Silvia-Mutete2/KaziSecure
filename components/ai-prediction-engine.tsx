"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Target } from "lucide-react"

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
