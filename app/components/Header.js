'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, Smartphone, } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/iphones', label: 'iPhones' },
  ]

  

  

  return (
    <header className="bg-[#f8f9fa] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Smartphone className="w-8 h-8 text-black" />
            <span className="text-2xl font-bold text-black">NextGen iStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Selector & Contact Button - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
           
            
            {/* Contact Button */}
            <Link
              href="/contact"
              className="px-6 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-black transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            {/* Mobile Navigation Links */}
            <nav className="py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 px-4 text-gray-700 hover:text-black hover:bg-gray-50 font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            
            
            {/* Mobile Contact Button */}
            <div className="px-4 py-3 border-t border-gray-200">
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}