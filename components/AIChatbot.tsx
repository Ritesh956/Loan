"use client"

import { useState, type React } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  role: "user" | "assistant"
  content: string
}

function getMockAIResponse(input: string): string {
  const responses = [
    "I understand you're asking about loans. Could you please provide more specific information about what you'd like to know?",
    "Based on your question, I'd recommend comparing different loan offers to find the best interest rates and terms for your situation.",
    "It's important to consider factors such as the loan term, interest rate, and any additional fees when evaluating loan options.",
    "Have you considered using our loan comparison tool to help you find the best loan for your needs?",
    "Remember to always read the fine print and understand all terms and conditions before committing to a loan.",
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

async function getOpenAIResponse(input: string, apiKey: string): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
        max_tokens: 150,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to get response from OpenAI")
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error calling OpenAI API:", error)
    return "I'm sorry, but I encountered an error while processing your request. Please try again later."
  }
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [useOpenAI, setUseOpenAI] = useState(false)
  const [openAIKey, setOpenAIKey] = useState("")
  const { toast } = useToast()

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")
    setIsLoading(true)

    let aiResponse: string

    if (useOpenAI && openAIKey) {
      aiResponse = await getOpenAIResponse(input, openAIKey)
    } else {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      aiResponse = getMockAIResponse(input)
    }

    const assistantMessage: Message = { role: "assistant", content: aiResponse }
    setMessages((prevMessages) => [...prevMessages, assistantMessage])
    setIsLoading(false)
  }

  const handleOpenAIToggle = (checked: boolean) => {
    setUseOpenAI(checked)
    if (checked && !openAIKey) {
      toast({
        title: "OpenAI API Key Required",
        description: "Please enter your OpenAI API key to use the OpenAI chatbot.",
      })
    }
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>AI Loan Assistant</span>
          <div className="flex items-center space-x-2">
            <Switch id="use-openai" checked={useOpenAI} onCheckedChange={handleOpenAIToggle} />
            <Label htmlFor="use-openai">Use OpenAI</Label>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {useOpenAI && (
          <div className="mb-4">
            <Label htmlFor="openai-key">OpenAI API Key</Label>
            <Input
              id="openai-key"
              type="password"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              placeholder="Enter your OpenAI API key"
            />
          </div>
        )}
        <ScrollArea className="flex-1 pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={sendMessage} className="mt-4 flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your loans..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

