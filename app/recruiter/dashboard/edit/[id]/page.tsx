"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import JobPostForm from "@/components/job-post-form"
import { useToast } from "@/hooks/use-toast"
import { mockPosts } from "@/lib/mock-data"

export default function EditJobPage({ params }: { params: { id: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [jobPost, setJobPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params

  useEffect(() => {
    // Simulate fetching the job post data
    const fetchJobPost = async () => {
      try {
        // In a real app, this would be an API call to get the job post
        await new Promise((resolve) => setTimeout(resolve, 500))

        const post = mockPosts.find((post) => post.id === id)
        if (post) {
          setJobPost(post)
        } else {
          toast({
            title: "Error",
            description: "Job post not found",
            variant: "destructive",
          })
          router.push("/recruiter/dashboard")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load job post",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobPost()
  }, [id, router, toast])

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true)

    // Simulate API call
    try {
      // In a real app, this would be an API call to update the job post
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success!",
        description: "Your job posting has been updated.",
        duration: 5000,
      })

      router.push("/recruiter/dashboard/my-posts")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your job posting.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 px-4 md:px-8 bg-[#0A2342] min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-[#061529] rounded-xl border border-white/10 p-6 md:p-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse text-white/70">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    )
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
              Edit <span className="text-[#2F80ED]">Job Post</span>
            </h1>

            {jobPost && (
              <JobPostForm onSubmit={handleSubmit} isSubmitting={isSubmitting} initialData={jobPost} isEditing={true} />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
