"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, Eye, Brain, Lock } from "lucide-react"

export function FraudDetection() {
  const fraudAlerts = [
    {
      id: "1",
      type: "suspicious_login",
      severity: "high",
      title: "Unusual Login Location",
      description: "Login attempt from Mombasa detected. Your usual location is Nairobi.",
      timestamp: "2 hours ago",
      status: "blocked",
      confidence: 95,
    },
    {
      id: "2",
      type: "transaction_pattern",
      severity: "medium",
      title: "Unusual Transaction Pattern",
      description: "Large expense entry (KSh 15,000) outside normal spending pattern.",
      timestamp: "1 day ago",
      status: "flagged",
      confidence: 78,
    },
    {
      id: "3",
      type: "device_change",
      severity: "low",
      title: "New Device Access",
      description: "Account accessed from new Android device.",
      timestamp: "3 days ago",
      status: "verified",
      confidence: 65,
    },
  ]

  const securityMetrics = {
    threatLevel: "Low",
    accountSecurity: 92,
    fraudPrevention: 98,
    dataProtection: 95,
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            AI Fraud Detection
          </CardTitle>
          <CardDescription>Real-time monitoring and threat prevention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">{securityMetrics.accountSecurity}%</div>
              <div className="text-sm text-muted-foreground">Account Security</div>
              <Progress value={securityMetrics.accountSecurity} className="mt-2" />
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <div className="text-2xl font-bold text-accent">{securityMetrics.fraudPrevention}%</div>
              <div className="text-sm text-muted-foreground">Fraud Prevention</div>
              <Progress value={securityMetrics.fraudPrevention} className="mt-2" />
            </div>
            <div className="text-center p-4 bg-chart-1/5 rounded-lg">
              <div className="text-2xl font-bold text-chart-1">{securityMetrics.dataProtection}%</div>
              <div className="text-sm text-muted-foreground">Data Protection</div>
              <Progress value={securityMetrics.dataProtection} className="mt-2" />
            </div>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Current Threat Level: {securityMetrics.threatLevel}</strong> - Your account is secure and
              protected by advanced AI monitoring.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Alerts</CardTitle>
          <CardDescription>Recent fraud detection and security events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {fraudAlerts.map((alert) => (
            <div key={alert.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      alert.severity === "high"
                        ? "bg-destructive/10"
                        : alert.severity === "medium"
                          ? "bg-accent/10"
                          : "bg-primary/10"
                    }`}
                  >
                    {alert.status === "blocked" ? (
                      <Shield className="w-5 h-5 text-destructive" />
                    ) : alert.status === "flagged" ? (
                      <AlertTriangle className="w-5 h-5 text-accent" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground text-pretty">{alert.description}</p>
                    <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant={
                      alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "default" : "secondary"
                    }
                  >
                    {alert.severity} risk
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {alert.confidence}% confidence
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    alert.status === "blocked" ? "destructive" : alert.status === "flagged" ? "default" : "secondary"
                  }
                >
                  {alert.status}
                </Badge>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Details
                  </Button>
                  {alert.status === "flagged" && (
                    <Button size="sm" variant="outline">
                      Mark Safe
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Security Features
          </CardTitle>
          <CardDescription>Advanced machine learning protection systems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-5 h-5 text-primary" />
                <h4 className="font-medium">Behavioral Analysis</h4>
              </div>
              <p className="text-sm text-muted-foreground text-pretty">
                AI monitors your spending patterns, login times, and device usage to detect anomalies.
              </p>
              <Badge variant="secondary" className="mt-2">
                Active
              </Badge>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <h4 className="font-medium">Real-time Threat Detection</h4>
              </div>
              <p className="text-sm text-muted-foreground text-pretty">
                Instant analysis of transactions and access attempts using machine learning models.
              </p>
              <Badge variant="secondary" className="mt-2">
                Active
              </Badge>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-5 h-5 text-primary" />
                <h4 className="font-medium">Predictive Security</h4>
              </div>
              <p className="text-sm text-muted-foreground text-pretty">
                Predicts potential security risks before they occur based on global threat intelligence.
              </p>
              <Badge variant="secondary" className="mt-2">
                Active
              </Badge>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h4 className="font-medium">Adaptive Protection</h4>
              </div>
              <p className="text-sm text-muted-foreground text-pretty">
                Security measures automatically adjust based on detected risk levels and user behavior.
              </p>
              <Badge variant="secondary" className="mt-2">
                Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
