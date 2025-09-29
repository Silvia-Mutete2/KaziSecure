"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Smartphone, Key, Eye, AlertTriangle, Fingerprint, Mail, Phone, Lock } from "lucide-react"

export function SecuritySettings() {
  const securityFeatures = [
    {
      id: "2fa",
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security with SMS codes",
      icon: Smartphone,
      enabled: true,
      critical: true,
    },
    {
      id: "biometric",
      title: "Biometric Login",
      description: "Use fingerprint or face ID for quick access",
      icon: Fingerprint,
      enabled: true,
      critical: false,
    },
    {
      id: "email-alerts",
      title: "Email Security Alerts",
      description: "Get notified of suspicious account activity",
      icon: Mail,
      enabled: true,
      critical: false,
    },
    {
      id: "session-timeout",
      title: "Auto Session Timeout",
      description: "Automatically log out after 30 minutes of inactivity",
      icon: Lock,
      enabled: true,
      critical: true,
    },
  ]

  const recentActivity = [
    {
      action: "Login from Android device",
      location: "Nairobi, Kenya",
      time: "2 hours ago",
      status: "success",
    },
    {
      action: "Password changed",
      location: "Nairobi, Kenya",
      time: "3 days ago",
      status: "success",
    },
    {
      action: "Failed login attempt",
      location: "Unknown location",
      time: "1 week ago",
      status: "blocked",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Security Features
          </CardTitle>
          <CardDescription>Manage your account security settings and authentication methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {securityFeatures.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{feature.title}</h4>
                    {feature.critical && (
                      <Badge variant="destructive" className="text-xs">
                        Critical
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
                </div>
              </div>
              <Switch checked={feature.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password & Recovery</CardTitle>
          <CardDescription>Manage your login credentials and account recovery options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start bg-transparent">
              <Key className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Mail className="w-4 h-4 mr-2" />
              Update Recovery Email
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Phone className="w-4 h-4 mr-2" />
              Change Phone Number
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Eye className="w-4 h-4 mr-2" />
              Download My Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Security Activity</CardTitle>
          <CardDescription>Monitor your account access and security events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.status === "success"
                      ? "bg-primary"
                      : activity.status === "blocked"
                        ? "bg-destructive"
                        : "bg-accent"
                  }`}
                />
                <div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.location} • {activity.time}
                  </p>
                </div>
              </div>
              <Badge variant={activity.status === "success" ? "secondary" : "destructive"}>{activity.status}</Badge>
            </div>
          ))}

          <Button variant="outline" className="w-full bg-transparent">
            View All Activity
          </Button>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Security Tip:</strong> Never share your login credentials. KaziSecure will never ask for your password
          via email or SMS.
        </AlertDescription>
      </Alert>
    </div>
  )
}
