"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Save } from "lucide-react"
import { motion } from "framer-motion"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Frontend Developer",
    bio: "Passionate frontend developer with 3+ years of experience in React and modern web technologies.",
    experience: "3 years",
    skills: "React, TypeScript, Next.js, Tailwind CSS",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // In a real app, this would save to backend
    console.log("Profile updated:", formData)
  }

  return (
    <div className="min-h-screen bg-[#0A2342] pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">My Profile</h1>
              <Button onClick={() => setIsEditing(!isEditing)} className="bg-[#2F80ED] hover:bg-[#2F80ED]/90">
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
            <p className="text-white/70 mt-2">Manage your personal information and preferences</p>
          </div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="bg-[#061529] border-[#2F80ED]/20">
              <TabsTrigger value="personal" className="data-[state=active]:bg-[#2F80ED]">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="professional" className="data-[state=active]:bg-[#2F80ED]">
                Professional
              </TabsTrigger>
              <TabsTrigger value="preferences" className="data-[state=active]:bg-[#2F80ED]">
                Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card className="bg-[#061529] border-[#2F80ED]/20">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt={formData.name} />
                      <AvatarFallback className="bg-[#2F80ED] text-white text-xl">
                        {formData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-white">{formData.name}</CardTitle>
                      <CardDescription className="text-white/70">{formData.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#0A2342] border-white/20 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#0A2342] border-white/20 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#0A2342] border-white/20 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-white flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#0A2342] border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white">
                      Bio
                    </Label>
                    <textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-3 py-2 bg-[#0A2342] border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent disabled:opacity-50"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex justify-end">
                      <Button onClick={handleSave} className="bg-[#2F80ED] hover:bg-[#2F80ED]/90">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professional" className="space-y-6">
              <Card className="bg-[#061529] border-[#2F80ED]/20">
                <CardHeader>
                  <CardTitle className="text-white">Professional Information</CardTitle>
                  <CardDescription className="text-white/70">
                    Update your professional details and skills
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-white flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Job Title
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#0A2342] border-white/20 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-white flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Experience
                      </Label>
                      <Input
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#0A2342] border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills" className="text-white">
                      Skills
                    </Label>
                    <textarea
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => handleInputChange("skills", e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      placeholder="List your skills separated by commas"
                      className="w-full px-3 py-2 bg-[#0A2342] border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent disabled:opacity-50"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex justify-end">
                      <Button onClick={handleSave} className="bg-[#2F80ED] hover:bg-[#2F80ED]/90">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card className="bg-[#061529] border-[#2F80ED]/20">
                <CardHeader>
                  <CardTitle className="text-white">Account Preferences</CardTitle>
                  <CardDescription className="text-white/70">
                    Manage your account settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Email Notifications</h4>
                        <p className="text-white/70 text-sm">Receive email updates about new job opportunities</p>
                      </div>
                      <Button variant="outline" className="border-[#2F80ED] text-[#2F80ED] bg-transparent">
                        Enabled
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Profile Visibility</h4>
                        <p className="text-white/70 text-sm">Allow recruiters to find your profile</p>
                      </div>
                      <Button variant="outline" className="border-[#2F80ED] text-[#2F80ED] bg-transparent">
                        Public
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Job Alerts</h4>
                        <p className="text-white/70 text-sm">Get notified about jobs matching your preferences</p>
                      </div>
                      <Button variant="outline" className="border-[#2F80ED] text-[#2F80ED] bg-transparent">
                        Weekly
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
