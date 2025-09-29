import { USSDSimulator } from "@/components/ussd-simulator"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, WifiOff, Globe, Shield, Clock } from "lucide-react"

export default function USSDDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-balance">USSD Access Demo</h1>
            <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
              Experience how gig workers can access their financial data from any mobile phone, even without internet
              connection or smartphone.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Simulator */}
            <div>
              <USSDSimulator />
            </div>

            {/* Features & Benefits */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-primary" />
                    USSD Features
                  </CardTitle>
                  <CardDescription>Complete financial management via simple menu system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <WifiOff className="w-4 h-4 text-primary" />
                      <span>Works Offline</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>24/7 Available</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Secure Access</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-primary" />
                      <span>Any Phone</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Available Functions:</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      {[
                        "Check account balance",
                        "Add income entries",
                        "View expense breakdown",
                        "Get AI predictions",
                        "Set financial goals",
                        "Security management",
                        "Help & support",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
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
                  <CardTitle>Accessibility Impact</CardTitle>
                  <CardDescription>Bridging the digital divide for financial inclusion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">Feature Phone Users</h4>
                        <Badge variant="secondary">68% of Kenya</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Access full financial management without smartphone
                      </p>
                    </div>

                    <div className="p-3 bg-accent/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">Rural Areas</h4>
                        <Badge variant="secondary">Limited Internet</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Works with basic cellular network coverage</p>
                    </div>

                    <div className="p-3 bg-chart-1/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">Low Data Costs</h4>
                        <Badge variant="secondary">Free USSD</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">No internet charges, works with any mobile plan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technical Implementation</CardTitle>
                  <CardDescription>How USSD integration works behind the scenes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span>USSD Gateway Integration</span>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Session Management</span>
                      <Badge variant="secondary">Stateful</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Security Layer</span>
                      <Badge variant="secondary">PIN Protected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Multi-language Support</span>
                      <Badge variant="secondary">EN/SW</Badge>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      <strong>Code:</strong> *384*7# |<strong> Provider:</strong> All Networks |<strong> Cost:</strong>{" "}
                      Free
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
