"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultView?: "login" | "signup"
  defaultRole?: "seeker" | "recruiter"
}

export default function AuthModal({ isOpen, onClose, defaultView = "login", defaultRole = "seeker" }: AuthModalProps) {
  const [view, setView] = useState<"login" | "signup">(defaultView)
  const [role, setRole] = useState<"seeker" | "recruiter">(defaultRole)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login, register } = useAuth()
  const { toast } = useToast()

  // Form state for login
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Form state for signup
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [companyName, setCompanyName] = useState("")

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setView(defaultView)
      setRole(defaultRole)
      // Reset form fields
      setLoginEmail("")
      setLoginPassword("")
      setSignupName("")
      setSignupEmail("")
      setSignupPassword("")
      setCompanyName("")
      setIsLoading(false)
    }
  }, [isOpen, defaultView, defaultRole])

  const handleRoleChange = (newRole: "seeker" | "recruiter") => {
    setSlideDirection(newRole === "seeker" ? "left" : "right")
    setRole(newRole)
  }

  const handleViewChange = (newView: "login" | "signup") => {
    setView(newView)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Attempting login with:", { email: loginEmail })
      const response = await login(loginEmail, loginPassword)
      console.log("Login response:", response)

      toast({
        title: "Login successful",
        description: "Welcome back to JobConnect!",
      })

      onClose()

      // Redirect based on user role
      if (response.user.role === "recruiter") {
        router.push("/recruiter/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const userData = {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        ...(role === "recruiter" && { companyName }),
        role: role === "seeker" ? "jobseeker" : "recruiter",
      }

      console.log("Attempting registration with:", userData)
      const response = await register(userData)
      console.log("Registration response:", response)

      toast({
        title: "Account created successfully",
        description: "Welcome to JobConnect!",
      })

      onClose()

      // Redirect based on user role
      if (response.user.role === "recruiter") {
        router.push("/recruiter/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "There was a problem creating your account.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "left" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? -300 : 300,
      opacity: 0,
    }),
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#061529] border-[#2F80ED]/20 p-0 max-w-md w-full rounded-xl overflow-hidden">
        <DialogTitle className="sr-only">
          {view === "login" ? "Login to your account" : "Create a new account"}
        </DialogTitle>
        <div className="relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white z-10">
            <X className="h-5 w-5" />
          </button>

          <div className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">{view === "login" ? "Welcome Back" : "Create Account"}</h2>
              <p className="text-white/70 mt-1">
                {view === "login" ? "Sign in to your account" : "Join Job Connect today"}
              </p>
            </div>

            <div className="bg-[#0A2342]/50 rounded-lg p-1 flex mb-6">
              <button
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                  role === "seeker" ? "bg-[#2F80ED] text-white" : "text-white/70 hover:text-white"
                }`}
                onClick={() => handleRoleChange("seeker")}
                disabled={isLoading}
              >
                Job Seeker
              </button>
              <button
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                  role === "recruiter" ? "bg-[#2F80ED] text-white" : "text-white/70 hover:text-white"
                }`}
                onClick={() => handleRoleChange("recruiter")}
                disabled={isLoading}
              >
                Recruiter
              </button>
            </div>

            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={role}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.3 }}
              >
                {role === "seeker" ? (
                  <div>
                    {view === "login" ? (
                      <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="bg-[#0A2342] border-white/20"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                              href="/forgot-password"
                              className="text-xs text-[#2F80ED] hover:underline"
                              onClick={onClose}
                            >
                              Forgot Password?
                            </Link>
                          </div>
                          <Input
                            id="password"
                            type="password"
                            className="bg-[#0A2342] border-white/20"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-[#2F80ED] hover:bg-[#2F80ED]/90"
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                      </form>
                    ) : (
                      <form className="space-y-4" onSubmit={handleSignup}>
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className="bg-[#0A2342] border-white/20"
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="bg-[#0A2342] border-white/20"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            className="bg-[#0A2342] border-white/20"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-[#2F80ED] hover:bg-[#2F80ED]/90"
                          disabled={isLoading}
                        >
                          {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                      </form>
                    )}
                  </div>
                ) : (
                  <div>
                    {view === "login" ? (
                      <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="space-y-2">
                          <Label htmlFor="company-email">Company Email</Label>
                          <Input
                            id="company-email"
                            type="email"
                            placeholder="your.email@company.com"
                            className="bg-[#0A2342] border-white/20"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="company-password">Password</Label>
                            <Link
                              href="/forgot-password"
                              className="text-xs text-[#2F80ED] hover:underline"
                              onClick={onClose}
                            >
                              Forgot Password?
                            </Link>
                          </div>
                          <Input
                            id="company-password"
                            type="password"
                            className="bg-[#0A2342] border-white/20"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-[#2F80ED] hover:bg-[#2F80ED]/90"
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing In..." : "Sign In as Recruiter"}
                        </Button>
                      </form>
                    ) : (
                      <form className="space-y-4" onSubmit={handleSignup}>
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
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-email">Company Email</Label>
                          <Input
                            id="company-email"
                            type="email"
                            placeholder="your.email@company.com"
                            className="bg-[#0A2342] border-white/20"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-password">Password</Label>
                          <Input
                            id="company-password"
                            type="password"
                            className="bg-[#0A2342] border-white/20"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-[#2F80ED] hover:bg-[#2F80ED]/90"
                          disabled={isLoading}
                        >
                          {isLoading ? "Creating Account..." : "Create Recruiter Account"}
                        </Button>
                      </form>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 text-center text-sm">
              {view === "login" ? (
                <p className="text-white/70">
                  Don&apos;t have an account?{" "}
                  <button
                    className="text-[#2F80ED] hover:underline"
                    onClick={() => handleViewChange("signup")}
                    disabled={isLoading}
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-white/70">
                  Already have an account?{" "}
                  <button
                    className="text-[#2F80ED] hover:underline"
                    onClick={() => handleViewChange("login")}
                    disabled={isLoading}
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
