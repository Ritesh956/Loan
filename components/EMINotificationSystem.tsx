"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, BellOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface Notification {
  id: string
  loanName: string
  amount: number
  dueDate: Date
}

export function EMINotificationSystem({ loans }: { loans: any[] }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Generate notifications based on loans
    const newNotifications = loans
      .filter((loan) => loan.notificationsEnabled)
      .map((loan) => ({
        id: loan.id,
        loanName: loan.name,
        amount: loan.emi,
        dueDate: loan.nextPaymentDue,
      }))
    setNotifications(newNotifications)
  }, [loans])

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const sendNotification = (notification: Notification) => {
    toast({
      title: `EMI Reminder: ${notification.loanName}`,
      description: `Your EMI of $${notification.amount.toFixed(2)} is due on ${notification.dueDate.toLocaleDateString()}`,
    })
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
              <li key={notification.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{notification.loanName}</p>
                  <p className="text-sm text-muted-foreground">
                    Due: {notification.dueDate.toLocaleDateString()} - ${notification.amount.toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => sendNotification(notification)}>
                    <Bell className="h-4 w-4 mr-2" />
                    Remind
                  </Button>
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

