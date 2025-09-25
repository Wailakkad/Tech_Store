'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Smartphone, Shield, Headphones, Volume2, Zap } from 'lucide-react'

export default function CategoryGrid() {
  const categories = [
    {
      id: 'phones',
      name: 'Phones',
      icon: Smartphone,
      description: 'Latest smartphones',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'cases',
      name: 'Cases',
      icon: Shield,
      description: 'Protective cases',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'airpods',
      name: 'AirPods',
      icon: Headphones,
      description: 'Wireless earbuds',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'speakers',
      name: 'Speakers',
      icon: Volume2,
      description: 'Bluetooth speakers',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'chargers',
      name: 'Chargers',
      icon: Zap,
      description: 'Fast chargers',
      color: 'from-yellow-500 to-yellow-600'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link
            href={`/products?category=${category.id}`}
            className={`block bg-gradient-to-br ${category.color} rounded-xl p-6 text-white text-center transition-transform hover:shadow-xl`}
          >
            <category.icon className="w-12 h-12 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
            <p className="text-sm opacity-90">{category.description}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}