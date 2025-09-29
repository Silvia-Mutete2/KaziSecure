import { AIPredictionEngine } from "@/components/ai-prediction-engine"
import { SmartBudgeting } from "@/components/smart-budgeting"
import { PredictiveAnalytics } from "@/components/predictive-analytics"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AIInsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">AI Financial Intelligence</h1>
            <p className="text-muted-foreground text-pretty">
              Advanced machine learning insights to maximize your gig economy earnings
            </p>
          </div>

          <Tabs defaultValue="predictions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="predictions">Income Predictions</TabsTrigger>
              <TabsTrigger value="budgeting">Smart Budgeting</TabsTrigger>
              <TabsTrigger value="analytics">Predictive Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="predictions" className="space-y-6">
              <AIPredictionEngine />
            </TabsContent>

            <TabsContent value="budgeting" className="space-y-6">
              <SmartBudgeting />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <PredictiveAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
