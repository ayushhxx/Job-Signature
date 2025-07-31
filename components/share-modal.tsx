"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Facebook, Twitter, Linkedin, MessageCircle, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  jobTitle: string
  company: string
  jobId: string
}

export default function ShareModal({ isOpen, onClose, jobTitle, company, jobId }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/job/${jobId}`
  const shareText = `Check out this ${jobTitle} position at ${company}!`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "The job link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      })
    }
  }

  const shareOnPlatform = (platform: string) => {
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(shareUrl)

    let url = ""

    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`
        break
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
        break
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#0A2342] border border-white/10 text-white m-2 w-[calc(100vw-1rem)] sm:w-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold text-white">Share Job</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Job Info */}
          <div className="p-3 sm:p-4 bg-[#061529] rounded-lg border border-white/10">
            <h4 className="font-semibold text-white text-sm sm:text-base line-clamp-2">{jobTitle}</h4>
            <p className="text-white/70 text-xs sm:text-sm">{company}</p>
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Share Link</label>
            <div className="flex space-x-2">
              <Input value={shareUrl} readOnly className="bg-[#061529] border-white/10 text-white text-xs sm:text-sm" />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="icon"
                className="border-[#2F80ED] text-[#2F80ED] hover:bg-[#2F80ED]/10 bg-transparent flex-shrink-0"
              >
                {copied ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4" />}
              </Button>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white">Share on Social Media</label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Button
                onClick={() => shareOnPlatform("whatsapp")}
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500/10 text-xs sm:text-sm py-2 sm:py-3"
              >
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                WhatsApp
              </Button>
              <Button
                onClick={() => shareOnPlatform("linkedin")}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600/10 text-xs sm:text-sm py-2 sm:py-3"
              >
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                LinkedIn
              </Button>
              <Button
                onClick={() => shareOnPlatform("twitter")}
                variant="outline"
                className="border-sky-500 text-sky-500 hover:bg-sky-500/10 text-xs sm:text-sm py-2 sm:py-3"
              >
                <Twitter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Twitter
              </Button>
              <Button
                onClick={() => shareOnPlatform("facebook")}
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500/10 text-xs sm:text-sm py-2 sm:py-3"
              >
                <Facebook className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
