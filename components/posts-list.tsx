"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, MapPin, Clock, DollarSign, Calendar, Eye, UserCheck } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface PostsListProps {
  jobs: any[]
  limit?: number
}

export default function PostsList({ jobs = [], limit }: PostsListProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const displayJobs = limit ? jobs.slice(0, limit) : jobs

  const handleEdit = (id: string) => {
    router.push(`/recruiter/dashboard/edit/${id}`)
  }

  const openDeleteDialog = (id: string) => {
    setPostToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (postToDelete) {
      setIsDeleting(true)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
          title: "Post deleted",
          description: "The job post has been successfully deleted.",
        })

        // Refresh the page to update the list
        router.refresh()
      } catch (error) {
        console.error("Error deleting job:", error)
        toast({
          title: "Deletion failed",
          description: "There was an error deleting the job post. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsDeleting(false)
        setIsDeleteDialogOpen(false)
        setPostToDelete(null)
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/70 mb-4">You haven't posted any jobs yet.</p>
        <Button
          className="bg-[#2F80ED] hover:bg-[#2F80ED]/90"
          onClick={() => router.push("/recruiter/dashboard/post-job")}
        >
          Post Your First Job
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-6">
        {displayJobs.map((post) => (
          <div
            key={post.id}
            className="bg-[#0A2342] rounded-lg border border-white/10 p-5 hover:border-[#2F80ED]/30 transition-all"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <Badge
                        className={
                          post.type === "Full-time" ? "bg-green-900/30 text-green-400" : "bg-blue-900/30 text-blue-400"
                        }
                      >
                        {post.type}
                      </Badge>
                      {!post.isActive && (
                        <Badge variant="outline" className="border-red-500/50 text-red-400">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <p className="text-white/70 mb-3">{post.company}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/70 hover:text-[#2F80ED] hover:bg-[#2F80ED]/10"
                      onClick={() => handleEdit(post.id)}
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/70 hover:text-red-500 hover:bg-red-500/10"
                      onClick={() => openDeleteDialog(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 mb-3">
                  <div className="flex items-center text-sm text-white/70">
                    <MapPin size={16} className="mr-2 text-[#2F80ED]" />
                    {post.location}
                  </div>
                  <div className="flex items-center text-sm text-white/70">
                    <DollarSign size={16} className="mr-2 text-[#2F80ED]" />
                    {post.salary}
                  </div>
                  <div className="flex items-center text-sm text-white/70">
                    <Clock size={16} className="mr-2 text-[#2F80ED]" />
                    {post.duration}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="outline" className="border-white/20 text-white/80">
                      {skill}
                    </Badge>
                  ))}
                  {post.skills.length > 4 && (
                    <Badge variant="outline" className="border-white/20 text-white/80">
                      +{post.skills.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
                  {post.applicationDeadline && (
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-[#2F80ED]" />
                      Deadline: {formatDate(post.applicationDeadline)}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Eye size={16} className="mr-2 text-[#2F80ED]" />
                    {post.views || 0} views
                  </div>
                  <div className="flex items-center">
                    <UserCheck size={16} className="mr-2 text-[#2F80ED]" />
                    {post.applications?.length || 0} applications
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#0A2342] border-white/20">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
