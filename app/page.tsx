import { LeaveBalanceChart } from "@/components/leave-balance-chart"
import { RecentLeaveRequests } from "@/components/recent-leave-requests"
import { TeamCalendar } from "@/components/team-calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          {"Welcome back! Here's an overview of your leave status and team availability."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Available Leave</CardTitle>
            <CardDescription>Your remaining leave balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Annual Leave</div>
                <div className="text-sm font-medium">7 days</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Sick Leave</div>
                <div className="text-sm font-medium">30 days</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Personal Leave</div>
                <div className="text-sm font-medium">14 days</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pending Requests</CardTitle>
            <CardDescription>Leave requests awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Team Availability</CardTitle>
            <CardDescription>Team members on leave today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3/12</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leave-balance">
        <TabsList>
          <TabsTrigger value="leave-balance">Leave Balance</TabsTrigger>
          <TabsTrigger value="recent-requests">Recent Requests</TabsTrigger>
          <TabsTrigger value="team-calendar">Team Calendar</TabsTrigger>
        </TabsList>
        <TabsContent value="leave-balance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Balance Overview</CardTitle>
              <CardDescription>Your leave balance for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <LeaveBalanceChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent-requests" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Leave Requests</CardTitle>
              <CardDescription>Your recent leave requests and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentLeaveRequests />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team-calendar" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Calendar</CardTitle>
              <CardDescription>{"View your team's leave schedule"}</CardDescription>
            </CardHeader>
            <CardContent>
              <TeamCalendar />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
