import React from 'react'
import Line from '@/assets/images/line.svg'
import Image from 'next/image'

export const SeperatorDot = () => {
  return (
    <Image
      src={Line}
      alt="Lines"
      width={100}
      height={10}
      className="w-full py-8 relative"
    />
  )
}
