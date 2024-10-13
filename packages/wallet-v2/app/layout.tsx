import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Logo from '@/assets/images/logo.png';
import { Header } from '@/shared/Header';
import { ConnectButton } from '@/shared/ConnectButton';
import Footer from '@/shared/Footer';
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

const thicccBoi = localFont({
  src: [
    {
      path: './fonts/THICCCBOI/THICCCBOI-Black.ttf',
      weight: '900',
      style: 'normal'
    },
    {
      path: './fonts/THICCCBOI/THICCCBOI-Bold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: './fonts/THICCCBOI/THICCCBOI-ExtraBold.ttf',
      weight: '800',
      style: 'normal'
    },
    {
      path: './fonts/THICCCBOI/THICCCBOI-Light.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: './fonts/THICCCBOI/THICCCBOI-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/THICCCBOI/THICCCBOI-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/THICCCBOI/THICCCBOI-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/THICCCBOI/THICCCBOI-ThicccAF.ttf',
      weight: '900',
      style: 'normal'
    },
    {
      path: './fonts/THICCCBOI/THICCCBOI-Thin.ttf',
      weight: '100',
      style: 'normal'
    }
  ],
  variable: '--font-thicccboi'
});

export const metadata: Metadata = {
  title: 'Avail Wallet',
  description: 'A decentralized wallet application'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${thicccBoi.variable} antialiased bg-main text-white min-h-screen flex flex-col`}>
        <div className="flex-grow m-4 p-6 sm:p-10 rounded-[32px] bg-sec overflow-auto border-[5px] border-[#FFFFFF1A]">
          <Header />
          <main className="flex-grow">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
