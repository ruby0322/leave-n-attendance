"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Clock, FileText, MoreHorizontal, User } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

// Sample notification data
const notifications = [
  {
    id: "1",
    title: "Leave Request Approved",
    description: "Your leave request for Oct 15-18 has been approved by Jane Smith.",
    time: "10 minutes ago",
    read: false,
    type: "leave",
  },
  {
    id: "2",
    title: "New Team Member",
    description: "Welcome Emily Davis to the team! She will be joining as a Frontend Developer.",
    time: "2 hours ago",
    read: false,
    type: "team",
  },
  {
    id: "3",
    title: "Leave Request Pending",
    description: "Your leave request for Dec 24-31 is pending approval from Jane Smith.",
    time: "1 day ago",
    read: true,
    type: "leave",
  },
  {
    id: "4",
    title: "Document Shared",
    description: "Jane Smith shared a document: 'Team Vacation Policy 2023'",
    time: "2 days ago",
    read: true,
    type: "document",
  },
  {
    id: "5",
    title: "Leave Balance Update",
    description: "Your annual leave balance has been updated. You have 7 days remaining.",
    time: "3 days ago",
    read: true,
    type: "leave",
  },
  {
    id: "6",
    title: "Team Member on Leave",
    description: "Tom Wilson will be on leave from Oct 15-17.",
    time: "4 days ago",
    read: true,
    type: "team",
  },
]

export default function NotificationsPage() {
  const [notificationState, setNotificationState] = useState(notifications)

  const markAsRead = (id: string) => {
    setNotificationState((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    toast("Notification marked as read")
  }

  const markAllAsRead = () => {
    setNotificationState((prev) => prev.map((notification) => ({ ...notification, read: true })))
    toast("All notifications marked as read")
  }

  const deleteNotification = (id: string) => {
    setNotificationState((prev) => prev.filter((notification) => notification.id !== id))
    toast("Notification deleted")
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "leave":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "team":
        return <User className="h-5 w-5 text-green-500" />
      case "document":
        return <FileText className="h-5 w-5 text-amber-500" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const unreadCount = notificationState.filter((n) => !n.read).length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with leave requests, team updates, and more</p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              All
              {unreadCount > 0 && <Badge className="ml-2 bg-primary">{notificationState.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && <Badge className="ml-2 bg-primary">{unreadCount}</Badge>}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>
            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {notificationState.length > 0 ? (
              notificationState.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 ${!notification.read ? "bg-muted/50" : ""}`}
                >
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium leading-none">{notification.title}</p>
                      {!notification.read && <Badge className="h-1.5 w-1.5 rounded-full p-0" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!notification.read && (
                        <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                          <Check className="mr-2 h-4 w-4" />
                          Mark as read
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Check className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">All caught up!</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  {"You have no notifications at the moment. We'll notify you when there are new updates."}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
