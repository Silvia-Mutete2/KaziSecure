"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, RefreshCw } from "lucide-react"
import Link from "next/link"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check
    const checkAuth = async () => {
      try {
        // In a real app, this would check JWT token, session, etc.
        const token = localStorage.getItem("auth_token")
        const isValid = token && token.length > 0

        setIsAuthenticated(isValid)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6 text-primary animate-spin" />
            </div>
            <div>
              <h3 className="font-semibold">Verifying Security</h3>
              <p className="text-sm text-muted-foreground">Checking your authentication status...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold">Authentication Required</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                You need to sign in to access your financial dashboard and protect your sensitive data.
              </p>
            </div>
            <div className="space-y-2">
              <Link href="/auth/login">
                <Button className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Sign In Securely
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline" className="w-full bg-transparent">
                  Create New Account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
