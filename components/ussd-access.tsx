"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Copy, ExternalLink, WifiOff } from "lucide-react"
import Link from "next/link"

export function USSDAccess() {
  const ussdCode = "*384*7#"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ussdCode)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-primary" />
          USSD Access
        </CardTitle>
        <CardDescription>Access your account from any phone</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <code className="text-lg font-mono font-bold">{ussdCode}</code>
            <Button size="sm" variant="ghost" onClick={copyToClipboard}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <WifiOff className="w-3 h-3 mr-1" />
              Works Offline
            </Badge>
            <Badge variant="secondary" className="text-xs">
              24/7 Available
            </Badge>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <h4 className="font-medium">Quick Access:</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>• Balance: *384*7*1#</p>
            <p>• Add Income: *384*7*2#</p>
            <p>• AI Insights: *384*7*4#</p>
            <p>• Help: *384*7*7#</p>
          </div>
        </div>

        <div className="pt-3 border-t">
          <Link href="/ussd-demo">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <ExternalLink className="w-4 h-4 mr-2" />
              Try USSD Demo
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground text-pretty">
          Dial this code from any mobile phone to check balance, add income, or get AI insights via SMS. Works on
          feature phones and smartphones without internet.
        </p>
      </CardContent>
    </Card>
  )
}
