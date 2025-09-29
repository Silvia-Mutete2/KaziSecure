import { SecuritySettings } from "@/components/auth/security-settings"
import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function SecuritySettingsPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-balance">Security Settings</h1>
              <p className="text-muted-foreground text-pretty">
                Manage your account security and protect your financial data
              </p>
            </div>
            <SecuritySettings />
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
