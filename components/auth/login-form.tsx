"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Smartphone, Fingerprint, Shield, CheckCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("phone")
  const [step, setStep] = useState<"credentials" | "2fa" | "biometric">("credentials")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication process
    setTimeout(() => {
      setStep("2fa")
      setIsLoading(false)
    }, 1500)
  }

  const handleTwoFactor = () => {
    setIsLoading(true)
    setTimeout(() => {
      setStep("biometric")
      setIsLoading(false)
    }, 1000)
  }

  const handleBiometric = () => {
    setIsLoading(true)
    setTimeout(() => {
      // Simulate setting an auth token and user id, then redirect
      const userId = `user_${Math.random().toString(36).slice(2, 9)}`
      const token = `token-${userId}`
      try {
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user_id', userId)
      } catch (e) {
        // ignore
      }
      window.location.href = "/"
    }, 1500)
  }

  if (step === "2fa") {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Enter the 6-digit code sent to your phone +254 7XX XXX 890</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center space-x-2">
            {[...Array(6)].map((_, i) => (
              <Input
                key={i}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-lg font-bold"
                placeholder="0"
              />
            ))}
          </div>

          <Button onClick={handleTwoFactor} className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>

          <div className="text-center">
            <Button variant="link" className="text-sm">
              Resend code (30s)
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (step === "biometric") {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Fingerprint className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <CardTitle>Biometric Verification</CardTitle>
          <CardDescription>Use your fingerprint or face ID to complete secure login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Your device supports biometric authentication</AlertDescription>
          </Alert>

          <Button onClick={handleBiometric} className="w-full" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Use Biometric"}
          </Button>

          <Button variant="outline" className="w-full bg-transparent">
            Skip for now
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Access your secure financial dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Login Method Toggle */}
          <div className="flex space-x-2 p-1 bg-muted rounded-lg">
            <Button
              type="button"
              variant={loginMethod === "phone" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setLoginMethod("phone")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Phone
            </Button>
            <Button
              type="button"
              variant={loginMethod === "email" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setLoginMethod("email")}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>

          {/* Login Field */}
          <div className="space-y-2">
            <Label htmlFor="login">{loginMethod === "phone" ? "Phone Number" : "Email Address"}</Label>
            <Input
              id="login"
              type={loginMethod === "phone" ? "tel" : "email"}
              placeholder={loginMethod === "phone" ? "+254 7XX XXX XXX" : "your@email.com"}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Security Features */}
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your login is protected with 256-bit encryption and multi-factor authentication
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <Separator />

          {/* Alternative Login Methods */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full bg-transparent" type="button">
              <Smartphone className="w-4 h-4 mr-2" />
              Continue with M-Pesa
            </Button>
          </div>

          {/* Register Link */}
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
