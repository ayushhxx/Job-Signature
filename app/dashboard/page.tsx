"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, FileText, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  }

  // Mock applications data
  const applications = [
    {
      id: 1,
      job: {
        title: "Frontend Developer",
        company: "TechCorp",
        location: "San Francisco, CA",
      },
      status: "Applied",
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      id: 2,
      job: {
        title: "React Developer",
        company: "StartupXYZ",
        location: "Remote",
      },
      status: "Interview",
      createdAt: "2024-01-10T10:00:00Z",
    },
    {
      id: 3,
      job: {
        title: "Full Stack Developer",
        company: "BigTech Inc",
        location: "New York, NY",
      },
      status: "Rejected",
      createdAt: "2024-01-05T10:00:00Z",
    },
  ]

  // Mock recent jobs
  const recentJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "InnovateNow",
      location: "Austin, TX",
    },
    {
      id: 2,
      title: "React Native Developer",
      company: "MobileFirst",
      location: "Remote",
    },
  ]

  // Calculate statistics
  const totalApplications = applications.length
  const pendingApplications = applications.filter((app) => app.status === "Applied").length
  const interviewApplications = applications.filter((app) => app.status === "Interview").length
  const offersReceived = applications.filter((app) => app.status === "Offer").length

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 bg-[#0A2342] min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Welcome, <span className="text-[#2F80ED]">{user?.name?.split(" ")[0] || "User"}</span>
              </h1>
              <p className="text-white/80 mt-2">Manage your job applications and career progress</p>
            </div>
            <Link href="/jobs">
              <Button className="bg-[#2F80ED] hover:bg-[#2F80ED]/90">
                <Briefcase className="mr-2 h-4 w-4" />
                Browse Jobs
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="bg-[#061529] border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-white/70">Total Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalApplications}</div>
                  </CardContent>
                </Card>
                <Card className="bg-[#061529] border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-white/70">Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{pendingApplications}</div>
                  </CardContent>
                </Card>
                <Card className="bg-[#061529] border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-white/70">Interviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{interviewApplications}</div>
                  </CardContent>
                </Card>
                <Card className="bg-[#061529] border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-white/70">Offers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{offersReceived}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-[#061529] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-xl">Recent Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {applications.length > 0 ? (
                      <div className="space-y-4">
                        {applications.slice(0, 3).map((application) => (
                          <div
                            key={application.id}
                            className="flex items-start gap-3 p-3 rounded-lg bg-[#0A2342] border border-white/5"
                          >
                            <div className="flex-1">
                              <h3 className="font-medium">{application.job.title}</h3>
                              <p className="text-sm text-white/70">{application.job.company}</p>
                              <div className="flex items-center mt-1 text-xs text-white/60">
                                <Clock className="mr-1 h-3 w-3" />
                                Applied on {formatDate(application.createdAt)}
                              </div>
                            </div>
                            <div>
                              <Badge
                                className={cn(
                                  "px-2 py-1 text-xs",
                                  application.status === "Applied" && "bg-blue-900/30 text-blue-400",
                                  application.status === "Interview" && "bg-yellow-900/30 text-yellow-400",
                                  application.status === "Offer" && "bg-green-900/30 text-green-400",
                                  application.status === "Rejected" && "bg-red-900/30 text-red-400",
                                )}
                              >
                                {application.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-white/70 mb-3">You haven't applied to any jobs yet.</p>
                        <Link href="/jobs">
                          <Button variant="outline" className="border-[#2F80ED] text-[#2F80ED] bg-transparent">
                            Browse Jobs
                          </Button>
                        </Link>
                      </div>
                    )}

                    {applications.length > 0 && (
                      <div className="mt-4 text-center">
                        <Link href="/my-applications">
                          <Button variant="outline" className="border-white/20 bg-transparent">
                            View All Applications
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-[#061529] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-xl">Recent Job Postings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentJobs.length > 0 ? (
                      <div className="space-y-4">
                        {recentJobs.map((job) => (
                          <div
                            key={job.id}
                            className="flex items-start gap-3 p-3 rounded-lg bg-[#0A2342] border border-white/5"
                          >
                            <div className="flex-1">
                              <h3 className="font-medium">{job.title}</h3>
                              <p className="text-sm text-white/70">{job.company}</p>
                              <div className="flex items-center mt-1 text-xs text-white/60">
                                <MapPin className="mr-1 h-3 w-3" />
                                {job.location}
                              </div>
                            </div>
                            <Link href={`/jobs/${job.id}`}>
                              <Button size="sm" className="bg-[#2F80ED] hover:bg-[#2F80ED]/90">
                                View
                              </Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-white/70">No recent job postings found.</p>
                      </div>
                    )}

                    <div className="mt-4 text-center">
                      <Link href="/jobs">
                        <Button variant="outline" className="border-white/20 bg-transparent">
                          Browse All Jobs
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="applications">
              <Card className="bg-[#061529] border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl">Your Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.length > 0 ? (
                    <div className="space-y-4">
                      {applications.map((application) => (
                        <div
                          key={application.id}
                          className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-[#0A2342] border border-white/5"
                        >
                          <div>
                            <h3 className="font-medium">{application.job.title}</h3>
                            <p className="text-sm text-white/70">{application.job.company}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                              <div className="flex items-center text-xs text-white/60">
                                <MapPin className="mr-1 h-3 w-3" />
                                {application.job.location}
                              </div>
                              <div className="flex items-center text-xs text-white/60">
                                <Clock className="mr-1 h-3 w-3" />
                                Applied on {formatDate(application.createdAt)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={cn(
                                "px-2 py-1",
                                application.status === "Applied" && "bg-blue-900/30 text-blue-400",
                                application.status === "Interview" && "bg-yellow-900/30 text-yellow-400",
                                application.status === "Offer" && "bg-green-900/30 text-green-400",
                                application.status === "Rejected" && "bg-red-900/30 text-red-400",
                              )}
                            >
                              {application.status}
                            </Badge>
                            <Link href={`/applications/${application.id}`}>
                              <Button size="sm" variant="outline" className="border-white/20 bg-transparent">
                                Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <FileText className="h-12 w-12 mx-auto text-white/40 mb-3" />
                      <p className="text-white/70 mb-3">You haven't applied to any jobs yet.</p>
                      <Link href="/jobs">
                        <Button className="bg-[#2F80ED] hover:bg-[#2F80ED]/90">Browse Jobs</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card className="bg-[#061529] border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl">Your Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-white/70">Name</p>
                          <p>{user?.name || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-white/70">Email</p>
                          <p>{user?.email || "Not provided"}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Resume</h3>
                      <div className="bg-[#0A2342] p-4 rounded-lg border border-white/10">
                        <div className="text-center py-6">
                          <FileText className="h-10 w-10 mx-auto text-white/40 mb-3" />
                          <p className="text-white/70 mb-3">You haven't uploaded a resume yet.</p>
                          <Link href="/profile/resume">
                            <Button className="bg-[#2F80ED] hover:bg-[#2F80ED]/90">Upload Resume</Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Link href="/profile">
                        <Button className="bg-[#2F80ED] hover:bg-[#2F80ED]/90">Edit Profile</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
