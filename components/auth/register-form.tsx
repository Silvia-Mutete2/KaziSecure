"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, AlertCircle, Phone, Mail } from "lucide-react"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState<"details" | "verification" | "security">("details")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const phone = formData.get("phone") as string
    setPhoneNumber(phone)

    setTimeout(() => {
      setStep("verification")
      setIsLoading(false)
    }, 1500)
  }

  const handleVerification = async () => {
    // Verification logic here
  }

  const handleSecuritySetup = async () => {
    // Security setup logic here
  }

  const maskPhoneNumber = (phone: string) => {
    if (!phone) return "+254 7XX XXX XXX"
    // Remove any spaces or special characters
    const cleaned = phone.replace(/\D/g, "")
    // Show first 4 digits and last 3 digits, mask the middle
    if (cleaned.length >= 10) {
      const countryCode = cleaned.slice(0, 3)
      const firstDigit = cleaned.slice(3, 4)
      const lastThree = cleaned.slice(-3)
      return `+${countryCode} ${firstDigit}XX XXX ${lastThree}`
    }
    return phone
  }

  if (step === "verification") {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Verify Your Phone</CardTitle>
          <CardDescription>Enter the verification code sent to {maskPhoneNumber(phoneNumber)}</CardDescription>
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
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>Register</CardTitle>
        <CardDescription>Enter your details to create an account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleRegister}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="phone">Phone Number</Label>
            </div>
            <Input id="phone" type="tel" placeholder="+254 7XX XXX XXX" />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
