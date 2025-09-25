'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {  Heart, ShoppingCart, Filter, ChevronDown, ChevronUp, Grid, List, Search,  MessageCircle, X } from 'lucide-react'
import iphoneProducts from '../data/iphoneProducts' // Import the JSON data directly
import { useCart } from '../context/CartContext'

export default function ProfessionalIPhonesPage() {
  const { addToCart, getTotalItems } = useCart()
  const [products] = useState(iphoneProducts) // Use imported data
  const [filteredProducts, setFilteredProducts] = useState(iphoneProducts) // Initialize with imported data
  const [selectedModels, setSelectedModels] = useState([])
  const [selectedVariants, setSelectedVariants] = useState([])
  const [selectedStorages, setSelectedStorages] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState([0, 25000]) // Updated for Moroccan prices
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const route = useRouter()

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA').format(price);
  }

  // Get unique filter options
  const getFilterOptions = () => {
    const models = [...new Set(products.map(p => p.model))]
    const variants = [...new Set(products.map(p => p.variant))]
    const storages = [...new Set(products.flatMap(p => p.storage))]
    const colors = [...new Set(products.flatMap(p => p.colors))]
    
    return { models, variants, storages, colors }
  }

  const { models,  storages, colors } = getFilterOptions()

  // Filter products
  useEffect(() => {
    let filtered = [...products]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.variant?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Model filter
    if (selectedModels.length > 0) {
      filtered = filtered.filter(product => selectedModels.includes(product.model))
    }

    // Variant filter
    if (selectedVariants.length > 0) {
      filtered = filtered.filter(product => selectedVariants.includes(product.variant))
    }

    // Storage filter
    if (selectedStorages.length > 0) {
      filtered = filtered.filter(product => 
        product.storage.some(storage => selectedStorages.includes(storage))
      )
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors.some(color => selectedColors.includes(color))
      )
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
    }

    setFilteredProducts(filtered)
  }, [products, selectedModels, selectedVariants, selectedStorages, selectedColors, priceRange, sortBy, searchTerm])

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'model':
        setSelectedModels(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        )
        break
      case 'variant':
        setSelectedVariants(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        )
        break
      case 'storage':
        setSelectedStorages(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        )
        break
      case 'color':
        setSelectedColors(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        )
        break
    }
  }

  const clearAllFilters = () => {
    setSelectedModels([])
    setSelectedVariants([])
    setSelectedStorages([])
    setSelectedColors([])
    setPriceRange([0, 25000])
    setSearchTerm('')
  }

  const ProductCard = ({ product }) => {
    const [selectedStorage, setSelectedStorage] = useState(product.storage[0])
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [isAdding, setIsAdding] = useState(false)

    const handleAddToCart = async () => {
      setIsAdding(true)
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate loading
      addToCart(product, selectedStorage, selectedColor)
      setIsAdding(false)
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 mx-2 sm:mx-0"
      >
        {/* Product Image */}
        <div className="relative h-48 sm:h-56 md:h-64 bg-gray-50 group">
          {product.isNew && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black text-white px-2 py-1 rounded-md text-xs font-medium z-10">
              New
            </div>
          )}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
            <button className="p-1.5 sm:p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </button>
          </div>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 sm:p-6"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300/f3f4f6/374151?text=${encodeURIComponent(product.name)}`
            }}
          />
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4">
          <div className="mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
            {product.variant && <p className="text-xs sm:text-sm text-gray-500">{product.variant}</p>}
          </div>

          {/* Storage Selection */}
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-700 mb-2">Storage:</p>
            <div className="flex flex-wrap gap-1">
              {product.storage.map((storage) => (
                <button
                  key={storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    selectedStorage === storage
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-700 mb-2">Color:</p>
            <div className="flex flex-wrap gap-1">
              {product.colors.slice(0, 3).map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    selectedColor === color
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
              {product.colors.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-500">
                  +{product.colors.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Price - UPDATED WITH FORMATTING */}
          <div className="mb-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                {formatPrice(product.price)} DH
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)} DH
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 bg-black text-white py-2 px-3 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isAdding ? (
                <>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Adding...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Add</span>
                </>
              )}
            </button>
            
            <button 
              onClick={() => {
                const message = `Hi! I'm interested in the ${product.name} (${selectedStorage}, ${selectedColor}) for ${formatPrice(product.price)} DH. Can you provide more information?`
                const whatsappUrl = `https://wa.me/212673434731?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, '_blank')
              }}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  const FilterSection = ({ title, options, selectedOptions, filterType }) => {
    const [isExpanded, setIsExpanded] = useState(true)

    return (
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          {title}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {isExpanded && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <label key={`${filterType}-${option}`} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleFilterChange(filterType, option)}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Mobile Filter Modal
  const MobileFilterModal = () => (
    <div className={`fixed inset-0 z-50 lg:hidden ${showMobileFilters ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)}></div>
      <div className="fixed inset-y-0 right-0 w-80 max-w-full bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={() => setShowMobileFilters(false)}
            className="p-2 -mr-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto h-full pb-20">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={clearAllFilters}
              className="text-sm text-black hover:underline"
            >
              Clear all
            </button>
          </div>

          <FilterSection
            title="iPhone Model"
            options={models}
            selectedOptions={selectedModels}
            filterType="model"
          />

          <FilterSection
            title="Storage"
            options={storages}
            selectedOptions={selectedStorages}
            filterType="storage"
          />

          <FilterSection
            title="Color"
            options={colors.slice(0, 10)}
            selectedOptions={selectedColors}
            filterType="color"
          />

          {/* Price Range */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{formatPrice(priceRange[0])} DH</span>
                <span>{formatPrice(priceRange[1])} DH</span>
              </div>
              <input
                type="range"
                min="0"
                max="25000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
          <button
            onClick={() => setShowMobileFilters(false)}
            className="w-full bg-black text-white py-3 rounded-md font-medium"
          >
            Apply Filters ({filteredProducts.length})
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between lg:hidden">
            <div>
              <h1 className="text-xl font-bold text-gray-900">iPhone</h1>
              <p className="text-xs text-gray-600">
                {filteredProducts.length} products
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Cart Icon */}
              <div className="relative">
                <button onClick={()=> route.push("/cart")} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>

              {/* Search Toggle */}
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">iPhone</h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredProducts.length} of {products.length} products
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <div className="relative">
                <button onClick={()=> route.push("/cart")} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-64"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showMobileSearch && (
            <div className="mt-4 lg:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Mobile Sort */}
          <div className="mt-3 lg:hidden flex items-center justify-between">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <div className="flex bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block w-64 flex-shrink-0 pr-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </h3>
              <button
                onClick={clearAllFilters}
                className="text-sm text-black hover:underline"
              >
                Clear all
              </button>
            </div>

            <FilterSection
              title="iPhone Model"
              options={models}
              selectedOptions={selectedModels}
              filterType="model"
            />

            <FilterSection
              title="Storage"
              options={storages}
              selectedOptions={selectedStorages}
              filterType="storage"
            />

            <FilterSection
              title="Color"
              options={colors.slice(0, 10)}
              selectedOptions={selectedColors}
              filterType="color"
            />

            {/* Price Range */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{formatPrice(priceRange[0])} DH</span>
                  <span>{formatPrice(priceRange[1])} DH</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 text-black hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-4 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <MobileFilterModal />
    </div>
  )
}