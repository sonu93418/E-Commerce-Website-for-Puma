import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import ConditionalFooter from '@/components/layout/ConditionalFooter'
import WelcomeScreen from '@/components/WelcomeScreen'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PUMA - Forever Faster | Premium Sportswear & Footwear',
  description: 'Shop the latest PUMA sportswear, athletic shoes, and lifestyle products. Premium quality, bold design, and exceptional performance.',
  keywords: ['puma', 'sportswear', 'athletic shoes', 'lifestyle', 'fashion', 'sports'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        <WelcomeScreen />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <ConditionalFooter />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#FF0000',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
