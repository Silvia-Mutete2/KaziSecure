import { RegisterForm } from "@/components/auth/register-form"
import { Header } from "@/components/header"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-balance">Join KaziSecure</h1>
            <p className="text-muted-foreground text-pretty">Create your account to start managing your gig income</p>
          </div>
          <RegisterForm />
        </div>
      </main>
    </div>
  )
}
