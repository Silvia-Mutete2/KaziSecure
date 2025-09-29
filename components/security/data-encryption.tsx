"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lock, Key, Shield, Database, Smartphone, Wifi } from "lucide-react"

export function DataEncryption() {
  const encryptionStatus = {
    dataAtRest: { status: "active", strength: "AES-256", level: 100 },
    dataInTransit: { status: "active", strength: "TLS 1.3", level: 100 },
    backups: { status: "active", strength: "AES-256", level: 100 },
    ussdSessions: { status: "active", strength: "Encrypted", level: 95 },
    mobileApp: { status: "active", strength: "End-to-End", level: 98 },
    apiCalls: { status: "active", strength: "HTTPS/TLS", level: 100 },
  }

  const securityCertifications = [
    { name: "ISO 27001", status: "Certified", description: "Information Security Management" },
    { name: "PCI DSS", status: "Compliant", description: "Payment Card Industry Standards" },
    { name: "SOC 2 Type II", status: "Certified", description: "Security & Availability Controls" },
    { name: "GDPR", status: "Compliant", description: "Data Protection Regulation" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Data Encryption Status
          </CardTitle>
          <CardDescription>End-to-end protection for all your financial data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">Data at Rest</h4>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Encryption:</span>
                  <span className="font-medium">{encryptionStatus.dataAtRest.strength}</span>
                </div>
                <Progress value={encryptionStatus.dataAtRest.level} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  All stored data encrypted with military-grade AES-256 encryption
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">Data in Transit</h4>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Protocol:</span>
                  <span className="font-medium">{encryptionStatus.dataInTransit.strength}</span>
                </div>
                <Progress value={encryptionStatus.dataInTransit.level} className="h-2" />
                <p className="text-xs text-muted-foreground">All communications secured with latest TLS 1.3 protocol</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">Backup Encryption</h4>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Method:</span>
                  <span className="font-medium">{encryptionStatus.backups.strength}</span>
                </div>
                <Progress value={encryptionStatus.backups.level} className="h-2" />
                <p className="text-xs text-muted-foreground">Encrypted backups with separate key management</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">USSD Sessions</h4>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Security:</span>
                  <span className="font-medium">{encryptionStatus.ussdSessions.strength}</span>
                </div>
                <Progress value={encryptionStatus.ussdSessions.level} className="h-2" />
                <p className="text-xs text-muted-foreground">USSD data encrypted and sessions secured</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Key Management
          </CardTitle>
          <CardDescription>Advanced cryptographic key protection and rotation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">256-bit</div>
              <div className="text-sm text-muted-foreground">Encryption Strength</div>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <div className="text-2xl font-bold text-accent">30 days</div>
              <div className="text-sm text-muted-foreground">Key Rotation</div>
            </div>
            <div className="text-center p-4 bg-chart-1/5 rounded-lg">
              <div className="text-2xl font-bold text-chart-1">HSM</div>
              <div className="text-sm text-muted-foreground">Hardware Security</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Key Management Features:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Automatic key rotation every 30 days",
                "Hardware Security Module (HSM) protection",
                "Multi-party key generation and storage",
                "Zero-knowledge architecture",
                "Secure key escrow for recovery",
                "Audit trail for all key operations",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Certifications</CardTitle>
          <CardDescription>Industry-standard compliance and certifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityCertifications.map((cert, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{cert.name}</h4>
                  <Badge variant="secondary">{cert.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Security Audit</h4>
                <p className="text-sm text-muted-foreground">Last conducted: December 2024</p>
              </div>
              <Button variant="outline" size="sm" className="bg-transparent">
                View Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
