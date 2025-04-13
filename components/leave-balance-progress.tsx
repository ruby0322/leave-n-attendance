import { Progress } from "@/components/ui/progress"

type LeaveType = {
  name: string
  total: number
  used: number
  color: string
}

const leaveTypes: LeaveType[] = [
  {
    name: "Annual Leave",
    total: 7,
    used: 0,
    color: "bg-blue-500",
  },
  {
    name: "Sick Leave",
    total: 30,
    used: 2,
    color: "bg-red-500",
  },
  {
    name: "Personal Leave",
    total: 14,
    used: 3,
    color: "bg-green-500",
  },
  {
    name: "Public Holiday",
    total: 5,
    used: 0,
    color: "bg-amber-500",
  },
]

export function LeaveBalanceProgress() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {leaveTypes.map((leave) => {
        const percentageUsed = Math.round((leave.used / leave.total) * 100)
        const percentageLeft = 100 - percentageUsed

        return (
          <div key={leave.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{leave.name}</span>
              <span className="text-sm text-muted-foreground">
                {leave.total - leave.used} / {leave.total} days remaining
              </span>
            </div>
            <div className="space-y-1">
              <Progress
                value={percentageLeft}
                className="h-2"
                indicatorClassName={leave.color}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{percentageLeft}% remaining</span>
                <span>{percentageUsed}% used</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
