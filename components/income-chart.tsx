"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Week 1", income: 12000, predicted: 12500 },
  { name: "Week 2", income: 15000, predicted: 14800 },
  { name: "Week 3", income: 18000, predicted: 17200 },
  { name: "Week 4", income: 0, predicted: 19500 },
]

export function IncomeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Tracking</CardTitle>
        <CardDescription>Your weekly income with AI predictions</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [
                `KSh ${value?.toLocaleString()}`,
                name === "income" ? "Actual Income" : "AI Prediction",
              ]}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))" }}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--accent))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
