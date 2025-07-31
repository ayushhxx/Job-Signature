"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState("user")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Form state for job seeker
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userConfirmPassword, setUserConfirmPassword] = useState("")

  // Form state for recruiter
  const [companyName, setCompanyName] = useState("")
  const [recruiterName, setRecruiterName] = useState("")
  const [recruiterEmail, setRecruiterEmail] = useState("")
  const [recruiterPassword, setRecruiterPassword] = useState("")

  const handleUserSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (userPassword !== userConfirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      toast({
        title: "Account created successfully",
        description: "Welcome to Job Signature!",
      })
      router.push("/dashboard")
      setIsLoading(false)
    }, 1000)
  }

  const handleRecruiterSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      toast({
        title: "Recruiter account created",
        description: "Welcome to Job Signature!",
      })
      router.push("/recruiter/dashboard")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-[#0A2342]">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-[#061529] rounded-xl border border-white/10 p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">
              Join Job<span className="text-[#2F80ED]">Connect</span>
            </h1>
            <p className="text-white/70 mt-2">Create your account</p>
          </div>

          <Tabs defaultValue="user" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="user">Job Seeker</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>

            <TabsContent value="user">
              <form className="space-y-4" onSubmit={handleUserSignup}>
                <div className="space-y-2">
                  <Label htmlFor="user-name">Full Name</Label>
                  <Input
                    id="user-name"
                    type="text"
                    placeholder="John Doe"
                    className="bg-[#0A2342] border-white/20"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-[#0A2342] border-white/20"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-password">Password</Label>
                  <Input
                    id="user-password"
                    type="password"
                    className="bg-[#0A2342] border-white/20"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-confirm-password">Confirm Password</Label>
                  <Input
                    id="user-confirm-password"
                    type="password"
                    className="bg-[#0A2342] border-white/20"
                    value={userConfirmPassword}
                    onChange={(e) => setUserConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full bg-[#2F80ED] hover:bg-[#2F80ED]/90" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-white/70">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#2F80ED] hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </TabsContent>

            <TabsContent value="recruiter">
              <form className="space-y-4" onSubmit={handleRecruiterSignup}>
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    type="text"
                    placeholder="Acme Inc."
                    className="bg-[#0A2342] border-white/20"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recruiter-name">Your Name</Label>
                  <Input
                    id="recruiter-name"
                    type="text"
                    placeholder="Jane Smith"
                    className="bg-[#0A2342] border-white/20"
                    value={recruiterName}
                    onChange={(e) => setRecruiterName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recruiter-email">Email</Label>
                  <Input
                    id="recruiter-email"
                    type="email"
                    placeholder="company.email@example.com"
                    className="bg-[#0A2342] border-white/20"
                    value={recruiterEmail}
                    onChange={(e) => setRecruiterEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recruiter-password">Password</Label>
                  <Input
                    id="recruiter-password"
                    type="password"
                    className="bg-[#0A2342] border-white/20"
                    value={recruiterPassword}
                    onChange={(e) => setRecruiterPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full bg-[#2F80ED] hover:bg-[#2F80ED]/90" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Recruiter Account"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-white/70">
                  Already have a recruiter account?{" "}
                  <Link href="/login" className="text-[#2F80ED] hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  )
}
