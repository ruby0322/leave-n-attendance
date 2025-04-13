"use client"

import { DepartmentLeaveChart } from "@/components/department-leave-chart"
import { LeaveTypeDistributionChart } from "@/components/leave-type-distribution-chart"
import { LeaveUsageChart } from "@/components/leave-usage-chart"
import { MonthlyLeaveTable } from "@/components/monthly-leave-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Filter } from "lucide-react"
import { useState } from "react"

export default function ReportsPage() {
  const [year, setYear] = useState("2023")
  const [department, setDepartment] = useState("All")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Analyze leave patterns and generate reports</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>

          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>

        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Analysis</TabsTrigger>
          <TabsTrigger value="department">Department Analysis</TabsTrigger>
          <TabsTrigger value="individual">Individual Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Leave Usage</CardTitle>
                <CardDescription>Total leave days used vs. available</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaveUsageChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leave Type Distribution</CardTitle>
                <CardDescription>Distribution of leave by type</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaveTypeDistributionChart />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Department Leave Analysis</CardTitle>
                <CardDescription>Leave usage by department</CardDescription>
              </CardHeader>
              <CardContent>
                <DepartmentLeaveChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Leave Analysis</CardTitle>
              <CardDescription>Leave usage by month for {year}</CardDescription>
            </CardHeader>
            <CardContent>
              <MonthlyLeaveTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="department" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Analysis</CardTitle>
              <CardDescription>Leave usage for {department === "All" ? "all departments" : department}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">
                Department analysis charts will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Individual Analysis</CardTitle>
              <CardDescription>Leave usage by individual team members</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">
                Individual analysis charts will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
