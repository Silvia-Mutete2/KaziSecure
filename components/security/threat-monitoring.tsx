"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Shield, AlertTriangle, Activity, Globe, Zap, Eye } from "lucide-react"

const threatData = [
  { time: "00:00", threats: 12, blocked: 11, allowed: 1 },
  { time: "04:00", threats: 8, blocked: 8, allowed: 0 },
  { time: "08:00", threats: 25, blocked: 23, allowed: 2 },
  { time: "12:00", threats: 45, blocked: 42, allowed: 3 },
  { time: "16:00", threats: 38, blocked: 35, allowed: 3 },
  { time: "20:00", threats: 52, blocked: 48, allowed: 4 },
]

export function ThreatMonitoring() {
  const threatStats = {
    totalThreats: 1247,
    blockedThreats: 1198,
    falsePositives: 12,
    responseTime: "0.3s",
  }

  const activeThreats = [
    {
      id: "1",
      type: "Brute Force Attack",
      source: "Multiple IPs",
      target: "Login Endpoint",
      severity: "high",
      status: "blocked",
      timestamp: "2 minutes ago",
    },
    {
      id: "2",
      type: "SQL Injection Attempt",
      source: "Unknown IP",
      target: "API Endpoint",
      severity: "high",
      status: "blocked",
      timestamp: "15 minutes ago",
    },
    {
      id: "3",
      type: "Suspicious User Agent",
      source: "Bot Network",
      target: "Web Interface",
      severity: "medium",
      status: "monitoring",
      timestamp: "1 hour ago",
    },
    {
      id: "4",
      type: "Rate Limit Exceeded",
      source: "Single IP",
      target: "USSD Gateway",
      severity: "low",
      status: "throttled",
      timestamp: "2 hours ago",
    },
  ]

  const securityMetrics = [
    { name: "Uptime", value: "99.9%", icon: Activity, color: "text-primary" },
    { name: "Response Time", value: "0.3s", icon: Zap, color: "text-accent" },
    { name: "Threat Detection", value: "96.1%", icon: Shield, color: "text-chart-1" },
    { name: "Global Coverage", value: "24/7", icon: Globe, color: "text-chart-2" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Real-time Threat Monitoring
          </CardTitle>
          <CardDescription>24/7 security monitoring and threat intelligence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {securityMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                <metric.icon className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.name}</div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-medium mb-4">Threat Activity (Last 24 Hours)</h4>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={threatData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="blocked"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="allowed"
                  stackId="1"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Threat Detection</CardTitle>
          <CardDescription>Current security incidents and responses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeThreats.map((threat) => (
            <div key={threat.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      threat.severity === "high"
                        ? "bg-destructive/10"
                        : threat.severity === "medium"
                          ? "bg-accent/10"
                          : "bg-primary/10"
                    }`}
                  >
                    <AlertTriangle
                      className={`w-5 h-5 ${
                        threat.severity === "high"
                          ? "text-destructive"
                          : threat.severity === "medium"
                            ? "text-accent"
                            : "text-primary"
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{threat.type}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Source: {threat.source}</p>
                      <p>Target: {threat.target}</p>
                      <p>Time: {threat.timestamp}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant={
                      threat.severity === "high"
                        ? "destructive"
                        : threat.severity === "medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {threat.severity}
                  </Badge>
                  <Badge
                    variant={
                      threat.status === "blocked"
                        ? "destructive"
                        : threat.status === "monitoring"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {threat.status}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-end">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Intelligence</CardTitle>
          <CardDescription>Global threat intelligence and protection measures</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <h4 className="font-medium mb-2">Threat Intelligence Sources</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Global Security Networks</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Government Databases</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Industry Threat Feeds</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span>ML Pattern Recognition</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </div>
            </div>

            <div className="p-4 bg-accent/5 rounded-lg">
              <h4 className="font-medium mb-2">Protection Measures</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>DDoS Protection</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Web Application Firewall</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Intrusion Detection</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Behavioral Analysis</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Security Operations Center</h4>
                <p className="text-sm text-muted-foreground">24/7 monitoring by security experts</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium">Online</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
