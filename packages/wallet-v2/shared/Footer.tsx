'use client'

import React, { useEffect, useState } from 'react'
import { useMetamaskStore } from '@/slices/metamaskSlice'
import { shortenAddress } from '@/lib/utils'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Green from '@/assets/images/green.svg'
import Discord from '@/assets/images/discord.svg'
import Twitter from '@/assets/images/twitter.svg'
import Linkedin from '@/assets/images/linkedin.svg'
import Github from '@/assets/images/github.svg'

const Footer: React.FC = () => {
  const availSnap = useMetamaskStore((state) => state.availSnap)
  const [prevBlock, setPrevBlock] = useState(availSnap.latestBlock)

  useEffect(() => {
    if (availSnap.latestBlock.number !== prevBlock.number) {
      setPrevBlock(availSnap.latestBlock)
    }
  }, [availSnap.latestBlock, prevBlock])

  const socialLinks = [
    { icon: Discord, alt: 'Discord', href: '#' },
    { icon: Github, alt: 'GitHub', href: '#' },
    { icon: Twitter, alt: 'Twitter', href: '#' },
    { icon: Linkedin, alt: 'LinkedIn', href: '#' },
  ]

  const isLoading = availSnap.latestBlock.number === ''

  return (
    <footer className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
        <motion.div
          className="flex items-center gap-2 text-sm text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image src={Green} alt="Status indicator" width={16} height={16} />
          <p className="hidden sm:block">
            <strong className="font-bold mr-2">Latest Data:</strong>
          </p>
          {isLoading ? (
            <p>Not available</p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.p
                key={availSnap.latestBlock.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                Block: {availSnap.latestBlock.number} | Hash:{' '}
                {shortenAddress(availSnap.latestBlock.hash)}
              </motion.p>
            </AnimatePresence>
          )}
        </motion.div>
        <motion.div
          className="flex justify-center items-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.alt}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Visit our ${link.alt} page`}
            >
              <Image
                src={link.icon}
                width={20}
                height={20}
                alt={`${link.alt} logo`}
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
