"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function RecruiterLoginPage() {
  const [activeTab, setActiveTab] = useState("recruiter")

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
              Recruiter <span className="text-[#2F80ED]">Portal</span>
            </h1>
            <p className="text-white/70 mt-2">Sign in to your recruiter account</p>
          </div>

          <Tabs defaultValue="recruiter" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
              <TabsTrigger value="user">Job Seeker</TabsTrigger>
            </TabsList>

            <TabsContent value="recruiter">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recruiter-email">Email</Label>
                  <Input
                    id="recruiter-email"
                    type="email"
                    placeholder="company.email@example.com"
                    className="bg-[#0A2342] border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="recruiter-password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-[#2F80ED] hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <Input id="recruiter-password" type="password" className="bg-[#0A2342] border-white/20" />
                </div>
                <Button type="submit" className="w-full bg-[#2F80ED] hover:bg-[#2F80ED]/90">
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-white/70">
                  Don&apos;t have a recruiter account?{" "}
                  <Link href="/recruiter/signup" className="text-[#2F80ED] hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </TabsContent>

            <TabsContent value="user">
              <div className="text-center py-6">
                <p className="mb-4">Looking to sign in as a job seeker?</p>
                <Link href="/login">
                  <Button className="bg-[#2F80ED] hover:bg-[#2F80ED]/90">Go to Job Seeker Login</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  )
}
