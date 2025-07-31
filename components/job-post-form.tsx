"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

// Define the form schema with Zod
const formSchema = z.object({
  jobType: z.enum(["full-time", "internship"], {
    required_error: "Please select a job type",
  }),
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters",
  }),
  salary: z.string().min(1, {
    message: "Please enter salary information",
  }),
  duration: z.string().min(1, {
    message: "Please enter duration information",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters",
  }),
  applicationDeadline: z.date().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface JobPostFormProps {
  onSubmit: (data: FormValues & { skills: string[] }) => void
  isSubmitting: boolean
  initialData?: FormValues & { skills: string[] }
  isEditing?: boolean
}

export default function JobPostForm({ onSubmit, isSubmitting, initialData, isEditing = false }: JobPostFormProps) {
  const [skills, setSkills] = useState<string[]>(initialData?.skills || [])
  const [skillInput, setSkillInput] = useState("")

  // Initialize the form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      jobType: "full-time",
      title: "",
      company: "",
      location: "",
      salary: "",
      duration: "",
      description: "",
    },
  })

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addSkill()
    }
  }

  const handleSubmit = (values: FormValues) => {
    if (skills.length === 0) {
      form.setError("root", {
        type: "manual",
        message: "Please add at least one required skill",
      })
      return
    }

    onSubmit({ ...values, skills })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="jobType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                  <FormControl>
                    <SelectTrigger className="bg-[#0A2342] border-white/20">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#0A2342] border-white/20">
                    <SelectItem value="full-time">Full-time Job</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>This will determine where your post appears</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Frontend Developer"
                    className="bg-[#0A2342] border-white/20"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Acme Inc."
                    className="bg-[#0A2342] border-white/20"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. New York, NY or Remote"
                    className="bg-[#0A2342] border-white/20"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary / Stipend</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. $5000/month or Unpaid"
                    className="bg-[#0A2342] border-white/20"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Permanent or 3 months"
                    className="bg-[#0A2342] border-white/20"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the role, responsibilities, and expectations..."
                  className="bg-[#0A2342] border-white/20 min-h-[200px]"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide a detailed description of the role</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Required Skills</FormLabel>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill) => (
              <Badge key={skill} className="bg-[#2F80ED]/20 text-[#2F80ED] hover:bg-[#2F80ED]/30">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 text-[#2F80ED] hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a skill and press Enter"
              className="bg-[#0A2342] border-white/20"
              disabled={isSubmitting}
            />
            <Button
              type="button"
              variant="outline"
              onClick={addSkill}
              disabled={isSubmitting || !skillInput.trim()}
              className="border-[#2F80ED] text-[#2F80ED] hover:bg-[#2F80ED]/10"
            >
              Add
            </Button>
          </div>
          {form.formState.errors.root && (
            <p className="text-red-500 text-sm mt-2">{form.formState.errors.root.message}</p>
          )}
          <p className="text-sm text-white/60 mt-2">Press Enter or click Add to add a skill</p>
        </div>

        <FormField
          control={form.control}
          name="applicationDeadline"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Application Deadline (Optional)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal bg-[#0A2342] border-white/20",
                        !field.value && "text-white/60",
                      )}
                      disabled={isSubmitting}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#0A2342] border-white/20">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="bg-[#0A2342]"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Set a deadline for applications</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="border-white/20"
            disabled={isSubmitting}
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-[#2F80ED] hover:bg-[#2F80ED]/90" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : isEditing ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
