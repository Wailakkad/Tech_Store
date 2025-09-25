import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wassil - Premium Tech Products',
  description: 'Your trusted source for premium tech products including phones, cases, AirPods, and more.',
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ colorScheme: 'light' }}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body 
        className={inter.className}
        style={{ 
          backgroundColor: '#ffffff',
          color: '#000000',
          colorScheme: 'light'
        }}
      >
        <CartProvider>
          <Header />
          <main 
            className="min-h-screen"
            style={{ 
              backgroundColor: '#ffffff',
              color: '#000000'
            }}
          >
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}