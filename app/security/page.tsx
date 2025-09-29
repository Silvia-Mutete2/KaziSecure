import { FraudDetection } from "@/components/security/fraud-detection"
import { DataEncryption } from "@/components/security/data-encryption"
import { ThreatMonitoring } from "@/components/security/threat-monitoring"
import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SecurityPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-balance">Security Center</h1>
              <p className="text-muted-foreground text-pretty">
                Comprehensive cybersecurity protection for your financial data
              </p>
            </div>

            <Tabs defaultValue="fraud" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
                <TabsTrigger value="encryption">Data Protection</TabsTrigger>
                <TabsTrigger value="monitoring">Threat Monitoring</TabsTrigger>
              </TabsList>

              <TabsContent value="fraud" className="space-y-6">
                <FraudDetection />
              </TabsContent>

              <TabsContent value="encryption" className="space-y-6">
                <DataEncryption />
              </TabsContent>

              <TabsContent value="monitoring" className="space-y-6">
                <ThreatMonitoring />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
