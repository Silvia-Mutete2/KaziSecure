"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { BarChart3, AlertTriangle, Target } from "lucide-react"

const forecastData = [
  { month: "Jan", actual: 65000, predicted: 67000, optimized: 72000 },
  { month: "Feb", actual: 59000, predicted: 61000, optimized: 68000 },
  { month: "Mar", actual: 72000, predicted: 70000, optimized: 78000 },
  { month: "Apr", actual: 0, predicted: 74000, optimized: 82000 },
  { month: "May", actual: 0, predicted: 78000, optimized: 86000 },
  { month: "Jun", actual: 0, predicted: 82000, optimized: 91000 },
]

const riskFactors = [
  {
    factor: "Fuel Price Volatility",
    impact: "High",
    probability: 75,
    mitigation: "Diversify to electric vehicle options or fuel-efficient routes",
  },
  {
    factor: "Seasonal Demand Drop",
    impact: "Medium",
    probability: 60,
    mitigation: "Build emergency fund and explore alternative income streams",
  },
  {
    factor: "Vehicle Breakdown",
    impact: "High",
    probability: 25,
    mitigation: "Maintain regular service schedule and backup transportation plan",
  },
]

export function PredictiveAnalytics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            6-Month Income Forecast
          </CardTitle>
          <CardDescription>AI-powered predictions with optimization scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  `KSh ${value?.toLocaleString()}`,
                  name === "actual" ? "Actual" : name === "predicted" ? "AI Prediction" : "With Optimization",
                ]}
              />
              <Area
                type="monotone"
                dataKey="optimized"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.1}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stackId="2"
                stroke="hsl(var(--accent))"
                fill="hsl(var(--accent))"
                fillOpacity={0.2}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))" }}
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">Next Month Prediction</div>
              <div className="text-xl font-bold text-primary">KSh 74,000</div>
              <Badge variant="secondary" className="mt-1">
                82% confidence
              </Badge>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">With AI Optimization</div>
              <div className="text-xl font-bold text-accent">KSh 82,000</div>
              <Badge variant="default" className="mt-1">
                +11% potential
              </Badge>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">6-Month Growth</div>
              <div className="text-xl font-bold text-chart-1">+26%</div>
              <Badge variant="secondary" className="mt-1">
                Projected
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Risk Assessment & Mitigation
          </CardTitle>
          <CardDescription>AI-identified risks and recommended actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {riskFactors.map((risk, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{risk.factor}</h4>
                <div className="flex items-center gap-2">
                  <Badge variant={risk.impact === "High" ? "destructive" : "secondary"}>{risk.impact} Impact</Badge>
                  <Badge variant="outline">{risk.probability}% likely</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Mitigation Strategy:</div>
                <p className="text-sm text-pretty">{risk.mitigation}</p>
              </div>

              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Create Action Plan
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Goal Achievement Tracker
          </CardTitle>
          <CardDescription>AI-powered progress monitoring and adjustments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Monthly Income Goal</h4>
                <Badge variant="secondary">75% achieved</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current: KSh 45,280</span>
                  <span>Target: KSh 60,000</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">AI suggests 3 more peak-hour sessions to reach goal</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Emergency Fund</h4>
                <Badge variant="outline">57% achieved</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current: KSh 8,500</span>
                  <span>Target: KSh 15,000</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "57%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  On track to complete in 2.3 months with current savings rate
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
