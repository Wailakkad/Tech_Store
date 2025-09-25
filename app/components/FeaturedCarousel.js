'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function FeaturedCarousel() {
  const [products, setProducts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        // Show first 3 products as featured
        setProducts(data.slice(0, 3))
      })
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  if (products.length === 0) return null

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            <div className="aspect-square bg-gray-100">
              <Image
                src={products[currentIndex].image}
                alt={products[currentIndex].name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-dark-900 mb-4">
                {products[currentIndex].name}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {products[currentIndex].description}
              </p>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-primary-600">
                  ${products[currentIndex].price}
                </span>
              </div>
              <Link
                href={`/products/${products[currentIndex].id}`}
                className="btn-primary w-fit"
              >
                Order Now
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}