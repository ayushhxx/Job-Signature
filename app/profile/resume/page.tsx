"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Download, Trash2, Eye } from "lucide-react"
import { motion } from "framer-motion"

export default function ResumePage() {
  const [hasResume, setHasResume] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      // Simulate upload
      setTimeout(() => {
        setHasResume(true)
        setIsUploading(false)
      }, 2000)
    }
  }

  const handleDelete = () => {
    setHasResume(false)
  }

  return (
    <div className="min-h-screen bg-[#0A2342] pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Resume Management</h1>
            <p className="text-white/70 mt-2">Upload and manage your resume for job applications</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="bg-[#061529] border-[#2F80ED]/20">
              <CardHeader>
                <CardTitle className="text-white">Upload Resume</CardTitle>
                <CardDescription className="text-white/70">Upload your latest resume in PDF format</CardDescription>
              </CardHeader>
              <CardContent>
                {!hasResume ? (
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-white/40 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Upload your resume</h3>
                    <p className="text-white/70 mb-4">Drag and drop your file here, or click to browse</p>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="resume-upload"
                        disabled={isUploading}
                      />
                      <label htmlFor="resume-upload">
                        <Button className="bg-[#2F80ED] hover:bg-[#2F80ED]/90" disabled={isUploading} asChild>
                          <span>{isUploading ? "Uploading..." : "Choose File"}</span>
                        </Button>
                      </label>
                      <p className="text-xs text-white/50">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#0A2342] rounded-lg p-6 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-[#2F80ED]" />
                        <div>
                          <h4 className="font-medium text-white">resume.pdf</h4>
                          <p className="text-sm text-white/70">Uploaded on Jan 15, 2024</p>
                          <p className="text-xs text-white/50">2.3 MB</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-[#2F80ED] text-[#2F80ED] bg-transparent">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-[#2F80ED] text-[#2F80ED] bg-transparent">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                          onClick={handleDelete}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {hasResume && (
                  <div className="mt-4">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-replace"
                      disabled={isUploading}
                    />
                    <label htmlFor="resume-replace">
                      <Button
                        variant="outline"
                        className="w-full border-[#2F80ED] text-[#2F80ED] hover:bg-[#2F80ED] hover:text-white bg-transparent"
                        disabled={isUploading}
                        asChild
                      >
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          {isUploading ? "Uploading..." : "Replace Resume"}
                        </span>
                      </Button>
                    </label>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips Section */}
            <Card className="bg-[#061529] border-[#2F80ED]/20">
              <CardHeader>
                <CardTitle className="text-white">Resume Tips</CardTitle>
                <CardDescription className="text-white/70">Make your resume stand out to employers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#2F80ED] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-white">Keep it concise</h4>
                      <p className="text-sm text-white/70">Limit your resume to 1-2 pages with relevant information</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#2F80ED] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-white">Use keywords</h4>
                      <p className="text-sm text-white/70">Include industry-specific keywords from job descriptions</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#2F80ED] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-white">Quantify achievements</h4>
                      <p className="text-sm text-white/70">Use numbers and metrics to showcase your impact</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#2F80ED] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-white">Proofread carefully</h4>
                      <p className="text-sm text-white/70">Check for spelling and grammar errors before uploading</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#2F80ED] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-white">Update regularly</h4>
                      <p className="text-sm text-white/70">
                        Keep your resume current with latest experiences and skills
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resume Builder CTA */}
          <Card className="bg-[#061529] border-[#2F80ED]/20 mt-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Need help creating a resume?</h3>
              <p className="text-white/70 mb-6">
                Use our built-in resume builder to create a professional resume in minutes
              </p>
              <Button className="bg-[#2F80ED] hover:bg-[#2F80ED]/90">
                <FileText className="h-4 w-4 mr-2" />
                Launch Resume Builder
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
