import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, AlertCircle, Eye } from "lucide-react"
import Link from "next/link"

export function SecurityStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Security Status
        </CardTitle>
        <CardDescription>Your data protection overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm">Data Encrypted (AES-256)</span>
          </div>
          <Badge variant="secondary">Active</Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm">2FA Enabled</span>
          </div>
          <Badge variant="secondary">Active</Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm">Fraud Detection</span>
          </div>
          <Badge variant="secondary">Active</Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-accent" />
            <span className="text-sm">Backup Verification</span>
          </div>
          <Badge variant="outline">Pending</Badge>
        </div>

        <div className="pt-3 border-t">
          <Link href="/security">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Eye className="w-4 h-4 mr-2" />
              View Security Center
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
