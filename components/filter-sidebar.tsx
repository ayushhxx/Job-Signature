"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import { motion } from "framer-motion"

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  type: "jobs" | "internships"
  onApplyFilters: (filters: any) => void
}

// Mock data for locations
const locations = [
  "Remote",
  "New York, NY",
  "San Francisco, CA",
  "Austin, TX",
  "Chicago, IL",
  "Boston, MA",
  "Seattle, WA",
  "Denver, CO",
  "Miami, FL",
]

export default function FilterSidebar({ isOpen, onClose, type, onApplyFilters }: FilterSidebarProps) {
  // Internship filters
  const [internshipDuration, setInternshipDuration] = useState<number[]>([1, 6])
  const [internshipSalary, setInternshipSalary] = useState<number[]>([0, 50])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])

  // Job filters
  const [jobSalary, setJobSalary] = useState<number[]>([10, 100])

  // Reset filters when sidebar opens
  useEffect(() => {
    if (isOpen) {
      if (type === "internships") {
        setInternshipDuration([1, 6])
        setInternshipSalary([0, 50])
      } else {
        setJobSalary([10, 100])
      }
      setSelectedLocations([])
    }
  }, [isOpen, type])

  const handleLocationToggle = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((loc) => loc !== location) : [...prev, location],
    )
  }

  const handleApplyFilters = () => {
    const filters = {
      locations: selectedLocations,
      ...(type === "internships"
        ? {
            duration: internshipDuration,
            salary: internshipSalary,
          }
        : {
            salary: jobSalary,
          }),
    }
    onApplyFilters(filters)
    onClose()
  }

  const handleClearFilters = () => {
    if (type === "internships") {
      setInternshipDuration([1, 6])
      setInternshipSalary([0, 50])
    } else {
      setJobSalary([10, 100])
    }
    setSelectedLocations([])
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="absolute top-0 right-0 h-full w-full max-w-md bg-[#061529] shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Filter {type === "internships" ? "Internships" : "Jobs"}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-8">
            {/* Location Filter (Common for both) */}
            <div>
              <h3 className="text-lg font-medium mb-3">Location</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {locations.map((location) => (
                  <div key={location} className="flex items-center">
                    <Checkbox
                      id={`location-${location}`}
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={() => handleLocationToggle(location)}
                      className="border-[#2F80ED]/50 data-[state=checked]:bg-[#2F80ED] data-[state=checked]:border-[#2F80ED]"
                    />
                    <Label htmlFor={`location-${location}`} className="ml-2 cursor-pointer">
                      {location}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Internship-specific filters */}
            {type === "internships" && (
              <>
                {/* Duration Filter */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Duration (months)</h3>
                  <div className="space-y-4">
                    <Slider
                      value={internshipDuration}
                      min={1}
                      max={12}
                      step={1}
                      onValueChange={setInternshipDuration}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">{internshipDuration[0]} month</span>
                      <span className="text-sm text-white/70">{internshipDuration[1]} months</span>
                    </div>
                  </div>
                </div>

                {/* Salary Filter */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Salary (₹K per month)</h3>
                  <div className="space-y-4">
                    <Slider
                      value={internshipSalary}
                      min={0}
                      max={50}
                      step={5}
                      onValueChange={setInternshipSalary}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">₹{internshipSalary[0]}K</span>
                      <span className="text-sm text-white/70">
                        {internshipSalary[1] === 50 ? "₹50K+" : `₹${internshipSalary[1]}K`}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Job-specific filters */}
            {type === "jobs" && (
              <>
                {/* Salary Filter */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Salary (₹K per year)</h3>
                  <div className="space-y-4">
                    <Slider
                      value={jobSalary}
                      min={10}
                      max={100}
                      step={10}
                      onValueChange={setJobSalary}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">₹{jobSalary[0]}K</span>
                      <span className="text-sm text-white/70">
                        {jobSalary[1] === 100 ? "₹100K+" : `₹${jobSalary[1]}K`}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
            <Button className="flex-1 bg-[#2F80ED] hover:bg-[#2F80ED]/90" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
