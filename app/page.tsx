"use client"

import { LoanComparisonTool } from "@/components/LoanComparisonTool"
import { PersonalizedRecommendations } from "@/components/PersonalizedRecommendations"
import { RepaymentPlanSimulator } from "@/components/RepaymentPlanSimulator"
import { UserDashboard } from "@/components/UserDashboard"
import { EMINotificationSystem } from "@/components/EMINotificationSystem"
import { AIChatbot } from "@/components/AIChatbot"
import { FAQ } from "@/components/FAQ"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calculator,
  PersonStanding,
  BarChart3,
  LayoutDashboard,
  Bell,
  MessageSquare,
  HelpCircle,
  CreditCard,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="mb-12 text-center relative overflow-hidden rounded-lg p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
          <div className="pt-8">
            <h1 className="text-7xl md:text-9xl font-extrabold text-white mb-6 font-serif">FinShastra</h1>
            <p className="text-xl md:text-2xl text-white mb-8 font-sans max-w-2xl mx-auto">
              Empowering your financial journey with intelligent loan management and personalized insights
            </p>
            <div className="flex justify-center space-x-4 mb-12">
              <Button variant="default" size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Learn More
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white transform hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <CreditCard className="w-12 h-12 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-center mb-2 text-white">Smart Loan Management</h3>
                <p className="text-center text-gray-200">
                  Compare and optimize your loans for a brighter financial future.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-600 to-purple-800 text-white transform hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <Zap className="w-12 h-12 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-center mb-2 text-white">AI-Powered Insights</h3>
                <p className="text-center text-gray-200">
                  Get personalized recommendations and forecasts for your loans.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-600 to-green-800 text-white transform hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-center mb-2 text-white">Secure & Reliable</h3>
                <p className="text-center text-gray-200">Your financial data is protected with bank-level security.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mb-12 text-center bg-gray-800 p-8 rounded-lg">
        <h2 className="text-4xl font-bold mb-6 text-white">Why Choose FinShastra?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Optimize Your Loans</h3>
            <p className="text-gray-200">Find the best rates and terms for your financial needs.</p>
          </div>
          <div className="flex flex-col items-center">
            <BarChart3 className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Visual Analytics</h3>
            <p className="text-gray-200">Understand your loan portfolio with intuitive charts and graphs.</p>
          </div>
          <div className="flex flex-col items-center">
            <MessageSquare className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">24/7 AI Support</h3>
            <p className="text-gray-200">Get answers to your loan questions anytime, anywhere.</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 lg:max-w-4xl mx-auto justify-center items-center">
          <TabsTrigger value="dashboard" className="flex items-center justify-center space-x-2 py-3 text-center">
            <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center justify-center space-x-2 py-3 text-center">
            <Calculator className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">Comparison</span>
          </TabsTrigger>
          <TabsTrigger value="simulator" className="flex items-center justify-center space-x-2 py-3 text-center">
            <BarChart3 className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">Simulator</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center justify-center space-x-2 py-3 text-center">
            <PersonStanding className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">Recommendations</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center justify-center space-x-2 py-3 text-center">
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center justify-center space-x-2 py-3 text-center">
            <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">AI Assistant</span>
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center justify-center space-x-2 py-3 text-center">
            <HelpCircle className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">FAQ</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <UserDashboard />
        </TabsContent>
        <TabsContent value="comparison">
          <LoanComparisonTool />
        </TabsContent>
        <TabsContent value="simulator">
          <RepaymentPlanSimulator />
        </TabsContent>
        <TabsContent value="recommendations">
          <PersonalizedRecommendations />
        </TabsContent>
        <TabsContent value="notifications">
          <EMINotificationSystem loans={[]} />
        </TabsContent>
        <TabsContent value="chatbot">
          <AIChatbot />
        </TabsContent>
        <TabsContent value="faq">
          <FAQ />
        </TabsContent>
      </Tabs>
    </div>
  )
}

