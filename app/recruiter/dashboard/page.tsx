"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, BarChart3, Loader2, Calendar } from "lucide-react"
import Link from "next/link"
import RecruiterStats from "@/components/recruiter-stats"
import PostsList from "@/components/posts-list"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function RecruiterDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dashboardData, setDashboardData] = useState({
    jobs: [
      {
        id: "1",
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        salary: "$120,000 - $150,000",
        duration: "Full-time",
        type: "Full-time",
        isActive: true,
        skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        applicationDeadline: "2024-03-15",
        views: 245,
        applications: [{ id: "1" }, { id: "2" }, { id: "3" }],
        createdAt: "2024-02-01",
      },
      {
        id: "2",
        title: "UI/UX Design Intern",
        company: "Design Studio",
        location: "Remote",
        salary: "$2,000/month",
        duration: "3 months",
        type: "Internship",
        isActive: true,
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        applicationDeadline: "2024-03-20",
        views: 156,
        applications: [{ id: "4" }, { id: "5" }],
        createdAt: "2024-02-05",
      },
      {
        id: "3",
        title: "Backend Developer",
        company: "StartupXYZ",
        location: "New York, NY",
        salary: "$100,000 - $130,000",
        duration: "Full-time",
        type: "Full-time",
        isActive: false,
        skills: ["Node.js", "Python", "PostgreSQL", "AWS"],
        applicationDeadline: "2024-02-28",
        views: 89,
        applications: [{ id: "6" }],
        createdAt: "2024-01-20",
      },
    ],
    applications: [
      {
        id: "1",
        status: "Applied",
        createdAt: "2024-02-10",
        user: { name: "John Doe", email: "john@example.com" },
        job: { title: "Senior Frontend Developer" },
      },
      {
        id: "2",
        status: "Reviewed",
        createdAt: "2024-02-08",
        user: { name: "Jane Smith", email: "jane@example.com" },
        job: { title: "Senior Frontend Developer" },
      },
      {
        id: "3",
        status: "Interviewing",
        createdAt: "2024-02-12",
        user: { name: "Mike Johnson", email: "mike@example.com" },
        job: { title: "UI/UX Design Intern" },
      },
      {
        id: "4",
        status: "Offered",
        createdAt: "2024-02-05",
        user: { name: "Sarah Wilson", email: "sarah@example.com" },
        job: { title: "Backend Developer" },
      },
    ],
    stats: {
      activeJobs: 2,
      totalApplications: 4,
      responseRate: 75,
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString(undefined, options)
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Applied":
        return "bg-gray-100 text-gray-800"
      case "Reviewed":
        return "bg-blue-100 text-blue-800"
      case "Interviewing":
        return "bg-yellow-100 text-yellow-800"
      case "Offered":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Recruiter <span className="text-[#2F80ED]">Dashboard</span>
              </h1>
              <p className="text-white/80 mt-2">Manage your job postings and track applications</p>
            </div>
            <Button
              className="bg-[#2F80ED] hover:bg-[#2F80ED]/90"
              onClick={() => router.push("/recruiter/dashboard/post-job")}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Post New Opportunity
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#2F80ED]" />
              <span className="ml-2 text-white">Loading dashboard...</span>
            </div>
          ) : (
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="my-posts">My Posts</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-[#061529] rounded-xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">Active Posts</h3>
                      <div className="bg-[#2F80ED]/20 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-[#2F80ED]" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-white">{dashboardData.stats.activeJobs}</p>
                    <p className="text-white/60 text-sm mt-1">
                      {dashboardData.jobs.filter((job) => job.type === "Full-time" && job.isActive).length} jobs,{" "}
                      {dashboardData.jobs.filter((job) => job.type === "Internship" && job.isActive).length} internships
                    </p>
                  </div>

                  <div className="bg-[#061529] rounded-xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">Total Applications</h3>
                      <div className="bg-green-500/20 p-2 rounded-full">
                        <BarChart3 className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-white">{dashboardData.stats.totalApplications}</p>
                    <p className="text-white/60 text-sm mt-1">
                      +
                      {
                        dashboardData.applications.filter((app) => {
                          const oneWeekAgo = new Date()
                          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
                          return new Date(app.createdAt) >= oneWeekAgo
                        }).length
                      }{" "}
                      this week
                    </p>
                  </div>

                  <div className="bg-[#061529] rounded-xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">Avg. Response Rate</h3>
                      <div className="bg-yellow-500/20 p-2 rounded-full">
                        <BarChart3 className="h-5 w-5 text-yellow-500" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-white">{dashboardData.stats.responseRate}%</p>
                    <p className="text-white/60 text-sm mt-1">Based on application status updates</p>
                  </div>
                </div>

                <RecruiterStats applications={dashboardData.applications} />

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-white">Recent Posts</h3>
                  <PostsList jobs={dashboardData.jobs} limit={3} />
                  <div className="mt-4 text-center">
                    <Button
                      variant="outline"
                      className="border-[#2F80ED] text-[#2F80ED] hover:bg-[#2F80ED]/10 bg-transparent"
                      onClick={() => setActiveTab("my-posts")}
                    >
                      View All Posts
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="my-posts">
                <div className="bg-[#061529] rounded-xl border border-white/10 p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h2 className="text-xl font-semibold text-white">My Job Postings</h2>
                    <Link href="/recruiter/dashboard/post-job">
                      <Button className="bg-[#2F80ED] hover:bg-[#2F80ED]/90">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Post New Opportunity
                      </Button>
                    </Link>
                  </div>
                  <PostsList jobs={dashboardData.jobs} />
                </div>
              </TabsContent>

              <TabsContent value="applications">
                <div className="bg-[#061529] rounded-xl border border-white/10 p-6">
                  <h2 className="text-xl font-semibold mb-6 text-white">Applications Received</h2>
                  {dashboardData.applications.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardData.applications.map((application) => (
                        <div
                          key={application.id}
                          className="bg-[#0A2342] rounded-lg p-4 border border-white/10 hover:border-[#2F80ED]/30 transition-all"
                        >
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium text-white">{application.job.title}</h3>
                                  <p className="text-sm text-white/70">
                                    Applicant: {application.user.name} ({application.user.email})
                                  </p>
                                  <div className="flex items-center mt-1 text-xs text-white/60">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    Applied on {formatDate(application.createdAt)}
                                  </div>
                                </div>
                                <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Link href={`/recruiter/applications/${application.id}`}>
                                <Button size="sm" className="bg-[#2F80ED] hover:bg-[#2F80ED]/90">
                                  Review
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-white/70">No applications received yet.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </motion.div>
      </div>
    </div>
  )
}
