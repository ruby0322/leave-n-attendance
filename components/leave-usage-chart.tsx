"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Annual",
    available: 7,
    used: 3,
  },
  {
    name: "Sick",
    available: 30,
    used: 5,
  },
  {
    name: "Personal",
    available: 14,
    used: 6,
  },
  {
    name: "Public",
    available: 5,
    used: 1,
  },
]

export function LeaveUsageChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="available" fill="#8884d8" name="Available" />
          <Bar dataKey="used" fill="#82ca9d" name="Used" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
