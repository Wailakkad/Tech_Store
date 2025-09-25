"use client"
import Link from 'next/link'
import { Smartphone, MessageCircle, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer 
      className="text-white"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
               
            <Smartphone className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">NextGen iStore</span>
          
            </Link>
            <p className="mb-4 max-w-md" style={{ color: '#d1d5db' }}>
              Your trusted partner for premium tech products. We bring you the latest 
              in mobile technology with unmatched quality and service.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://wa.me/1234567890" 
                className="transition-colors hover:opacity-80"
                style={{ color: '#d1d5db' }}
              >
                <MessageCircle size={24} />
              </a>
              <a 
                href="#" 
                className="transition-colors hover:opacity-80"
                style={{ color: '#d1d5db' }}
              >
                <Instagram size={24} />
              </a>
              <a 
                href="#" 
                className="transition-colors hover:opacity-80"
                style={{ color: '#d1d5db' }}
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ color: '#ffffff' }}>
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="transition-colors hover:opacity-80"
                  style={{ color: '#d1d5db' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="transition-colors hover:opacity-80"
                  style={{ color: '#d1d5db' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/payment" 
                  className="transition-colors hover:opacity-80"
                  style={{ color: '#d1d5db' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
                >
                  Payment
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="transition-colors hover:opacity-80"
                  style={{ color: '#d1d5db' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ color: '#ffffff' }}>
              Contact
            </h3>
            <ul className="space-y-2" style={{ color: '#d1d5db' }}>
             
              <li>📱 +212 673-434731</li>
              <li>📍 Casablanca</li>
            </ul>
          </div>
        </div>

        <div 
          className="mt-8 pt-8 text-center border-t"
          style={{ 
            borderColor: '#374151',
            color: '#9ca3af' 
          }}
        >
          <p>&copy; 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}