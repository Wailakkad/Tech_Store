'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import imgBackground from  './images/3.png'
import imgIphone from './images/Iphone/15Normal.jpg'
import imgIphone1 from './images/Iphone/16normal.jpg'
import imgIphone2 from './images/Iphone/15pro.jpg'
import imgIphone3 from './images/Iphone/16pro.jpg'
import RightImg from './images/Right.png'
import sectionImage from './images/44.jpeg'

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: "$999",
      image: imgIphone,
      category: "Smartphones"
    },
    {
      id: 2,
      name: "MacBook Air M3",
      price: "$1,199",
      image: imgIphone1,
      category: "Laptops"
    },
    {
      id: 3,
      name: "AirPods Pro",
      price: "$249",
      image: imgIphone2,
      category: "Audio"
    },
    {
      id: 4,
      name: "iPad Pro",
      price: "$799",
      image: imgIphone3,
      category: "Tablets"
    }
  ]

  return (
    <div className="bg-white" style={{ backgroundColor: '#ffffff', colorScheme: 'light' }}>
      {/* Hero Section */}
      <section className="relative min-h-[970px] overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={imgBackground}
            alt="Hand holding phone"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              {...fadeInUp}
              className="text-center"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight" 
                  style={{ color: '#03045e' }}>
                Premium Tech
                <br />
                <span className="font-light">Experience</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light"
                 style={{ color: '#4b5563' }}>
                Discover the latest in mobile technology, accessories, and audio devices.
                <br />
                Quality products, trusted service, fast delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/products" 
                    className="inline-block px-8 py-4 border-2 font-medium transition-all duration-300 text-lg"
                    style={{ 
                      borderColor: '#000000', 
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#000000';
                      e.target.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#000000';
                    }}
                  >
                    Shop Now
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/about" 
                    className="inline-block px-8 py-4 border-2 font-medium transition-all duration-300 text-lg"
                    style={{ 
                      borderColor: '#d1d5db', 
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#000000';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                    }}
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#000000' }}>
              Featured Products
            </h2>
            <p className="text-xl font-light" style={{ color: '#4b5563' }}>
              Handpicked premium devices just for you
            </p>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div 
                key={product.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group cursor-pointer"
              >
                <div className="rounded-lg overflow-hidden mb-4 aspect-square relative"
                     style={{ backgroundColor: '#f9fafb' }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm mb-1" style={{ color: '#6b7280' }}>
                    {product.category}
                  </p>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#000000' }}>
                    {product.name}
                  </h3>
                  <p className="text-lg font-medium" style={{ color: '#000000' }}>
                    {product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
     {/* Why Choose Us Section */}
      <section className="py-24" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-5xl md:text-6xl font-bold leading-tight"
                style={{ color: '#000000' }}
              >
                Why Choose Us
              </motion.h2>
              
              <motion.p
                variants={fadeInUp}
                className="text-lg max-w-md leading-relaxed"
                style={{ color: '#4b5563' }}
              >
                We provide the latest premium tech devices with unbeatable quality, fast delivery, and trusted customer service.
              </motion.p>
              
              <motion.div
                variants={fadeInUp}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/about" 
                    className="inline-block px-8 py-4 border-2 font-medium transition-all duration-300 text-lg"
                    style={{ 
                      borderColor: '#000000', 
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#000000';
                      e.target.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#000000';
                    }}
                  >
                    Explore More
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative max-h-96 lg:max-h-[500px]"
            >
              <Image
                src={RightImg}
                alt="Premium tech devices"
                className="w-full h-full object-contain"
                priority={false}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Background Image Section */}
      <section className="relative min-h-[900px] w-full overflow-hidden mt-20">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <Image
            src={sectionImage}
            alt="Section background"
            fill
            className="object-cover object-center grayscale"
            priority={false}
          />
          {/* Black and white gradient overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <div className="flex items-center justify-center h-full">
              {/* Content container positioned lower to be close to CTAs */}
              <div className="absolute bottom-0 w-full flex flex-col items-center mb-32">
                {/* Title and Description */}
                <div className="text-center px-4 max-w-4xl mb-12">
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                    style={{ color: '#ffffff' }}
                  >
                    Experience the
                    <span className="border-b-4" style={{ color: '#ffffff', borderColor: '#ffffff' }}> Future</span>
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl font-light"
                    style={{ color: '#d1d5db' }}
                  >
                    Premium devices engineered for tomorrow's innovators
                  </motion.p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  {/* Primary CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/products"
                      className="group relative inline-flex items-center px-10 py-5 font-semibold text-lg rounded-full shadow-2xl transition-all duration-300"
                      style={{ 
                        backgroundColor: '#ffffff', 
                        color: '#000000' 
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#ffffff';
                      }}
                    >
                      <span className="flex items-center gap-3">
                        Shop Collection
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </Link>
                  </motion.div>
                  
                  {/* Secondary CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/explore"
                      className="group inline-flex items-center px-8 py-4 border-2 backdrop-blur-sm font-medium text-lg rounded-full transition-all duration-300"
                      style={{ 
                        borderColor: '#ffffff',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        color: '#ffffff'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#ffffff';
                        e.target.style.color = '#000000';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                        e.target.style.color = '#ffffff';
                      }}
                    >
                      <span className="flex items-center gap-2">
                        Explore Tech
                        <svg className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}