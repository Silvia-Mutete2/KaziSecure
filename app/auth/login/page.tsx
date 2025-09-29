import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/header"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-balance">Welcome Back</h1>
            <p className="text-muted-foreground text-pretty">Sign in to access your financial dashboard</p>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
