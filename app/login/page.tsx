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

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("user")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Form state
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [recruiterEmail, setRecruiterEmail] = useState("")
  const [recruiterPassword, setRecruiterPassword] = useState("")

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      toast({
        title: "Login successful",
        description: "Welcome back to Job Signature!",
      })
      router.push("/dashboard")
      setIsLoading(false)
    }, 1000)
  }

  const handleRecruiterLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      toast({
        title: "Login successful",
        description: "Welcome back to Job Signature!",
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
              Welcome to Job<span className="text-[#2F80ED]">Connect</span>
            </h1>
            <p className="text-white/70 mt-2">Sign in to your account</p>
          </div>

          <Tabs defaultValue="user" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="user">Job Seeker</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>

            <TabsContent value="user">
              <form className="space-y-4" onSubmit={handleUserLogin}>
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="user-password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-[#2F80ED] hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
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
                <Button type="submit" className="w-full bg-[#2F80ED] hover:bg-[#2F80ED]/90" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-white/70">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-[#2F80ED] hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </TabsContent>

            <TabsContent value="recruiter">
              <form className="space-y-4" onSubmit={handleRecruiterLogin}>
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="recruiter-password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-[#2F80ED] hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
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
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-white/70">
                  Don&apos;t have a recruiter account?{" "}
                  <Link href="/signup" className="text-[#2F80ED] hover:underline">
                    Sign up
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
