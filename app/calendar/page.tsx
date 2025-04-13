"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isWeekend,
  startOfMonth,
} from "date-fns"
import { Calendar, ChevronLeft, ChevronRight, Info } from "lucide-react"
import { useState } from "react"

// Sample data for team members on leave
const leaveData = [
  {
    date: new Date(2025, 3, 15),
    members: [
      { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32&text=JD", leaveType: "Annual Leave" },
      { id: "2", name: "Alice Smith", avatar: "/placeholder.svg?height=32&width=32&text=AS", leaveType: "Sick Leave" },
      {
        id: "3",
        name: "Tom Wilson",
        avatar: "/placeholder.svg?height=32&width=32&text=TW",
        leaveType: "Personal Leave",
      },
    ],
  },
  {
    date: new Date(2025, 3, 16),
    members: [
      { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32&text=JD", leaveType: "Annual Leave" },
      { id: "2", name: "Alice Smith", avatar: "/placeholder.svg?height=32&width=32&text=AS", leaveType: "Sick Leave" },
    ],
  },
  {
    date: new Date(2025, 3, 17),
    members: [
      { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32&text=JD", leaveType: "Annual Leave" },
      {
        id: "3",
        name: "Tom Wilson",
        avatar: "/placeholder.svg?height=32&width=32&text=TW",
        leaveType: "Personal Leave",
      },
    ],
  },
  {
    date: new Date(2025, 3, 18),
    members: [
      { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32&text=JD", leaveType: "Annual Leave" },
    ],
  },
  {
    date: new Date(2025, 3, 20),
    members: [
      { id: "4", name: "Mary Roberts", avatar: "/placeholder.svg?height=32&width=32&text=MR", leaveType: "Sick Leave" },
    ],
  },
  {
    date: new Date(2025, 3, 25),
    members: [
      { id: "5", name: "Kevin Lee", avatar: "/placeholder.svg?height=32&width=32&text=KL", leaveType: "Annual Leave" },
      {
        id: "6",
        name: "Patricia Quinn",
        avatar: "/placeholder.svg?height=32&width=32&text=PQ",
        leaveType: "Personal Leave",
      },
    ],
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Add days from previous month to start from Sunday
  const startDay = monthStart.getDay()
  const prevMonthDays = Array.from({ length: startDay }, (_, i) => addDays(monthStart, -startDay + i))

  // Add days from next month to end on Saturday
  const endDay = monthEnd.getDay()
  const nextMonthDays = Array.from({ length: 6 - endDay }, (_, i) => addDays(monthEnd, i + 1))

  const calendarDays = [...prevMonthDays, ...monthDays, ...nextMonthDays]

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setSelectedDate(null)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setSelectedDate(null)
  }

  const getMembersOnLeave = (date: Date) => {
    return leaveData.find((item) => isSameDay(item.date, date))?.members || []
  }

  const selectedDateMembers = selectedDate ? getMembersOnLeave(selectedDate) : []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Team Calendar</h1>
        <p className="text-muted-foreground">{"View team members' leave schedule and plan accordingly"}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="px-6 py-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle>{format(currentDate, "MMMM yyyy")}</CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="grid grid-cols-7 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="py-2 font-medium text-sm">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 text-center border-t">
              {calendarDays.map((day, i) => {
                const isCurrentMonth = isSameMonth(day, currentDate)
                const isToday = isSameDay(day, new Date())
                const isSelected = selectedDate && isSameDay(day, selectedDate)
                const membersOnLeave = getMembersOnLeave(day)
                const hasLeave = membersOnLeave.length > 0
                const isWeekendDay = isWeekend(day)

                return (
                  <div
                    key={i}
                    className={`
                      min-h-[100px] p-2 border-b border-r relative
                      ${!isCurrentMonth ? "text-muted-foreground bg-muted/30" : ""}
                      ${isWeekendDay ? "bg-muted/20" : ""}
                      ${isToday ? "bg-blue-50 dark:bg-blue-450" : ""}
                      ${isSelected ? "ring-2 ring-primary ring-inset" : ""}
                    `}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className="text-right">
                      <span
                        className={`
                        text-sm inline-flex h-6 w-6 items-center justify-center rounded-full
                        ${isToday ? "bg-primary text-primary-foreground" : ""}
                      `}
                      >
                        {format(day, "d")}
                      </span>
                    </div>

                    {hasLeave && (
                      <div className="mt-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex flex-wrap gap-1">
                                {membersOnLeave.slice(0, 3).map((member) => (
                                  <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                ))}
                                {membersOnLeave.length > 3 && (
                                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                                    +{membersOnLeave.length - 3}
                                  </div>
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs">
                                {membersOnLeave.map((member) => (
                                  <div key={member.id}>
                                    {member.name} - {member.leaveType}
                                  </div>
                                ))}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}</CardTitle>
            <CardDescription>
              {selectedDate ? `${selectedDateMembers.length} team members on leave` : "Click on a date to see details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              selectedDateMembers.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <Badge variant="outline">{member.leaveType}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Info className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="font-medium">No team members on leave</h3>
                  <p className="text-sm text-muted-foreground">Everyone is available on this date</p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium">No date selected</h3>
                <p className="text-sm text-muted-foreground">Click on a date to view team members on leave</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
