"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Building, Share2, ExternalLink } from "lucide-react"
import JobDetailModal from "./job-detail-modal"
import ShareModal from "./share-modal"
import { useToast } from "@/hooks/use-toast"

interface Job {
  id: string
  title: string
  company: string
  logo: string
  location: string
  salary: string
  duration: string
  type: string
  description: string
  skills: string[]
  companyProfile: string
  applicationUrl: string
  requirements?: string[]
  benefits?: string[]
}

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const { toast } = useToast()

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    setIsDetailModalOpen(true)
  }

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(job.applicationUrl, "_blank")
    toast({
      title: "Redirecting to application",
      description: `Opening ${job.company}'s application page...`,
    })
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsShareModalOpen(true)
  }

  return (
    <>
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#2F80ED]/20 bg-[#061529] border border-white/10 hover:border-[#2F80ED]/50 hover:-translate-y-1 h-full"
        onClick={handleCardClick}
      >
        <CardContent className="p-4 sm:p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 text-[#2F80ED]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-base sm:text-lg text-white group-hover:text-[#2F80ED] transition-colors line-clamp-2">
                  {job.title}
                </h3>
                <p className="text-white/70 font-medium text-sm sm:text-base truncate">{job.company}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-white/60 hover:text-[#2F80ED] hover:bg-[#2F80ED]/10 flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10"
            >
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>

          {/* Job Details */}
          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 flex-1">
            <div className="flex items-center text-white/70">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#2F80ED] flex-shrink-0" />
              <span className="text-xs sm:text-sm truncate">{job.location}</span>
            </div>
            <div className="flex items-center text-white/70">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#2F80ED] flex-shrink-0" />
              <span className="text-xs sm:text-sm">{job.type}</span>
            </div>
            <div className="flex items-center text-white/70">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#2F80ED] flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">{job.salary}</span>
            </div>
          </div>

          {/* Description Preview */}
          <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 flex-1">{job.description}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
            {job.skills.slice(0, 2).map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-[#2F80ED]/20 text-[#2F80ED] border border-[#2F80ED]/30 text-xs px-2 py-1"
              >
                {skill}
              </Badge>
            ))}
            {job.skills.length > 2 && (
              <Badge variant="secondary" className="bg-white/10 text-white/70 border border-white/20 text-xs px-2 py-1">
                +{job.skills.length - 2}
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-white/10 mt-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-[#2F80ED]/50 text-[#2F80ED] hover:bg-[#2F80ED]/10 bg-transparent text-xs sm:text-sm py-2"
              onClick={() => setIsDetailModalOpen(true)}
            >
              View Details
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-[#2F80ED] hover:bg-[#2F80ED]/90 text-white text-xs sm:text-sm py-2"
              onClick={handleApply}
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Easy Apply
            </Button>
          </div>
        </CardContent>
      </Card>

      <JobDetailModal job={job} isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        jobTitle={job.title}
        company={job.company}
        jobId={job.id}
      />
    </>
  )
}
