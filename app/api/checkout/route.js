import { NextResponse } from 'next/server'

// Configuration - Replace with your actual email settings
const ADMIN_EMAIL = 'akkadouail8@gmail.com' // Replace with your email
const ADMIN_NAME = 'NextGen iStore' // Replace with your store name

// Email notification function using Nodemailer
async function sendOrderNotification(orderData) {
  // Import Nodemailer
  const nodemailer = require('nodemailer')
  
  const emailSubject = `🔔 New Order #${orderData.orderNumber} - ${orderData.customerInfo.fullName}`
  
  const emailTextContent = `
NEW ORDER RECEIVED
==================

ORDER DETAILS:
- Order Number: #${orderData.orderNumber}
- Date: ${new Date(orderData.orderDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}

CUSTOMER INFORMATION:
- Name: ${orderData.customerInfo.fullName}
- Phone: ${orderData.customerInfo.phoneNumber}  
- Address: ${orderData.customerInfo.address}

ORDERED ITEMS:
${orderData.items.map(item => `
- ${item.name}
  Storage: ${item.selectedStorage}
  Color: ${item.selectedColor}
  Quantity: ${item.quantity}
  Unit Price: ${item.price.toFixed(2)} DH
  Subtotal: ${item.subtotal.toFixed(2)} DH
`).join('')}

ORDER TOTAL: ${orderData.totalAmount.toFixed(2)} DH

ACTION REQUIRED:
Please contact ${orderData.customerInfo.fullName} at ${orderData.customerInfo.phoneNumber} to confirm the order and arrange payment.

Generated automatically by ${ADMIN_NAME}
  `

  const emailHtmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        
        <div style="text-align: center; background-color: #000000; color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 24px;">🔔 NEW ORDER RECEIVED</h1>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0;">📋 Order Details</h2>
          <p><strong>Order Number:</strong> #${orderData.orderNumber}</p>
          <p><strong>Date:</strong> ${new Date(orderData.orderDate).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>

        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1976d2; margin-top: 0;">👤 Customer Information</h2>
          <p><strong>Name:</strong> ${orderData.customerInfo.fullName}</p>
          <p><strong>Phone:</strong> <a href="tel:${orderData.customerInfo.phoneNumber}" style="color: #1976d2; text-decoration: none;">${orderData.customerInfo.phoneNumber}</a></p>
          <p><strong>Address:</strong> ${orderData.customerInfo.address}</p>
        </div>

        <div style="background-color: #f3e5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #7b1fa2; margin-top: 0;">🛒 Ordered Items</h2>
          ${orderData.items.map(item => `
            <div style="border-bottom: 1px solid #ddd; padding: 15px 0;">
              <h3 style="margin: 0 0 10px 0; color: #333;">📱 ${item.name}</h3>
              <p style="margin: 5px 0; color: #666;">Storage: <strong>${item.selectedStorage}</strong></p>
              <p style="margin: 5px 0; color: #666;">Color: <strong>${item.selectedColor}</strong></p>
              <p style="margin: 5px 0; color: #666;">Quantity: <strong>${item.quantity}</strong></p>
              <p style="margin: 5px 0; color: #666;">Unit Price: <strong>${item.price.toFixed(2)} DH</strong></p>
              <p style="margin: 5px 0; color: #333; font-size: 16px;"><strong>Subtotal: ${item.subtotal.toFixed(2)} DH</strong></p>
            </div>
          `).join('')}
        </div>

        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
          <h2 style="color: #2e7d32; margin-top: 0;">💰 ORDER TOTAL</h2>
          <p style="font-size: 24px; font-weight: bold; color: #2e7d32; margin: 0;">${orderData.totalAmount.toFixed(2)} DH</p>
        </div>

        <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #ff9800;">
          <h2 style="color: #f57c00; margin-top: 0;">⚠️ ACTION REQUIRED</h2>
          <p style="color: #333; font-size: 16px; margin-bottom: 15px;">
            Please contact <strong>${orderData.customerInfo.fullName}</strong> at 
            <strong><a href="tel:${orderData.customerInfo.phoneNumber}" style="color: #f57c00; text-decoration: none;">${orderData.customerInfo.phoneNumber}</a></strong> 
            to confirm the order and arrange payment.
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 14px; margin: 0;">Generated automatically by ${ADMIN_NAME}</p>
        </div>
      </div>
    </div>
  `

  // Console log for debugging
  console.log('\n📧 Sending order notification email...')
  console.log('To:', ADMIN_EMAIL)
  console.log('Subject:', emailSubject)
  
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    })

    // Send email
    const info = await transporter.sendMail({
      from: `"${ADMIN_NAME}" <${process.env.GMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: emailSubject,
      text: emailTextContent,
      html: emailHtmlContent
    })

    console.log('✅ Email sent successfully:', info.messageId)
    
    return {
      emailSent: true,
      messageId: info.messageId,
      recipient: ADMIN_EMAIL
    }

  } catch (error) {
    console.error('❌ Email sending failed:', error)
    throw new Error('Failed to send email notification: ' + error.message)
  }
}

// Generate unique order number
function generateOrderNumber() {
  const now = new Date()
  const year = now.getFullYear().toString().slice(-2)
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  const time = now.getTime().toString().slice(-4)
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0')
  
  return `${year}${month}${day}${time}${random}`
}

// Main POST handler
export async function POST(request) {
  try {
    console.log('\n🚀 Processing new checkout request...')
    
    const { items, customerInfo, totalAmount } = await request.json()

    // Validate request data
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log('❌ Validation failed: No items in cart')
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    if (!customerInfo) {
      console.log('❌ Validation failed: No customer information')
      return NextResponse.json(
        { error: 'Customer information is required' },
        { status: 400 }
      )
    }

    // Validate required customer fields
    const requiredFields = {
      fullName: 'Full name',
      phoneNumber: 'Phone number', 
      address: 'Address'
    }
    
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!customerInfo[field] || customerInfo[field].toString().trim() === '') {
        console.log(`❌ Validation failed: Missing ${field}`)
        return NextResponse.json(
          { error: `${label} is required` },
          { status: 400 }
        )
      }
    }

    // Validate phone number format (basic validation)
    const cleanPhone = customerInfo.phoneNumber.trim()
    if (cleanPhone.length < 8) {
      console.log('❌ Validation failed: Invalid phone number')
      return NextResponse.json(
        { error: 'Please enter a valid phone number (minimum 8 digits)' },
        { status: 400 }
      )
    }

    // Validate and calculate total amount
    let calculatedTotal = 0
    for (const item of items) {
      if (!item.price || !item.quantity || item.quantity < 1) {
        console.log('❌ Validation failed: Invalid item data', item)
        return NextResponse.json(
          { error: 'Invalid item data in cart' },
          { status: 400 }
        )
      }
      calculatedTotal += parseFloat(item.price) * parseInt(item.quantity)
    }

    if (Math.abs(calculatedTotal - totalAmount) > 0.01) {
      console.log('❌ Validation failed: Total amount mismatch')
      console.log('Calculated:', calculatedTotal, 'Received:', totalAmount)
      return NextResponse.json(
        { error: 'Total amount verification failed' },
        { status: 400 }
      )
    }

    console.log('✅ All validations passed')

    // Generate unique order number
    const orderNumber = generateOrderNumber()
    console.log('📋 Generated order number:', orderNumber)

    // Create structured order data
    const orderData = {
      orderNumber,
      items: items.map(item => ({
        id: item.id,
        name: item.name.trim(),
        variant: item.variant || '',
        selectedStorage: item.selectedStorage,
        selectedColor: item.selectedColor,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
        subtotal: parseFloat(item.price) * parseInt(item.quantity)
      })),
      customerInfo: {
        fullName: customerInfo.fullName.trim(),
        phoneNumber: customerInfo.phoneNumber.trim(),
        address: customerInfo.address.trim()
      },
      orderDate: new Date().toISOString(),
      totalAmount: parseFloat(totalAmount),
      currency: 'MAD'
    }

    console.log('📧 Sending notification email...')
    
    // Send notification email
    try {
      await sendOrderNotification(orderData)
      console.log('✅ Notification email sent successfully')
    } catch (emailError) {
      console.error('❌ Email notification failed:', emailError)
      return NextResponse.json(
        { error: 'Failed to send order notification. Please try again.' },
        { status: 500 }
      )
    }

    console.log('🎉 Order processed successfully!')

    // Return success response
    return NextResponse.json({
      success: true,
      orderNumber: orderNumber,
      message: 'Order submitted successfully! We will contact you soon.',
      order: {
        orderNumber: orderNumber,
        totalAmount: totalAmount,
        itemCount: items.length,
        customerName: customerInfo.fullName,
        customerPhone: customerInfo.phoneNumber,
        submittedAt: orderData.orderDate
      }
    })

  } catch (error) {
    console.error('💥 Checkout API critical error:', error)
    
    return NextResponse.json(
      { 
        error: 'Something went wrong processing your order. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests for order submission'
    },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}