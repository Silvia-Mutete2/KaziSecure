"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { IncomeChart } from "@/components/income-chart"
import { AIInsights } from "@/components/ai-insights"
import { SecurityStatus } from "@/components/security-status"
import { USSDAccess } from "@/components/ussd-access"
import {
  TrendingUp,
  Wallet,
  Target,
  CreditCard,
  PlusCircle,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Brain,
} from "lucide-react"
import Link from "next/link"

export function FinancialDashboard() {
  const currentBalance = 45280
  const monthlyGoal = 60000
  const savingsGoal = 15000
  const currentSavings = 8500

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-balance">Welcome back, Silvia</h2>
        <p className="text-muted-foreground text-pretty">Here's your financial overview for this month</p>
      </div>

      {/* AI Insights Banner */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">AI Prediction Ready</h3>
              </div>
              <p className="text-sm text-muted-foreground text-pretty">
                Your personalized income forecast and optimization strategies are available
              </p>
            </div>
            <Link href="/ai-insights">
              <Button>
                View AI Insights
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {currentBalance.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-primary" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Goal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {monthlyGoal.toLocaleString()}</div>
            <Progress value={(currentBalance / monthlyGoal) * 100} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((currentBalance / monthlyGoal) * 100)}% achieved
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {currentSavings.toLocaleString()}</div>
            <Progress value={(currentSavings / savingsGoal) * 100} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-1">Goal: KSh {savingsGoal.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">720</div>
            <Badge variant="secondary" className="mt-1">
              Good
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income Chart */}
        <div className="lg:col-span-2">
          <IncomeChart />
        </div>

        {/* AI Insights */}
        <div>
          <AIInsights />
        </div>
      </div>

      {/* Recent Transactions & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest income and expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { type: "income", amount: 2500, source: "Uber Ride", time: "2 hours ago", icon: ArrowUpRight },
              { type: "expense", amount: 450, source: "Fuel", time: "4 hours ago", icon: ArrowDownRight },
              { type: "income", amount: 1800, source: "Delivery", time: "6 hours ago", icon: ArrowUpRight },
              { type: "expense", amount: 200, source: "Phone Credit", time: "1 day ago", icon: ArrowDownRight },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === "income" ? "bg-primary/10" : "bg-destructive/10"
                    }`}
                  >
                    <transaction.icon
                      className={`w-4 h-4 ${transaction.type === "income" ? "text-primary" : "text-destructive"}`}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.source}</p>
                    <p className="text-sm text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
                <div className={`font-medium ${transaction.type === "income" ? "text-primary" : "text-destructive"}`}>
                  {transaction.type === "income" ? "+" : "-"}KSh {transaction.amount}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your finances efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Income
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Set Savings Goal
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <CreditCard className="w-4 h-4 mr-2" />
                Apply for Credit
              </Button>
            </CardContent>
          </Card>

          <SecurityStatus />
          <USSDAccess />
        </div>
      </div>
    </div>
  )
}
