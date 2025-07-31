"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, DollarSign, Building, Share2, ExternalLink, X } from "lucide-react"
import ShareModal from "./share-modal"

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

interface JobDetailModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
}

export default function JobDetailModal({ job, isOpen, onClose }: JobDetailModalProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  if (!job) return null

  const handleApply = () => {
    window.open(job.applicationUrl, "_blank")
  }

  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-[#0A2342] border border-white/10 text-white m-2 sm:m-4 w-[calc(100vw-1rem)] sm:w-auto">
          <DialogHeader className="flex flex-row items-start justify-between space-y-0 pb-4 sticky top-0 bg-[#0A2342] z-10 border-b border-white/10">
            <div className="flex-1 pr-4">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-white line-clamp-2">{job.title}</DialogTitle>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-[#2F80ED] text-[#2F80ED] hover:bg-[#2F80ED]/10 bg-transparent hidden sm:flex"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-[#2F80ED] text-[#2F80ED] hover:bg-[#2F80ED]/10 bg-transparent sm:hidden"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6">
            {/* Company Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-[#061529] rounded-lg border border-white/10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building className="w-6 h-6 sm:w-8 sm:h-8 text-[#2F80ED]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white">{job.company}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-white/70 mt-1 space-y-1 sm:space-y-0">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {job.type}
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {job.salary}
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-white">Job Description</h4>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base">{job.description}</p>
            </div>

            <Separator className="bg-white/10" />

            {/* Skills Required */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-white">Skills Required</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#2F80ED]/20 text-[#2F80ED] border border-[#2F80ED]/30 hover:bg-[#2F80ED]/30 text-xs sm:text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <>
                <Separator className="bg-white/10" />
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-base sm:text-lg font-semibold text-white">Requirements</h4>
                  <ul className="space-y-2 text-white/80">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start text-sm sm:text-base">
                        <span className="text-[#2F80ED] mr-2 flex-shrink-0">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <>
                <Separator className="bg-white/10" />
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-base sm:text-lg font-semibold text-white">Benefits</h4>
                  <ul className="space-y-2 text-white/80">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-sm sm:text-base">
                        <span className="text-[#2F80ED] mr-2 flex-shrink-0">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <Separator className="bg-white/10" />

            {/* Company Profile */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-white">About {job.company}</h4>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base">{job.companyProfile}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10 sticky bottom-0 bg-[#0A2342] pb-2">
              <Button
                onClick={handleApply}
                className="flex-1 bg-[#2F80ED] hover:bg-[#2F80ED]/90 text-white font-semibold py-3 text-sm sm:text-base"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Easy Apply
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="border-[#2F80ED] text-[#2F80ED] hover:bg-[#2F80ED]/10 bg-transparent py-3 text-sm sm:text-base"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Job
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
