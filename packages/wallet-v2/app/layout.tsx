import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Header } from '@/shared/Header'
import Footer from '@/shared/Footer'
import { Toaster } from '@/components/ui/toaster'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  display: 'swap',
})

const thicccBoi = localFont({
  src: [
    {
      path: './fonts/THICCCBOI/THICCCBOI-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/THICCCBOI/THICCCBOI-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/THICCCBOI/THICCCBOI-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-thicccboi',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Avail Wallet',
  description: 'A decentralized wallet application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${thicccBoi.variable}`}
    >
      <body className="relative antialiased bg-main text-white min-h-screen flex flex-col">
        <div className="flex-grow m-2 sm:m-4 md:m-8 lg:m-16 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[32px] bg-sec overflow-auto border-2 sm:border-[5px] border-[#FFFFFF1A]">
          <Header />
          <main className="flex-grow my-4 sm:my-6 md:my-8">{children}</main>
        </div>
        <Footer />
        <Toaster />

      </body>
    </html>
  )
}
