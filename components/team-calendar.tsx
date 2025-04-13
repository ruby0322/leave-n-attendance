"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data for team members on leave
const teamLeaveData = [
  { date: new Date(2023, 9, 15), members: ["JD", "AS", "TW"] },
  { date: new Date(2023, 9, 16), members: ["JD", "AS"] },
  { date: new Date(2023, 9, 17), members: ["JD", "TW"] },
  { date: new Date(2023, 9, 18), members: ["JD"] },
  { date: new Date(2023, 9, 20), members: ["MR"] },
  { date: new Date(2023, 9, 25), members: ["KL", "PQ"] },
]

export function TeamCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDateMembers, setSelectedDateMembers] = useState<string[]>([])

  // Function to handle date change
  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)

    if (selectedDate) {
      const leaveInfo = teamLeaveData.find(
        (item) =>
          item.date.getDate() === selectedDate.getDate() &&
          item.date.getMonth() === selectedDate.getMonth() &&
          item.date.getFullYear() === selectedDate.getFullYear(),
      )

      setSelectedDateMembers(leaveInfo?.members || [])
    } else {
      setSelectedDateMembers([])
    }
  }

  // Function to highlight dates with team members on leave
  const isDayWithLeave = (day: Date) => {
    return teamLeaveData.some(
      (item) =>
        item.date.getDate() === day.getDate() &&
        item.date.getMonth() === day.getMonth() &&
        item.date.getFullYear() === day.getFullYear(),
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateChange}
        className="rounded-md border"
        modifiers={{
          withLeave: (date) => isDayWithLeave(date),
        }}
        modifiersClassNames={{
          withLeave: "bg-orange-100 font-bold text-orange-600",
        }}
      />

      <Card className="flex-1">
        <CardContent className="p-4">
          <div className="space-y-4">
            <h3 className="font-medium">
              {date
                ? date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Select a date"}
            </h3>

            {selectedDateMembers.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Team members on leave:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDateMembers.map((member, index) => (
                    <Avatar key={index}>
                      <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${member}`} alt={member} />
                      <AvatarFallback>{member}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No team members on leave for this date.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
