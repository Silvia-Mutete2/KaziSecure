import { Button } from "@/components/ui/button"
import { Bell, Menu, Shield, User, Lock } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-balance">KaziSecure</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
            <Link href="/security">
              <Button variant="ghost" size="icon">
                <Lock className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/settings/security">
              <Button variant="ghost" size="icon">
                <Shield className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" size="icon">
                <User className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
