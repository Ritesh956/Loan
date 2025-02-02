"use client"

import { LoanComparisonTool } from "@/components/LoanComparisonTool"
import { PersonalizedRecommendations } from "@/components/PersonalizedRecommendations"
import { RepaymentPlanSimulator } from "@/components/RepaymentPlanSimulator"
import { UserDashboard } from "@/components/UserDashboard"
import { EMINotificationSystem } from "@/components/EMINotificationSystem"
import { AIChatbot } from "@/components/AIChatbot"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, PersonStanding, BarChart3, LayoutDashboard, Bell, MessageSquare } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="dashboard" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center justify-center space-x-2 py-3">
            <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center justify-center space-x-2 py-3">
            <Calculator className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">Comparison</span>
          </TabsTrigger>
          <TabsTrigger value="simulator" className="flex items-center justify-center space-x-2 py-3">
            <BarChart3 className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">Simulator</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center justify-center space-x-2 py-3">
            <PersonStanding className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">Recommendations</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center justify-center space-x-2 py-3">
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center justify-center space-x-2 py-3">
            <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">AI Assistant</span>
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
      </Tabs>
    </div>
  )
}

