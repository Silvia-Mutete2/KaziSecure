"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, Shield, CheckCircle, AlertCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState<"details" | "verification" | "security">("details")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setStep("verification")
      setIsLoading(false)
    }, 1500)
  }

  const handleVerification = () => {
    setIsLoading(true)
    setTimeout(() => {
      setStep("security")
      setIsLoading(false)
    }, 1000)
  }

  const handleSecuritySetup = () => {
    setIsLoading(true)
    setTimeout(() => {
      window.location.href = "/"
    }, 1500)
  }

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    setPasswordStrength(strength)
  }

  if (step === "verification") {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Verify Your Phone</CardTitle>
          <CardDescription>Enter the verification code sent to +254 7XX XXX 890</CardDescription>
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

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>SMS charges may apply. Code expires in 10 minutes.</AlertDescription>
          </Alert>

          <Button onClick={handleVerification} className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Phone"}
          </Button>

          <div className="text-center">
            <Button variant="link" className="text-sm">
              Resend code (45s)
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (step === "security") {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Security Setup</CardTitle>
          <CardDescription>Enhance your account security with additional protection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Phone Verification</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Biometric Login</p>
                  <p className="text-xs text-muted-foreground">Optional but recommended</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Setup
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Email Backup</p>
                  <p className="text-xs text-muted-foreground">For account recovery</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Add Email
              </Button>
            </div>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>Your financial data is encrypted with bank-level security standards</AlertDescription>
          </Alert>

          <Button onClick={handleSecuritySetup} className="w-full" disabled={isLoading}>
            {isLoading ? "Setting up..." : "Complete Setup"}
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
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Join thousands of gig workers managing their finances securely</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" required />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+254 7XX XXX XXX" required />
            <p className="text-xs text-muted-foreground">We'll send a verification code to this number</p>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Primary Work Location</Label>
            <Input id="location" placeholder="Nairobi, Kenya" required />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                onChange={(e) => checkPasswordStrength(e.target.value)}
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
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Password strength</span>
                <span
                  className={
                    passwordStrength >= 75
                      ? "text-primary"
                      : passwordStrength >= 50
                        ? "text-accent"
                        : "text-destructive"
                  }
                >
                  {passwordStrength >= 75 ? "Strong" : passwordStrength >= 50 ? "Medium" : "Weak"}
                </span>
              </div>
              <Progress value={passwordStrength} className="h-1" />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Terms and Privacy */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="marketing" />
              <Label htmlFor="marketing" className="text-sm leading-relaxed">
                Send me tips and updates about maximizing my gig income
              </Label>
            </div>
          </div>

          {/* Security Notice */}
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your account will be protected with multi-factor authentication and encryption
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>

          {/* Login Link */}
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
