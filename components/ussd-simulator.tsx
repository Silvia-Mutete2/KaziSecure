"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Send, RotateCcw } from "lucide-react"

export function USSDSimulator() {
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9))
  const [phoneNumber] = useState("+254712345678")
  const [currentInput, setCurrentInput] = useState("")
  const [conversation, setConversation] = useState<
    Array<{ type: "sent" | "received"; message: string; timestamp: Date }>
  >([])
  const [isLoading, setIsLoading] = useState(false)

  const sendUSSDRequest = async (input: string) => {
    setIsLoading(true)

    // Add user input to conversation
    if (input) {
      setConversation((prev) => [
        ...prev,
        {
          type: "sent",
          message: input,
          timestamp: new Date(),
        },
      ])
    }

    try {
      const response = await fetch("/api/ussd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          serviceCode: "*384*7#",
          phoneNumber,
          text: input,
        }),
      })

      const data = await response.json()

      // Add response to conversation
      setConversation((prev) => [
        ...prev,
        {
          type: "received",
          message: data.response,
          timestamp: new Date(),
        },
      ])

      // Clear input if session ended
      if (data.action === "end") {
        setCurrentInput("")
      }
    } catch (error) {
      console.error("USSD Error:", error)
      setConversation((prev) => [
        ...prev,
        {
          type: "received",
          message: "END Service temporarily unavailable. Please try again later.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const startSession = () => {
    setConversation([])
    sendUSSDRequest("")
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim()) {
      sendUSSDRequest(currentInput.trim())
      setCurrentInput("")
    }
  }

  const resetSession = () => {
    setConversation([])
    setCurrentInput("")
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            USSD Simulator
          </CardTitle>
          <CardDescription>Test the USSD interface - works on any mobile phone</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Phone Display */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Phone: {phoneNumber}</span>
              <Badge variant="secondary">Connected</Badge>
            </div>
            <div className="text-xs text-muted-foreground">Session ID: {sessionId}</div>
          </div>

          {/* Conversation Display */}
          <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg h-64 overflow-y-auto">
            {conversation.length === 0 ? (
              <div className="text-center text-green-600">Dial *384*7# to start</div>
            ) : (
              <div className="space-y-2">
                {conversation.map((msg, index) => (
                  <div key={index} className={msg.type === "sent" ? "text-yellow-400" : "text-green-400"}>
                    <div className="text-xs text-gray-500">
                      {msg.type === "sent" ? "> " : "< "}
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                    <div className="whitespace-pre-wrap">{msg.message}</div>
                  </div>
                ))}
                {isLoading && <div className="text-gray-500">Processing...</div>}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-3">
            {conversation.length === 0 ? (
              <Button onClick={startSession} className="w-full" disabled={isLoading}>
                <Smartphone className="w-4 h-4 mr-2" />
                Dial *384*7#
              </Button>
            ) : (
              <form onSubmit={handleInputSubmit} className="flex gap-2">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Enter option number..."
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !currentInput.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={resetSession} className="flex-1 bg-transparent">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              <strong>How to use:</strong>
            </p>
            <p>• Enter menu numbers (1, 2, 3, etc.)</p>
            <p>• Follow prompts for amounts and data</p>
            <p>• Use 0 to go back or exit</p>
            <p>• Works offline on any mobile phone</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
