"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import JobPostForm from "@/components/job-post-form"
import { useToast } from "@/hooks/use-toast"

export default function PostJobPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true)

    // Simulate API call
    try {
      // In a real app, this would be an API call to save the job post
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success!",
        description: "Your job posting has been published.",
        duration: 5000,
      })

      router.push("/recruiter/dashboard/my-posts")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem publishing your job posting.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 bg-[#0A2342] min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Button variant="ghost" className="mb-6 text-white/70 hover:text-white" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="bg-[#061529] rounded-xl border border-white/10 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
              Post a New <span className="text-[#2F80ED]">Opportunity</span>
            </h1>

            <JobPostForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
