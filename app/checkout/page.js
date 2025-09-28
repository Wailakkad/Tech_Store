'use client'
import { useCart } from '../context/CartContext'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { User, Phone, MapPin } from 'lucide-react'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: ''
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect to cart if empty
  useEffect(() => {
    if (mounted && items.length === 0 && !orderComplete) {
      window.location.href = '/cart'
    }
  }, [mounted, items.length, orderComplete])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (formData.phoneNumber.trim().length < 8) {
      newErrors.phoneNumber = 'Please enter a valid phone number'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setMessage({ type: '', text: '' }) // Clear previous messages

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customerInfo: formData,
          totalAmount: getTotalPrice()
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setOrderNumber(result.orderNumber)
        setOrderComplete(true)
        clearCart()
        setMessage({ 
          type: 'success', 
          text: 'Order submitted successfully! We will contact you soon.' 
        })
      } else {
        setMessage({ 
          type: 'error', 
          text: result.error || 'Order submission failed. Please try again.' 
        })
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setMessage({ 
        type: 'error', 
        text: 'Network error. Please check your connection and try again.' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50"></div>
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Submitted Successfully!</h1>
            <p className="text-lg font-semibold text-gray-800 mb-2">Order Number: #{orderNumber}</p>
            <p className="text-gray-600 mb-6">
              Thank you for your order! We have received your request and will contact you shortly to confirm the details and arrange payment.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Next Steps:</strong><br />
                • We will call you at {formData.phoneNumber} within 24 hours<br />
                • We'll confirm your order details and delivery address<br />
                • Payment will be arranged during the confirmation call
              </p>
            </div>
            <a 
              href="/iphones" 
              className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <User className="w-5 h-5 text-gray-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
                </div>

                {/* Message Display */}
                {message.text && (
                  <div className={`mb-6 p-4 rounded-lg border ${
                    message.type === 'success' 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-center">
                      {message.type === 'success' ? (
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      )}
                      <span className="font-medium">{message.text}</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-gray-900 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="+212 6XX XX XX XX"
                        className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-gray-900 ${
                          errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label>
                    <div className="relative">
                      <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your complete delivery address (street, city, postal code)"
                        rows="3"
                        className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-gray-900 resize-none ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Payment & Confirmation</h3>
                <p className="text-blue-800 text-sm">
                  After submitting your order, we will contact you within 24 hours to:
                </p>
                <ul className="text-blue-800 text-sm mt-2 ml-4 space-y-1">
                  <li>• Confirm your order details</li>
                  <li>• Verify your delivery address</li>
                  <li>• Arrange payment method</li>
                  <li>• Schedule delivery</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-4 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 text-lg"
              >
                {isLoading ? 'Submitting Order...' : `Submit Order - ${getTotalPrice().toFixed(2)} DH`}
              </button>

              <p className="text-sm text-gray-500 text-center">
                * Required fields. No payment required now - we'll contact you to confirm everything.
              </p>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedStorage}-${item.selectedColor}`} className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-500">
                        {item.selectedStorage} • {item.selectedColor}
                      </p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {(item.price * item.quantity).toFixed(2)} DH
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">{getTotalPrice().toFixed(2)} DH</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="text-gray-900">To be confirmed</span>
                </div>
                <div className="border-t pt-2 flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-gray-900">
                    {getTotalPrice().toFixed(2)} DH
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Final total including delivery will be confirmed when we contact you.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-100 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600">
                Contact us if you have any questions about your order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}