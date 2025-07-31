"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY

        if (currentScrollY < 80) {
          setIsVisible(true)
        } else if (currentScrollY > lastScrollY) {
          setIsVisible(false)
          setIsOpen(false)
        } else {
          setIsVisible(true)
        }

        setLastScrollY(currentScrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScrollY])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/internships", label: "Internships" },
    { href: "/jobs", label: "Jobs" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-[#0A2342]/95 backdrop-blur-sm border-b border-white/10 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#2F80ED] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">JS</span>
            </div>
            <span className="text-white font-bold text-lg sm:text-xl">Job Signature</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white h-8 w-8 sm:h-10 sm:w-10">
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] sm:w-[300px] bg-[#0A2342] border-l border-white/10 text-white"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between py-4 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#2F80ED] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">JS</span>
                    </div>
                    <span className="text-white font-bold">Job Signature</span>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-2 py-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors duration-200 font-medium py-3 px-4 rounded-lg hover:bg-white/10 text-base"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-auto py-4 border-t border-white/10">
                  <p className="text-white/60 text-sm text-center">© 2024 Job Signature</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
