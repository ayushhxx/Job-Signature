import Link from "next/link"
import { Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0A2342] border-t border-white/10 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 bg-[#2F80ED] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JS</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">Job Signature</span>
            </div>
            <p className="text-white/70 mb-4 max-w-md text-sm sm:text-base">
              Your trusted partner in finding the perfect job or internship. Connect with top companies and advance your
              career.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-white/70 hover:text-[#2F80ED] transition-colors text-sm sm:text-base"
              >
                Home
              </Link>
              <Link
                href="/jobs"
                className="block text-white/70 hover:text-[#2F80ED] transition-colors text-sm sm:text-base"
              >
                Jobs
              </Link>
              <Link
                href="/internships"
                className="block text-white/70 hover:text-[#2F80ED] transition-colors text-sm sm:text-base"
              >
                Internships
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white/70">
                <Mail size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base">contact@jobsignature.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-white/70 text-xs sm:text-sm">
            © {new Date().getFullYear()} Job Signature. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
