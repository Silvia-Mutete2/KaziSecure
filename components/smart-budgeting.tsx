"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Calculator, TrendingDown, AlertCircle, CheckCircle } from "lucide-react"

const expenseData = [
  { name: "Fuel", value: 15000, color: "hsl(var(--chart-1))" },
  { name: "Vehicle Maintenance", value: 8000, color: "hsl(var(--chart-2))" },
  { name: "Food", value: 12000, color: "hsl(var(--chart-3))" },
  { name: "Phone/Data", value: 3000, color: "hsl(var(--chart-4))" },
  { name: "Savings", value: 8500, color: "hsl(var(--chart-5))" },
]

const budgetRecommendations = [
  {
    category: "Fuel Optimization",
    current: 15000,
    recommended: 12000,
    savings: 3000,
    status: "high-impact",
    tip: "Use AI route optimization to reduce fuel consumption by 20%",
  },
  {
    category: "Emergency Fund",
    current: 2000,
    recommended: 8000,
    savings: -6000,
    status: "critical",
    tip: "Build emergency fund to 2 months of expenses for gig work stability",
  },
  {
    category: "Vehicle Maintenance",
    current: 8000,
    recommended: 6000,
    savings: 2000,
    status: "moderate",
    tip: "Preventive maintenance scheduling can reduce unexpected costs",
  },
]

export function SmartBudgeting() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            AI Budget Analysis
          </CardTitle>
          <CardDescription>Intelligent spending insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-4">Monthly Expense Breakdown</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`KSh ${value.toLocaleString()}`, "Amount"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Category Breakdown</h4>
              {expenseData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">KSh {item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Budget Recommendations</CardTitle>
          <CardDescription>Personalized suggestions to optimize your spending</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {budgetRecommendations.map((rec, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{rec.category}</h4>
                <Badge
                  variant={
                    rec.status === "critical" ? "destructive" : rec.status === "high-impact" ? "default" : "secondary"
                  }
                >
                  {rec.status === "critical" ? (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  ) : rec.status === "high-impact" ? (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  ) : (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  )}
                  {rec.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Current:</span>
                  <div className="font-medium">KSh {rec.current.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Recommended:</span>
                  <div className="font-medium">KSh {rec.recommended.toLocaleString()}</div>
                </div>
              </div>

              <div className={`text-sm font-medium ${rec.savings > 0 ? "text-primary" : "text-destructive"}`}>
                {rec.savings > 0 ? "Potential Savings: " : "Additional Investment: "}
                KSh {Math.abs(rec.savings).toLocaleString()}/month
              </div>

              <p className="text-sm text-muted-foreground text-pretty">{rec.tip}</p>

              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Apply Recommendation
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
