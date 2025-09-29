import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react"

export function AIInsights() {
  const insights = [
    {
      type: "opportunity",
      icon: TrendingUp,
      title: "Peak Hours Detected",
      description: "You earn 40% more between 7-9 PM. Consider working more during these hours.",
      priority: "high",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Expense Alert",
      description: "Fuel costs increased by 25% this month. Budget adjustment recommended.",
      priority: "medium",
    },
    {
      type: "tip",
      icon: Lightbulb,
      title: "Savings Opportunity",
      description: "You can save KSh 2,000 monthly by optimizing your routes.",
      priority: "low",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Insights
        </CardTitle>
        <CardDescription>Personalized recommendations to boost your income</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="space-y-2 p-3 rounded-lg border bg-card/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <insight.icon className="w-4 h-4 text-muted-foreground" />
                <h4 className="font-medium text-sm">{insight.title}</h4>
              </div>
              <Badge variant={insight.priority === "high" ? "default" : "secondary"} className="text-xs">
                {insight.priority}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">{insight.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
