"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import JobCard from "@/components/job-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import FilterSidebar from "@/components/filter-sidebar"
import { jobsData } from "@/lib/data"

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<any>(null)
  const [filteredJobs, setFilteredJobs] = useState(jobsData)

  // Filter jobs based on search and filters
  useEffect(() => {
    const filtered = jobsData.filter((job) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())

      // If no active filters, just use search
      if (!activeFilters) return matchesSearch

      // Location filter
      const matchesLocation =
        activeFilters.locations.length === 0 || activeFilters.locations.some((loc) => job.location.includes(loc))

      // Salary filter
      const salaryValue = Number.parseInt(job.salary.replace(/[^0-9]/g, ""))
      const matchesSalary =
        isNaN(salaryValue) ||
        (salaryValue >= activeFilters.salary[0] * 1000 && salaryValue <= activeFilters.salary[1] * 1000)

      return matchesSearch && matchesLocation && matchesSalary
    })

    setFilteredJobs(filtered)
  }, [searchTerm, activeFilters])

  const applyFilters = (filters) => {
    setActiveFilters(filters)
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 bg-[#0A2342]">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Job <span className="text-[#2F80ED]">Opportunities</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Find your dream job from our curated list of opportunities from top companies.
          </p>
        </motion.div>

        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <Input
                type="text"
                placeholder="Search by title, company, or location..."
                className="pl-10 bg-[#061529] border-white/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4" /> Filters
              {activeFilters && (
                <span className="ml-2 bg-[#2F80ED] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {(activeFilters.locations.length > 0 ? 1 : 0) +
                    (activeFilters.salary[0] !== 10 || activeFilters.salary[1] !== 100 ? 1 : 0)}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index % 6) }}
              >
                <JobCard job={job} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-white/70">No jobs found matching your search.</p>
              <Button
                variant="link"
                className="text-[#2F80ED] mt-2"
                onClick={() => {
                  setSearchTerm("")
                  setActiveFilters(null)
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        type="jobs"
        onApplyFilters={applyFilters}
      />
    </div>
  )
}
