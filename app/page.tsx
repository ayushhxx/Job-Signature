"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useInView, useAnimation } from "framer-motion"
import JobCard from "@/components/job-card"
import { jobsData, internshipsData } from "@/lib/data"

export default function Home() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2342]/90 to-[#0A2342]/70 z-10" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&h=1380&auto=format&fit=crop"
            alt="Job Signature Hero"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-20">
          <div className="max-w-4xl mx-auto text-center sm:text-left">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Find Your Dream <span className="text-[#2F80ED]">Job or Internship</span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto sm:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Connect with top companies and opportunities that match your skills and aspirations.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start max-w-md mx-auto sm:max-w-none sm:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/jobs" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-[180px] bg-[#2F80ED] hover:bg-[#2F80ED]/90 text-white rounded-md transition-all duration-300 px-6 py-3"
                >
                  Browse Jobs
                </Button>
              </Link>
              <Link href="/internships" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-[180px] bg-white text-[#2F80ED] border-[#2F80ED] hover:bg-[#2F80ED] hover:text-white rounded-md transition-all duration-300 px-6 py-3"
                >
                  Browse Internships
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8" ref={ref}>
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Featured Internships</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
              Kickstart your career with these exciting internship opportunities from top companies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {internshipsData.slice(0, 3).map((internship, index) => (
              <motion.div
                key={internship.id}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.1 * index },
                  },
                }}
              >
                <JobCard job={internship} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <Link href="/internships">
              <Button
                variant="outline"
                className="border-[#2F80ED] text-[#2F80ED] hover:bg-[#2F80ED]/10 bg-transparent px-6 py-2"
              >
                View All Internships
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#061529]">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Latest Job Openings</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
              Explore these exciting job opportunities from companies looking for talent like you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {jobsData.slice(0, 6).map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <Link href="/jobs">
              <Button className="bg-[#2F80ED] hover:bg-[#2F80ED]/90 text-white px-6 py-2">View All Jobs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              About <span className="text-[#2F80ED]">Job Signature</span>
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto text-sm sm:text-base">
              Connecting talented professionals with their dream opportunities since 2020.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-4xl mx-auto text-center"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Our <span className="text-[#2F80ED]">Mission</span>
            </h3>
            <div className="space-y-4 text-sm sm:text-base md:text-lg">
              <p className="text-white/80 leading-relaxed">
                At Job Signature, we're dedicated to bridging the gap between talented job seekers and forward-thinking
                companies. Our platform simplifies the job search process, making it easier for professionals to find
                opportunities that align with their skills, values, and career aspirations.
              </p>
              <p className="text-white/80 leading-relaxed">
                We believe that the right job can transform lives, and the right talent can transform businesses. That's
                why we've built a comprehensive platform that serves both job seekers and employers with powerful tools
                and resources.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
              <div className="bg-[#0A2342] p-4 sm:p-6 rounded-lg">
                <h4 className="font-bold text-xl sm:text-2xl text-[#2F80ED] mb-2">100+</h4>
                <p className="text-white/70 text-xs sm:text-sm">Jobs Posted</p>
              </div>
              <div className="bg-[#0A2342] p-4 sm:p-6 rounded-lg">
                <h4 className="font-bold text-xl sm:text-2xl text-[#2F80ED] mb-2">10+</h4>
                <p className="text-white/70 text-xs sm:text-sm">Successful Placements</p>
              </div>
              <div className="bg-[#0A2342] p-4 sm:p-6 rounded-lg">
                <h4 className="font-bold text-xl sm:text-2xl text-[#2F80ED] mb-2">28+</h4>
                <p className="text-white/70 text-xs sm:text-sm">Partner Companies</p>
              </div>
              <div className="bg-[#0A2342] p-4 sm:p-6 rounded-lg">
                <h4 className="font-bold text-xl sm:text-2xl text-[#2F80ED] mb-2">98%</h4>
                <p className="text-white/70 text-xs sm:text-sm">Satisfaction Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
