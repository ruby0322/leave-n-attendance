"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Annual",
    total: 7,
    used: 0,
  },
  {
    name: "Sick",
    total: 30,
    used: 2,
  },
  {
    name: "Personal",
    total: 14,
    used: 3,
  },
  {
    name: "Public",
    total: 5,
    used: 0,
  },
]

export function LeaveBalanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" name="Total" />
          <Bar dataKey="used" fill="#82ca9d" name="Used" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
