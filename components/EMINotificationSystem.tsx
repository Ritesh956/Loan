"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, BellOff, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  loanName: string
  amount: number
  dueDate: Date
  type: "upcoming" | "overdue" | "paid"
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    loanName: "Home Loan",
    amount: 1500,
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    type: "upcoming",
  },
  {
    id: "2",
    loanName: "Car Loan",
    amount: 500,
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    type: "overdue",
  },
  {
    id: "3",
    loanName: "Personal Loan",
    amount: 300,
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    type: "paid",
  },
]

export function EMINotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  useEffect(() => {
    // In a real application, you would fetch notifications from an API here
  }, [])

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const sendNotification = (notification: Notification) => {
    toast({
      title: `EMI Reminder: ${notification.loanName}`,
      description: `Your EMI of $${notification.amount.toFixed(2)} is due on ${notification.dueDate.toLocaleDateString()}`,
    })
  }

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "paid":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>EMI Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p className="text-muted-foreground">No upcoming EMI notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li key={notification.id} className="flex items-center justify-between p-4 rounded-lg shadow-sm border">
                <div>
                  <p className="font-medium">{notification.loanName}</p>
                  <p className="text-sm text-muted-foreground">
                    Due: {notification.dueDate.toLocaleDateString()} - ${notification.amount.toFixed(2)}
                  </p>
                  <Badge variant="secondary" className={`mt-2 ${getNotificationColor(notification.type)}`}>
                    {notification.type === "upcoming" && "Upcoming"}
                    {notification.type === "overdue" && "Overdue"}
                    {notification.type === "paid" && "Paid"}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  {notification.type !== "paid" && (
                    <Button size="sm" onClick={() => sendNotification(notification)}>
                      <Bell className="h-4 w-4 mr-2" />
                      Remind
                    </Button>
                  )}
                  {notification.type === "paid" && (
                    <Button size="sm" variant="outline" className="text-green-600">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Paid
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => dismissNotification(notification.id)}>
                    <BellOff className="h-4 w-4 mr-2" />
                    Dismiss
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

