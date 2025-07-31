"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  User,
  Mail,
  Phone,
  FileText,
  ExternalLink,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ApplicationDetailsPage({ params }: { params: { id: string } }) {
  // Mock application data
  const application = {
    id: params.id,
    job: {
      title: "Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$80k - $120k",
      description:
        "We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern JavaScript frameworks.",
      requirements: [
        "3+ years of experience with React.js",
        "Strong knowledge of HTML, CSS, and JavaScript",
        "Experience with TypeScript",
        "Familiarity with modern build tools",
        "Understanding of responsive design principles",
      ],
      benefits: [
        "Competitive salary and equity",
        "Health, dental, and vision insurance",
        "Flexible working hours",
        "Remote work options",
        "Professional development budget",
      ],
    },
    status: "Interview",
    appliedDate: "2024-01-15T10:00:00Z",
    lastUpdated: "2024-01-20T14:30:00Z",
    recruiter: {
      name: "Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      phone: "+1 (555) 123-4567",
    },
    timeline: [
      {
        date: "2024-01-15T10:00:00Z",
        status: "Applied",
        description: "Application submitted successfully",
      },
      {
        date: "2024-01-18T09:00:00Z",
        status: "Reviewed",
        description: "Application reviewed by hiring team",
      },
      {
        date: "2024-01-20T14:30:00Z",
        status: "Interview",
        description: "Interview scheduled for January 25th at 2:00 PM",
      },
    ],
    notes: "Great candidate with strong React experience. Looking forward to the technical interview.",
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-900/30 text-blue-400"
      case "Reviewed":
        return "bg-purple-900/30 text-purple-400"
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

  return (
    <div className="min-h-screen bg-[#0A2342] pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="mb-8">
            <Link href="/my-applications">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 mb-4 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Applications
              </Button>
            </Link>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">{application.job.title}</h1>
                <p className="text-white/70 text-lg">{application.job.company}</p>
              </div>
              <Badge className={cn("text-sm px-3 py-1", getStatusColor(application.status))}>
                {application.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Details */}
              <Card className="bg-[#061529] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center text-white/70">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{application.job.location}</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <Building className="h-4 w-4 mr-2" />
                      <span className="text-sm">{application.job.type}</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="text-sm">{application.job.salary}</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">Applied {formatDate(application.appliedDate).split(",")[0]}</span>
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div>
                    <h4 className="font-medium text-white mb-2">Description</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{application.job.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Requirements</h4>
                    <ul className="space-y-1">
                      {application.job.requirements.map((req, index) => (
                        <li key={index} className="text-white/70 text-sm flex items-start">
                          <span className="w-2 h-2 bg-[#2F80ED] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Benefits</h4>
                    <ul className="space-y-1">
                      {application.job.benefits.map((benefit, index) => (
                        <li key={index} className="text-white/70 text-sm flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Application Timeline */}
              <Card className="bg-[#061529] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Application Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {application.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              "w-3 h-3 rounded-full",
                              index === application.timeline.length - 1 ? "bg-[#2F80ED]" : "bg-white/30",
                            )}
                          ></div>
                          {index < application.timeline.length - 1 && <div className="w-px h-8 bg-white/20 mt-2"></div>}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <Badge className={cn("text-xs", getStatusColor(event.status))}>{event.status}</Badge>
                            <span className="text-xs text-white/50">{formatDate(event.date)}</span>
                          </div>
                          <p className="text-sm text-white/70">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Application Info */}
              <Card className="bg-[#061529] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Application Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-white/70 mb-1">Applied Date</p>
                    <p className="text-white">{formatDate(application.appliedDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Last Updated</p>
                    <p className="text-white">{formatDate(application.lastUpdated)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Application ID</p>
                    <p className="text-white font-mono">#{application.id}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recruiter Contact */}
              <Card className="bg-[#061529] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recruiter Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-[#2F80ED]" />
                    <div>
                      <p className="text-white font-medium">{application.recruiter.name}</p>
                      <p className="text-white/70 text-sm">Hiring Manager</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-[#2F80ED]" />
                    <a href={`mailto:${application.recruiter.email}`} className="text-[#2F80ED] hover:underline">
                      {application.recruiter.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-[#2F80ED]" />
                    <a href={`tel:${application.recruiter.phone}`} className="text-[#2F80ED] hover:underline">
                      {application.recruiter.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="bg-[#061529] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-[#2F80ED] hover:bg-[#2F80ED]/90">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Job Posting
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#2F80ED] text-[#2F80ED] hover:bg-[#2F80ED] hover:text-white bg-transparent"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Resume
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Recruiter
                  </Button>
                </CardContent>
              </Card>

              {/* Notes */}
              {application.notes && (
                <Card className="bg-[#061529] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 text-sm">{application.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
