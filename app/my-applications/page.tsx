"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Search, Filter, Eye, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function MyApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock applications data
  const applications = [
    {
      id: 1,
      job: {
        title: "Frontend Developer",
        company: "TechCorp",
        location: "San Francisco, CA",
        type: "Full-time",
      },
      status: "Applied",
      appliedDate: "2024-01-15T10:00:00Z",
      salary: "$80k - $120k",
    },
    {
      id: 2,
      job: {
        title: "React Developer",
        company: "StartupXYZ",
        location: "Remote",
        type: "Full-time",
      },
      status: "Interview",
      appliedDate: "2024-01-10T10:00:00Z",
      salary: "$70k - $100k",
    },
    {
      id: 3,
      job: {
        title: "Full Stack Developer",
        company: "BigTech Inc",
        location: "New York, NY",
        type: "Full-time",
      },
      status: "Rejected",
      appliedDate: "2024-01-05T10:00:00Z",
      salary: "$90k - $130k",
    },
    {
      id: 4,
      job: {
        title: "UI/UX Designer",
        company: "DesignStudio",
        location: "Austin, TX",
        type: "Contract",
      },
      status: "Offer",
      appliedDate: "2024-01-01T10:00:00Z",
      salary: "$60k - $80k",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-900/30 text-blue-400"
      case "Interview":
        return "bg-yellow-900/30 text-yellow-400"
      case "Offer":
        return "bg-green-900/30 text-green-400"
      case "Rejected":
        return "bg-red-900/30 text-red-400"
      default:
        return "bg-gray-900/30 text-gray-400"
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: applications.length,
    applied: applications.filter((app) => app.status === "Applied").length,
    interview: applications.filter((app) => app.status === "Interview").length,
    offer: applications.filter((app) => app.status === "Offer").length,
    rejected: applications.filter((app) => app.status === "Rejected").length,
  }

  return (
    <div className="min-h-screen bg-[#0A2342] pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">My Applications</h1>
            <p className="text-white/70 mt-2">Track and manage your job applications</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-[#061529] border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">{statusCounts.all}</div>
                <div className="text-sm text-white/70">Total</div>
              </CardContent>
            </Card>
            <Card className="bg-[#061529] border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{statusCounts.applied}</div>
                <div className="text-sm text-white/70">Applied</div>
              </CardContent>
            </Card>
            <Card className="bg-[#061529] border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{statusCounts.interview}</div>
                <div className="text-sm text-white/70">Interview</div>
              </CardContent>
            </Card>
            <Card className="bg-[#061529] border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{statusCounts.offer}</div>
                <div className="text-sm text-white/70">Offers</div>
              </CardContent>
            </Card>
            <Card className="bg-[#061529] border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-400">{statusCounts.rejected}</div>
                <div className="text-sm text-white/70">Rejected</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-[#061529] border-white/10 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                    <Input
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-[#0A2342] border-white/20 text-white"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-[#0A2342] border-white/20 text-white">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <Card key={application.id} className="bg-[#061529] border-white/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{application.job.title}</h3>
                            <p className="text-white/70">{application.job.company}</p>
                          </div>
                          <Badge className={cn("ml-4", getStatusColor(application.status))}>{application.status}</Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {application.job.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Applied {formatDate(application.appliedDate)}
                          </div>
                          <div>{application.salary}</div>
                          <Badge variant="outline" className="border-[#2F80ED] text-[#2F80ED]">
                            {application.job.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link href={`/applications/${application.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#2F80ED] text-[#2F80ED] hover:bg-[#2F80ED] hover:text-white bg-transparent"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-[#061529] border-white/10">
                <CardContent className="p-12 text-center">
                  <div className="text-white/40 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No applications found</h3>
                  <p className="text-white/70 mb-6">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "You haven't applied to any jobs yet"}
                  </p>
                  <Link href="/jobs">
                    <Button className="bg-[#2F80ED] hover:bg-[#2F80ED]/90">Browse Jobs</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
