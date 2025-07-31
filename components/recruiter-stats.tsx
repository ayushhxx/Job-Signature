"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const weeklyData = [
  { name: "Mon", applications: 4 },
  { name: "Tue", applications: 7 },
  { name: "Wed", applications: 5 },
  { name: "Thu", applications: 8 },
  { name: "Fri", applications: 12 },
  { name: "Sat", applications: 3 },
  { name: "Sun", applications: 2 },
]

const monthlyData = [
  { name: "Week 1", applications: 24 },
  { name: "Week 2", applications: 32 },
  { name: "Week 3", applications: 18 },
  { name: "Week 4", applications: 29 },
]

const jobTypeData = [
  { name: "Full-time", value: 65 },
  { name: "Internship", value: 35 },
]

export default function RecruiterStats() {
  const [timeframe, setTimeframe] = useState("weekly")

  return (
    <div className="bg-[#061529] rounded-xl border border-white/10 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">Application Statistics</h2>
        <Tabs defaultValue="weekly" value={timeframe} onValueChange={setTimeframe} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-2 w-full md:w-auto">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-[#0A2342] border-white/10 p-4">
          <h3 className="text-lg font-medium mb-4">Applications Received</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timeframe === "weekly" ? weeklyData : monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A2342",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="applications" fill="#2F80ED" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-[#0A2342] border-white/10 p-4">
          <h3 className="text-lg font-medium mb-4">Job Type Distribution</h3>
          <div className="space-y-4">
            {jobTypeData.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-white/80">{item.name}</span>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${item.name === "Full-time" ? "bg-[#2F80ED]" : "bg-blue-400"}`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Total Posts</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Active Posts</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Total Applications</span>
                <span className="font-medium">48</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Avg. Applications per Post</span>
                <span className="font-medium">4</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
