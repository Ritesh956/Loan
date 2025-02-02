"use client"

import { useState, type React } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, MessageSquare, Clock } from "lucide-react"

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

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const aiResponse = getMockAIResponse(input)
    const assistantMessage: Message = { role: "assistant", content: aiResponse }
    setMessages((prevMessages) => [...prevMessages, assistantMessage])
    setIsLoading(false)
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>AI Loan Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="history">
              <Clock className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="flex-1 flex flex-col mt-4">
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
          </TabsContent>
          <TabsContent value="history" className="flex-1 mt-4">
            <ScrollArea className="h-full">
              <h3 className="font-semibold mb-2">Recent Conversations</h3>
              <ul className="space-y-2">
                <li>Loan comparison (2 hours ago)</li>
                <li>Interest rates explanation (Yesterday)</li>
                <li>Mortgage application process (3 days ago)</li>
              </ul>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="settings" className="flex-1 mt-4">
            <h3 className="font-semibold mb-2">AI Assistant Settings</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select
                  id="language"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-gray-700">
                  Conversation Tone
                </label>
                <select
                  id="tone"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Friendly</option>
                </select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

