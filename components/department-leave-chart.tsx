"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Engineering",
    annual: 15,
    sick: 8,
    personal: 6,
    public: 2,
  },
  {
    name: "Product",
    annual: 10,
    sick: 5,
    personal: 4,
    public: 1,
  },
  {
    name: "Design",
    annual: 8,
    sick: 4,
    personal: 3,
    public: 1,
  },
  {
    name: "Operations",
    annual: 6,
    sick: 3,
    personal: 2,
    public: 1,
  },
  {
    name: "HR",
    annual: 6,
    sick: 5,
    personal: 5,
    public: 1,
  },
]

export function DepartmentLeaveChart() {
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
          <Bar dataKey="annual" fill="#8884d8" name="Annual Leave" />
          <Bar dataKey="sick" fill="#82ca9d" name="Sick Leave" />
          <Bar dataKey="personal" fill="#ffc658" name="Personal Leave" />
          <Bar dataKey="public" fill="#ff8042" name="Public Holiday" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
